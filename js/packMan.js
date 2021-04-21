class Packman{
    constructor(board, eyex, eyey, eyeR){
        let emptyCell = findRandomEmptyCell(board);
        let starti = emptyCell[0];
        let startj = emptyCell[1];        
        this.loc_i = starti;
        this.loc_j = startj;
        this.pac_color = "yellow";
        board[starti][startj] = 2;
        this.direction = 0;
        this.eyeLocx = eyex;
        this.eyeLocy = eyey;
        this.eyeRadius = eyeR;
        this.score = 0;
    }


    draw(context, center, scale){
        context.beginPath();
        //			circle_center_x, circle_center_y, raduis, staring_angle, ending_angle, 
        context.arc(center.x, center.y, scale/2, (0.15+0.5*this.direction) * Math.PI, (1.85+0.5*this.direction) * Math.PI); // half circle.. packman
        context.lineTo(center.x, center.y);
        context.fillStyle = this.pac_color; //color
        context.fill();
        context.beginPath();
        context.arc(center.x + this.eyeLocx, center.y + this.eyeLocy, this.eyeRadius, 0, 2 * Math.PI); // circle.. eye of packman
        context.fillStyle = "black"; //color
        context.fill();
    }

    moveChar(x, board){
        board[this.loc_i][this.loc_j] = 0;
        if (x == 1) {
            if (this.loc_j > 0 && board[this.loc_i][this.loc_j - 1] != 4) {
                this.loc_j--;
            }
            // twist packman
            this.direction = 3
            // twist packman
            this.eyeLocx = 3*scale/12;
            this.eyeLocy = -1*scale/12;
        }
        if (x == 2) {
            if (this.loc_j < boardColLength-1 && board[this.loc_i][this.loc_j + 1] != 4) {
                this.loc_j++;
            }
            // twist packman
            this.direction = 1
            // twist eyes
            this.eyeLocx = 3*scale/12;
            this.eyeLocy = scale/12;
        }
        if (x == 3) {
            if (this.loc_i > 0 && board[this.loc_i - 1][this.loc_j] != 4) {
                this.loc_i--; 
            }
            // twist packman
            this.direction = 2;
            // twist eyes
            this.eyeLocx = -1*scale/12;
            this.eyeLocy = -3*scale/12;
        }
        if (x == 4) {
            if (this.loc_i < boardRowLength-1 && board[this.loc_i + 1][this.loc_j] != 4) {
                this.loc_i++;
            }
            // twist packman
            this.direction = 0;	
            // twist eyes	
            this.eyeLocx = scale/12;
            this.eyeLocy = -3*scale/12;
        }
        if (board[this.loc_i][this.loc_j] == 1) {
            this.score++;
        }
        board[this.loc_i][this.loc_j] = 2;
    }
    
    get_i(){
        return this.loc_i;
    }
    get_j(){
        return this.loc_j;
    }
    get_Score(){
        return this.score;
    }
}