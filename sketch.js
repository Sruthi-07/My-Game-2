const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var target1, target2, target3;
var arrow, bow;
var backgroundImg,platform;
var gameState = "stop";
var score = 0;
var flag = 0;

function preload() {
    targetImg = loadImage("sprites/target.png");
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(600,height,1200,20);
    //platform = new Ground(150, 305, 300, 170);

    //target1 = new Target(1000, 80, 100, 100);
    //target2 = new Target(600, 150, 100, 100);
    //target3 = new Target(1100, 300, 100, 100);
    //target4 = new Target(850, 200, 100, 100);

    target1 = createSprite(1000, 80, 100, 100);
    target1.addImage(targetImg)
    target1.scale = 0.25;
    target2 = createSprite(600, 150, 100, 100);
    target2.addImage(targetImg)
    target2.scale = 0.25;
    target3 = createSprite(1100, 300, 100, 100);
    target3.addImage(targetImg)
    target3.scale = 0.25;
    target4 = createSprite(850, 200, 100, 100);
    target4.addImage(targetImg)
    target4.scale = 0.25;

    arrow = new Arrow(185, 200, 150, 75);
    bow = new Bow(185, 200, 150, 350);

    bowThread = new BowThread(arrow.body, {x:190, y:200});
}

function draw(){
    background("white");

    drawSprites();

    ground.display();

    arrow.display();
    bow.display();
    bowThread.display();
    
    textSize(20);
    fill("black");
    text("10", 1000, 80);
    text("20", 600, 150);
    text("40", 1100, 300);
    text("50", 850, 200);

    textSize(25);
    fill("black");
    text("Score"+score, 200, 100)

if(gameState === "play" && (flag === 0)){
    if(arrow.body.position.x > 550 && arrow.body.position.y < 200 && arrow.body.position.x < 650 && arrow.body.position.y > 100){
        Matter.Body.setStatic(arrow.body,true);
        console.log("inifcondition");
        flag = 1;
    }

    if(arrow.body.position.x > 800 && arrow.body.position.y < 250 && arrow.body.position.x < 900 && arrow.body.position.y > 150){
        Matter.Body.setStatic(arrow.body,true);
        console.log("inifcondition");
        flag = 2;
    }

    if(arrow.body.position.x > 950 && arrow.body.position.y < 130 && arrow.body.position.x < 1050 && arrow.body.position.y > 30){
        Matter.Body.setStatic(arrow.body,true);
        console.log("inifcondition");
        flag = 3;
    }

    if(arrow.body.position.x > 1050 && arrow.body.position.y < 350 && arrow.body.position.x < 1150 && arrow.body.position.y > 250){
        Matter.Body.setStatic(arrow.body,true);
        console.log("inifcondition");
        flag = 4;
    }
}
else{
    Matter.Body.setStatic(arrow.body,false);
}
if(gameState === "play"){
    if(flag === 1){
        score = score+20;
        gameState = "stop";
    }
}
    console.log(flag);
    Engine.update(engine);
}

function mouseDragged(){
    Matter.Body.setPosition(arrow.body, {x: mouseX , y: mouseY});
    gameState = "play";
}

function mouseReleased(){
    bowThread.fly();
}

function keyPressed(){
    //if(keyCode === 32){
        //Matter.Body.setStatic(arrow.body,false);
        //Matter.Body.applyForce(arrow.body, arrow.body.position, {x:random(50, 200), y:random(-100,250)});
        //bowThread.attach(arrow.body);
    //}

    if(keyCode === 32){
        gameState = "play";
        bowThread.attach(arrow.body)
        Matter.Body.setPosition(arrow.body, {x:185, y:200});
        //Matter.Body.setStatic(arrow.body, true);
    }
}