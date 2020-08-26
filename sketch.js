var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage,cloudGroup;
var obstacle,obstacleImage,obstacleGroup;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5;
var obstacle6;
var PLAY =1 ;
var END = 0;
var gamestate = PLAY;
var score = 0;
var restart,gameOver;
var restartImage,gameOverImage;

localStorage["highestScore"] = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png")

  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  restart = createSprite(300,120,20,20);
  restart.scale = 0.5;
  restart.addImage("restart1",restartImage);
  gameOver = createSprite(300,100,20,20);
  gameOver.scale = 0.5;
  gameOver.addImage("gameOver1",gameOverImage);
  restart.visible = false;
  gameOver.visible = false;
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("collided", trex_collided);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  obstacleGroup = createGroup();
  cloudGroup = createGroup();
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
}

function draw() {
  background(180);
    text("Score: "+ score, 450, 100);

  
  if(gamestate === PLAY)
  {
   ground.velocityX = -(6 + 3*score/100);
    //scoring
    score = score + Math.round(World.frameRate/60); 
  
    if(keyDown("space")) 
  {
    trex.velocityY = -10;
  }
    trex.velocityY = trex.velocityY + 0.8  
   if (ground.x < 0){
    ground.x = ground.width/2;
    }
    

  spawnClouds();
  spawnObstacles();
  if(obstacleGroup.isTouching(trex))
  {
  gamestate = END;
  
  }
    
  }    
  
  else if(gamestate === END) 
  {
    gameOver.visible = true;
    restart.visible = true;
   
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
   
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    }
  
  if(mousePressedOver(restart)) 
  {
    reset();
  }
  
    trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds()
{
 if(World.frameCount%60 === 0)
 {
   cloud = createSprite(600,120,20,20);
   cloud.y = Math.round(random(80,120));
   cloud.scale = 0.5;
   cloud.addImage("cloud",cloudImage);
   cloud.velocityX = -4;
   cloud.lifetime = 150;
   cloud.depth = trex.depth;
   trex.depth = trex.depth + 1;
   cloudGroup.add(cloud);
 
 }

}

function spawnObstacles()
{
 if(World.frameCount%80 === 0)
 {
   obstacle = createSprite(600,165,20,20);
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
   obstacle.scale = 0.5;
   obstacle.velocityX = -(4+3*score/100);
   obstacle.lifetime = 150;
   obstacleGroup.add(obstacle);
 
 }

}
function reset()
{
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["HighestScore"]<score)
  { 
    localStorage["HighestScore"] = score;
  } 
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}