const ALPHABET_CHARACTERS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o",
    "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
];
const COMMON_PUNCTUATION = [
    ".", ",", "?", "!", " "
];
const CODING_PUNCTUATION = [
    ";", "<", ">", "/", "\\", "&", "*", "(", ")", "[", "]", "{", "}", "%", "+",
    "-", "=", "\""
];

let quoteData = {};
let caretIndex = 0;

let generateCommonPunctuation = true;
let generateCodingPunctuation = true;

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
    // quoteData = generateRandom();

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

// Generates random characters for accuracy typing
function generateRandom() {
    let quote = {
        "content": "",
        "author": "🚀"
    }
    let text = "";

    for (let i = 0; i < 100; i++) {
        let randomNumber = Math.floor(Math.random() * 6);
        switch (randomNumber) {
            case 0:
            case 1:
            case 2:
            case 3:
                text += ALPHABET_CHARACTERS[Math.floor(Math.random() * 26)];
                break;
            case 4:
                text += COMMON_PUNCTUATION[Math.floor(Math.random() * 5)];
                break;
            case 5:
                text += CODING_PUNCTUATION[Math.floor(Math.random() * 18)];
                break;
        }
    }
    quote.content = text;
    return quote;
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
// generateRandom();
