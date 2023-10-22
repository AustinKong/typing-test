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

function registerKeyPress(key) {
    console.log(key);
}

async function updateQuote(text, subtext) {
    const charArr = text.split("");
    quote = document.getElementById("quote");
    console.log(charArr);
    for (let i = 0; i < charArr.length; i++) {
        const character = document.createElement("span");
        character.className = "character";
        character.innerHTML = charArr[i];
        quote.appendChild(character);

    }
    // document.getElementById("quote").innerHTML = text;
}



// https://github.com/lukePeavey/quotable#get-random-quotes
async function fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
        updateQuote(data.content, data.author);
       
        return data;
        // quote.textContent = data.content;
        // cite.textContent = data.author;
    } else {
        console.log("Unexpected Error:" + data);
        return "An error occured";
    }
}
currentQuote = fetchQuote();
