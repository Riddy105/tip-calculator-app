"use strict";
let billValue;
let tip;
let peopleValue;
let tipPerHead;
let totalPerHead;
let customValue;
let customTip;
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

// A FOR LOOP WHICH USED TO ITERATE OVER MY BUTTONS(BUTTONVALUES) SINCE THEY ARE STORED IN AN ARRAY-LIKE FORMAT
for (let i = 0; i < buttonValues.length; i++) {
  buttonValues[i].addEventListener(`click`, function () {
    billValue = Number(document.querySelector(`.bill-input`).value);
    // THIS LOOPS ALSO HELPS ME ITERATE OVER THE CORRESPONDING (TIPBUTTONS) VALUES I STORED IN AN ARRAY EARLIER.
    // THEY ARE PASSED AS ARGUMENT TO A FUNCTION THAT CALCULATES THE TIP
    tip = calcTip(tipButtons[i], billValue);
    console.log(tip);
  });
}

document.addEventListener(`keydown`, function (e) {
  // TRYING TO CALCULATE CUSTOM TIP
  billValue = Number(document.querySelector(`.bill-input`).value);
  customValue = Number(document.querySelector(`.custom-input`).value);
  if (billValue && e.key == `Enter` && customValue != 0) {
    tip = calcTip(customValue, billValue);
  }

  peopleValue = Number(document.querySelector(`.people-input`).value);
  if (e.key == `Enter` && billValue && tip && peopleValue != 0) {
    tipPerHead = calcTipPerHead(peopleValue, tip);
    tipValue.textContent = tipPerHead.toFixed(2);
    totalPerHead = calcTotalPerHead(billValue, tip, peopleValue);
    totalValue.textContent = totalPerHead.toFixed(2);
  }
  if (peopleValue == 0 && tip) {
    warningMessage.classList.add(`display`);
  }
  if (peopleValue > 0 && tip) {
    warningMessage.classList.remove(`display`);
  }
});

resetEl.addEventListener(`click`, function () {
  console.log(billValue);
  billValue = 0;
  peopleValue = ``;
  customValue = ``;
});
