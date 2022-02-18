var space,ship,astronaut,star,satelite,asteroid;
var spaceImg,shipImg,astronautImg,starImg,sateliteImg,asteroidImg, explosionImg;
var treasureCollection = 0;
var astronautG,starG,sateliteG,asteroidGroup;
var Kilometers = 0;


//GameStates (Estados del juego)
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  spaceImg = loadImage("space.png");
  shipImg = loadAnimation("ship.png");
  astronautImg = loadImage("astronaut.png");
  starImg = loadImage("star.png");
  sateliteImg = loadImage("satelite.png");
  asteroidImg = loadImage("asteroid.png");
  endImg =loadAnimation("gameOver.png");
  

}

function setup(){
  
//crear un canvas

// createCanvas(window,window);
createCanvas(windowWidth,windowHeight);
// createCanvas(width,height);
// createCanvas(200,200);

//Mover el fondo

space=createSprite(600, 600);
space.addImage(spaceImg);
space.velocityY = 4;
space.scale = 2;

//crear sprite ship (niño) corriendo
ship = createSprite(width/2,height-20,20,20);
ship.addAnimation("explosion",shipImg);
ship.scale=0.3;
  
  
astronautG=new Group();
starG=new Group();
sateliteG=new Group();
asteroidGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  ship.x = World.mouseX;
  ship.y = World.mouseY;
  
  edges= createEdgeSprites();
  ship.collide(edges);

  space.velocityY = +(3 + 3* Kilometers/100)
    //puntuación
    Kilometers = Kilometers + Math.round(getFrameRate()/60);
  
  //código para reiniciar el fondo

  // if(space.x > height ){
  //   space.x = height/2;
  // }

  // if(space.y > height ){
  //   space.x = height/2;
  // }

  // if(space.x > height ){
   //  space.y = height;
  // }

   if(space.y > height ){
     space.y = height/2;
   }
  
    createastronaut();
    createstar();
    createsatelite();
    createasteroid();

    if (astronautG.isTouching(ship)) {
      astronautG.destroyEach();
      treasureCollection=treasureCollection + 1;
    }
    else if (starG.isTouching(ship)) {
      starG.destroyEach();
      treasureCollection=treasureCollection + 5;
      
    }
    else{
      if(asteroidGroup.isTouching(ship)) {
        gameState=END;
        
        ship.addAnimation("explosion",endImg);
        ship.x=width/2;
        ship.y=height/2;
        ship.scale=0.4;
        
        astronautG.destroyEach();
        starG.destroyEach();
        sateliteG.destroyEach();
        asteroidGroup.destroyEach();
        
        astronautG.setVelocityYEach(0);
        starG.setVelocityYEach(0);
        sateliteG.setVelocityYEach(0);
        asteroidGroup.setVelocityYEach(0);
     
    }else if (sateliteG.isTouching(ship)) {
      gameState=END;
        
      ship.addAnimation("explosion",endImg);
      ship.x=width/2;
      ship.y=height/2;
      ship.scale=0.4;
      
      astronautG.destroyEach();
      starG.destroyEach();
      sateliteG.destroyEach();
      asteroidGroup.destroyEach();
      
      astronautG.setVelocityYEach(0);
      starG.setVelocityYEach(0);
      sateliteG.setVelocityYEach(0);
      asteroidGroup.setVelocityYEach(0);

    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Rescued Astronauts: "+ treasureCollection,width-250,30);
  text("Score: " + Kilometers, width-250, 55);
}

}

function createastronaut() {
  if (World.frameCount % 100 == 0) {
  var astronaut = createSprite(Math.round(random(50, width-50),40, 10, 10));
  astronaut.addImage(astronautImg);
  astronaut.scale=0.3;
  astronaut.velocityY = 7;
  astronaut.lifetime = 200;
  astronautG.add(astronaut);
  }
}

function createstar() {
  if (World.frameCount % 200 == 0) {
  var star = createSprite(Math.round(random(50, width-50),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.08;
  star.velocityY =7;
  star.lifetime = 200;
  starG.add(star);
}
}

function createsatelite() {
  if (World.frameCount % 300 == 0) {
  var satelite = createSprite(Math.round(random(50, width-50),40, 10, 10));
  satelite.addImage(sateliteImg);
  satelite.scale=0.17;
  satelite.velocityY = 9;
  satelite.lifetime = 200;
  sateliteG.add(satelite);
  }
}

function createasteroid(){
  if (World.frameCount % 150 == 0) {
  var asteroid = createSprite(Math.round(random(50, width-50),40, 10, 10));
  asteroid.addImage(asteroidImg);
  asteroid.scale=0.25;
  asteroid.velocityY = 9;
  asteroid.lifetime = 200;
  asteroidGroup.add(asteroid);
  }
}
