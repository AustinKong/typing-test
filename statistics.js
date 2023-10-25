const WORD_LENGTH = 5;

// The net amount of errors typed, inclusive of corrected errors
let netErrors = 0;
// An array to keep track of indexed errors made that weren't corrected
let uncorrectedErrors = [];
// The net amount of characters typed, inclusive of wrong characters
let netCharacters = 0;

let startTime;
let endTime;

// Calculates statistics and returns in a JSON object
function calculateStatistics(currentTime) {
    let statistics = {
        "WPM": 0,
        "Characters": 0,
        "Accuracy": 0,
        "Time": 0
    };
    let timeElapsed = (currentTime - startTime) / 1000;
    let grossWPS = netCharacters / WORD_LENGTH / timeElapsed;
    let netWPS = grossWPS - uncorrectedErrors.length / timeElapsed;
    let accuracy = 1 - (netErrors / netCharacters);

    statistics.WPM = round_(netWPS * 60, 2);
    statistics.Characters = netCharacters - netErrors;
    statistics.Accuracy = round_(accuracy, 2) * 100;
    statistics.Time = round_(timeElapsed, 1);
    return statistics;
}

// Private method for rounding
function round_(float, digits) {
    let multiple = Math.pow(10, digits);
    return Math.round(float * multiple) / multiple;
}