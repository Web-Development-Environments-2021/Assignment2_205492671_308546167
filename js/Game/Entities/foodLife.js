class FoodLife extends Food{
    constructor(board, img_path){
        super(board, null);
        this.foodLifeImg = new Image();
        this.foodLifeImg.src = img_path; 
        this.yupieAudio = new Audio("./resources/songs/yupie.mp3");
    }

    draw(context, scale){
        context.drawImage(this.foodLifeImg, this.loc_i*scale, this.loc_j*scale,scale, scale);
    }

    interactWithPacman(pacman){
        this.yupieAudio.play();
        pacman.incrementLife(1);
        foods.delete(this);

    }

}