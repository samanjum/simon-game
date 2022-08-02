var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});




$(".btn").click(function() {
  var userchosencolor = $(this).attr("id");
  userClickedPattern.push(userchosencolor);
  playSound(userchosencolor);
  animatePress(userchosencolor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      },1000);
    }
  }
   else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any key to restrat");
    startover();
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);


  var randomnumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomnumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(userchosencolor);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3")
  audio.play();
}

function animatePress(currentcolor) {
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}


function startover(){
  level = 0;
  gamePattern = [];
  started = false;
};