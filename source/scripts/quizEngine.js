/** @module quiz engine */

/*global module:false */

/**
 *
 * @param quizDataParam
 * @constructor
 */
function QuizEngine (quizDataParam) {
    "use strict";

    var quizData = quizDataParam;
    var numQuestions = quizData.questions.length;
    /**
     *
     * @returns {*}
     */
    this.numQuestions = function () {
        "use strict";
        return(numQuestions);
    };

    /**
     *
     * @returns {statDialog.title|*|bridgeQuizTestData.title|herbQuiz.title|bridgeQuiz.title|string}
     */
    this.getTitle = function() {
        "use strict";
        return quizData.title;
    };

    /**
     *
     * @param index
     * @returns {*}
     */
    this.getQuestion = function(index) {
        "use strict";
        var question;
        if (index < numQuestions) {
            question = quizData.questions[index];
        }

        return question;
    };

    /**
     *
     * @returns {bridgeQuizTestData.answer|*|herbQuiz.answer|bridgeQuiz.answer|answer}
     */
    this.answer = function() {
        "use strict";
        return quizData.questions[index].answer;
    };

    /**
     *
     * @param index
     * @param answer
     * @returns {boolean}
     */
    this.isAnswerCorrect = function(index, answer) {
        "use strict";
        var correctAnswer = quizData.questions[index].answer;
        var isCorrect = false;
        if (answer === correctAnswer)  {
            isCorrect = true;
        }
        return isCorrect;
    };

    this.answerDescription = function(index, id) {

        var selectedChoiceDescription  = "";

        var choices = quizData.questions[index].choices;

        for (var i = 0 ; i < choices.length; i++) {

            var choice = choices[i];
            if (id === choice.id) {
                selectedChoiceDescription = choice.description;
                break;
            }
        }

        return   selectedChoiceDescription;
    };
}

// comment out when running tests from html page
module.exports =  QuizEngine;