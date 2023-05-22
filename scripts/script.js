const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = operand => operand / 100;

const operate = (operand1, operator, operand2) => {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === '*') return multiply(operand1, operand2);
  if (operator === '/') return divide(operand1, operand2);
};

// Create reference to elements
const previousOperand = document.querySelector('.previous-operand');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

// Populate display
const populateDisplay = () => {
  numbers.forEach(number =>
    number.addEventListener('click', () => {
      previousOperand.textContent += number.textContent;
    })
  );
};

// Store number click events in variable
let operand = '';
numbers.forEach(number =>
  number.addEventListener('click', () => {
    operand += number.innerText;
    operand = Number(operand);
  })
);

// Store operator in variable
let operator = '';
operators.forEach(op =>
  op.addEventListener('click', e => {
    operator = e.target.innerText;
  })
);

populateDisplay();

// Store first number when operator is pressed
