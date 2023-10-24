// $ to denote DOM elements
let $quoteElement = document.getElementById("quote");
let $characterElements = [];

// Resets quote DOM element with some text
async function resetQuote(text, subtext) {
    // Clears the children of quote DOM element
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    // Creates and appends character DOM elements
    for (let i = 0; i < text.length; i++) {
        const $character = createCharacter_(text.charAt(i));
        $quoteElement.appendChild($character);
        $characterElements[i] = $character;
    }
}

// Shifts quote to the left by one unit (ch)
function shiftQuote() {
    $quoteElement.style.left = "calc(50% + " + ; //howwwwwwwww
}

// Creates and returns a character DOM element
function createCharacter_(char) {
    const $character = document.createElement("span");
    $character.className = "character";
    $character.innerHTML = char;
    return $character;
}

// Updates character DOM element when pressed correctly
function updateCharacterPositive(index) {
    $character = $characterElements[index];
    $character.className = "characterPositive";
}

// Updates character DOM element when pressed incorrectly
function updateCharacterNegative(index) {
    $character = $characterElements[index];
    $character.className = "characterNegative";
}