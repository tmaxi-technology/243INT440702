let display = document.getElementById('display');
let memory = 0;

function press(val) {
  if (display.value === '0') display.value = '';
  if (val === '√') display.value = Math.sqrt(parseFloat(display.value));
  else if (val === 'x^2') display.value = Math.pow(parseFloat(display.value), 2);
  else if (val === '1/x') display.value = 1 / parseFloat(display.value);
  else display.value += val;
}

function clearAll() {
  display.value = '0';
}

function clearEntry() {
  display.value = '0';
}

function backspace() {
  display.value = display.value.slice(0, -1) || '0';
}

function calculate() {
  try {
    display.value = eval(display.value.replace('×', '*').replace('÷', '/'));
  } catch {
    display.value = 'Error';
  }
}

function toggleSign() {
  display.value = parseFloat(display.value) * -1;
}

function memoryStore() {
  memory = parseFloat(display.value);
}

function memoryRecall() {
  display.value = memory;
}

function memoryAdd() {
  memory += parseFloat(display.value);
}

function memorySubtract() {
  memory -= parseFloat(display.value);
}

function clearMemory() {
  memory = 0;
}
