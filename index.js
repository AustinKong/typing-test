let quoteData = {};
let caretIndex = 0;

// https://github.com/lukePeavey/quotable#get-random-quotes
async function fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
        return data;
        // quote.textContent = data.content;
        // cite.textContent = data.author;
    } else {
        console.log("Unexpected Error:" + data);
        return "An error occured";
    }
}

async function fetchAndReset() {
    quoteData = await fetchQuote();
    resetQuote(quoteData.content, quoteData.author);
    updateSource(quoteData.author);
    console.log(quoteData);
}

// Ends when the last character is typed
function onComplete() {
    console.log("End");
}

// Begins when the first character is typed
function onBegin() {
    console.log("Begin");
    startTime = new Date();
}

fetchAndReset();
