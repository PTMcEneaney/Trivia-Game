/* giphy API documentation
//javascript, jQuery
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
xhr.done(function(data) { console.log("success got data", data); });
 
API Key: 4J80i9OSkoZGm3lxqIXzE1rSwiOXkvAi

*/




$(document).ready(function() {
var gamePlaying;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

var questions = [
    {
        prompt: "Testing",
        btnA: "one",
        btnB: "two",
        btnC: "three",
        btnD: "four",
        answer: "B",
    },
  /*   "1" = {

    },
    "2" =  */
];


var init = function() {
    $('.startButton').removeClass('d-none');
};

var startGame = function () {
    gamePlaying = true
    $('.startButton').addClass('d-none');
}

var currentQuestion = 0;
var nextQuestion = function (letter) {
    $('#btn' + letter).html(questions[currentQuestion]["btn" + letter]);
    $('#prompt').html(questions[currentQuestion].prompt);
};

setInterval(timer, 1000);

function timer() {
    
}


nextQuestion("A");
nextQuestion("B");
nextQuestion("C");
nextQuestion("D");
//Start button to call the start function
//init --> display start button, reset all values

//on click START--> hide start button & nextQuestion function
$('button').on("click", function(){
    if ($(this).hasClass('startButton')) {
        startGame();
        nextQuestion();
    } else if ($(this).hasClass('guess')) {
        $('.page1').addClass('d-none');
        $('.page2').removeClass('d-none');
        if ($(this)[0].value == questions[currentQuestion].answer) {
            correct++;
        } else {
            incorrect++;
        }

        console.log($(this)[0].value);
    } else {
        console.log('something went wrong');
    }
});

//nextQuestion function =  display title, timer, and question sections (with hover css)
//start timer at 30 seconds 

//on timer = 0 OR on click = GUESS ANSWER
// --> display correct/incorrect text
// currentquestion++
// display "the correct answer was ___" & gif of correct answer
//set timer for 3 seconds, then pull the next question












//win condition --> game playing = false
//create and display div with correct, incorrect, and unasnwered variables

init();

});