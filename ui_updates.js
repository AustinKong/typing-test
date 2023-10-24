// $ to denote DOM elements
let $quoteElement = document.getElementById("quote");
let $carriageElement = document.getElementById("carriage");
let $characterElements = [];

// Resets quote DOM element with some text
async function resetQuote(text) {
    // Clears the children of carriage DOM element
    while ($carriageElement.firstChild) {
        $carriageElement.removeChild($carriageElement.firstChild);
    }

    // Creates and appends character DOM elements
    for (let i = 0; i < text.length; i++) {
        let $character = "";
        if (text.charAt(i) == " ") {
            $character = createCharacter_("·");
            $character.classList.add("space");
        }
        else {
            $character = createCharacter_(text.charAt(i));
        }
        $carriageElement.appendChild($character);
        $characterElements[i] = $character;
    }
}

// Updates footer DOM elements
function updateFooters(quoteData) {
    
}

// Shifts carriage to the left by one unit (ch)
function shiftCarriage() {
    $carriageElement.style.transform = "translateX(-" + caretIndex + "ch)";
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
    $character.classList.remove("negative");
    $character.classList.remove("neutral");
    $character.classList.add("positive");
}

// Updates character DOM element when pressed incorrectly
function updateCharacterNegative(index) {
    $character = $characterElements[index];
    $character.classList.remove("positive");
    $character.classList.remove("neutral");
    $character.classList.add("negative");
}

// Updates character DOM element when backspace is pressed
function updateCharacterNeutral(index) {
    $character = $characterElements[index];
    $character.classList.remove("positive");
    $character.classList.remove("negative");
    $character.classList.add("neutral");
}