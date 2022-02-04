let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 4;
let y = canvas.height / 2;

let dy = 1;

let ballRadius = 10;

function drawBall() { //makes ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    drawBall(); //draws the ball

    y += dy; //change y value of ball

    //ceiling and floor check
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) { 
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }
}


function mouseDownHandler() { //makes ball go up when mouseclick
    let barrier = y - 60;
    dy = -1;
    if (y = barrier) {
        dy = 1;
    }
}

document.addEventListener("mousedown", mouseDownHandler, false);

let interval = setInterval(draw, 10);