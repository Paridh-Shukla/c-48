var canvas;
var shooter,shooterImg1,shooterImg2,shooterImg3,bgImg;
var zombiesGroup, zombie1, zombie2, zombie3;
var bulletGroup,bulletImg;
var bg,score;
var gunshot, zombieSound, gameOver;
var gameState="play";

function preload(){
shooterImg1 = loadImage("Shooter1.png.png");
shooterImg2 = loadImage("Shooter2.png.png");
shooterImg3 = loadImage("shooter3.png");
bgImg = loadImage("newbg.webp");
zombie1 = loadImage("zombie1.png");
zombie2 = loadImage("zombie2.png");
zombie3 = loadImage("zombie3.png");
bulletImg = loadImage("bullet.png");
//resetImg = loadImage("resetImg.png");
gunshot = loadSound("gunshot.mp3");
zombieSound = loadSound("Zombie.mp3");
gameOver = loadSound("gameOver.wav");
}

function setup(){
    canvas = createCanvas(displayWidth-20,displayHeight-30);
    
    /*bg = createSprite(0,0,windowWidth,windowHeight)
    bg.debug=true;
    bg.addImage(bgImg)
    bg.scale = 1;
*/
    shooter = createSprite(100,340,20,20);
    shooter.addImage("standing",shooterImg1);
    shooter.addImage("shooting",shooterImg2);
    shooter.addImage("dead",shooterImg3);
    shooter.scale = 1;
    shooter.debug = false;

   //reset = createSprite(700,300,20,20);
    //reset.addImage(resetImg);
    //reset.scale=0.5;
    //reset.debug=true;

    zombiesGroup = createGroup();
    bulletGroup = createGroup();

    score = 0;
}

function draw() {

    background(0);
    image(bgImg,0,0,displayWidth,displayHeight)

    if(gameState=="play")
    {
      
      spawnZombies();
      if(keyWentDown("space")){
        shooter.changeImage("shooting",shooterImg2);
        gunshot.play();
        spawnBullets();
      }
      if(keyWentUp("space")){
        shooter.changeImage("standing",shooterImg1);
      }
      if(zombiesGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombiesGroup.length;i++){     
            
         if(zombiesGroup[i].isTouching(bulletGroup)){
              zombiesGroup[i].destroy()
              bulletGroup.destroyEach()
          zombieSound.play();
              } 
        score = score+1;
        
        }
      }
      if(keyDown("UP_ARROW")||touches.length>0){
        shooter.y = shooter.y-10
      }
      if(keyDown("DOWN_ARROW")||touches.length>0){
       shooter.y = shooter.y+10
      }
      if(keyDown("LEFT_ARROW")||touches.length>0){
        shooter.x = shooter.x-10
      }
      if(keyDown("RIGHT_ARROW")||touches.length>0){
       shooter.x = shooter.x+10
      }
      
      
    
      if(zombiesGroup.isTouching(shooter)){
          gameState="end"
         }
  }
    else if(gameState=="end")
    {
      gameOver.play();
      shooter.changeImage("dead",shooterImg3);
      zombiesGroup.destroyEach();    
      //zombiesGroup.velocityXEach(0); 
      zombiesGroup.setVelocityXEach(0);

     /* if(mousePressedOver(reset)) {
        restart();
      }*/
      textSize(32);
      stroke("yellow");
      fill("red");
      text("GAME OVER! Press R to Restart the Game!",400,300);

      if(keyDown("R"))
      {
        restart();
      }
    }
      textSize(30);
      fill("white");
      text("Score:"+ score, 1400,50);

     
  

   
    drawSprites();
}

function spawnZombies(){
    if (frameCount % 100 === 0){
     var zombie = createSprite(random(1500,1100),random(200,1000),40,40)
      zombie.velocityX = -3;
      
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: zombie.addImage(zombie1);
                 break;
         case 2: zombie.addImage(zombie2);
                 break;
         case 3: zombie.addImage(zombie3);
                 break;
         default: break;
       }
         
       zombie.scale = 0.5;
       zombie.lifetime = 1500;
      
       
       zombiesGroup.add(zombie);
    }
   }

function spawnBullets(){
    var bullet = createSprite(shooter.x,shooter.y,20,20);
    bullet.addImage(bulletImg);
    bullet.scale = 0.07;
    bullet.velocityX = 4;
    bulletGroup.add(bullet);
}

function restart(){
  gameState = "play";
  reset.visible = false;
  zombiesGroup.destroyEach();
  shooter.changeImage("standing",shooterImg1);
  
  score = 0;
}


  /*if (keyCode === UP_ARROW){
     shooter.velocityY=-2;
  }
 
  if (keyCode === DOWN_ARROW){
      shooter.velocityY=2;
    }
    if (keyCode === LEFT_ARROW){
      shooter.velocityX=-2;
    }
    if (keyCode === RIGHT_ARROW){
      shooter.velocityX=2;
    }
  }
  */
 
