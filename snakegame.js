const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//creating one box
const box = 32;

//loading the background and food
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//laoding the audio files
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/titi.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

//creating the snake
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 *box
};

//creating the food for snake

let food = {
    x:Math.floor(Math.random()*17+1) * box,
    y:Math.floor(Math.random()*15+3) * box
};

//creating a score counter
let score = 0;

//controlling the snake through keyboard;

let d;
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d!= "RIGHT"){
        d = "LEFT";
        left.play();
    }
    else if(key == 38 && d!="DOWN"){
        d = "UP";
        up.play();
    }
    else if(key == 39 && d!="LEFT"){
        d = "RIGHT";
        right.play();
    }
    else if(key == 40 && d!="UP"){
        d = "DOWN";
        down.play();
    }
}

function directiontouch(key){
    if(key == 37 && d!= "RIGHT"){
        d = "LEFT";
        left.play();
    }
    else if(key == 38 && d!="DOWN"){
        d = "UP";
        up.play();
    }
    else if(key == 39 && d!="LEFT"){
        d = "RIGHT";
        right.play();
    }
    else if(key == 40 && d!="UP"){
        d = "DOWN";
        down.play();
    }
}

//checking collision with the wall

function collision(head, array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

//drawing everything 

function draw(){
    ctx.drawImage(ground,0,0);
    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i==0)?"green":"white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //directions
    if(d == "LEFT"){
        snakeX -= box;
    }
    if(d == "UP"){
        snakeY -= box;
    }
    if(d == "RIGHT"){
        snakeX += box;
    }
    if(d == "DOWN"){
        snakeY += box;
    }

    //after eating a fruit
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x:Math.floor(Math.random()*17 + 1) * box,
            y:Math.floor(Math.random()*15 + 3) * box 
        }
        //we are not removing tail here
    }
    else{
        //remove the tail
        snake.pop();
    }
    //add a new head

    let newHead = {
        x : snakeX,
        y : snakeY
    }
    //game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY >17*box || collision(newHead, snake)){
        clearInterval(game);
        dead.play();
        callin();
    }
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one"
    ctx.fillText(score,2*box,1.6*box);
}
//we have to call draw function every 100 ms

let game = setInterval(draw, 100);

function callin(){
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    location.replace("index.html");
}

    //location.replace("index.html");
}






