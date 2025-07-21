// script.js
const screen = document.getElementById('screen');
let current = '';
let operator = null;
let operandA = null;

document.querySelector('.buttons').addEventListener('click', e => {
  const btn = e.target;
  const num = btn.getAttribute('data-key');
  const op = btn.getAttribute('data-op');

  if (num !== null) {
    current += num;
    screen.textContent = current;
  } else if (op) {
    if (current === '') return;
    operandA = parseFloat(current);
    operator = op;
    current = '';
  } else if (btn.id === 'equals') {
    if (!operator || current === '') return;
    const b = parseFloat(current);
    let res = 0;
    switch (operator) {
      case '+': res = operandA + b; break;
      case '-': res = operandA - b; break;
      case '*': res = operandA * b; break;
      case '/': res = operandA / b; break;
    }
    screen.textContent = res;
    current = res.toString();
    operator = null;
  } else if (btn.id === 'clear') {
    current = '';
    operator = null;
    operandA = null;
    screen.textContent = '0';
  }
});
