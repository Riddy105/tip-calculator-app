"use strict";
let billValue;
let tip;
let peopleValue;
let individualTip;
let tipPerHead;
let totalPerHead;
let customValue = document.querySelector(`.custom-input`).value;
let buttonValues = document.querySelectorAll(`.tip-btn`);
let warningMessage = document.querySelector(`.display-cont-para`);
let tipValue = document.querySelector(`.tip-value`);
let totalValue = document.querySelector(`.total-value`);
const tipButtons = [5, 10, 15, 25, 50];

// THREE FUNCTIONS USED TO CALCULATE TIP, INDIVIDUAL TIP AND INDIVIDUAL TOTAL
let calcTip = function (percent, bill) {
  return (percent / 100) * bill;
};
let calcTipPerHead = function (people, tip) {
  return tip / people;
};
let calcTotalPerHead = function (bill, tip, people) {
  return (bill + tip) / people;
};

// console.log(billValue);

for (let i = 0; i < buttonValues.length; i++) {
  buttonValues[i].addEventListener(`click`, function () {
    billValue = Number(document.querySelector(`.bill-input`).value);
    tip = calcTip(tipButtons[i], billValue);
    console.log(tip);
  });
}

document.addEventListener(`keydown`, function (e) {
  // console.log(e);
  peopleValue = Number(document.querySelector(`.people-input`).value);
  if (e.key == `Enter` && billValue && tip && peopleValue != 0) {
    tipPerHead = calcTipPerHead(peopleValue, tip);
    tipValue.textContent = tipPerHead.toFixed(2);
    // console.log(tipPerHead);
    totalPerHead = calcTotalPerHead(billValue, tip, peopleValue);
    // console.log(totalPerHead);
    totalValue.textContent = totalPerHead.toFixed(2);
  }
  if (peopleValue === 0 && tip) {
    warningMessage.classList.add(`display`);
  }
  if (peopleValue > 0 && tip) {
    warningMessage.classList.remove(`display`);
  }
});
