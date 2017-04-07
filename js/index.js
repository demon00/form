$(function () {
  $('.form__like-pop-up-list').multipleSelect();
});

// проверка формы перед отправкой

// let submit = document.querySelector('.form__submit');

// submit.addEventListener('click', onSubmitClick.bind(this));

function onSubmitClick() {
  let allInput = document.querySelectorAll('.input__style');

  console.log(allInput);
}

let elem = document.forms[0].elements;

console.log(elem)
