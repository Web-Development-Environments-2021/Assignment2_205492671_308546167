class HourGlassFood extends Food{
    constructor(board, img_path, bounsTime){
        super(board, null);
        this.hourGlassImg = new Image();
        this.hourGlassImg.src = img_path;
        this.bounsTime = bounsTime;
        this.yupieAudio = new Audio("./resources/songs/yupie.mp3");
    }

    draw(context, scale){
        context.drawImage(this.hourGlassImg, this.loc_i*scale, this.loc_j*scale,scale, scale);
    }

    interactWithPacman(pacman){
        this.yupieAudio.play();
        current_max_time += this.bounsTime;
        foods.delete(this);

    }

}