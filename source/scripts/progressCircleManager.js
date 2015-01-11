/**
 * Created by laurie on 1/11/2015.
 */


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