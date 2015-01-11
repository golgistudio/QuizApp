/** @module quiz manager */

/*global QUIZ_CONFIG:false */
/*global QuizEngine:false */
/*global runDust:false */

/*global bridgeQuiz:false  */
/*global herbQuiz: false */

/*global console:false */
/*global amplify:false */
/*global alert:false */

var quizEngine;
var quizTracker;

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
            break;
        case "herbs":
            quizData = herbQuiz;
            break;
    }
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
 * @param currentQuestion
 */
function showQuestion(currentQuestion) {
    "use strict";

    var questionTemplateSource;
    var data;
    if (isStringEmptyOrNull(currentQuestion.image)) {
        // Get the quiz div
        questionTemplateSource = $("#questionTemplate").html();

        // update the template
        data = {
            "question": currentQuestion.question
        };

    } else {

        // Get the quiz div
        questionTemplateSource = $("#questionImageTemplate").html();

        // update the template
        data = {
            "image": currentQuestion.image,
            "question": currentQuestion.question
        };
    }
    runDust(questionTemplateSource, "question", renderQuestion, data);
}
/**
 *
 * @param currentQuestion
 */
function showChoices(currentQuestion){
    "use strict";

    var choiceTemplateSource;

    if (currentQuestion.choicesHaveImages)  {
        choiceTemplateSource = $("#choiceImageTemplate").html();
    }   else {
        choiceTemplateSource = $("#choiceTemplate").html();
    }
    runDust(choiceTemplateSource, "quizChoice", renderChoice, currentQuestion);
}
/**
 *
 * @param index
 */
function showQuestionByIndex(index){
    "use strict";
    var currentQuestionData = quizEngine.getQuestion(index);
    clearQuestion();
    showQuestion(currentQuestionData);
    showChoices(currentQuestionData);

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

    quizTracker.currentQuestionData(currentQuestionData);

    showSelectedProgressCircle(quizTracker.lastQuestionID(), currentQuestionData.answer);

}

/**
 *
 * @param out
 */
// renderer for the compiled dust template
function renderQuestion(out) {
    "use strict";
    $("#questionArea").html(out);
}

/**
 *
 * @param out
 */
// renderer for the compiled dust template
function renderChoice(out) {
    "use strict";
    $("#choiceArea").html(out);
}

/**
 *
 */
function clearQuestion() {
    "use strict";
    $("#questionArea").empty();
    $("#choiceArea").empty();
}

/**
 *
 * @param event
 */
function choiceSelected(event) {
    "use strict";

    event.preventDefault();

    var isCorrect = false;

    var  answer = quizTracker.answer();
    var  choices = quizTracker.choices();
    var  currentQuestionIndex = quizTracker.currentQuestionIndex();

    if (event.currentTarget.id === answer) {
        isCorrect = true;
    }


    var selectedChoiceText = "";

    for (var i = 0 ; i < choices.length; i++) {

        var choice = choices[i];
        if (event.currentTarget.id === choice.id) {
            selectedChoiceText = choice.description;
        }
    }

    quizTracker.recordChoice(currentQuestionIndex,event.currentTarget.id, isCorrect )

    updateProgressCircle(answer, isCorrect, selectedChoiceText) ;

    showResult(isCorrect, selectedChoiceText);

}



/**
 *
 * @param numRight
 * @param numQuestions
 */
function quizComplete(numRight, numQuestions) {
    "use strict";

    var numRight = quizTracker.numRight();
    var numQuestions = quizTracker.numQuestions();

    var innerHTML = "You answered " + numRight + " questions out of " + numQuestions + " correctly";
    var waitTime = 3000;
    var statDialog = createDialog(waitTime, "Quiz complete", false, 'quizComplete');
    statDialog.dialog("open");
    statDialog.html(innerHTML);
}

/**
 *
 * @param event
 * @param ui
 */
function onDialogClose(event, ui) {
    "use strict";
    void (event);  // clear up unused variable warning
    void(ui);  // clear up unused variable warning


    if (quizTracker.isQuizComplete())  {
        quizComplete();
    }   else {
        showNextQuestion(event);
    }
}

/**
 *
 * @param isCorrect
 * @param answer
 */
function showResult(isCorrect, answer) {
    "use strict";

    var titleText;
    var waitTime = 3000;

    if (isCorrect) {
        titleText = "Correct" ;
    } else {
        titleText = "Incorrect";
    }

    var statDialog = createDialog(waitTime,  titleText, true, 'results');
    if (isCorrect) {
        $('.ui-dialog-titlebar').css('background', "green");
    } else {
        $('.ui-dialog-titlebar').css('background', "red");
    }
    statDialog.dialog("open");

    var innerHTML = "You answered... <br><br> " + answer;
    statDialog.html(innerHTML);

}
/**
 *
 * @param waitTime
 * @param titleText
 * @param createClose
 * @param className
 * @param isCorrect
 * @returns {*|jQuery}
 */
function createDialog(waitTime,  titleText, createClose, className) {
    "use strict";
    var titleText;

    var selectorID = "#" + className;

    var statDialog = $(selectorID).dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: titleText,
        dialogClass: className,
        open: function (event, ui) {
           void(event);
            void (ui);
           setTimeout(function () {
                $('#results').dialog('close');
            }, waitTime);
       }
    });

    if (createClose) {
        statDialog.on("dialogclose",function( event, ui ) {
            onDialogClose(event, ui);
        } )
    }

    return statDialog;
}


/**
 *
 * @param previousQuestionId
 * @param questionID
 */
function showSelectedProgressCircle(previousQuestionId, questionID) {
    "use strict";

    var selectorText;

    if (previousQuestionId !== undefined) {

        selectorText = "#" + previousQuestionId + "progress";
        $(selectorText).toggleClass("selected");
    }

    selectorText = "#" + questionID + "progress";
    $(selectorText).toggleClass("selected");
}
/**
 *
 * @param questionID
 * @param isCorrect
 * @param selectedChoiceText
 */
function updateProgressCircle(questionID, isCorrect, selectedChoiceText) {
    "use strict";

    var className = "incorrect";
    if (isCorrect) {
        className = "correct";
    }

    var selectorText = "#" + questionID + "progress";

    $(selectorText).toggleClass(className);
    $(selectorText).attr("title", "You selected: " + selectedChoiceText);

}
/**
 *
 * @param numQuestions
 */
function addProgressCircles(numQuestions) {
    "use strict";

    for (var i = 0; i < numQuestions; i++) {
        var questionID = quizEngine.getQuestion(i).answer;
        $("#progress_circles").append("<li id = \"" + questionID + "progress\">&nbsp;</li>");
    }
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
