class Ghost{
    constructor(board, img_path, starti, startj){
        this.loc_i = starti;
        this.loc_j = startj;
        this.ghost_img = new Image();
        this.ghost_img.src = img_path; 
        this.ghost_color = "blue";
        board[starti][startj] = 3;
    }


    draw(context, scale){
        context.drawImage(this.ghost_img, this.loc_i*scale, this.loc_j*scale,scale, scale);

    }

    moveChar(pac_i, pac_j, board){  
        let best_move = {"i": 900, "j" : 1000, "dis": 1000};
        let man_dis;
        if (board[this.loc_i+1][this.loc_j] != 4){
            man_dis = Math.abs(this.loc_i+1-pac_i)+Math.abs(this.loc_j-pac_j);
            if (man_dis<best_move.dis)
                best_move = {"i": this.loc_i+1, "j" : this.loc_j, "dis": man_dis};
        }
        if (board[this.loc_i-1][this.loc_j] != 4){
            man_dis = Math.abs(this.loc_i-1-pac_i)+Math.abs(this.loc_j-pac_j)
            if (man_dis<best_move.dis)
                best_move = {"i": this.loc_i-1, "j" : this.loc_j, "dis": man_dis};
        }
        if (board[this.loc_i][this.loc_j+1] != 4){
            man_dis = Math.abs(this.loc_i-pac_i)+Math.abs(this.loc_j+1-pac_j);
            if (man_dis<best_move.dis)
                best_move = {"i": this.loc_i, "j" : this.loc_j+1, "dis": man_dis};
        }
        if (board[this.loc_i][this.loc_j-1] != 4){
            man_dis = Math.abs(this.loc_i+1-pac_i)+Math.abs(this.loc_j-1-pac_j);
            if (man_dis<best_move.dis)
                best_move = {"i": this.loc_i, "j" : this.loc_j-1, "dis": man_dis};
        }
        board[this.loc_i][this.loc_j] = 0;
        this.loc_i = best_move.i;
        this.loc_j = best_move.j;
        board[this.loc_i][this.loc_j] = 3;
    }

    get_img(){
        return this.ghost_img;
    }
}