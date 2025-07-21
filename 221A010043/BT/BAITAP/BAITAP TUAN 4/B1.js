let currentInput = '';
let operator = '';
let firstOperand = null;
let secondOperand = null;
let memory = 0;

function updateDisplay() {
  document.querySelector('.display').textContent = currentInput || '0';
}

function handleDigit(digit) {
  if (currentInput === '0' || currentInput === '') {
    currentInput = digit;
  } else {
    currentInput += digit;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (firstOperand === null && currentInput !== '') {
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
    updateDisplay();
  } else if (currentInput !== '') {
    secondOperand = parseFloat(currentInput);
    firstOperand = calculate();
    operator = op;
    currentInput = '';
    updateDisplay();
  }
}

function calculate() {
  if (firstOperand === null || secondOperand === null || operator === '') return firstOperand;
  let result;
  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '×':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
      break;
    default:
      return firstOperand;
  }
  secondOperand = null;
  return result;
}

function handleEquals() {
  if (firstOperand !== null && operator !== '' && currentInput !== '') {
    secondOperand = parseFloat(currentInput);
    currentInput = calculate().toString();
    firstOperand = null;
    operator = '';
    updateDisplay();
  }
}

function clear() {
  currentInput = '';
  operator = '';
  firstOperand = null;
  secondOperand = null;
  updateDisplay();
}

function clearEntry() {
  currentInput = '';
  updateDisplay();
}

function toggleSign() {
  if (currentInput !== '' && currentInput !== '0') {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
  }
}

function percentage() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
  }
}

function squareRoot() {
  if (currentInput !== '' && parseFloat(currentInput) >= 0) {
    currentInput = Math.sqrt(parseFloat(currentInput)).toString();
    updateDisplay();
  } else {
    currentInput = 'Error';
    updateDisplay();
  }
}

function reciprocal() {
  if (currentInput !== '' && parseFloat(currentInput) !== 0) {
    currentInput = (1 / parseFloat(currentInput)).toString();
    updateDisplay();
  } else {
    currentInput = 'Error';
    updateDisplay();
  }
}

function square() {
  if (currentInput !== '') {
    currentInput = (parseFloat(currentInput) ** 2).toString();
    updateDisplay();
  }
}

function memoryClear() {
  memory = 0;
}

function memoryRecall() {
  currentInput = memory.toString();
  updateDisplay();
}

function memorySubtract() {
  if (currentInput !== '') {
    memory -= parseFloat(currentInput);
  }
}

function memoryAdd() {
  if (currentInput !== '') {
    memory += parseFloat(currentInput);
  }
}

function memoryStore() {
  if (currentInput !== '') {
    memory = parseFloat(currentInput);
  }
}

document.querySelectorAll('.buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    if (/\d/.test(value) || value === '.') {
      handleDigit(value);
    } else if (['+', '-', '×', '/'].includes(value)) {
      handleOperator(value);
    } else if (value === '=') {
      handleEquals();
    } else if (value === 'C') {
      clear();
    } else if (value === 'CE') {
      clearEntry();
    } else if (value === '±') {
      toggleSign();
    } else if (value === '%') {
      percentage();
    } else if (value === '√') {
      squareRoot();
    } else if (value === '1/x') {
      reciprocal();
    } else if (value === 'x²') {
      square();
    } else if (value === 'MC') {
      memoryClear();
    } else if (value === 'MR') {
      memoryRecall();
    } else if (value === 'M-') {
      memorySubtract();
    } else if (value === 'M+') {
      memoryAdd();
    } else if (value === 'MS') {
      memoryStore();
    }
  });
});

updateDisplay();