let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 4;
let y = canvas.height / 2;

let dy = 1;;
let obstdy = 1;
let dx = -1;

let ballRadius = 7;

let obstWidth = 40;
let obstHeight = (canvas.height - 70) / 2;
let obstPadding = 80;
let obstGap = 70;
let obstColCount = 24;
let obstOffsetLeft = canvas.width / 2;

var obstChange = [10, 10, 10, 20, 20, 20, 30, 30, 30, 40, 40, 40, 50, 50, 50, 60, 60, 60, 70, 70, 70, 80, 80, 80];
var pls = shuffle(obstChange); //generates array where obstChange contents are shuffled


let topObsts = [];
for (let r = 0; r < obstColCount; r++) {
    topObsts[r] = { x: 0, y: 0, show: true };
}

let bottomObsts = [];
for (let r = 0; r < obstColCount; r++) {
    bottomObsts[r] = { x: 0, y: 0, show: true };
}

let score = 0;
let level = 1;

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {  // While there remain elements to shuffle...

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function drawBall() { //makes ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawObsts() {
    for (let r = 0; r < obstColCount; r++) {
        a = pls[r];
        if (topObsts[r].show == true) { //makes top obstacles
            let obstX = (r * (obstWidth + obstPadding)) + obstOffsetLeft;
            let obstY = 0;
            topObsts[r].x = obstX;
            topObsts[r].y = obstY;

            ctx.beginPath();
            ctx.rect(obstX, obstY, obstWidth, obstHeight + a);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }

        if (bottomObsts[r].show == true) { //makes top obstacles
            let obstX = (r * (obstWidth + obstPadding)) + obstOffsetLeft;
            let obstY = obstHeight + obstGap + a;
            bottomObsts[r].x = obstX;
            bottomObsts[r].y = obstY;

            ctx.beginPath();
            ctx.rect(obstX, obstY, obstWidth, obstHeight + a);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas

    drawObsts(); //draws obstacles
       
    drawBall(); //draws the ball

    y += dy; //change y value of ball
    obstOffsetLeft += dx; //makes obstacles move

    //ceiling and floor check
    if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval);
    }

    collisionDetection(); //checks if collided with obstacles

    drawScore();

    drawLevel();

    if (score > 8 && score < 16) {
        dx = -1.5;
        level = 2;
    }

    if (score > 16 && score < 24) {
        dx = -1.9;
        level = 3;
    }

    if (score == 24) {
        alert("CONGRATS, YOU WON!");
        document.location.reload();
        clearInterval(interval);
    }

}

function collisionDetection() {
    for (let r = 0; r < obstColCount; r++) {
        a = pls[r];
        let t = topObsts[r];
        if (t.show == true) { //checks if collided with top obstacles
            if (x > t.x && x < t.x + obstWidth && y < obstHeight + a) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
        }
        let b = bottomObsts[r];
        if (b.show == true) { //checks for bottom obstacles
            if (x > b.x && x < b.x + obstWidth && y > b.y) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);
            }
        }
        if (x > t.x + obstWidth && x < t.x + obstWidth + 2) {
            score++;
        }
    }
}

    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + score, 8, 20);
    }

    function drawLevel() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Level: " + level, 120, 20);
    }

    function mouseDownHandler() { //makes ball go up when mouseclick
        dy = -1; //goes up until hits barrier, then goes down
        let barrier = y - 30;
        if (y = barrier) {
            dy = 1;
        }
    }

    document.addEventListener("mousedown", mouseDownHandler, false);

    let interval = setInterval(draw, 10);