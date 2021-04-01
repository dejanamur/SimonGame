var userClickedPattern = [];
var gamePattern = [];
var buttonsColours = ["red", "blue", "green", "yellow"];
var level = 0;

$(document).one("keypress", function() {
  nextSequence();
});

$(".btn").click(function() {
  animatePress(this.id);
  handler(this.id);
  playSound(this.id);
  checkAnswer(userClickedPattern.length - 1);
});




function nextSequence() {
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);
  var randomChosenColour = buttonsColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour + "").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function handler(key) {
  var userChosenColour = key;
  userClickedPattern.push(userChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour + " ").addClass("pressed");
  setTimeout(function() {
    document.querySelector("." + currentColour + " ").classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel] && currentLevel >= 0) {
    console.log("Succes");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }

  } else {
   playSound("wrong");
   $("body").addClass("game-over");
   setTimeout(function() {
     document.querySelector("body").classList.remove("game-over");
   }, 200);
   $("#level-title").text("Game Over, pres Any Key to Restart.");
    console.log("wrong");
   startOver();
  }
}

function startOver(){
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  $(document).one("keypress", function() {
    nextSequence();
  });

}
