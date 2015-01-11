/** @module availableQuizzes*/


/**
 * Quizzes that are available
 * Each quiz listed here is displayed as a
 * quiz card on the initial page
 *
 * The id needs to have the following properties:
 *  ~ unique
 *  ~ single word - no spaces
 * The id is set on the button that launches the quiz
 * to identify which quiz was selected.
 *
 */
var availableQuizzes = {

    "quizzes": [
        {
            "order": 1,
            "image": "images/bridges/George_Washington_Bridge_from_New_Jersey-edit.jpg",
            "name": "Bridges ",
            "description": "Discover the fascinating world of bridges",
            "id":  "bridges"
        },
        {
            "order": 2,
            "image": "images/herbs/herb-poster.jpg",
            "name": "Herb Plants",
            "description": "Match the plant to the common cooking herb.",
            "id":  "herbs"
        }
    ]
}


