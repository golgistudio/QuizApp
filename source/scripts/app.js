/** @module main application */

/*global CONFIG:false  */
/*global amplify: false */
/*global runDust:false */
/*global availableQuizzes:false */

/**
 * Launch the quiz based in the id of the quiz selected
 * id should be defined in the availableQuizzes data and
 * set on the [start quiz] button in the quizTemplate defined in
 * the index.html file
 * @param event
 */
function startQuiz(event) {
    "use strict";

    event.preventDefault();

    // Store the quiz id
    amplify.store(QUIZ_CONFIG.get("ID_STORE"), event.currentTarget.id);

    //load the quiz page
    window.location.replace(QUIZ_CONFIG.get('QUIZ_HTML'));
}

/**
 * renderer for the compiled dust template
 * @param {string} out - appends the html
 * */
function renderAvailableQuizzes(out) {
    "use strict";
    $("#quizSelection").html(out);
}

/**
 * Using dust display the available quizxes
 *
 * */
function displayAvailableQuizzes() {
    "use strict";

    var templateName = "title";  // name that dust uses to store the compiled template

    // Get the quiz div
    var source = $(QUIZ_CONFIG.get("AVAILABLE_QUIZZES_TEMPLATE")).html();

    // update the template
    runDust(source, templateName, renderAvailableQuizzes, availableQuizzes);
}

/**
 * Main routine called when the page is ready
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

/**
 * Launch code - encapsulate all code in the main function
 */
$(document).ready(function () {
    "use strict";
    // Main function
    main();
});
