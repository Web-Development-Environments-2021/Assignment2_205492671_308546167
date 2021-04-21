var context;
var refrashRatePackman = 100;
var refrashRateGhosts = 300;
var packman;
var ghosts;
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var intervalPackman;
var intervalGhosts;
var boardRowLength = 20;
var boardColLength = 23;
var scale = 80;
var foodRadius;
var num_ghost = 4;
var food_remain = 50;
var pacman_remain = 1;
const ghosts_imges = ["ghost1.png", "ghost2.png", "ghost3.png", "ghost4.png"]

$(document).ready(function() {
	context = canvas.getContext("2d");
	scale = (canvas.height/(boardColLength));
	Start();
});


function showGameScreen(){
	$("#gameScreen").show();
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
	$("#settingScreen").hide();
	Start();
}


function Start() {
	score = 0;
	var cnt = 400;
	food_remain = 50;
	start_time = new Date();

	board = GameBoard.createBoard();
	boardRowLength = board.length;
	boardColLength = board[0].length;
	buildGhosts();
	for (var i = 0; i < boardRowLength; i++) {
		for (var j = 0; j < boardColLength; j++) {
			var randomNum = Math.random();
			if ((randomNum <= (1.0 * food_remain) / cnt) && board[i][j] != 4) {
				food_remain--;
				board[i][j] = 1;
			}
			cnt--;
		}
	}
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}

	packman = new Packman(board, scale/12, -3*scale/12, scale/12);

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	intervalPackman = setInterval(UpdatePositionPackman, refrashRatePackman);
	intervalGhosts = setInterval(UpdatePositionGhosts, refrashRateGhosts);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (boardRowLength-1) + 1);
	var j = Math.floor(Math.random() * (boardColLength-1) + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * (boardRowLength-1) + 1);
		j = Math.floor(Math.random() * (boardColLength-1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	// up
	if (keysDown[38]) {
		return 1;
	}
	// down
	if (keysDown[40]) {
		return 2;
	}
	// left
	if (keysDown[37]) {
		return 3;
	}
	//right
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = packman.get_Score();
	lblTime.value = time_elapsed;
	for (var i = 0; i < boardRowLength; i++) {
		for (var j = 0; j < boardColLength; j++) {
			var center = new Object();
			center.x = i * scale + scale/2;
			center.y = j * scale + scale/2;
			if (board[i][j] == 2) { //draw pacman
				packman.draw(context, center, scale);
			} else if (board[i][j] == 1) { // food
				context.beginPath();
				context.arc(center.x, center.y, scale/5, 0, 2 * Math.PI); // circle.. foddies
				context.fillStyle = "white"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - scale/2, center.y - scale/2, scale, scale);
				context.fillStyle = "#42f5da"; //color
				context.fill();
			}
		}
	}
	ghosts.forEach(ghost => {
		ghost.draw(context, scale);
	});
}

function UpdatePositionPackman() {
	packmanMove();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function UpdatePositionGhosts() {
	ghostMove();
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function packmanMove(){
	var x = GetKeyPressed();
	packman.moveChar(x, board);
}

function ghostMove(){
	ghosts.forEach(ghost => {
		ghost.moveChar(packman.get_i(), packman.get_j(), board);
	});	
}

function buildGhosts(){
	ghosts = new Array();
	for (let index = 0; index < num_ghost; index++) {
		ghosts.push(new Ghost(board, ghosts_imges[index], 10 + index ,11,));	
	} 
}
