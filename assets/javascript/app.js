/* giphy API documentation
//javascript, jQuery
var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
xhr.done(function(data) { console.log("success got data", data); });
 
API Key: 4J80i9OSkoZGm3lxqIXzE1rSwiOXkvAi

*/




$(document).ready(function () {
    var gamePlaying = false;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var thirtySec;
    var timeLeftA = 30;
    var currentQuestion = 0;



    var questions = [
        {
            prompt: "Seattle was the first city in the USA to play a song from this band:",
            btnA: "The Beatles",
            btnB: "Arcade Fire",
            btnC: "Sum 41",
            btnD: "Hot Hot Heat",
            answer: "A",
            giphy: "https://giphy.com/embed/qPccfQiuQh0iI",
        },
        {
            prompt: "The Boeing Company, a company founded in Seattle originially sold ______ before their success with Airplanes",
            btnA: "Bicycles",
            btnB: "Logging Equipment",
            btnC: "Farm Equiptment",
            btnD: "Boats",
            answer: "D",
            giphy: "https://giphy.com/embed/6cwsBwMqdkcEM",

        },
        {
            prompt: "The ______ Party was a group of American Pioneers credited with founding Seattle in 1851",
            btnA: "Attle",
            btnB: "Denny",
            btnC: "Vancouver",
            btnD: "Smith",
            answer: "B",
            giphy: "https://giphy.com/embed/3o6MblOBQL8qRO4NGM",

        },

    ];

    var init = function () {
        $('.startButton').removeClass('d-none');
        gamePlaying = false;
    };

    var startGame = function () {
        gamePlaying = true;
        currentQuestion = 0;
        $('.startButton').addClass('d-none');

    };

    var btnQuestion = function (letter) {
        $('#btn' + letter).html(questions[currentQuestion]["btn" + letter]);
        $('#prompt').html(questions[currentQuestion].prompt);
    };

    var nextQuestion = function () {
        if (currentQuestion < questions.length) {

            btnQuestion("A");
            btnQuestion("B");
            btnQuestion("C");
            btnQuestion("D");

            timeLeftA = 10;
            thirtySec = setInterval(timerA, 1000);

            $('.page1').removeClass('d-none');
            $('.page2').addClass('d-none');
            $('#timeout').addClass('d-none');
            $('.giphy').attr("src", "#")


        } else {
            //summary page
            console.log(correct, incorrect, unanswered);
        }

    };

    var postQuestion = function () {
        // timeLeftB = 3;
        // threeSec = setInterval(timerB, 1000);

        $('.page1').addClass('d-none');
        $('.page2').removeClass('d-none');
        $('#timerA').removeClass('d-none');

        currentQuestion++;
        setTimeout(nextQuestion, 3*1000)



    };

    var timerA = function () {
        if (timeLeftA > 0) {
            $('#timerA').text(timeLeftA);
            timeLeftA--;
        } else if (timeLeftA == 0) {
            timeLeftA--;
            $('#timerA').addClass('d-none');
            $('#timerB').removeClass('d-none');

            clearInterval(thirtySec);

            postQuestion();

            unanswered++;
        } else {    
            
            $('#timeout').removeClass('d-none');

            return;
        }
    };
   /*  var timerB = function () {
        if (timeLeftB >= 0) {
            $('#timerB').text(timeLeftB);
            timeLeftB--;
        } else {
            $('#timerB').addClass('d-none');

            clearInterval(threeSec);

            return;
        }
    }; */

    //Start button to call the start function
    //init --> display start button, reset all values
    //on click START--> hide start button & nextQuestion function
    $('button').on("click", function () {
        if ($(this).hasClass('startButton')) {
            startGame();
            nextQuestion();
            $('.page1').removeClass('d-none');
            $('#timerA').removeClass('d-none');
            $('#timerText').removeClass('d-none');



        } else if ($(this).hasClass('guess')) {
            $('.giphy').attr("src", questions[currentQuestion].giphy);


            $('.page1').addClass('d-none');
            $('.page2').removeClass('d-none');


            timeLeftA = 0;

            var solution = questions[currentQuestion].answer;

            if ($(this)[0].value == solution) {
                $('#answer').text("You got it right!");
                correct++;
            } else {
                $('#answer').text("Oops, the correct answer was " + questions[currentQuestion]["btn" + solution]);
                incorrect++;
            }

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