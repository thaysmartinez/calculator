// Create reference to elements
const display = document.querySelector('.display-operation');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');

// Define operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? 'error: division by 0' : a / b);
const percent = operand => operand / 100;
const ROUND = 10000;

const operate = (operand1, operator, operand2) => {
  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === 'x') return multiply(operand1, operand2);
  if (operator === '÷') return divide(operand1, operand2);
};

// Populate display
display.textContent = 0;
const populateDisplay = () => {
  numbers.forEach(number =>
    number.addEventListener('click', () => {
      display.textContent = num;
    })
  );
};

// Save operands and operator into variables
let digits = '';
let num = '';
let operands = [];
let operand1 = null;
let operand2 = null;
let operator = [];
let result = [];

// Hold user input
numbers.forEach(number =>
  number.addEventListener('click', () => {
    digits += number.innerText;
  })
);

// Save operator into variable
operators.forEach(operatorBtn =>
  operatorBtn.addEventListener('click', () => {
    operator.push(operatorBtn.innerText);
  })
);

// Save operands into array
operators.forEach(operatorBtn =>
  operatorBtn.addEventListener('click', () => {
    operands.unshift(Number(digits));
    digits = '';
  })
);

// Save first user input into variable
operators.forEach(operatorBtn =>
  operatorBtn.addEventListener('click', () => {
    if (result.length === 0) {
      operand1 = operands[0];
      result.unshift(operands[0]);
      console.log('operands:', operands);
      console.log('operand1:', operand1);
      console.log('operand2:', operand2);
      console.log('operator:', operator);
      console.log('result:', result);
      console.log('----------------');
    } else {
      operand2 = operands[0];
      let operatorSign = operator[operator.length - 2];
      console.log(operatorSign);
      result.unshift(operate(result[0], operatorSign, operand2));
      console.log('operator length:', operator.length);
      console.log('operands:', operands);
      console.log('operand1:', operand1);
      console.log('operand2:', operand2);
      console.log('operator:', operator);
      console.log('result:', result);
      console.log('----------------');
    }
  })
);

// Save second user input into variable
equalButton.addEventListener('click', () => {
  operand2 = num;
  num = '';
});

// Call operate function when user clicks on the equal sign
equalButton.addEventListener('click', () => {
  if (operand1 !== null && operand2 !== null && operator !== null) {
    result = operate(operand1, operator, operand2);
    result = Math.round(result * ROUND) / ROUND;
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
