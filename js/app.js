const black = "#000000";
var pause_game = false;
var end_game;
var moving_score;
var context;
var refrashRatePackman = 100;
var refrashRateGhosts = 300;
var packman;
var ghosts;
var board;
var foods;
var food_colors = ["#1ACFCE", "#F1C216", "#46D852"];
var controlles = {"up": 38,"down": 40,"left": 37,"right": 39};
var start_time;
var time_elapsed;
var max_time = 100;
var current_max_time;
var suspension_start_time;
var intervalPackman;
var intervalGhosts;
var boardRowLength = 20;
var boardColLength = 23;
var scale = 80;
var foodRadius;
var num_ghost = 4;
var food_remain = 50;
const ghosts_imges = ["./resources/pictures/ghost1.png", "./resources/pictures/ghost2.png", "./resources/pictures/ghost3.png", "./resources/pictures/ghost4.png"]
const ghost_starter_loc = [[1,1], [1, 21], [18, 1], [18, 21]];

$(document).ready(function() {
	context = canvas.getContext("2d");
	scale = (canvas.height/(boardColLength));
	$("#newGame").click(Start);
	$("#endNewGame").click(showGameScreen);
	$("#endToSettings").click(showSettingScreen);
	$("#pause_play_Btn").click(pauseGame)
});


function showGameScreen(){
	$("#gameScreen").show();
    $("#login").hide();
    $("#welcome").hide();
    $("#register").hide();
	$("#settingScreen").hide();
	$("#endGame").hide();
	Start();
}

function reciveSettings(up, down, left, right, food_num, big_food_color, mid_food_color, small_food_color, monster_num, game_time){
	controlles.up = up;
	controlles.down = down;
	controlles.right = right;
	controlles.left = left;
	if (food_num != "")
		food_remain = food_num;
	if (small_food_color != black)
		food_colors[0] = small_food_color;
	if (mid_food_color != black)
		food_colors[1] = mid_food_color;
	if (big_food_color != black)
		food_colors[2] = big_food_color;
	if (monster_num != "")
		num_ghost = monster_num;
	if (game_time != "")
		max_time = parseInt(game_time);

}


function Start() {
	end_game = false;
	current_max_time = max_time;
	start_time = new Date();
	foods = [];
	ghosts = [];
	clearInterval(intervalPackman);
	clearInterval(intervalGhosts);
	board = GameBoard.createBoard();
	boardRowLength = board.length;
	boardColLength = board[0].length;
	buildGhosts();
	buildFood();

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
	if (keysDown[controlles["up"]]) {
		return 1;
	}
	// down
	if (keysDown[controlles["down"]]) {
		return 2;
	}
	// left
	if (keysDown[controlles["left"]]) {
		return 3;
	}
	//right
	if (keysDown[controlles["right"]]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = packman.get_Score();
	lblTime.value = current_max_time - time_elapsed;
	lblLives.value = packman.get_lives();
	if (lblTime.value <= 0 || lblLives.value <= 0)
		gameOver();
	for (var i = 0; i < boardRowLength; i++) {
		for (var j = 0; j < boardColLength; j++) {
			if (board[i][j] == 4) {
				let center = {};
				center.x = i * scale + scale/2;
				center.y = j * scale + scale/2;
				context.beginPath();
				context.rect(center.x - scale/2, center.y - scale/2, scale, scale);
				context.fillStyle = "orange"; //color
				context.fill();
			}
		}
	}
	
	foods.forEach(food => {
		food.draw(context, scale);
	});
	
	if (moving_score != null)
		moving_score.draw(context, scale);

	ghosts.forEach(ghost => {
		ghost.draw(context, scale);
	});
	packman.draw(context, scale);
}

function UpdatePositionPackman() {
	if (pause_game == true)
		return;
	packmanMove();
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	Draw();
	
}

function UpdatePositionGhosts() {
	ghostMove();
	moving_score.moveChar(board);
	Draw();
}

function packmanMove(){
	var x = GetKeyPressed();
	packman.moveChar(x, board, foods);
}

function ghostMove(){
	ghosts.forEach(ghost => {
		ghost.moveChar(packman.get_i(), packman.get_j(), board);
	});	
}

function buildGhosts(){
	ghosts = new Array();
	for (let index = 0; index < num_ghost; index++) {
		ghosts.push(new Ghost(board, ghosts_imges[index], ghost_starter_loc[index][0] ,ghost_starter_loc[index][1]));	
	}
	 
}

function buildFood(){
	foods = new Set();
	let num_small_food = (food_remain*60)/100;
	let num_mid_food = (food_remain*30)/100;
	let num_big_food = (food_remain*10)/100;
	for (let index = 0; index < num_small_food; index++) {
		foods.add(new SmallFood(board, food_colors[0]));
	}
	for (let index = 0; index < num_mid_food; index++) {
		foods.add(new MidFood(board, food_colors[1]));
	}
	for (let index = 0; index < num_big_food; index++) {
		foods.add(new BigFood(board, food_colors[2]));
	}
	moving_score = new MovingScore(board, "./resources/pictures/cherry.png");
	foods.add(new FoodLife(board,"./resources/pictures/heart.png"));
	foods.add(new HourGlassFood(board,"./resources/pictures/clock.png",10));

}

function pacmanLostLife(){
	for (let index = 0; index < num_ghost; index++) {
		ghosts[index].goToStart(ghost_starter_loc[index][0] ,ghost_starter_loc[index][1], board);	
	}
}

function gameOver(){
	if (end_game == false){
		clearInterval(intervalPackman);
		clearInterval(intervalGhosts);
		lblTime.value =0 ; //To present time =0 in game over and not -0.0007..
		$("#endGame").show();
		end_game = true;
		$("#endheaderText").html("Game Over!");

		if (lblLives.value <= 0){
			$("#endGameText").html("Loser!");
		}
		else if (lblScore.value <= 100){
			$("#endGameText").html("You are better than " + lblScore.value + " points!");
		}
		else{
			$("#endGameText").html("Winner!!!");
		}

	}
}

function pauseGame(){
	if(pause_game == false){
		pause_game = true;
		suspension_start_time = new Date();
		$("#pause_play_Btn").html("Play");
		clearInterval(intervalPackman);
		clearInterval(intervalGhosts);
	}
	else{
		pause_game = false;
		current_max_time += (new Date()-suspension_start_time)/1000;
		$("#pause_play_Btn").html("Pause");
		intervalPackman = setInterval(UpdatePositionPackman, refrashRatePackman);
		intervalGhosts = setInterval(UpdatePositionGhosts, refrashRateGhosts);
	}

}

