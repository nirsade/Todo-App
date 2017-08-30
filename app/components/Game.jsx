import React from 'react';


var canvas;
var canvasContext;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10
const WINING_SCORE = 3;
const BALL_STARTED_SPEED_X = 5;
const BALL_STARTED_SPEED_Y = 2;

var ballX = 50;
var ballSpeedX = BALL_STARTED_SPEED_X;
var ballY = 50;
var ballSpeedY = BALL_STARTED_SPEED_Y;

var player1score = 0;
var player2score = 0;

var paddle1y = 150;
var paddle2y = 150;

var showEverything = false;

export var Game = React.createClass({
    drawEveryThing() {

        // draw all boar in black
        this.colorRect(0, 0, canvas.width, canvas.height, '#2199e8');

        canvasContext.font = "15px David";
        canvasContext.fillStyle = '#fafafa';
        canvasContext.fillText('Score: ' + player1score, 50, 100);
        canvasContext.fillText('Score: ' + player2score, 700, 100);

        if (showEverything) {
            canvasContext.fillText('Press any key to continue', 350, 100);
            canvasContext.fillStyle = '#990000';
            canvasContext.font = "20px David";

            if (player1score >= WINING_SCORE) {
                canvasContext.fillText('Player 1 WINS !!!!', 350, 300);
            }
            else if (player2score >= WINING_SCORE) {
                canvasContext.fillText('Player 2 WINS !!!!', 350, 300);
            }
            return;
        }

        this.drawNet();

        // this is the left player paddle
        this.colorRect(0, paddle1y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

        // this is the right player paddle
        this.colorRect(canvas.width - PADDLE_THICKNESS, paddle2y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

        // this is the ball
        this.colorCircle(ballX, ballY, 10, 'gold');
    },
    moveEverything() {
        if (showEverything) {
            return;
        }

        this.computerMovement();

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballX < 5) {
            // ball hit the left paddle
            if (paddle1y < ballY && ballY < paddle1y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY = (ballY - (paddle1y + (PADDLE_HEIGHT / 2))) * 0.35;
            }
            else {
                player2score++;
                this.ballReset();
            }
        }
        if (ballX > canvas.width - 5) {
            // ball hit the right paddle
            if (paddle2y < ballY && ballY < paddle2y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
                ballSpeedY = (ballY - (paddle2y + (PADDLE_HEIGHT / 2))) * 0.35;
            }
            else {
                player1score++;
                this.ballReset();
            }
        }

        if (ballY < 0 || ballY > canvas.height) {
            ballSpeedY = -ballSpeedY;
        }
    },
    computerMovement() {

        var paddle2yCenter = paddle2y + (PADDLE_HEIGHT / 2);
        if (paddle2yCenter < ballY - 35) {
            paddle2y += 6;
        } else if (paddle2yCenter > ballY + 35) {
            paddle2y -= 6;
        }
    },
    drawNet() {
        for (var i = 0; i < canvas.height; i = i + 40) {
            this.colorRect(canvas.width / 2 - 1, i, 2, 20, 'white');
        }
    },
    colorRect(x, y, width, height, color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x, y, width, height);
    },
    colorCircle(centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    },
    canculateMousePosition(e) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = e.clientX - rect.left - root.scrollLeft;
        var mouseY = e.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        }
    },
    ballReset() {
        if (player1score >= WINING_SCORE || player2score >= WINING_SCORE) {
            showEverything = true;
        }
        ballSpeedX = ballSpeedX >= 0 ? -BALL_STARTED_SPEED_X : BALL_STARTED_SPEED_X;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
    },
    componentDidMount() {
        canvas = this.refs.GameCanvas;
        console.log(this.refs.GameCanvas);
        canvasContext = canvas.getContext('2d');
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        var framePerSecond = 30;
        // this.drawEveryThing();
        // this.moveEverything();
        // this.drawNet();
        console.log(document.documentElement);

        var drawEverything = () => this.drawEveryThing();
        var moveEverything = () => this.moveEverything();

        setInterval(function () {
            drawEverything();
            moveEverything();
        }, 1000 / framePerSecond);

        var canculateMousePosition = (e) => this.canculateMousePosition(e);

        canvas.addEventListener('mousemove', function (e) {
            var mousePos = canculateMousePosition(e);
            paddle1y = mousePos.y - (PADDLE_HEIGHT / 2);
        });

        canvas.addEventListener('mousedown', function (e) {
            if (showEverything) {
                player1score = 0;
                player2score = 0;
                showEverything = false;
            }
        })
    },
    render() {
        return (
            <div>
                <a className="page-actions" href="#">Go Back</a>
                <canvas className="gameCanvas" ref="GameCanvas" width="800" height="600"></canvas>
            </div>
        )
    }
});

export default Game;

