// Create reference to elements
const display = document.querySelector('.display-operation');
const buttons = document.querySelectorAll('.buttons');
const digitButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const decimalButton = document.querySelector('#decimal');
const equalButton = document.querySelector('#equal');
const allClearButton = document.querySelector('#ac');
const delButton = document.querySelector('#del');

// Define operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'Error' : a / b);
const percent = operand => operand / 100;
const ROUND = 10000000000;

const operate = (operand1, operator, operand2) => {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === 'x' || operator === '*') return multiply(operand1, operand2);
  if (operator === '÷' || operator === '/') return divide(operand1, operand2);
};

// Define variables
let digitString = '';
let operands = [];
let operators = [];
let decimalEntered = false;
display.textContent = '0';

// Add event listeners
document.addEventListener('keydown', handleKeyDown);
allClearButton.addEventListener('click', handleAllClearInput);
delButton.addEventListener('click', handleDeleteInput);
decimalButton.addEventListener('click', handleDecimalInput);
equalButton.addEventListener('click', handleEqualsInput);
digitButtons.forEach(digitButton => {
  digitButton.addEventListener('click', () =>
    handleDigitInput(digitButton.innerText)
  );
});
operatorButtons.forEach(operatorButton => {
  operatorButton.addEventListener('click', () =>
    handleOperatorInput(operatorButton.innerText)
  );
});

// Define support functions
const truncateNumber = value => {
  // check if the value has a decimal point
  const hasDecimal = value.includes('.');

  // Check if value is longer than 10 characters (including the decimal point)
  // Truncate the value to 10 characters
  if (value.length > 11 && !hasDecimal) value = value.slice(0, 11);

  // Truncate the value to 11 characters (including the decimal point)
  if (value.length > 12 && hasDecimal) value = value.slice(0, 12);

  display.textContent = value;
};

function handleKeyDown(event) {
  const key = event.key;
  // event.preventDefault();

  if (/^[\d.]$/.test(key)) {
    key === '.' ? handleDecimalInput() : handleDigitInput(key);
    return;
  }

  // Process the key based on its value
  switch (key) {
    case '+':
    case '-':
    case '*':
    case '/':
      handleOperatorInput(key);
      break;

    case 'Enter':
      handleEqualsInput();
      break;

    case 'Backspace':
      handleDeleteInput();
      break;

    case 'Escape':
      handleAllClearInput();
      break;

    default:
      // Ignore other keys
      break;
  }
}

function handleDigitInput(digit) {
  // enable delete button
  delButton.disabled = false;

  // append digits to form operands
  if (!decimalEntered || digit !== '.') {
    digitString += digit;
    truncateNumber(digitString);
  }
}

function handleDecimalInput() {
  if (!decimalEntered) {
    if (digitString.startsWith('.')) {
      display.textContent = '0' + digitString;
      digitString = display.textContent;
    } else {
      display.textContent += '.';
      digitString = display.textContent;
    }

    decimalEntered = true;
    decimalButton.disabled = true;
  }
}

function handleOperatorInput(operator) {
  // enable decimal button after operator click
  decimalButton.disabled = false;
  decimalEntered = false;

  // do not store operand if no number was input into the calculator
  if (digitString !== '') {
    operands.push(Number(digitString));
  }

  // store last operator entered
  operators.push(operator);
  digitString = '';
}

function handleEqualsInput() {
  // store last number input into calculator display
  operands.push(Number(display.innerText));

  // calculate
  let result = operate(
    operands[operands.length - 2],
    operators[operators.length - 1],
    operands[operands.length - 1]
  );

  truncateNumber(result.toString());

  // store result
  operands.push(Number(display.innerText));

  // reset number input
  digitString = '';

  // disable delete button after equals is pressed
  delButton.disabled = true;

  // enable decimal
  decimalEntered = false;
  decimalButton.disabled = false;
}

function handleDeleteInput() {
  digitString = display.innerText.slice(0, -1);

  // display 0 if all numbers are deleted
  digitString === ''
    ? (display.textContent = '0')
    : (display.textContent = digitString);
}

function handleAllClearInput() {
  digitString = '';
  operands = [];
  operators = [];
  decimalEntered = false;
  decimalButton.disabled = false;
  display.textContent = 0;
}
