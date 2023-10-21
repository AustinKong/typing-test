window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.key) {
        case "ArrowDown":
            // code for "down arrow" key press.
            displayParagraph("abyu bala");
            break;
        case "ArrowUp":
            // code for "up arrow" key press.
            break;
        case "ArrowLeft":
            // code for "left arrow" key press.
            break;
        case "ArrowRight":
            // code for "right arrow" key press.
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
// the last option dispatches the event to the listener first,
// then dispatches event to window



function updateQuote(text, subtext) {
    quote = document.getElementById("quote");
    console.log(quote);
    quote.innerHTML = text;
}

// https://github.com/lukePeavey/quotable#get-random-quotes
async function fetchQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
        console.log(data);
        return data;
        // quote.textContent = data.content;
        // cite.textContent = data.author;
    } else {
        console.log("Unexpected Error:" + data);
        return "An error occured";
    }
}

window.onload = updateQuote(fetchQuote.content, "");