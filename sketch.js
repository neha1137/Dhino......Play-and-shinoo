var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexJump,trexDie;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var bg;
var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var reset,resetImg;
var gameOver,gameOverImg;
var score;


function preload(){
  trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
  trex_collided = loadAnimation("trex_collided.png","trex_collided-1.png");
  
  groundImage = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  bg = loadImage("backgroundImg.png");
  trexJump=loadSound("jump.mp3");
  trexEnd=loadSound("die.mp3");
  resetImg=loadImage("restart.png");
  gameOverImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600, 200);
  
 
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
   trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.09;
  trex.debug=true;
  
  reset=createSprite(300,100,100,100)
  reset.addImage("restart",resetImg);
  reset.scale=0.5;
  reset.visible=false;
  
  gameOver=createSprite(300,75,100,100);
  gameOver.addImage("GameOver",gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  // create Obstacles and Cloud groups
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(bg);
  text("Score: "+ score, 350,50);
  
  
  if(gameState === PLAY){
    reset.visible=false;
    gameOver.visible=false;
    //move the ground
    ground.velocityX = -4;
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -13;
    trexJump.play();
  }
    trex.velocityY = trex.velocityY + 0.8;
    //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
    //adding score
    score = score + Math.round(setFrameRate()/60);
    if(obstaclesGroup.isTouching(trex)){
      gameState=END;
      trexEnd.play();
      
    }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    //stop the obstacles
    obstaclesGroup.setVelocityXEach(0);
    //stop the clouds
    cloudsGroup.setVelocityXEach(0);
    //change trex
    trex.changeAnimation("collided" ,trex_collided)
    reset.visible=true;
    if(mousePressedOver(reset)){
        resetGame();
      }
    gameOver.visible=true;
  }
  
  
  
    
  trex.collide(invisibleGround);

  drawSprites();
}

function resetGame(){
  score=0;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  gameState=PLAY;
}
function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    // //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //adding obstacles to the group
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
  }
  
}