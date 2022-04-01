const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var corda 
var cenoura
var cenouraIMG
var prender
var coelho
var muro
var coelhoA
var butom
var triste
var eat
let engine;
let world;
var ground;
var comendo
var musica
var tristesound
var cortarcorda
var comendosound
var ar
var cortandoFolhas
var parederight
var paredeleft
var corda2
var corda3
var butom2
var butom3

function preload(){
  cenouraIMG=loadImage("cenoura.png")
  coelho=loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  muro=loadImage("background.png")
  triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
  eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  musica=loadSound("sound1.mp3")
  tristesound=loadSound("sad.wav")
  comendosound=loadSound("eating_sound.mp3")
  ar=loadSound("air.wav")
  cortarcorda=loadSound("rope_cut.mp3")
  cortandoFolhas=loadSound("Cutting Through Foliage.mp3")
}

function setup() 
{
  createCanvas(500,700);
  frameRate(100);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  parederight= new Ground (500,350,20,800)
  paredeleft= new Ground (0,350,20,800)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  coelho.frameDelay=20
  triste.looping=false
  eat.looping=false
var cenoura_config={
density:0.0001
}
butom=createImg("cut_btn.png")
butom.size(100,100)
butom.position(100,0)
butom.mouseClicked(cortar)

butom=createImg("mute.png")
butom.size(50,50)
butom.position(50,0)
butom.mouseClicked(mutar)

butom=createImg("balloon.png")
butom.size(100,100)
butom.position(400,0)
butom.mouseClicked(vento)

butom2=createImg("cut_btn.png")
butom2.size(100,100)
butom2.position(200,0)
butom2.mouseClicked(cortar2)

butom3=createImg("cut_btn.png")
butom3.size(100,100)
butom3.position(300,0)
butom3.mouseClicked(cortar3)
  //  tamanho da corda
   corda=new rope(10,{x:200,y:0})
   corda2=new rope(10,{x:300,y:0})
   corda3=new rope(10,{x:400,y:0})
   fruta=Bodies.rectangle(200,400,60,60,cenoura_config)
   Matter.Composite.add(corda.body,fruta)
prender=new ligacao(corda,fruta)
prender2=new ligacao(corda2,fruta)
prender3=new ligacao(corda3,fruta)
eat.frameDelay=20
coelhoA=createSprite(400,630)
coelhoA.addAnimation("acao",coelho)
coelhoA.scale=0.2
triste.frameDelay = 20

musica.play()
musica.setVolume (0.2)
}


function draw() 
{
  
  background(muro);
  Engine.update(engine);
  corda.show()
  corda2.show()
  corda3.show()
  if(fruta!==null){
  push()
  imageMode(CENTER)
image(cenouraIMG,fruta.position.x,fruta.position.y,100,100)
pop()
  }
drawSprites()
   if(colision(fruta,coelhoA)==true){
     coelhoA.addAnimation ("comer",eat)
     coelhoA.changeAnimation("comer")
     comendosound.play()
   }
   if(colision(fruta,ground.body)==true){
    coelhoA.addAnimation ("triste",triste)
    coelhoA.changeAnimation("triste")
    tristesound.play()
  }
}

function cortar(){
  corda.break()
  prender.remove()
  prender=null
  cortarcorda.play()
}

function cortar2(){
  corda2.break()
  prender2.remove()
  prender2=null
  cortarcorda.play()
}

function cortar3(){
  corda3.break()
  prender3.remove()
  prender3=null
  cortarcorda.play()
}

function colision (cenoura,coelho){
  
  if (cenoura!==null){
    var distancia=dist (cenoura.position.x,cenoura.position.y,coelho.position.x,coelho.position.y)
    if (distancia < 80){
      World.remove(engine.world,fruta)
      fruta=null
      return true  
    }
else {return false}
  }
}

function mutar(){
  if (musica.isPlaying()){musica.stop()}
  else {musica.play()}
}

function vento (){
  Matter.Body.applyForce(fruta,{x:0,y:0},{x:-0.01,y:0})
  ar.play()
}