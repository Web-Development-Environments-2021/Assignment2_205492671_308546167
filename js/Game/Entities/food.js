class Food{
    constructor(board, color){
        let emptyCell = findRandomEmptyCell(board);
        let starti = emptyCell[0];
        let startj = emptyCell[1];        
        this.loc_i = starti;
        this.loc_j = startj;
        this.point_color = color;
        board[starti][startj] = this;
        this.score;
        this.radius;
    }

    get_score(){
        return this.score;
    }

    draw(context, scale){
        let center = {};
        center.x = this.loc_i * scale + scale/2;
        center.y = this.loc_j * scale + scale/2;
        context.beginPath();
        context.arc(center.x, center.y, this.radius, 0, 2 * Math.PI); // circle.. foddies
        context.fillStyle = this.point_color; //color
        context.fill();
    }

    interactWithPacman(pacman){
        pacman.incrementScore(this.score);
        foods.delete(this);

    }
}