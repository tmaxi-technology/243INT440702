let currentInput = '0';
let operator = null;
let previousInput = '';
let resultDisplayed = false;
let memory = 0;

const resultDisplay = document.getElementById('result');

function updateDisplay() {
    resultDisplay.value = currentInput;
}

function appendNumber(number) {
    if (resultDisplayed) {
        currentInput = number;
        resultDisplayed = false;
    } else {
        if (currentInput === '0' && number !== '.') {
            currentInput = number;
        } else if (number === '.' && currentInput.includes('.')) {
            // Do nothing if '.' is already present
        } else {
            currentInput += number;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    if (previousInput !== '' && operator !== null) {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    resultDisplayed = false;
}

function calculateResult() {
    if (previousInput === '' || currentInput === '' || operator === null) {
        if (previousInput !== '' && currentInput === '') {
            currentInput = previousInput;
            updateDisplay();
            return;
        }
        return;
    }

    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);
    let res;

    switch (operator) {
        case '+':
            res = prev + curr;
            break;
        case '-':
            res = prev - curr;
            break;
        case '*':
            res = prev * curr;
            break;
        case '/':
            if (curr === 0) {
                currentInput = 'Error: Divide by 0';
                resultDisplayed = true;
                updateDisplay();
                return;
            }
            res = prev / curr;
            break;
        case '%':
            res = (prev * curr) / 100;
            break;
        default:
            return;
    }
    currentInput = res.toString();
    resultDisplayed = true;
    operator = null;
    previousInput = '';
    updateDisplay();
}

function clearResult() {
    currentInput = '0';
    operator = null;
    previousInput = '';
    resultDisplayed = false;
    updateDisplay();
}

function clearEntry() {
    currentInput = '0';
    resultDisplayed = false;
    updateDisplay();
}

function backspace() {
    if (resultDisplayed) {
        clearResult();
        return;
    }
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function toggleSign() {
    if (currentInput === '0' || currentInput === 'Error') return;
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function inverse() {
    let num = parseFloat(currentInput);
    if (num === 0) {
        currentInput = 'Error: Divide by 0';
    } else {
        currentInput = (1 / num).toString();
    }
    resultDisplayed = true;
    updateDisplay();
}

function square() {
    let num = parseFloat(currentInput);
    currentInput = (num * num).toString();
    resultDisplayed = true;
    updateDisplay();
}

function squareRoot() {
    let num = parseFloat(currentInput);
    if (num < 0) {
        currentInput = 'Error: Invalid input';
    } else {
        currentInput = Math.sqrt(num).toString();
    }
    resultDisplayed = true;
    updateDisplay();
}

// Memory functions
function memoryClear() {
    memory = 0;
}

function memoryRecall() {
    currentInput = memory.toString();
    resultDisplayed = true;
    updateDisplay();
}

function memoryAdd() {
    memory += parseFloat(currentInput);
    resultDisplayed = true;
    currentInput = '0';
    updateDisplay();
}

function memorySubtract() {
    memory -= parseFloat(currentInput);
    resultDisplayed = true;
    currentInput = '0';
    updateDisplay();
}

function memoryStore() {
    memory = parseFloat(currentInput);
    resultDisplayed = true;
    currentInput = '0';
    updateDisplay();
}