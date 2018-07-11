//referencing
var textElem = document.querySelector('.myTextarea')
var btnElem = document.querySelector('.btnAdd')
var resetElem = document.querySelector('.Reset')
var displayElement = document.querySelector('.disp')
var radioElem = document.querySelector('.radioz')
var showElem = document.querySelector('.Show')

var storing = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : {};

var enteredReg = RegiStration(storing)

function btnClicked(regList) {

  if (regList !== '') {

    var createList = document.createElement("p");
    createList.classList.add('display')

    createList.textContent = regList;

    displayElement.appendChild(createList)

    localStorage.setItem('users', JSON.stringify(enteredReg.regMap()));

  }

  textElem.value = "";

}

function radioClicked() {
  var radio = document.querySelector(("input[name='radio']:checked")).value;
  var radioselect = enteredReg.filtering(radio);
  for (var i = 0; i < radioselect.length; i++) {
    btnClicked(radioselect[i]);
  }

}

function resetBtnClick() {
  localStorage.clear()
  location.reload();
}

btnElem.addEventListener('click', function() {
  var entered = textElem.value.toUpperCase();
  if (enteredReg.Regadd(entered)) {
    btnClicked(entered);
  } else {
    alert("Registration number should startswith CA, CK and CY ")
  }
});

resetElem.addEventListener('click', resetBtnClick);

showElem.addEventListener('click', function() {
  displayElement.innerHTML = "";
  radioClicked()
});
