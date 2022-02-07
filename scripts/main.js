let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 4;
let y = canvas.height / 2;

let dy = 1;

let ballRadius = 7;

let obstWidth = 40;
let obstHeight = (canvas.height - 70) / 2;
let obstPadding = 80;
let obstGap = 70;
//let obstColCount = 1;
let obstRowCount = 20;
let obstOffsetLeft = canvas.width / 2;

var obstChange = [10, 20, 30, 40, 50, 60, 70, 80];
const random = Math.floor(Math.random() * 8);

let obsts = [];
for (let r = 0; r < obstRowCount; r++) {
    obsts[r] = { x: 0, y: 0, show: true };
}

function drawBall() { //makes ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawTopObsts() { //makes top obstacles
    for (let r = 0; r < obstRowCount; r++) {
        let x = obstChange[random];
        if (obsts[r].show == true) {
            let obstX = (r * (obstWidth + obstPadding)) + obstOffsetLeft;
            let obstY = 0;
            obsts[r].x = obstX;
            obsts[r].y = obstY;

            ctx.beginPath();
            ctx.rect(obstX, obstY, obstWidth, obstHeight + x);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawBottomObsts() { //makes bottom obstacles
    for (let r = 0; r < obstRowCount; r++) {
        let x = obstChange[random];
        if (obsts[r].show == true) {
            let obstX = (r * (obstWidth + obstPadding)) + obstOffsetLeft;
            let obstY = obstHeight + obstGap + x;
            obsts[r].x = obstX;
            obsts[r].y = obstY;
             
            ctx.beginPath();
            ctx.rect(obstX, obstY, obstWidth, obstHeight + x);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    drawTopObsts(); //draws top obstacles
    drawBottomObsts(); //draws bottom obstacles

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
    let barrier = y - 50;
    dy = -1;
    if (y = barrier) {
        dy = 1;
    }
}

document.addEventListener("mousedown", mouseDownHandler, false);

let interval = setInterval(draw, 10);