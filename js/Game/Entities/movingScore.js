class MovingScore{
    constructor(board, img_path){
        let emptyCell = findRandomEmptyCell(board);
        let starti = emptyCell[0];
        let startj = emptyCell[1];        
        this.loc_i = starti;
        this.loc_j = startj;
        this.img = new Image();
        this.img.src = img_path;
        board[starti][startj] = this;
        this.score = 50;
        this.food = null;
        this.yupieAudio = new Audio("./resources/songs/yupie.mp3");
    }


    draw(context, scale){
        context.drawImage(this.img, this.loc_i*scale, this.loc_j*scale,scale, scale);
    }

    moveChar(board){
        let random_move = this.pickRandomMove(board);
        if (this.food != null)
            board[this.loc_i][this.loc_j] = this.food;
        else
            board[this.loc_i][this.loc_j] = 0;
        this.food = null;
        this.loc_i = random_move.i;
        this.loc_j = random_move.j;
        if (board[this.loc_i][this.loc_j] instanceof Food)
            this.food =  board[this.loc_i][this.loc_j];
        if(board[this.loc_i][this.loc_j] instanceof Packman){
            this.interactWithPacman(board[this.loc_i][this.loc_j]);
        }
        board[this.loc_i][this.loc_j] = this;
    }
    
    get_Score(){
        return this.score;
    }

    pickRandomMove(board){
        let possible_moves = [];
        if(isValidMove(board,this.loc_i+1,this.loc_j)){
            possible_moves.push({"i": this.loc_i+1, "j" : this.loc_j});
        }
        if(isValidMove(board,this.loc_i-1,this.loc_j)){
            possible_moves.push({"i": this.loc_i-1, "j" : this.loc_j});
        }
        if(isValidMove(board,this.loc_i,this.loc_j+1)){
            possible_moves.push({"i": this.loc_i, "j" : this.loc_j+1});
        }
        if(isValidMove(board,this.loc_i,this.loc_j-1)){
            possible_moves.push({"i": this.loc_i, "j" : this.loc_j-1});
        }
        let random_index = Math.floor(Math.random() * (possible_moves.length-0) + 0);
        return 	possible_moves[random_index];

    }

    interactWithPacman(pacman){
        this.yupieAudio.play();
        if(this.food != null){
            (this.food).interactWithPacman();
        }
        pacman.incrementScore(this.score);
        moving_score = null;
    }

}
