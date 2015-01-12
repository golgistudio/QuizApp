/**
 * Created by laurie on 1/11/2015.
 */


    /**
    *
    * @param currentQuestion
*/
function showQuestion(currentQuestion, quizClassName) {
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
    if (!($("#quizCard").hasClass(quizClassName))) {
        $("#quizCard").toggleClass(quizClassName);
    }
}
/**
 *
 * @param currentQuestion
 */
function showChoices(currentQuestion, quizClassName){
    "use strict";

    var choiceTemplateSource;

    if (currentQuestion.choicesHaveImages)  {
        choiceTemplateSource = $("#choiceImageTemplate").html();
    }   else {
        choiceTemplateSource = $("#choiceTemplate").html();
    }
    runDust(choiceTemplateSource, "quizChoice", renderChoice, currentQuestion);

    $(".quizChoiceControl").toggleClass(quizClassName);
}


/**
 *  renderer for the compiled dust template
 * @param out
 */
//
function renderQuestion(out) {
    "use strict";
    $("#questionArea").html(out);
}

/**
 * renderer for the compiled dust template
 * @param out
 */
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
