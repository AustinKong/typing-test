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
}

fetchAndReset();
