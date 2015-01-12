/** @module quiz manager */

/*global QUIZ_CONFIG:false */
/*global QuizEngine:false */
/*global runDust:false */

/*global bridgeQuiz:false  */
/*global herbQuiz: false */

/*global console:false */
/*global amplify:false */
/*global alert:false */
/*global $:false */
/*global ready:false */

var quizEngine;
var quizTracker;
var quizClassName;

/**
 *
 * @param event
 */
function showNextQuestion(event) {
    "use strict";
    void (event);  // clear up unused variable warning

    var questionIndex = quizTracker.nextQuestion();

    if (questionIndex !== undefined) {
        showQuestionByIndex(questionIndex);
    }
}
/**
 *
 * @param event
 */
function showPrevQuestion(event) {
    "use strict";
    void (event);  // clear up unused variable warning

    var questionIndex = quizTracker.prevQuestion();

    if (questionIndex !== undefined) {
        showQuestionByIndex(questionIndex);
    }
}

/**
 *
 * @param index
 */
function showQuestionByIndex(index){
    "use strict";
    var currentQuestionData = quizEngine.getQuestion(index);
    clearQuestion();
    showQuestion(currentQuestionData, quizClassName);
    showChoices(currentQuestionData, quizClassName);

    // Event handler for choices
    $(".quizChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

    // Event handler for choices
    $(".imageChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

    quizTracker.currentQuestionID(currentQuestionData.answer);

    showSelectedProgressCircle(quizTracker.lastQuestionID(), currentQuestionData.answer);

}

/**
 *
 * @param event
 */
function choiceSelected(event) {
    "use strict";

    event.preventDefault();

    var  currentQuestionIndex = quizTracker.currentQuestionIndex();
    var  isCorrect = quizEngine.isAnswerCorrect(currentQuestionIndex, event.currentTarget.id);

    var selectedChoiceText = quizEngine.answerDescription(currentQuestionIndex, event.currentTarget.id);
    var answer = quizTracker.currentQuestionID();

    quizTracker.recordChoice(currentQuestionIndex,event.currentTarget.id, isCorrect );

    updateProgressCircle(answer, isCorrect, selectedChoiceText) ;

    showResult(isCorrect, selectedChoiceText);

}

/**
 *
 * @param id
 * @returns {QuizEngine}
 */
function initializeQuiz(id) {
    "use strict";

    var quizData;

    switch (id) {
        case "bridges":
            quizData = bridgeQuiz;
            quizClassName = "bridges";
            break;
        case "herbs":
            quizData = herbQuiz;
            quizClassName = "herbs";
            break;
    }
    $("body").toggleClass(quizClassName);
    var quiz = new QuizEngine(quizData);
    var title = quiz.getTitle();
    console.log(title);

    return quiz;
}

function initializeQuizTracker(quizEngine) {

    quizTracker = new QuizTracker();

    quizTracker.numQuestions(quizEngine.numQuestions());
    return quizTracker;
}

/**
 * Initialize the event handlers for previous/next buttons
 */

function initializeEventHandlers() {

    // Event handler for the previous buttons
    $("#prev").click(function (event) {
        event.preventDefault();
        showPrevQuestion(event);
    });

    // Event handler for the next buttons
    $("#next").click(function (event) {
        event.preventDefault();
        showNextQuestion(event);
    });
}


/**
 *  Main routine
 */
function main() {

    "use strict";

    initializeEventHandlers();

    $( document ).tooltip();

    var waitTime = 2000;
    createDialog(waitTime,  true, 'results');
    createDialog(waitTime,  false, 'quizComplete');

    // Retrieve the quiz id selected in the previous page
    var id = amplify.store(QUIZ_CONFIG.get("ID_STORE"));

    if (id === undefined) {
        alert("Unable to retrieve a quiz selection, defaulting to Bridge Quiz");
        id = "bridges";
    }

    // initialize the quiz for the selected quiz
    quizEngine = initializeQuiz(id);
    quizTracker = initializeQuizTracker(quizEngine);

    // set the caption for the quiz that is being played.
    $("#quizCaption").text(quizEngine.getTitle());

    // Add a progress circle for each question
    addProgressCircles(quizEngine.numQuestions());

    showQuestionByIndex(quizTracker.currentQuestionIndex());
}

/**
 *  Code that is executed when the page is ready
 *  All logic should be encapsulated in the main function
 */
$(document).ready(function () {
    "use strict";
    // Main function
    main();

});
