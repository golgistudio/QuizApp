
/**
 *
 * @constructor
 */
function QuizTracker () {
    "use strict";

    var currentQuestionIndex_ = 0;
    var lastQuestionID_;

    var questionCount = 0;
    var currentQuestionID_;
    var answers_;
    var correctArray;

    /**
     *
     */
    function updateLastQuestionID() {
        "use strict";
        if (currentQuestionID_ !== undefined) {
            lastQuestionID_ = currentQuestionID_;
        }
    }

    /**
     * Public Methods
     *
     */

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
     * @param idValue
     * @returns {*}
     */
    this.currentQuestionID = function (idValue) {
        "use strict";

        if (idValue !== undefined) {
           updateLastQuestionID();
            currentQuestionID_ = idValue;
        }
        else {
            return(currentQuestionID_);
        }
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

        return currentQuestionIndex_ === (questionCount - 1);
    } ;
}

// comment out when running tests from html page
module.exports =  QuizTracker;
