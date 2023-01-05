// Button Colours
var buttonColours = ["red", "blue", "green", "yellow"];

// Game Button Colours inserted here
var gamePattern = [];

// User chosen button colours
var userClickedPattern = [];

// keeps track of when games started
var started = false;

var level = 0;

// starts game, changes to level 0
$(document).keydown(function() {
    
    // if user presses key started = false
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// User clicked
$(".btn").click(function() {
    
    // stores what the user clicked
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    //plays sound that user clicked
    playSound(userChosenColour);

    // animates the button
    animatePress(userChosenColour);

    // last users index of answers
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
        }, 1000);
     }
    
    }
    else {
        console.log("wrong");
        
        // plays wrong sound when user has wrong sequence
        playSound("wrong");

        // adds and removes class "game-over" class when sequence is wrong
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // wrong sequence changes title
        $("#level-title").text("Game Over, Press Any Key to Restart");

        // calls function when sequence is wrong
        startOver();
    }
}

// Randomises the colour
function nextSequence () {
    
    userClickedPattern = [];
    
    // adds level number everytime function is called
    level++;

     // changes the title everytime function is called
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // animation to fade in and out on colour chosen
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // plays audio depending on colour chosen
    playSound(randomChosenColour);


}

function playSound (name) {
    
    // plays sound depending on name given in function
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress (currentColour) {
    
    // pressed animation activated on button
    $("#" + currentColour).addClass("pressed");

    // removes animation after 100 milliseconds
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
    
}

// function resets game state
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
