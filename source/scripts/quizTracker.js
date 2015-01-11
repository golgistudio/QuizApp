
/**
 *
 * @constructor
 */
function QuizTracker () {
    "use strict";

    var currentQuestionIndex_ = 0;
    var lastQuestionID_;

    var questionCount = 0;
    var currentQuestionData_;
    var answers_;
    var correctArray;

    /**
     *
     * @param numberOfQuestions
     * @returns {number}
     */
    this.numQuestions = function (numberOfQuestions) {
        "use strict";
        if (numberOfQuestions !== undefined) {
            questionCount = numberOfQuestions;
            answers_ =  new Array(questionCount) ;
            correctArray = new Array(questionCount);
        }
        else {
            return(questionCount);
        }
    };

    function updateLastQuestionID() {
        if (currentQuestionData_ !== undefined) {
            lastQuestionID_ = currentQuestionData_.answer;
        }
    } ;

    /**
     *
     * @returns {number}
     */
    this.currentQuestionIndex = function (questionIndex) {
        "use strict";
        if (questionIndex !== undefined) {
            currentQuestionIndex_ = questionIndex;
        }
        else {
            return(currentQuestionIndex_);
        }
    };

    /**
     *
     * @returns {undefined}
     */
    this.nextQuestion = function () {
        "use strict";

        var nextIndex = undefined;
        if (currentQuestionIndex_ <= (questionCount - 2)) {
            currentQuestionIndex_++;
            nextIndex = currentQuestionIndex_;
        }
        return nextIndex;
    };

    /**
     *
     * @returns {undefined}
     */
    this.prevQuestion = function() {
        "use strict";

        var prevIndex = undefined;

        if (currentQuestionIndex_ > 0 ) {
            currentQuestionIndex_--;
            prevIndex =   currentQuestionIndex_;
        }
        return prevIndex;
    };

    /**
     *
     * @param questionData
     * @returns {*}
     */
    this.currentQuestionData = function (questionData) {
        "use strict";

        if (questionData !== undefined) {
           updateLastQuestionID();
            currentQuestionData_ = questionData;
        }
        else {
            return(currentQuestionData_);
        }
    };

    /**
     *
     * @returns {bridgeQuizTestData.choices|*|herbQuiz.choices|bridgeQuiz.choices|choices}
     */
    this.choices = function () {
        "use strict";
        return currentQuestionData_.choices;
    }  ;

    this.answer = function() {
        "use strict";
        return currentQuestionData_.answer;
    };

    /**
     *
     * @param index
     * @param choiceID
     * @param isCorrect
     */
    this.recordChoice = function (index, choiceID, isCorrect) {
        "use strict";

        answers_[index] = choiceID;
        correctArray[index] = isCorrect;
    };

    this.lastQuestionID = function() {
        "use strict";

        return lastQuestionID_;

    }  ;

    this.numRight = function () {
        "use strict";

        var numCorrect = 0;

        for (var i = 0; i < questionCount; i++) {
            if (correctArray[i]) {
                numCorrect++;
            }
        }
        return numCorrect;
    } ;

    this.isQuizComplete = function () {

        if (currentQuestionIndex_ === (questionCount - 1) )    {
            return true;
        } else {
            return false;
        }
    } ;
}

// comment out when running tests from html page
module.exports =  QuizTracker;
