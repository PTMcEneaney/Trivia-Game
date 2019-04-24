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
    var thirtySec;
    var threeSec;
    var timeLeftA = 30;
    var timeLeftB = 3;
    var currentQuestion = 0;



   questions = [
        {
            prompt: "The ______ Party was a group of American Pioneers credited with founding Seattle in 1851",
            btnA: "Attle",
            btnB: "Denny",
            btnC: "Vancouver",
            btnD: "Smith",
            answer: "B",
        },
        {
            prompt: "The Boeing Company, a company founded in Seattle originially sold ______ before their success with Airplanes",
            btnA: "Bicycles",
            btnB: "Logging Equipment",
            btnC: "Farm Equiptment",
            btnD: "Boats",
            answer: "B",
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
        btnQuestion("A");
        btnQuestion("B");
        btnQuestion("C");
        btnQuestion("D");

        timeLeftA = 10;
        thirtySec = setInterval(timerA, 1000);

        $('.page1').removeClass('d-none');
        $('.page2').addClass('d-none'); 

    };

    var postQuestion = function () {

        timeLeftB = 3;
        threeSec = setInterval(timerB, 1000);

        $('.page1').addClass('d-none');
        $('.page2').removeClass('d-none');

        currentQuestion++;
        console.log(currentQuestion);


    };


        //setInterval(timer, 3*1000);

     var timerA = function() {
            if (timeLeftA >= 0) {
                $('#timerA').text(timeLeftA);
                timeLeftA--;
            } else {
                $('#timerA').addClass('d-none');
                $('#timerB').removeClass('d-none');

                clearInterval(thirtySec);

                postQuestion();
                console.log(currentQuestion);
                return;
            }
        };
        var timerB = function() {
            if (timeLeftB >= 0) {
                $('#timerB').text(timeLeftB);
                timeLeftB--;
            } else {
                $('#timerB').addClass('d-none');
                $('#timerA').removeClass('d-none');

                clearInterval(threeSec);
                nextQuestion();

                return;
            }
        };

        //Start button to call the start function
        //init --> display start button, reset all values
        //on click START--> hide start button & nextQuestion function
        $('button').on("click", function() {
            if ($(this).hasClass('startButton')) {
                startGame();
                nextQuestion();
                $('.page1').removeClass('d-none');
                $('#timerA').removeClass('d-none');
                $('#timerText').removeClass('d-none');



            } else if ($(this).hasClass('guess')) {
                $('.page1').addClass('d-none');
                $('.page2').removeClass('d-none');
                timeLeftA = 0;

                if ($(this)[0].value == questions[currentQuestion].answer) {
                    $('#answer').text("You got it right!");
                    correct++;
                } else {
                    $('#answer').text("Maybe the next question will be easier");
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