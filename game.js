var level =0;

//This array will serve to hold the pattern realized by the player, then we will compare this one with the randomly generated
var userClickedPattern = [];

var isStarted = false;

//This array will serve to store the new pattern created with the help of the randomNumber and random color function
//It will hold the pattern that the user will have to redo
var gamePattern = [];


//The array that will contains each colour of the simon game
var arrayOfColours = ["red","blue","green","yellow"];

//Start the game when a key  is pressed
$(document).keypress(function(){

  //If the game is not started then we call the function
  if(isStarted==false){
    isStarted = true;
    nextSequence();
  }

})

$(".btn").click(userClick);



//Method used to create a pattern to the game, we randomly generate a number that will select a color then, we will show each color chosed to the user by giving an effect
function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = arrayOfColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);
    level++;
    $("h1").html("level: "+level);
  }

  //This method will indentify which button has been pressed, and then in function of the button pressed, will display the song of the button
function userClick(){
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  animatePress(userChosenColour);
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  //Here we pass as an index the index of the last color that the user pressed
  checkAnswer(userClickedPattern.length-1);
  
  }

  //We simply retrieve the audio files and then instantiate an audio object in order to display a song 
  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  }

  //Just a method to add a little animation to button pressed, we reach it then add a class and remove it 100 ms after to give an impression of moving
  function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100);
  }

  //Compare the two array, the gamePattern and the userClickedPattern in order to check if they are the same
  function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]) {
      console.log("success");
    
      if(gamePattern.length == userClickedPattern.length){
        setTimeout(nextSequence,1000);
        userClickedPattern = [];
      }
    }
    else{
      var gameOver = new Audio("sounds/wrong.mp3");
      gameOver.play();
      $("body").addClass("game-over");
      setTimeout(function(){$("body").removeClass("game-over")},200);
      $("h1").html("Game over, press a key to restart the game!");
      startOver();
      console.log("wrong");
    }


  }

  //Reset the game when called in the else statement of checkAnswer
  function startOver(){
    level =0;
    gamePattern = [];
    userClickedPattern=[];
    isStarted = false;
  }
