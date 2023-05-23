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
const display = document.querySelector('.display-operation');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('#equal');

// Populate display
const populateDisplay = () => {
  numbers.forEach(number =>
    number.addEventListener('click', () => {
      display.textContent += number.textContent;
    })
  );
};

// Store number click events in variable
let operand = '';
let firstOperand = null;
let secondOperand = null;

// Save outcome of click event into a variable
numbers.forEach(number =>
  number.addEventListener('click', () => {
    operand += number.innerText;
    operand = Number(operand);
  })
);

// Save first operand value after user clicks on an operator
operators.forEach(operator =>
  operator.addEventListener('click', () => {
    firstOperand = operand;
    operand = '';
  })
);

// Save second operand value after user clicks on the equal sign
equalSign.addEventListener('click', () => {
  secondOperand = operand;
  operand = ''; // Reset variable for the next number input
});

// Store operator in variable
let operator = '';
operators.forEach(op =>
  op.addEventListener('click', e => {
    operator = e.target.innerText;
  })
);

// Call operate function when user clicks on the equal sign

populateDisplay();

// Store first number when operator is pressed
