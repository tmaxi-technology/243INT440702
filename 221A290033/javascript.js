const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let current = "";
let resultDisplayed = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      current = "";
      display.textContent = "0";
    } else if (value === "CE") {
      current = "";
      display.textContent = "0";
    } else if (value === "⌫") {
      current = current.slice(0, -1);
      display.textContent = current || "0";
    } else if (value === "=") {
      try {
        current = eval(current).toString();
        display.textContent = current;
      } catch {
        display.textContent = "Error";
        current = "";
      }
    } else if (value === "x²") {
      current = Math.pow(eval(current), 2).toString();
      display.textContent = current;
    } else if (value === "√x") {
      current = Math.sqrt(eval(current)).toString();
      display.textContent = current;
    } else if (value === "⅟x") {
      current = (1 / eval(current)).toString();
      display.textContent = current;
    } else if (value === "+/-") {
      current = (eval(current) * -1).toString();
      display.textContent = current;
    } else {
      current += value;
      display.textContent = current;
    }
  });
});
