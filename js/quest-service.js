const STORAGE_KEY = 'quests';
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY);

    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gPrevQuest = null;
    }
    gCurrQuest = gQuestsTree;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    // console.log('gPrevQuest:', gPrevQuest)
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no
    // console.log('gCurrQuest:', gCurrQuest)
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    gPrevQuest[lastRes] = newQuest
    // gQuestsTree.no = newQuest
    saveQuestsToStorage()
}


function getCurrQuest() {
    // console.log('gCurrQuest:', gCurrQuest)
    return gCurrQuest
}

function restartGame() {
    gCurrQuest = gQuestsTree
}



function saveQuestsToStorage() {
    saveToStorage(STORAGE_KEY, gQuestsTree);
}