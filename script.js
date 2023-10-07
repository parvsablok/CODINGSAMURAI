const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let inputValue = ""; // To store user input value
let currentOperation = null; // To track the current scientific operation
let parentheses = 0; // To track open parentheses count

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.classList.contains("btn-scientific")) {
            // Handle scientific functions
            if (currentOperation === null) {
                currentOperation = item.id; // Set the current scientific operation
                display.innerText += item.innerText;
            }
        } else if (item.id === "equal") {
            // Handle the case when the user presses "=" to calculate the expression
            try {
                if (currentOperation !== null) {
                    const degrees = parseFloat(inputValue);
                    const radians = degrees * (Math.PI / 180);
                    let result = performScientificOperation(currentOperation, radians);
                    if (Number.isInteger(result)) {
                        result = result.toFixed(0); // If it's an integer, remove decimal places
                    } else {
                        result = result.toFixed(4); // Otherwise, round to 4 decimal places
                    }
                    inputValue = result; // Update inputValue with the result
                    display.innerText = result;
                    currentOperation = null; // Reset the current operation
                } else {
                    let result = eval(inputValue);
                    if (Number.isInteger(result)) {
                        result = result.toFixed(0); // If it's an integer, remove decimal places
                    } else {
                        result = result.toFixed(4); // Otherwise, round to 4 decimal places
                    }
                    inputValue = result; // Update inputValue with the result
                    display.innerText = result;
                }
            } catch (error) {
                display.innerText = "Error";
            }
        } else if (item.id === "clear") {
            display.innerText = "";
            inputValue = "";
            currentOperation = null; // Reset the current operation
            parentheses = 0; // Reset parentheses tracking
        } else if (item.id === "backspace") {
            inputValue = inputValue.slice(0, -1);
            display.innerText = inputValue;
        } else if (item.id === "open-parentheses") {
            // Handle opening parentheses
            parentheses++;
            inputValue += "(";
            display.innerText += item.innerText;
        } else if (item.id === "close-parentheses") {
            // Handle closing parentheses
            if (parentheses > 0) {
                inputValue += ")";
                display.innerText += item.innerText;
                parentheses--;
            }
        } else {
            inputValue += item.id;
            display.innerText += item.innerText;
        }
    };
});

// Function to perform scientific operations
function performScientificOperation(operation, value) {
    switch (operation) {
        case "sin":
            return Math.sin(value);
        case "cos":
            return Math.cos(value);
        case "tan":
            return Math.tan(value);
        case "sqrt":
            return Math.sqrt(value);
        // Add more scientific functions as needed
        default:
            return 0; // Default to 0 if an unsupported operation is selected
    }
}

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
let isDark = true;
themeToggleBtn.onclick = () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
    isDark = !isDark;
};
