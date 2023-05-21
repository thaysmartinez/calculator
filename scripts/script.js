const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (operand1, operator, operand2) => {
  operand1 = Number(operand1);
  operand2 = Number(operand2);

  if (operator === '+') return add(operand1, operand2);
  if (operator === '-') return subtract(operand1, operand2);
  if (operator === '*') return multiply(operand1, operand2);
  if (operator === '/') return divide(operand1, operand2);
};
