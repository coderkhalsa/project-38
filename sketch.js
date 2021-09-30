var player 
var panimation
var ground , groundImg ,inGr
var obImg, obsGroup,gameState = "play"
var submit,ans,quest,qnum, gameOver,retry,gaimg,reimg,thinkingImg
var coin,coinGroup,coinImg
var jump,take,touch,over
var score = 0
var time  = 350

function preload(){
panimation = loadAnimation("i/frame_00_delay-0.04s.gif","i/frame_01_delay-0.04s.gif","i/frame_02_delay-0.04s.gif","i/frame_03_delay-0.04s.gif","i/frame_04_delay-0.04s.gif","i/frame_05_delay-0.04s.gif","i/frame_06_delay-0.04s.gif","i/frame_07_delay-0.04s.gif","i/frame_08_delay-0.04s.gif","i/frame_09_delay-0.04s.gif","i/frame_10_delay-0.04s.gif","i/frame_11_delay-0.04s.gif")
groundImg = loadImage("i/realGround.png")
obImg = loadImage("i/ob1.png")
reimg = loadImage("restart.png")
gaimg = loadImage("gameOver.png")
thinkingImg = loadImage("thinkingMario.png")
coinImg = loadImage("coins image.jpg")
jump = loadSound("sounds/jumping.wav")
touch = loadSound("sounds/touching_obstacle.wav")
take = loadSound("sounds/taking_coins.wav")
over = loadSound("sounds/game_over.wav")

}

function setup() {
  createCanvas(displayWidth -50 , displayHeight - 150);
 player =  createSprite(100, displayHeight-650, 50, 50);
 player.addAnimation("mario",panimation)
 player.addAnimation("Thinkin Mark",thinkingImg) 
 player.scale = 0.2
 ground = createSprite(displayWidth/2, displayHeight-200, 50, 50);
ground.addImage("ground",groundImg)
ground.x  = ground.width/6
ground.scale = 4.5
ground.velocityX = -4
inGr = createSprite(100, displayHeight-500, 400, 50);
inGr.visible = false

retry = createSprite(displayWidth/2,displayHeight/2-150,50,50)
retry.addImage("retry",reimg)
retry.scale = 0.3
gameOver = createSprite(displayWidth/2,displayHeight/2-350,50,50)
gameOver.scale = 0.8
gameOver.addImage("GAME OVER",gaimg)
obsGroup = new Group()
coinGroup = new Group()
quest = createElement("h2")
ans = createInput("YOUR ANSWER")
submit = createButton("DONE")
quest.hide()
  ans.hide()
  submit.hide()
  retry.visible = false;
  gameOver.visible = false

}

function draw() {
  background(0); 
  //console.log(data)
 textSize(40)
 fill("blue")
 stroke("white")
  text("SCORE = "+score,200,200)
  if (gameState === "play"){

    ground.velocityX = -4
  if(ground.x<200){
    ground.x  = ground.width/2
  } 
  if(keyDown("space")){
    jump.play()
    player.velocityY = -15
  }
  player.velocityY = player.velocityY +0.5
  
  problem()
  coins()
  
  for(var i = 0; i<coinGroup.length && coinGroup.length>0; i++ ){
  if(coinGroup[i].isTouching(player)){
    score = score+1
    take.play()
    coinGroup[i].destroy()
  }
}
  if(obsGroup.isTouching(player)){
    touch.play()
    gameState = "end"
  }
} else if(gameState=== "end"){
  ground.velocityX =0
  player.velocityY = 0 
  obsGroup.setVelocityXEach(0)
  coinGroup.setVelocityXEach(0)
qnum = Math.round(random(0,7))
 askRiddle(qnum)
 player.changeAnimation("Thinkin Mark",thinkingImg)
 submit.mousePressed(restart)
  
 
}
if(gameState ==="tryAgain"&& mousePressedOver(retry)){
  retry.visible = false;
  gameOver.visible = false
  player.changeAnimation("mario",panimation)
gameState = "play"
obsGroup.destroyEach()
coinGroup.destroyEach()
//ans.setAttribute("value", "your answer");
  quest.hide()
  ans.hide()
  submit.hide()
 

}
if(gameState === "riddle"){
  time  = time-0.6
  if(time<=0 ){
   // gameState = "end"
   restart()
time = 350
  }
  textSize(40)
fill("blue")
stroke("white")
text("Time Left = "+Math.round(time),200,100)
}                      
player.collide(inGr)
  drawSprites();
}

function problem(){
  if(World.frameCount %200 ===0){
    var obs = createSprite(displayWidth,displayHeight-570,10,10)
    obs.addImage("ob1",obImg)
    obs.velocityX = -4
    obsGroup.add(obs)
  }
}

function askRiddle(qnum){
gameState = "riddle"
 var que = data[qnum]
quest.position (200,200)
quest.html(que.Q)
ans = createInput("YOUR ANSWER")
ans.position(200,250)
coinGroup.destroyEach()
submit.position(200,300)
quest.show()
  ans.show()
  submit.show()


} 

function coins (){
  if(World.frameCount %150 ===0){
    var coin = createSprite(displayWidth,random(0,displayHeight/2) ,10,10)
    coin.addImage("coinsimg",coinImg)
    coin.velocityX = -4
    coin.scale =0.2
    coinGroup.add(coin)
  }
}

function restart(){
playerAns = ans.value()
var actualAns = data[qnum].A
if(playerAns === actualAns){
  obsGroup.destroyEach()
  coinGroup.destroyEach()
  gameState = "play"
  player.changeAnimation("mario",panimation)
  quest.hide()
  ans.hide()
  submit.hide()
 //ans.setAttribute("value", "your answer");
}else{
  over.play()
retry.visible = true;
gameOver.visible = true
gameState = "tryAgain" 
}
}
