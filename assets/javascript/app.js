
var questions = [{
    question: "How many planets are in our Solar System?",
    choices: ["Seven", "Eight", "Nine", "Ten"],
    correctAnswer: 1
}, {
    question: "Which NASA space flight was the last manned mission to the moon?",
    choices: ["Apollo 15", "Apollo 16", "Apollo 17", "Apollo 18"],
    correctAnswer: 2
}, {
    question: "What is the longest continuous time a human has spent in space?",
    choices: ["365 days", "437 days", "564 days", "739 days"],
    correctAnswer: 1
}, {
    question: "How many moons are in our Solar System?",
    choices: ["8 moons", "37 moons", "67 moons", "181 moons"],
    correctAnswer: 3
}, {
    question: "What percent of the universe is dark matter?",
    choices: ["27%", "45%", "73%", "98%"],
    correctAnswer: 0
}];

var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var noAnswers = -1;
var quizOver = false;
var number = 90;
var intervalId;

$(document).ready(function () {

    displayStartScreen();
    run();

    // On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () {

        // Display the first question
        $(document).find(".quizContainer > .question").show();
        $(document).find(".quizContainer > .choiceList").show();
        $(document).find(".nextButton").text("Next Question");

        if (!quizOver) {

            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                noAnswers++;
                currentQuestion++; // Since we have already displayed the first question on DOM ready

            } else if (value == questions[currentQuestion].correctAnswer) {
                correctAnswers++;
                currentQuestion++; // Since we have already displayed the first question on DOM ready

            } else {
                incorrectAnswers++;
                currentQuestion++;
            }

            if (currentQuestion < questions.length) {
                displayCurrentQuestion();
            } else {
                displayScore();
                stop();
                // Change the text in the next button to ask if user wants to play again
                $(document).find(".nextButton").text("Play Again?");
                quizOver = true;
           }

        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

});

// FUNCTIONS //

function displayStartScreen() {
    $(document).find(".question").hide();
    $(document).find(".choiceList").hide();
    currentQuestion = -1;
}

function run() {
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $(".timer").html(number + " seconds remaining");
    if (number === 0) {
        stop();
        displayScore();
        $(document).find(".nextButton").text("Play Again?");
        quizOver = true;
        alert("Time's Up!");
    }
}

function stop() {
    clearInterval(intervalId);
}

function displayCurrentQuestion() {

    console.log("In display current Question");

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    noAnswers = 0;
    number = 90;
    intervalId;
    run();
    hideScore();
}

function displayScore() {
    $(document).find(".quizContainer > .result").text("Answered Correctly: " + correctAnswers);
    $(document).find(".quizContainer > .incorrect").text("Answered Incorrectly: " + incorrectAnswers);
    $(document).find(".quizContainer > .unanswered").text("Unanswered: " + noAnswers);
    $(document).find(".quizContainer > .result").show();
    $(document).find(".quizContainer > .incorrect").show();
    $(document).find(".quizContainer > .unanswered").show();
}

function hideScore() {
    $(document).find(".result").hide();
    $(document).find(".incorrect").hide();
    $(document).find(".unanswered").hide();
}