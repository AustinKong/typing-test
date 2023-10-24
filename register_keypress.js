const IGNORE_KEYS = [ 
    "Shift", "Control", "Meta", "Alt", "CapsLock"
]

let typingMode = true;
let begunTyping = false;

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    if (typingMode) typingRegisterKeyPress_(event.key);
    else nonTypingRegisterKeyPress_(event.key);

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

// Catches key press events during typing mode
function typingRegisterKeyPress_(pressedKey) {
    // Cycle through IGNORE_KEYS to skip
    for (let i = 0; i < IGNORE_KEYS.length; i++) {
        if (pressedKey == IGNORE_KEYS[i]) return;
    }

    // Undo when backspace pressed
    if(pressedKey == "Backspace") {
        if (caretIndex > 0) {
            caretIndex--;
            shiftCarriage();
            updateCharacterNeutral(caretIndex);
        }
        return;
    }
    if (quoteData.content.charAt(caretIndex) == pressedKey) {
        updateCharacterPositive(caretIndex);
    }
    else {
        updateCharacterNegative(caretIndex);
    }
    caretIndex++;
    shiftCarriage();

    // call onComplete() on finish
    if (caretIndex >= quoteData.content.length) {
        typingMode = false;
        onComplete();
    }

    // call onBegin() on start
    if (!begunTyping && caretIndex == 1) {
        begunTyping = true;
        onBegin();
    }
}

// Catches key presses during non-typing mode
function nonTypingRegisterKeyPress_(pressedKey) {
    // To be worked on 🚩
    if (pressedKey = "r") {
        fetchAndReset();
        typingMode = true;
        begunTyping = false;
    }
}