let quoteData = {};
let caretIndex = 0;
let generationMode = "quote";

async function fetchAndReset() {
    switch (generationMode) {
        case "quote":
            quoteData = await fetchQuote();
            break;
        case "randomAlphabet":
            quoteData = generateRandom(ALPHABET_WEIGHT, 0, 0);
            break;
        case "randomCommonPunctuation":
            quoteData = generateRandom(ALPHABET_WEIGHT, COMMON_PUNCTUATION_WEIGHT, 0);
            break;
        case "randomAllPunctuation":
            quoteData = generateRandom(ALPHABET_WEIGHT, COMMON_PUNCTUATION_WEIGHT,
                CODING_PUNCTUATION_WEIGHT);
            break;
    }

    // Logic reset
    caretIndex = 0;
    netCharacters = 0;
    netErrors = 0;
    uncorrectedErrors = [];

    // UI reset
    resetCarriage();
    resetQuote(quoteData.content, quoteData.author);
    updateSource(quoteData.author);
    updateFooters({
        "WPM": "-",
        "Characters": 0,
        "Accuracy": "-",
        "Time": 0
    })
    toggleQuoteBlur(false);
}

// Ends when the last character is typed
function onComplete() {
    typingMode = false;
    toggleQuoteBlur(true);
}

// Begins when the first character is typed
function onBegin() {
    begunTyping = true;
    startTime = new Date();
}

fetchAndReset();
updateTitle();