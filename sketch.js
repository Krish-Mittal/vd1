//Create variables here
var hd,d,foodStock,foodS,database;

function preload()
{
  //load images here
   hd= loadImage("d.png");
   d= loadImage("hd.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  console.log(database);
  dog = createSprite(200,200,20,20);
  dog.addImage(hd);
  dog.scale = 0.5;
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock); 
}


function draw() {  
  background(46,13,87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d);
  }

  drawSprites();

  textSize(13);
fill("black");
stroke("pink");
text("Note:Please Press the Up Arrow for feeding the dog ", 130,10,300,20);
text("Food remaining : "+foodS,100,50); 
}



//function to read the values from database
function readStock(data){
foodS = data.val();
}
function writeStock(x){
  if (x <= 0){
    x = 0;
   } else{
    x=x-1;
  }
 
 database.ref('/').update({
  Food:x
})
}