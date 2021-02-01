'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $('.game-start').toggleClass('d-flex');
  $('.game-start').toggleClass('d-none');
  renderQuest();
  // TODO: show the quest section
  $('.quest').toggleClass('d-none');
}

function renderQuest() {
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      alert('Yes, I knew it!');
      onRestartGame()
      // TODO: improve UX
    } else {
      alert('I dont know...teach me!');
      // TODO: hide and show new-quest section
      $('.new-quest').toggleClass('d-none')
      $('.quest').toggleClass('d-none');
    }
  } else {
    // TODO: update the lastRes global var
    gLastRes = res;
    moveToNextQuest(res);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  
  // TODO: Get the inputs' values
  // TODO: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  
  onRestartGame();
}

function onRestartGame() {
  // $('.new-quest').toggleClass('d-none');
  $('.quest').toggleClass('d-none');
  $('.game-start').toggleClass('d-flex');
  $('.game-start').toggleClass('d-none');
  restartGame()
  gLastRes = null;
}
