window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    registerKeyPress(event.key);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window

const ignoreKeys = [
    "Shift", "Control", "Meta", "Alt", "CapsLock"
]

function registerKeyPress(key) {
    for (let i = 0; i < ignoreKeys.length; i++) {
        if (key == ignoreKeys[i]) {
            return;
        }
    }

    if (currentQuoteContentSplit[caretIndex] == key) {
        caretIndex++;        
    }
}

async function updateQuote(textSplit, subtext) {
    quote = document.getElementById("quote");
    for (let i = 0; i < textSplit.length; i++) {
        const character = document.createElement("span");
        character.className = "character";
        character.innerHTML = textSplit[i];
        quote.appendChild(character);
    }
    // document.getElementById("quote").innerHTML = text;
}

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

async function fetchAndUpdate() {
    quote = await fetchQuote();
    currentQuote = quote;
    currentQuoteContentSplit = quote.content.split("");

    updateQuote(currentQuoteContentSplit, quote.author);
    return quote;
}

currentQuote = "";
currentQuoteContentSplit = ""; 
caretIndex = 0;

fetchAndUpdate();
