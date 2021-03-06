class Ghost{
    constructor(board, img_path, starti, startj){
        this.loc_i = starti;
        this.loc_j = startj;
        this.ghost_img = new Image();
        this.ghost_img.src = img_path; 
        this.ghost_color = "blue";
        board[starti][startj] = this;
        this.food = null;
    }


    draw(context, scale){
        context.drawImage(this.ghost_img, this.loc_i*scale, this.loc_j*scale,scale, scale);

    }

    moveChar(pac_i, pac_j, board){  
        let best_move = this.pickBestMove(board, pac_i, pac_j);

        if (this.food != null)
            board[this.loc_i][this.loc_j] = this.food;
        else
            board[this.loc_i][this.loc_j] = 0;
        this.food = null;
        this.loc_i = best_move.i;
        this.loc_j = best_move.j;
        if (board[this.loc_i][this.loc_j] instanceof Food)
            this.food =  board[this.loc_i][this.loc_j];
        else if (board[this.loc_i][this.loc_j] instanceof Packman)
            board[this.loc_i][this.loc_j].hurt();
        board[this.loc_i][this.loc_j] = this;
    }

    get_img(){
        return this.ghost_img;
    }

    pickBestMove(board, pac_i, pac_j){
        let best_move = {"i": this.loc_i, "j" : this.loc_j, "distance": 1000};
        let man_dis;
        if(isValidMove(board,this.loc_i+1,this.loc_j)){
            man_dis = Math.abs(this.loc_i+1-pac_i)+Math.abs(this.loc_j-pac_j);
            if (man_dis<best_move.distance)
                best_move = {"i": this.loc_i+1, "j" : this.loc_j, "distance": man_dis};
        }
        if(isValidMove(board,this.loc_i-1,this.loc_j)){
            man_dis = Math.abs(this.loc_i-1-pac_i)+Math.abs(this.loc_j-pac_j)
            if (man_dis<best_move.distance)
                best_move = {"i": this.loc_i-1, "j" : this.loc_j, "distance": man_dis};
        }
        if(isValidMove(board,this.loc_i,this.loc_j+1)){
            man_dis = Math.abs(this.loc_i-pac_i)+Math.abs(this.loc_j+1-pac_j);
            if (man_dis<best_move.distance)
                best_move = {"i": this.loc_i, "j" : this.loc_j+1, "distance": man_dis};
        }
        if(isValidMove(board,this.loc_i,this.loc_j-1)){
            man_dis = Math.abs(this.loc_i+1-pac_i)+Math.abs(this.loc_j-1-pac_j);
            if (man_dis<best_move.distance)
                best_move = {"i": this.loc_i, "j" : this.loc_j-1, "distance": man_dis};
        }
        

    return best_move;
    }

    goToStart(starti, startj){
        if (this.food != null)
            board[this.loc_i][this.loc_j] = this.food;
        else
        board[this.loc_i][this.loc_j] = 0;
        this.loc_i = starti;
        this.loc_j = startj;
    }

    interactWithPacman(pacman){
        pacman.hurt();
    }



}