"use strict";
let billValue;
let tip;
let peopleValue;
let tipPerHead;
let totalPerHead;
let customValue;
let customTip;
let billEl = document.querySelector(`.bill-input`);
let customEl = document.querySelector(`.custom-input`);
let peopleEl = document.querySelector(`.people-input`);
let buttonValues = document.querySelectorAll(`.tip-btn`);
let warningMessage = document.querySelector(`.display-cont-para`);
let tipValue = document.querySelector(`.tip-value`);
let totalValue = document.querySelector(`.total-value`);
let resetEl = document.querySelector(`.reset`);

// AN ARRAY STORING ALL THE VALUES FOR THE 5 TIP BUTTONS.
// I THOUGHT IT'LL BE BEST TO LOOP OVER THEM AS I LOOP OVER THE CORRESPONDING BUTTONS AS WELL 😉
const tipButtons = [5, 10, 15, 25, 50];

// THREE FUNCTIONS USED TO CALCULATE TIP, TIP/HEAD AND TOTAL/HEAD
let calcTip = function (percent, bill) {
  return (percent / 100) * bill;
};
let calcTipPerHead = function (people, tip) {
  return tip / people;
};
let calcTotalPerHead = function (bill, tip, people) {
  return (bill + tip) / people;
};

// RESET FUNCTION
let reset = function () {
  billValue = ``;
  peopleValue = ``;
  customValue = ``;
};

// A FOR LOOP WHICH USED TO ITERATE OVER MY BUTTONS (BUTTONVALUES) SINCE THEY ARE STORED IN AN ARRAY-LIKE(NODE LIST) FORMAT
for (let i = 0; i < buttonValues.length; i++) {
  buttonValues[i].addEventListener(`click`, function () {
    billValue = Number(billEl.value);
    // THIS LOOPS ALSO HELPS ME ITERATE OVER THE CORRESPONDING (TIPBUTTONS) VALUES I STORED IN AN ARRAY EARLIER.
    // THEY ARE PASSED AS ARGUMENT TO A FUNCTION THAT CALCULATES THE TIP
    tip = calcTip(tipButtons[i], billValue);
    console.log(tip, billValue);
  });
}

document.addEventListener(`keydown`, function (e) {
  // TRYING TO CALCULATE CUSTOM TIP
  billValue = Number(billEl.value);
  customValue = Number(customEl.value);
  if (billValue && e.key == `Enter` && customValue != 0) {
    tip = calcTip(customValue, billValue);
  }

  peopleValue = Number(peopleEl.value);
  if (e.key == `Enter` && billValue && tip && peopleValue != 0) {
    tipPerHead = calcTipPerHead(peopleValue, tip);
    tipValue.textContent = tipPerHead.toFixed(2);
    totalPerHead = calcTotalPerHead(billValue, tip, peopleValue);
    totalValue.textContent = totalPerHead.toFixed(2);
  }
  if (peopleValue == 0 && tip && e.key == `Enter` && billValue) {
    warningMessage.classList.add(`display`);
  }
  if (peopleValue > 0 && tip && e.key == `Enter` && billValue) {
    warningMessage.classList.remove(`display`);
  }
});

resetEl.addEventListener(`click`, function () {
  console.log(billValue);
  billEl.value = ``;
  peopleEl.value = ``;
  customEl.value = ``;
  tipPerHead = 0;
  totalPerHead = 0;
  tipValue.textContent = `0.00`;
  totalValue.textContent = `0.00`;
});
