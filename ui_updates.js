const EMOJIS = [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐦‍⬛", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🪱", "🐛", "🦋", "🐌", "🐞", "🐜", "🪰", "🪲", "🪳", "🦟", "🦗", "🕷", "🕸", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🪼", "🪸", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🫏", "🦍", "🦧", "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🦬", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🫎", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🪽", "🪶", "🐓", "🦃", "🦤", "🦚", "🦜", "🦢", "🪿", "🦩", "🕊", "🐇", "🦝", "🦨", "🦡", "🦫", "🦦", "🦥", "🐁", "🐀", "🐿", "🦔", "🐾", "🐉", "🐲", "🌵", "🎄", "🌲", "🌳", "🌴", "🪹", "🪺", "🪵", "🌱", "🌿", "☘️", "🍀", "🎍", "🪴", "🎋", "🍃", "🍂", "🍁", "🍄", "🐚", "🪨", "🌾", "💐", "🌷", "🪷", "🌹", "🥀", "🌺", "🌸", "🪻", "🌼", "🌻", "🌞", "🌝", "🌛", "🌜", "🌚", "🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔", "🌙", "🌎", "🌍", "🌏", "🪐", "💫", "⭐️", "🌟", "✨", "💥", "🔥", "🌪", "🌈", "🌤", "⛅️", "🌥", "🌦", "🌧", "🌩", "🌨", "⛄️", "🌬", "💨", "💧", "💦", "🫧", "🌊",
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🫛", "🥬", "🥒", "🌶", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🫚", "🥔", "🍠", "🫘", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "🍼", "🫖", "☕️", "🍵", "🧃", "🥤", "🧋", "🫙", "🍶", "🍺", "🍻", "🥂", "🍷", "🫗", "🥃", "🍸", "🍹", "🧉", "🍾", "🧊", "🥄", "🍴", "🍽", "🥣", "🥡", "🥢", "🧂"
]

// $ to denote DOM elements
const $quoteElement = document.getElementById("quote");
const $carriageElement = document.getElementById("carriage");
const $keyDisplayElement = document.getElementById("keyDisplay");
const $optionElements = document.getElementById("options").children;
const $titleElement = document.getElementById("title");
const $WPMElement = document.getElementById("WPM")
    .getElementsByClassName("statisticTitle")[0];
const $characterCountElement = document.getElementById("characterCount")
    .getElementsByClassName("statisticTitle")[0];
const $accuracyElement = document.getElementById("accuracy")
    .getElementsByClassName("statisticTitle")[0];
const $timeElement = document.getElementById("time")
    .getElementsByClassName("statisticTitle")[0];
const $sourceElement = document.getElementById("source")
    .getElementsByClassName("statisticTitle")[0];

let $characterElements = [];

// Resets quote DOM element with some text
function resetQuote(text) {
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

// Toggles blur effect over quote
function toggleQuoteBlur(toggleOn) {
    if (toggleOn) {
        $quoteElement.style.filter = "blur(3px)";
    }
    else {
        $quoteElement.style.filter = "blur(0)";
    }
}

// Resets carriage to original location
function resetCarriage() {
    // Clears the children of carriage DOM element
    while ($carriageElement.firstChild) {
        $carriageElement.removeChild($carriageElement.firstChild);
    }
    $carriageElement.style.transform = "translateX(0)";
}

// Updates source DOM element
function updateSource(text) {
    $sourceElement.innerHTML = text;
}

// Updates footer DOM elements, excluding source
function updateFooters(statistics) {
    $WPMElement.innerHTML = statistics.WPM;
    $characterCountElement.innerHTML = statistics.Characters;
    $accuracyElement.innerHTML = statistics.Accuracy + "%";
    $timeElement.innerHTML = statistics.Time + "s";
}

// Shifts carriage to the left by one unit (ch)
function shiftCarriage() {
    $carriageElement.style.transform = "translateX(-" + caretIndex + "ch)";
}

// Updates keyDisplay DOM element
// Status -1 for incorrect, 0 for neutral (funtion keys), 1 for correct
function updateKeyDisplay(keyPressed, status) {
    if (keyPressed == " ") {
        keyPressed = "Space";
    }
    let color;
    switch (status) {
        case -1:
            color = "red";
            break;
        case 0:
            color = "rgb(61, 61, 61)";
            break;
        case 1:
            color = "rgb(90, 90, 90)";
            break;
    }
    $keyDisplayElement.style.color = color;
    $keyDisplayElement.innerHTML = keyPressed;
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

// Updates options menu DOM elements on click
function updateOptionItems(id) {
    for (let i = 0; i < $optionElements.length; i++) {
        $optionElements[i].classList.remove("active");
    }
    $optionElements[id].classList.add("active");
}

// Random emoji for title on load
function updateTitle() {
    let randEmoji1 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    let randEmoji2 = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    $titleElement.innerHTML = randEmoji1 + " Emoji Type " + randEmoji2;
    if (randEmoji1 == randEmoji2) {
        $titleElement.innerHTML = randEmoji1 + " Emoji Type! " + randEmoji2 + 
            " (Wow, congrats on getting two exact same emojis!)";
    }
}