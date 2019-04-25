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
            prompt: "Which of the following cities gets LESS annual rainfall than Seattle?",
            btnA: "New York",
            btnB: "Atlanta",
            btnC: "Chicago",
            btnD: "Boston",
            answer: "C",
            giphy: "https://giphy.com/embed/t7Qb8655Z1VfBGr5XB",
        },
        {
            prompt: "Seattle was the first city in the USA to play a song from this international band:",
            btnA: "The Beatles",
            btnB: "Arcade Fire",
            btnC: "Sum 41",
            btnD: "Hot Hot Heat",
            answer: "A",
            giphy: "https://giphy.com/embed/qPccfQiuQh0iI",
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
        {
            prompt: "The Great Seattle Fire of 1889 was caused by:",
            btnA: "A lightning strike ",
            btnB: "A serial arsenist",
            btnC: "A spilled pot of hot glue",
            btnD: "An earthquake",
            answer: "C",
            giphy: "https://giphy.com/embed/CcaHGIqjJnKxi",
        },
        {
            prompt: "The Boeing Company, a company founded in Seattle originially sold ______ before their success with Airplanes",
            btnA: "Bicycles",
            btnB: "Logging Equipment",
            btnC: "Farm Equiptment",
            btnD: "Boats",
            answer: "D", 
            giphy: "https://giphy.com/embed/QmH4MuISBE1dyPmTAy",
        },
        {
            prompt: "The first female Mayor (Bertha Landes) of any US City was elected in Seattle in what year?",
            btnA: "1926",
            btnB: "1902",
            btnC: "1944",
            btnD: "1983",
            answer: "A",
            giphy: "https://giphy.com/embed/3oKIPdQnwoQJilRHji",
        },
        
        {
            prompt: "Which post delivery commpany began in Seattle as the American Messenger Company",
            btnA: "DHL",
            btnB: "USPS",
            btnC: "Postmates",
            btnD: "UPS",
            answer: "D",
            giphy: "https://giphy.com/embed/Q80Dgh53HDlcZsRoYA",
        },
        {
            prompt: "Washington State has the highest per-capita reportings of _______",
            btnA: "Bomb Threats",
            btnB: "UFOs",
            btnC: "Sasquatch Sightings",
            btnD: "Identical Twins",
            answer: "B",
            giphy: "https://giphy.com/embedjGpocv0a1U7zbXQ4",
        },
    ];

    //http://mentalfloss.com/article/67858/25-things-you-should-know-about-seattle

    var init = function () {
        $('.startButton').removeClass('d-none');
        gamePlaying = false;
        $('.startPic').addClass('d-none');

        $('#questionDiv').addClass('d-none');
        $('.page1').addClass('d-none');
        $('.page2').addClass('d-none');
        $('.page3').addClass('d-none');


        $('#timerDiv').addClass('d-none');
        $('#timerA').addClass('d-none');
        $('#timerText').addClass('d-none');

        correct = 0;
        incorrect = 0;
        unanswered = 0;
        thirtySec = undefined;
        threeSec = undefined;
        timeLeftA = 30;
        timeLeftB = 3;
        currentQuestion = 0;

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
        
        if (currentQuestion == (questions.length)) {
            $('#correct').text("Correct Answers: " + correct);
            $('#incorrect').text("Incorrect Answers: " + incorrect);
            $('#unanswered').text("Unanswered Answers: " + (questions.length - (correct + incorrect)));

            $('.page3').removeClass('d-none');
            $('.page2').addClass('d-none').removeClass('d-flex');
            $('#final').removeClass('d-none');

        } else {
            btnQuestion("A");
            btnQuestion("B");
            btnQuestion("C");
            btnQuestion("D");

            $('#questionNum').text("Question #" + (currentQuestion + 1));
            $('.page1').removeClass('d-none');
            $('.page2').addClass('d-none').removeClass('d-flex');; 

            //change gifs
            $('.gif').attr("src", questions[currentQuestion].giphy);
            $('.gif').attr("href", questions[currentQuestion].giphy);
    
            timeLeftA = 30;
            thirtySec = setInterval(timerA, 1000);
        }

    };

    var postQuestion = function () {
        $('.page1').addClass('d-none');
        $('.page2').removeClass('d-none').addClass('d-flex');
        if (currentQuestion < questions.length) {
            currentQuestion++;
        }

        timeLeftB = 3;
        threeSec = setInterval(timerB, 1000);
    };


        //setInterval(timer, 3*1000);

     var timerA = function() {
        $('#timeout').addClass('d-none');

            if (timeLeftA >= 0) {
                $('#timerA').text(timeLeftA);
                timeLeftA--;
            } else {
                // $('#timerA').addClass('d-none');
                // $('#timerB').removeClass('d-none');
                $('#rightWrong').text('Looks like you ran out of time');
                $('#answer').text("The Correct Answer is: " + questions[currentQuestion]["btn" + questions[currentQuestion].answer]);

                clearInterval(thirtySec);

                postQuestion();
                return;
            }
        };
        var timerB = function() {
            if (timeLeftB >= 0) {
                // $('#timerB').text(timeLeftB);
                timeLeftB--;

            } else {
                // $('#timerB').addClass('d-none');
                // $('#timerA').removeClass('d-none');

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

                //display question & timer divs
                $('#questionDiv').removeClass('d-none');
                $('.page1').removeClass('d-none');
                $('#timerDiv').removeClass('d-none');
                $('#timerA').removeClass('d-none');
                $('#timerText').removeClass('d-none');

                //swap start button for seattle pic
                $('.startPic').removeClass('d-none');
                $('.startButton').addClass('d-none');


            } else if ($(this).hasClass('guess')) {

                var correctAns = questions[currentQuestion]["btn" + questions[currentQuestion].answer];
                $('.page1').addClass('d-none');
                $('.page2').removeClass('d-none').addClass('d-flex');
                $('#answer').text("The Correct Answer is: " + correctAns);
                // timeLeftA = 0;
                clearInterval(thirtySec);
                postQuestion();

                var solution = questions[currentQuestion - 1].answer;

                if ($(this)[0].value == solution) {
                    $('#rightWrong').html("<h3>You got it right!</h3>");
                    correct++;
                } else {
                    $('#rightWrong').html("<h3>Sorry, that was incorrect</h3>");
                    incorrect++;
                }

            } else {
                init();
                console.log('If you didn\'t click reset, something went wrong');
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