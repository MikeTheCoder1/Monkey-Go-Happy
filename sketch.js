
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var survivalTime=0; 
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-7;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  
  
}


function draw() {
background(180);
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100, 50);  
  
  monkey.velocityY=monkey.velocityY+1;
  monkey.collide(ground);
  if(keyDown("space")&&monkey.y>=310){
    monkey.velocityY=-20;
  }
  
  if (ground.x < 50){
      ground.x = ground.width/2;
    }
  
  if(obstacleGroup.isTouching(monkey))
  { 
    ground.velocityX = 0; 
    monkey.velocityY = 0; 
    obstacleGroup.setVelocityXEach(0); 
    foodGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.setLifetimeEach(-1); 
  }
  
  food();
  obstacle();
  drawSprites();
  
}



function food(){
   if (frameCount % 80 === 0){
        var banana = createSprite(600,165,10,40);
banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
     banana.velocityX=-7;
     banana.scale=0.1; 
     
     foodGroup.add(banana);
     
   }
}

function obstacle(){
   if (frameCount % 300 === 0){
        var obstacle = createSprite(400,330,20,20);
obstacle.velocityX=-7;
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
    obstacle.lifetime = 300;
     obstacleGroup.add(obstacle);
     
   }
}
