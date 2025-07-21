const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.textContent;

    if (value === 'C') {
      clearDisplay();
    } else if (value === '=') {
      if (display.value.trim() === "") return;
      try {
        let expression = display.value
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/√\(/g, "Math.sqrt(")
          .replace(/sin/g, "Math.sin")
          .replace(/cos/g, "Math.cos")
          .replace(/tan/g, "Math.tan")
          .replace(/log/g, "Math.log10")
          .replace(/ln/g, "Math.log")
          .replace(/x²/g, "**2")
          .replace(/x³/g, "**3")
          .replace(/\^/g, "**");

          expression = expression.replace(/Math\.sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)");
        expression = expression.replace(/Math\.cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)");
        expression = expression.replace(/Math\.tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)");

        display.value = eval(expression);
      } catch (err){
        display.value = 'Syntax Error';
        display.style.color = "red"; 
        setTimeout(() => {
          clearDisplay();
        }, 2000);
      }
    } else if(value === "⌫"){
      backspace();
    } else {
      display.value += value;
    }
  });
});
function clearDisplay() {
      display.value = "";
      display.style.color = "black";
    }
function backspace() {
  display.value = display.value.slice(0, -1);
}
