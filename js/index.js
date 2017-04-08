'use strict';

let submit = document.querySelector('#button-submit');

submit.onclick = function() {

  let radioSpan = document.querySelectorAll('.radio-buttons__text_radio');

  for(let b=0; b<radioSpan.length; b++) {               // цикл для добавление border radio
    radioSpan[b].classList.add('js-radio-buttons_err');
  }

  let children = document.querySelectorAll('.radio-buttons__list');

  for(let i=0; i<children.length; i++) {
    let parrentInput = children[i].children;   // ul

    let captionsVote = children[i].parentElement.parentElement.previousElementSibling;

    captionsVote.firstElementChild.classList.add('js-caption_error');  // добавление класса заголовоку блока

    for(let k=0; k<parrentInput.length; k++) {

      let inputs = parrentInput[k].firstElementChild;   // input

      if(inputs.checked) {
        for(let j=0; j<parrentInput.length; j++) {

          let inputForRemoveClass = parrentInput[j].firstElementChild;

          let spanRemoveClass = inputForRemoveClass.nextElementSibling.firstElementChild;  // span

          spanRemoveClass.classList.remove('js-radio-buttons_err');
          captionsVote.firstElementChild.classList.remove('js-caption_error');
        }
      }
    }
  }
};


