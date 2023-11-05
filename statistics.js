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
    let accuracy = 1 - (netErrors / netCharacters);
    let netWPS = grossWPS * accuracy;

    statistics.WPM = netWPS >= 0 ? round_(netWPS * 60, 2) : 0;
    statistics.Characters = netCharacters - netErrors;
    statistics.Accuracy = round_(accuracy * 100, 1);
    statistics.Time = round_(timeElapsed, 1);
    return statistics;
}

// Private method for rounding
function round_(float, digits) {
    let multiple = Math.pow(10, digits);
    return Math.round(float * multiple) / multiple;
}