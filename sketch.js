var space,booster,rocket,meteoroid;
var pointCollection=0;
var boosterCollection=0;
var meteoroidG,boosterG;

var PLAY=1;
var END=0;
var gamestate=1;

function preload(){
spaceImg=loadImage("space.jpg");
rocketImg=loadImage("rocket-ship.webp");
meteoroidImg=loadImage("Meteoroid.webp");
boosterImg=loadImage("Booster.jpg")
endImg=loadImage("gameover.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);

space=createSprite(width/2,200);
space.addImage(spaceImg);
space.scale=1.25
space.velocityY = 4;

rocket = createSprite(width/2,height-20,20,20);
rocket.addAnimation("rocketflying",rocketImg);
rocket.scale=0.08;

gameOver=createSprite(width/2, height/2);
gameOver.addImage(endImg);
gameOver.visible=false;

meteoroidG=new Group();
boosterG=new Group();

}

function draw() {
    if(gamestate==PLAY){
        background(0);
        rocket.x=World.mouseX;

        edges=createEdgeSprites();
        rocket.collide(edges);

        if(space.y > height ){
            space.y = height/2;
          }
          createBooster();
          createMeteoroid();
         if (boosterG.isTouching(rocket)) {
            boosterG.destroyEach();
            pointCollection=pointCollection + 50;
          }
          if(meteoroidG.isTouching(rocket)) {
                gamestate=END;        
         
           }
                
        
}
else if(gamestate==END){
  boosterG.destroyEach();
  meteoroidG.destroyEach();
  gameOver.visible=true;
  space.velocityY=0;
  rocket.visible=false;
}
        drawSprites()
        textSize(20);
        fill(255);
        text("Booster: "+ pointCollection,width-150,30);
        }

        function createBooster() {
            if (World.frameCount % 200 == 0) {
             booster = createSprite(Math.round(random(50, width-50),40, 10, 10));
            booster.addImage(boosterImg);
            booster.scale=0.12;
            booster.velocityY = 5;
            booster.lifetime = 200;
            boosterG.add(booster);
            }
          }
          
          function createMeteoroid() {
            if (World.frameCount % 320 == 0) {
             meteorid = createSprite(Math.round(random(50, width-50),40, 10, 10));
             meteorid.addImage(meteoroidImg);
             meteorid.scale=0.03;
             meteorid.velocityY = 5;
             meteorid.lifetime = 200;
             meteoroidG.add(meteorid);
          }
          }
         