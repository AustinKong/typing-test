// Handles option button clicks
function optionOnClick(uiId) {
    switch (uiId) {
        case 0:
            generationMode = "quote";
            break;
        case 1:
            generationMode = "randomAlphabet";
            break;
        case 2:
            generationMode = "randomCommonPunctuation";
            break;
        case 3:
            generationMode = "randomAllPunctuation";
            break;
    }
    toggleQuoteBlur(true);
    updateOptionItems(uiId);
    setTimeout(() => {
        fetchAndReset();
        typingMode = true;
    }, 1000);
}