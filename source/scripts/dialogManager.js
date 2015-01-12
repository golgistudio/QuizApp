/**
 * Created by laurie on 1/11/2015.
 */

/*global $:false */
/*global dialog:false */

/**
 *
 * @param numRight
 * @param numQuestions
 */
function quizComplete(numRight, numQuestions) {
    "use strict";

    var innerHTML = "You answered " + numRight + " questions out of " + numQuestions + " correctly";

    var quizCompleteSelector = $("#quizComplete");
    quizCompleteSelector.dialog( "option", "title", 'Quiz Complete' );
    quizCompleteSelector.dialog("open");
    quizCompleteSelector.html(innerHTML);
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
        var numRight = quizTracker.numRight();
        var numQuestions = quizTracker.numQuestions();
        quizComplete(numRight, numQuestions);
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

    if (isCorrect) {
        titleText = "Correct" ;
    } else {
        titleText = "Incorrect";
    }

    var resultsSelector = $("#results");

    resultsSelector.dialog( "option", "title", titleText );
    var titleBarSelector = $(".ui-dialog-titlebar");
    if (isCorrect) {

        /*    Setting the class is working, but the style is not applied
        if (titleBarSelector.hasClass(".ui-incorrect")) {
            titleBarSelector.toggleClass(".ui-incorrect");
        }

        titleBarSelector.toggleClass(".ui-correct");
        */

        titleBarSelector.css('background', "green");
    } else {

        /*    Setting the class is working, but the style is not applied
        if (titleBarSelector.hasClass(".ui-correct")) {
            titleBarSelector.toggleClass(".ui-correct");
        }

        titleBarSelector.toggleClass(".ui-incorrect");
         */
        titleBarSelector.css('background', "red");
    }
    resultsSelector.dialog("open");

    var innerHTML = "You answered... <br><br> " + answer;
    resultsSelector.html(innerHTML);

}

/**
 *
 * @param waitTime
 * @param createClose
 * @param className
 * @returns {*|jQuery}
 */
function createDialog(waitTime, createClose, className) {
    "use strict";

    var selectorID = "#" + className;

    var statDialog = $(selectorID).dialog({
        resizable: false,
        autoOpen: false,
        show: "blind",
        hide: "blind",
        modal: true,
        title: "Quiz Stats",
        dialogClass: className,
        open: function (event, ui) {
            void(event);
            void (ui);
            setTimeout(function () {
                $(selectorID).dialog('close');
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
