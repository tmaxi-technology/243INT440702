let display = document.getElementById("display");
let memory = 0;

function appendNumber(num) {
    if (display.value === "0") display.value = num;
    else display.value += num;
}

function appendSymbol(symbol) {
    display.value += symbol;
}

function clearDisplay() {
    display.value = "0";
}

function clearEntry() {
    display.value = "0";
}

function backspace() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function toggleSign() {
    display.value = (parseFloat(display.value) * -1).toString();
}

function square() {
    display.value = Math.pow(parseFloat(display.value), 2);
}

function sqrt() {
    display.value = Math.sqrt(parseFloat(display.value));
}

function reciprocal() {
    display.value = 1 / parseFloat(display.value);
}

function clearMemory() { memory = 0; }
function recallMemory() { display.value = memory; }
function memoryAdd() { memory += parseFloat(display.value); }
function memorySubtract() { memory -= parseFloat(display.value); }
function storeMemory() { memory = parseFloat(display.value); }
