/** @module quiz manager */

/*global QUIZ_CONFIG:false */
/*global QuizEngine:false */
/*global runDust:false */

/*global bridgeQuiz:false  */
/*global herbQuiz: false */

/*global console:false */
/*global amplify:false */
/*global alert:false */

var currentQuestionIndex = 0;
var lastQuestionID;
var quizEngine;
var numQuestions = 0;
var currentQuestionData;
var answers;
var numRight = 0;


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

/**
 *
 * @param event
 */
function showNextQuestion(event) {
    "use strict";
    void (event);  // clear up unused variable warning

    if (currentQuestionIndex <= (numQuestions - 2)) {
        lastQuestionID = currentQuestionData.answer;
        currentQuestionIndex ++;
        showQuestionByIndex(currentQuestionIndex);
    }
}
/**
 *
 * @param event
 */
function showPrevQuestion(event) {
    "use strict";
    void (event);  // clear up unused variable warning
    if (currentQuestionIndex > 0 ) {
        lastQuestionID = currentQuestionData.answer;
        currentQuestionIndex--;
        showQuestionByIndex(currentQuestionIndex);
    }
}
/**
 *
 * @param stringToCheck
 * @returns {boolean}
 */
function isStringEmptyOrNull(stringToCheck) {
    "use strict";
    var isEmptyOrNull = true;

    if (stringToCheck !== undefined) {
        if (stringToCheck.trim().length > 0) {
            isEmptyOrNull = false;
        }
    }

    return isEmptyOrNull;
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
    currentQuestionData = quizEngine.getQuestion(index);
    clearQuestion();
    showQuestion(currentQuestionData);
    showChoices(currentQuestionData);

    // Event handler for start quiz button
    $(".quizChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

    // Event handler for start quiz button
    $(".imageChoiceControl").click(function (event) {
        event.preventDefault();
        choiceSelected(event);
    });

    showSelectedProgressCircle(lastQuestionID, currentQuestionData.answer);

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
    //event.currentTarget.id

    var isCorrect;

    if (event.currentTarget.id === currentQuestionData.answer) {
        isCorrect = true;

        numRight++;
    } else {

        isCorrect = false;
    }


    var selectedChoiceText = "";

    for (var i = 0 ; i < currentQuestionData.choices.length; i++) {

        var choice = currentQuestionData.choices[i];
        if (event.currentTarget.id === choice.id) {
            selectedChoiceText = choice.description;
        }
    }

    answers[currentQuestionIndex] = event.currentTarget.id;

    updateProgressCircle(currentQuestionData.answer, isCorrect, selectedChoiceText) ;

    lastQuestionID = currentQuestionData.answer;
    currentQuestionIndex ++;

    showResult(isCorrect, selectedChoiceText);

}

/**
 *
 * @param milliseconds
 */
function sleep(milliseconds) {
    "use strict";
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

/**
 *
 * @param numRight
 * @param numQuestions
 */
function quizComplete(numRight, numQuestions) {
    "use strict";
    var innerHTML = "You answered " + numRight + " questions out of " + numQuestions + " correctly";
    var waitTime = 3000;
    var statDialog = createDialog(waitTime, "Quiz complete");
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

    if (currentQuestionIndex === numQuestions)  {
        quizComplete(numRight, numQuestions);
    }   else {
        showQuestionByIndex(currentQuestionIndex) ;
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

    var innerHTML = "You answered... <br><br> " + answer;

    var statDialog = createDialogWithCloseEvent(waitTime, titleText);
    statDialog.dialog("open");
    statDialog.html(innerHTML);
}
/**
 *
 * @param waitTime
 * @param titleText
 * @returns {*|jQuery}
 */
function createDialogWithCloseEvent(waitTime, titleText) {
    "use strict";
    return $('#results').dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: titleText,
        dialogClass: 'results',
        open: function (event, ui) {
           void(event);
            void (ui);
           setTimeout(function () {
                $('#results').dialog('close');
            }, waitTime);
       },
       close: function( event, ui ) {
           onDialogClose(event, ui);
       }

    });


}
/**
 *
 * @param waitTime
 * @param titleText
 * @returns {*|jQuery}
 */
function createDialog(waitTime, titleText) {
    "use strict";
    return $('#quizComplete').dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: titleText,
        dialogClass: 'quizComplete',
        open: function (event, ui) {
            void (event);   // clear up unused variable warning
            void(ui);  // clear up unused variable warning
            setTimeout(function () {
                $('#quizComplete').dialog('close');
            }, waitTime);
        }
    });

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


//************************************
// Main routine called at runtime
//************************************
/**
 *
 */
function main() {

    "use strict";

    // Retrieve the quiz id selected in the previous page
    var id = amplify.store(QUIZ_CONFIG.get("ID_STORE"));

    if (id === undefined) {
        alert("Unable to retrieve a quiz selection, defaulting to Bridge Quiz");
        id = "bridges";
    }

    // initialize the quiz for the selected quiz
    quizEngine = initializeQuiz(id);

    $("#quizCaption").text(quizEngine.getTitle());

    numQuestions = quizEngine.numQuestions();

    answers = new Array(numQuestions);

    addProgressCircles(numQuestions);

    // Event handler for start quiz button
    $("#prev").click(function (event) {
        event.preventDefault();
        showPrevQuestion(event);
    });

    // Event handler for start quiz button
    $("#next").click(function (event) {
        event.preventDefault();
        showNextQuestion(event);
    });

    lastQuestionID = undefined;
    currentQuestionIndex = 0;

    showQuestionByIndex(0);
}

/**
 *
 */
$(document).ready(function () {
    "use strict";
    // Main function
    main();

});
