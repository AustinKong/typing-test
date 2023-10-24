const IGNORE_KEYS = [ 
    "Shift", "Control", "Meta", "Alt", "CapsLock"
]

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    registerKeyPress(event.key);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

// Catches key press events
function registerKeyPress(pressedKey) {
    // Cycle through IGNORE_KEYS to skip
    for (let i = 0; i < IGNORE_KEYS.length; i++) {
        if (pressedKey == IGNORE_KEYS[i]) return;
    }

    if (quoteData.content.charAt(caretIndex) == pressedKey) {
        updateCharacterPositive(caretIndex);
    }
    else {
        updateCharacterNegative(caretIndex);
    }
    caretIndex++;
}