let quoteData = {};
let caretIndex = 0;

// https://github.com/lukePeavey/quotable#get-random-quotes
async function fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        console.log("Unexpected Error:" + data);
        return "An error occured";
    }
}

async function fetchAndReset() {
    quoteData = await fetchQuote();

    // Logic reset
    caretIndex = 0;
    netCharacters = 0;
    netErrors = 0;
    uncorrectedErrors = [];

    // UI reset
    resetQuote(quoteData.content, quoteData.author);
    updateSource(quoteData.author);
    updateFooters({
        "WPM": "-",
        "Characters": 0,
        "Accuracy": "-",
        "Time": 0
    })
    resetCarriage();
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
    console.log("flag");
}

fetchAndReset();
