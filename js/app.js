var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var boardRowLength = 20;
var boardColLength = 20;
var scale = 80;

$(document).ready(function() {
	context = canvas.getContext("2d");
	scale = (canvas.width/(boardColLength));
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

function findOpposite(currWall){
	let wallRow = currWall.row;
	let wallCol = currWall.col;
	for(let j=-1; j<=1; j++)
	{
		for (let k=-1;k<=1;k++)
		{
			if ((j == 0 && k == 0) || (k != 0 && j != 0)) // only horizontal or vertical
				continue;
			else if (0<=wallRow+j && wallRow+j<boardRowLength && 0<=wallCol+k && wallCol+k<boardColLength && board[wallRow+j][wallCol+k] == 0) // in Bounds and is a wall
				if (0<=wallRow-j && wallRow-j<boardRowLength && 0<=wallCol-k && wallCol-k<boardColLength)
					return ({"row": wallRow-j, "col": wallCol-k});
		}
	}
	return null;

}

function buildWalls(){
	// fill board with 4
	for (let index1 = 0; index1 < boardRowLength; index1++) {
		board[index1] = new Array();
		for (let index2 = 0; index2 < boardColLength; index2++) {
			board[index1][index2] = 4;
		}
	}
	let randomNum = Math.random();
	let starti = Math.floor(Math.random() * (boardRowLength-1) + 1);
	let startj = Math.floor(Math.random() * (boardColLength-1) + 1);
	board[starti][startj] = 0;
	let walls = [];
	addWallsToArray(starti, startj, walls);

	while(walls.length){
		const random = Math.floor(Math.random() * walls.length);
		const currWall = walls.splice(random, 1)[0];
		if (board[currWall.row][currWall.col] == 4) {
			opposite = findOpposite(currWall);
			// if opposite is a vertice(0), there is already a path to it. if opposite is null, vertice is at the edge.
			if (opposite != null && board[opposite.row][opposite.col] == 4) {
				// 'break' both walls (opposite and path to it) and add walls of opposite to stack
				board[currWall.row][currWall.col] = 0;
				board[opposite.row][opposite.col] = 0;
				addWallsToArray(opposite.row, opposite.col, walls);
			}
		}
	}



}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 400;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	buildWalls();
	for (var i = 0; i < boardRowLength; i++) {
		// board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < boardColLength; j++) {
			// if (
			// 	(i == 3 && j == 3) ||
			// 	(i == 3 && j == 4) ||
			// 	(i == 3 && j == 5) ||
			// 	(i == 6 && j == 1) ||
			// 	(i == 6 && j == 2)
			// ) {
			// 	board[i][j] = 4;
			// } else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} 
				// else {
				// 	board[i][j] = 0;
				// }
				cnt--;
			}
		}
	
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
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
	interval = setInterval(UpdatePosition, 100);
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < boardRowLength; i++) {
		for (var j = 0; j < boardColLength; j++) {
			var center = new Object();
			center.x = i * scale + scale/2;
			center.y = j * scale + scale/2;
			if (board[i][j] == 2) { //draw pacman
				context.beginPath();
				context.arc(center.x, center.y, scale/2, 0.15 * Math.PI, 1.85 * Math.PI); // half circle.. packman
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle.. eye of packman
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) { // food
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle.. foddies
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - scale/2, center.y - scale/2, scale, scale);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < boardColLength-1 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--; 
		}
	}
	if (x == 4) {
		if (shape.i < boardRowLength-1 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
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


function addWallsToArray(i, j, wallsList)
{
        let startRow = i;
        let startCol = j;
        for(let l=-1; l<=1; l++)
        {
            for (let k=-1;k<=1;k++)
            {
                if ((l == 0 && k == 0) || (k != 0 && l != 0)) // only horizontal or vertical
                    continue;
                else if ( 0<=startRow+l && startRow+l<boardRowLength && 0<=startCol+k && startCol+k<boardColLength && board[startRow+l][startCol+k] == 4) // in Bounds and is a wall
                    wallsList.push({"row": (startRow + l), "col": (startCol + k)});
            }
        }
}
