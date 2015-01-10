/** @module main application */

/*global CONFIG:false  */
/*global amplify: false */
/*global runDust:false */
/*global availableQuizzes:false */



/** Start the quiz */
function startQuiz(event) {
    "use strict";

    event.preventDefault();

    // Store the quiz id
    amplify.store(CONFIG.get("ID_STORE"), event.currentTarget.id);

    //load the quiz page
    window.location.replace("quiz.html");

}

/**
 * renderer for the compiled dust template
 * @param {string} out - appends the html
 * */
function renderAvailableQuizzes(out) {
    "use strict";
    $("#quizSelection").html(out);
}

/** Using dust display the available quizxes  */
function displayAvailableQuizzes() {
    "use strict";

    var templateName = "title";  // name that dust uses to store the compiled template

    // Get the quiz div
    var source = $(CONFIG.get("AVAILABLE_QUIZZES_TEMPLATE")).html();

    // update the template
    runDust(source, templateName, renderAvailableQuizzes, availableQuizzes);
}

/**
Main routine called at runtime
 */
function main() {

    "use strict";

    // using a template, display the available quizzes
    displayAvailableQuizzes();

    // Event handler for start quiz button
    $(".startQuiz").click(function (event) {
        event.preventDefault();
        startQuiz(event);
    });

}

$(document).ready(function () {
    "use strict";
    // Main function
    main();

});
