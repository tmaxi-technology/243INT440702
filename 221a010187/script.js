// script.js
let display = document.getElementById('display');
let memory = 0;

function press(key) {
    if (display.value === '0' || display.value === 'Error') display.value = '';
    
    if (key === '1/x') {
        display.value = 1 / parseFloat(display.value);
    } else if (key === 'x^2') {
        display.value = Math.pow(parseFloat(display.value), 2);
    } else if (key === 'sqrt') {
        display.value = Math.sqrt(parseFloat(display.value));
    } else {
        display.value += key;
    }
}

function calculate() {
    try {
        display.value = eval(display.value.replace('×', '*').replace('÷', '/'));
    } catch {
        display.value = 'Error';
    }
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

function toggleSign() {
    display.value = parseFloat(display.value) * -1;
}

function addMemory() {
    memory += parseFloat(display.value);
}

function subMemory() {
    memory -= parseFloat(display.value);
}

function saveMemory() {
    memory = parseFloat(display.value);
}

function readMemory() {
    display.value = memory;
}

function clearMemory() {
    memory = 0;
}