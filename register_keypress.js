const IGNORE_KEYS = [ 
    "Shift", "Control", "Meta", "Alt", "CapsLock", "Enter", "Escape", "Tab",
    "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "NumLock", "Delete", 
    "Home", "End", "PageUp", "PageDown", "Insert", "F1", "F2", "F3", "F4", 
    "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Clear"
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
        if (pressedKey == IGNORE_KEYS[i]) {
            updateKeyDisplay(pressedKey, 0);
            return;
        }
    }

    // Call onBegin() on start
    if (!begunTyping && caretIndex == 0) onBegin();
    
    // Undo when backspace pressed
    if(pressedKey == "Backspace") {
        if (caretIndex > 0) {
            caretIndex--;
            shiftCarriage();
            updateCharacterNeutral(caretIndex);
            updateKeyDisplay(pressedKey, 0);
            if (uncorrectedErrors.includes(caretIndex)) uncorrectedErrors.pop();
        }
        return;
    }
    if (quoteData.content.charAt(caretIndex) == pressedKey) {
        updateCharacterPositive(caretIndex);
        updateKeyDisplay(pressedKey, 1);
    }
    else {
        updateCharacterNegative(caretIndex);
        updateKeyDisplay(pressedKey, -1);
        netErrors++;
        uncorrectedErrors.push(caretIndex);
    }
    netCharacters++;
    caretIndex++;

    // Call onComplete() on finish
    if (caretIndex >= quoteData.content.length) onComplete();

    shiftCarriage();

    let statistics = calculateStatistics(new Date());
    updateFooters(statistics);
}

// Catches key presses during non-typing mode
function nonTypingRegisterKeyPress_(pressedKey) {
    if (pressedKey == "r") {
        fetchAndReset();
        typingMode = true;
        begunTyping = false;
    }
}

