class GameBoard {
    constructor() {
      
    }

    static createBoard(){
        return GameBoard.buildFixedBoard();
    }

    static buildFixedBoard(){
        let board = [
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
            [4, 0, 4, 4, 0, 4, 0, 4, 0, 0, 0, 0, 4, 0, 4, 0, 4, 4, 0, 4], 
            [0, 0, 0, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 0, 0, 0],
            [0, 0, 0, 4, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 0],
            [4, 4, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 4, 4],
            [4, 0, 0, 0, 0, 4, 0, 0, 0, 4, 4, 0, 0, 0, 4, 0, 0, 0, 0, 4],
            [4, 0, 4, 4, 0, 4, 0, 4, 4, 4, 4, 4, 4, 0, 4, 0, 4, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
            [4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4, 0, 4, 4, 0, 4],
            [4, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
        ]
         return board = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
    }
    static findOpposite(currWall){
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
    
    static buildWalls(){
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
    
    
    static addWallsToArray(i, j, wallsList)
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
    

}
