const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percent = operand => operand / 100;

const operate = (operand1, operator, operand2) => {
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === '*') return multiply(operand1, operand2);
  if (operator === '/') return divide(operand1, operand2);
};

// Create reference to elements
const currentOperand = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('.button');

// Store button click events in array
function storeOperation() {
  let numbersArr = [];

  buttons.forEach(button =>
    button.addEventListener('click', () => numbersArr.push(button.textContent))
  );
  return numbersArr;
}

// Test if function works
let myArr = storeOperation();

// buttons.forEach(button =>
//   button.addEventListener(
//     'click',
//     () => (currentOperand.textContent = button.textContent)
//   )
// );
