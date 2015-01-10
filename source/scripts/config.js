/** This file contains shared methods and variables */

/*global dust:false */

/**
 * QUIZ_CONFIG contains read only variables
 *
 * ID_STORE - Local storage id
 * AVAILABLE_QUIZZES_TEMPLATE: template name for displaying an available quiz
 */
var QUIZ_CONFIG = (function() {
    "use strict";
    var privateData = {
        'ID_STORE': "golgistudio-quiz-id",
        'AVAILABLE_QUIZZES_TEMPLATE': '#quizTemplate'
    };

    return {
        get: function(name) { return privateData[name]; }
    };
})();


/**
 * RunDust processes templates
 * @param {string} source
 * @param {string} templateName
 * @param renderer
 * @param data
 */
function runDust(source, templateName, renderer, data) {
    "use strict";

    var compiled = dust.compile(source, templateName);
    dust.loadSource(compiled);

    dust.render(templateName, data, function (err, out) {
        renderer(out);
    });
}

