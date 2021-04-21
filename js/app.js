var context;
var refrashRate = 200;
var packmanLoc = new Object();
var monsterLoc = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var boardRowLength = 20;
var boardColLength = 23;
var scale = 80;
var direction = 0;
var eyeLocx;
var eyeLocy;
var eyeRadius;
var foodRadius;
var monster_remain = 1;
var food_remain = 50;
var pacman_remain = 1;
const ghost_img = new Image();

$(document).ready(function() {
	context = canvas.getContext("2d");
	scale = (canvas.height/(boardColLength));
	eyeLocx = scale/12;
	eyeLocy = -3*scale/12;
	eyeRadius = scale/12;
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
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 400;
	food_remain = 50;
	pacman_remain = 1;
	start_time = new Date();
	// buildWalls();
	buildFixedBoard();
	boardRowLength = board.length;
	boardColLength = board[0].length;
	buildMonsters();
	for (var i = 0; i < boardRowLength; i++) {
		for (var j = 0; j < boardColLength; j++) {
			var randomNum = Math.random();
			if (i == monsterLoc.i && j == monsterLoc.j){
				board[i][j] = 3;
			}
			if ((randomNum <= (1.0 * food_remain) / cnt) && board[i][j] != 4) {
				food_remain--;
				board[i][j] = 1;
			} else if ((randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) && board[i][j] != 4 && pacman_remain != 0) {
				packmanLoc.i = i;
				packmanLoc.j = j;
				pacman_remain--;
				board[i][j] = 2;
			}
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
	interval = setInterval(UpdatePosition, refrashRate);
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
		// twist packman
		direction = 3
		// twist packman
		eyeLocx = 3*scale/12;
		eyeLocy = -1*scale/12;
		return 1;
	}
	// down
	if (keysDown[40]) {
		// twist packman
		direction = 1
		// twist eyes
		eyeLocx = 3*scale/12;
		eyeLocy = scale/12;
		return 2;
	}
	// left
	if (keysDown[37]) {
		// twist packman
		direction = 2;
		// twist eyes
		eyeLocx = -1*scale/12;
		eyeLocy = -3*scale/12;
		return 3;
	}
	//right
	if (keysDown[39]) {
		// twist packman
		direction = 0;	
		// twist eyes	
		eyeLocx = scale/12;
		eyeLocy = -3*scale/12;
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
				//			circle_center_x, circle_center_y, raduis, staring_angle, ending_angle, 
				context.arc(center.x, center.y, scale/2, (0.15+0.5*direction) * Math.PI, (1.85+0.5*direction) * Math.PI); // half circle.. packman
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + eyeLocx, center.y + eyeLocy, eyeRadius, 0, 2 * Math.PI); // circle.. eye of packman
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) { // food
				context.beginPath();
				context.arc(center.x, center.y, scale/5, 0, 2 * Math.PI); // circle.. foddies
				context.fillStyle = "white"; //color
				context.fill();
		
			} else if (board[i][j] == 3) { // food
				context.drawImage(ghost_img, monsterLoc.i*scale, monsterLoc.j*scale,scale, scale);

			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - scale/2, center.y - scale/2, scale, scale);
				context.fillStyle = "#42f5da"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	packmanMove();
	ghostMove();
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

function buildFixedBoard(){
	board = [
		[4, 4, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0 ,4 ,4 ,4 ,0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 4, 0 ,4 ,4 ,4 ,0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 4, 4, 0 ,4 ,4 ,4 ,0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
		[0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0],
  		[0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 0, 0, 0],
  		[4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4], 
  		[4, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 4], 
  		[4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4], 
  		[0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0],
  		[0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0],
  		[4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
  		[4, 0, 0, 4, 0, 4, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
  		[4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
  		[4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
  		[4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
  		[4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
  		[4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	]
	 board = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

function buildMonsters(){
	ghost_img.src = "ghost.png";
	monsterLoc.i = 11;
	monsterLoc.j = 10;
}

function packmanMove(){
	board[packmanLoc.i][packmanLoc.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (packmanLoc.j > 0 && board[packmanLoc.i][packmanLoc.j - 1] != 4) {
			packmanLoc.j--;
		}
	}
	if (x == 2) {
		if (packmanLoc.j < boardColLength-1 && board[packmanLoc.i][packmanLoc.j + 1] != 4) {
			packmanLoc.j++;
		}
	}
	if (x == 3) {
		if (packmanLoc.i > 0 && board[packmanLoc.i - 1][packmanLoc.j] != 4) {
			packmanLoc.i--; 
		}
	}
	if (x == 4) {
		if (packmanLoc.i < boardRowLength-1 && board[packmanLoc.i + 1][packmanLoc.j] != 4) {
			packmanLoc.i++;
		}
	}
	if (board[packmanLoc.i][packmanLoc.j] == 1) {
		score++;
	}
	board[packmanLoc.i][packmanLoc.j] = 2;
}

function ghostMove(){
	best_move = {"i": 1000, "j" : 1000, "dis": 1000}
	board[monsterLoc.i][monsterLoc.j] = 0;
	let man_dis;
	if (board[monsterLoc.i+1][monsterLoc.j] != 4){
		man_dis = Math.abs(monsterLoc.i+1-packmanLoc.i)+Math.abs(monsterLoc.j-packmanLoc.j);
		if (man_dis<best_move.dis)
			best_move = {"i": monsterLoc.i+1, "j" : monsterLoc.j, "dis": man_dis};
	}
	if (board[monsterLoc.i-1][monsterLoc.j] != 4){
		man_dis = Math.abs(monsterLoc.i-1-packmanLoc.i)+Math.abs(monsterLoc.j-packmanLoc.j)
		if (man_dis<best_move.dis)
			best_move = {"i": monsterLoc.i-1, "j" : monsterLoc.j, "dis": man_dis};
	}
	if (board[monsterLoc.i][monsterLoc.j+1] != 4){
		man_dis = Math.abs(monsterLoc.i-packmanLoc.i)+Math.abs(monsterLoc.j+1-packmanLoc.j);
		if (man_dis<best_move.dis)
			best_move = {"i": monsterLoc.i, "j" : monsterLoc.j+1, "dis": man_dis};
	}
	if (board[monsterLoc.i][monsterLoc.j-1] != 4){
		man_dis = Math.abs(monsterLoc.i+1-packmanLoc.i)+Math.abs(monsterLoc.j-1-packmanLoc.j);
		if (man_dis<best_move.dis)
			best_move = {"i": monsterLoc.i, "j" : monsterLoc.j-1, "dis": man_dis};
	}
	monsterLoc.i = best_move.i;
	monsterLoc.j = best_move.j;
	board[monsterLoc.i][monsterLoc.j] = 3;
}
