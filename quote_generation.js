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

const ALPHABET_WEIGHT = 5;
const COMMON_PUNCTUATION_WEIGHT = 3;
const CODING_PUNCTUATION_WEIGHT = 2;
const RANDOM_QUOTE_LENGTH = 100;

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

// Generates random characters for accuracy typing
function generateRandom(alphabetWeight, commonPunctuationWeight, codingPunctuationWeight) {
    let quote = {
        "content": "",
        "author": "Random " + getRandomEmoji()
    }
    let text = "";

    for (let i = 0; i < RANDOM_QUOTE_LENGTH; i++) {
        switch (weightedRandom_(alphabetWeight, commonPunctuationWeight,
            codingPunctuationWeight)) {
            case 1:
                text += randomCharacter_(ALPHABET_CHARACTERS);
                break;
            case 2:
                text += randomCharacter_(COMMON_PUNCTUATION);
                break;
            case 3:
                text += randomCharacter_(CODING_PUNCTUATION);
                break;
        }
    }

    quote.content = text;
    return quote;
}

// Returns 1, 2 or 3, weighted according to weights provided
function weightedRandom_(w1, w2, w3) {
    let rand = Math.random() * (w1 + w2 + w3);
    if (rand <= w1) return 1;
    else if (rand <= w1 + w2) return 2;
    else return 3;
}

// Returns a random character from a character set
function randomCharacter_(characterSet) {
    return characterSet[Math.floor(Math.random() * characterSet.length)];
}