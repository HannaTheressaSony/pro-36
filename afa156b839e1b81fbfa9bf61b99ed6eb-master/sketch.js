var dog,sadDog,happyDog;
var foodObj;
var database;
var foodS,foodStock;
var fedTime,lastFed,feed,addFood;
var Food;
function preload(){
  sadDog=loadImage("Images/Dog.png");
   happyDog=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1000,400);

foodObj = new Food();

foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

// function to display UI
function draw() {
  background(46,139,87);
 
  foodObj.display();



  fedTime = database.ref('FeedTime');
  fedTime.on("value",function (data){
lastFed = data.val();
  })

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}