let currentInput = '';
let display = document.getElementById('display');

function input(value) {
  if (currentInput === '0' && value !== '.') {
    currentInput = value;
  } else {
    currentInput += value;
  }
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentInput || '0';
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function clearEntry() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*'));
    currentInput = result.toString();
    updateDisplay();
  } catch {
    currentInput = '';
    display.innerText = 'Lỗi';
  }
}

function squareRoot() {
try {
    currentInput = Math.sqrt(eval(currentInput)).toString();
    updateDisplay();
} catch {
    display.innerText = 'Lỗi';
}
}

function square() {
try {
    currentInput = Math.pow(eval(currentInput), 2).toString();
    updateDisplay();
} catch {
    display.innerText = 'Lỗi';
}
}

function inverse() {
try {
    currentInput = (1 / eval(currentInput)).toString();
    updateDisplay();
} catch {
    display.innerText = 'Lỗi';
}
}

function toggleSign() {
try {
    currentInput = (eval(currentInput) * -1).toString();
    updateDisplay();
} catch {
    display.innerText = 'Lỗi';
}
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}
  