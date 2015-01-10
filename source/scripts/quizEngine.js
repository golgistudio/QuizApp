/** @module quiz engine */


/**
 *
 * @param quizDataParam
 * @constructor
 */
function QuizEngine (quizDataParam) {
    "use strict";

    var quizData = quizDataParam;
    var numQuestions = quizData.questions.length;

    this.numQuestions = function () {
        return(numQuestions);
    };

    this.getTitle = function() {
        return quizData.title;
    };

    this.getQuestion = function(index) {

        var question;
        if (index < numQuestions) {
            question = quizData.questions[index];
        }

        return question;
    };
}

// comment out when running tests from html page
module.exports =  QuizEngine;