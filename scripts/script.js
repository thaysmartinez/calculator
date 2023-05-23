// Define operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = operand => operand / 100;

const operate = (operand1, operator, operand2) => {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === 'x') return multiply(operand1, operand2);
  if (operator === '÷') return divide(operand1, operand2);
};

// Create reference to elements
const display = document.querySelector('.display-operation');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');

// Populate display
display.textContent = 0;
const populateDisplay = () => {
  numbers.forEach(number =>
    number.addEventListener('click', () => {
      display.textContent = operand;
    })
  );
};

// Save operands and operator into variables
let operand = '';
let operand1 = null;
let operand2 = null;
let operator = null;

// Hold user input
numbers.forEach(number =>
  number.addEventListener('click', () => {
    operand += number.innerText;
    operand = Number(operand);
  })
);

// Save first user input into variable
operators.forEach(operator =>
  operator.addEventListener('click', () => {
    operand1 = operand;
    operand = '';
  })
);

// Save second user input into variable
equalButton.addEventListener('click', () => {
  operand2 = operand;
  operand = '';
});

// Save operator into variable
operators.forEach(op =>
  op.addEventListener('click', () => {
    operator = op.innerText;
  })
);

// Call operate function when user clicks on the equal sign
equalButton.addEventListener('click', () => {
  if (operand1 !== null && operand2 !== null && operator !== null) {
    const result = operate(operand1, operator, operand2);
    console.log(`Result: ${result}`);
    display.textContent = '';
    display.textContent = result;
    operand1 = null;
    operand2 = null;
    operator = null;
  } else {
    console.log('Invalid calculation');
  }
});

populateDisplay();
