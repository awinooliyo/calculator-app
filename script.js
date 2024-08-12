const Calculator = {
    displayValue: '0',
    firstOperand: null,
    secondOperand: null,
    currentOperator: null,
    shouldResetDisplay: false,

    // Method to append a number
    appendNumber(number) {
        if (this.shouldResetDisplay) {
            this.displayValue = '';
            this.shouldResetDisplay = false;
        }
        if (this.displayValue === '0' && number !== '.') {
            this.displayValue = number;
        } else {
            this.displayValue += number;
        }
        this.updateDisplay();
    },

    // Method to update the display
    updateDisplay() {
        const display = document.getElementById('display');
        display.textContent = this.displayValue;
    },

    // Method to handle operators
    setOperator(operator) {
        if (this.currentOperator !== null) this.evaluate();
        this.firstOperand = parseFloat(this.displayValue);
        this.currentOperator = operator;
        this.shouldResetDisplay = true;
    },

    // Method to clear the calculator
    clear() {
        this.displayValue = '0';
        this.firstOperand = null;
        this.secondOperand = null;
        this.currentOperator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
    },

    // Method to handle evaluation
    evaluate() {
        if (this.currentOperator === null || this.shouldResetDisplay) return;

        this.secondOperand = parseFloat(this.displayValue);
        if (this.currentOperator === '/' && this.secondOperand === 0) {
            this.displayValue = 'Error: Division by zero';
        } else {
            this.displayValue = String(this.operate(this.currentOperator, this.firstOperand, this.secondOperand));
        }
        this.currentOperator = null;
        this.updateDisplay();
    },

    // Method to handle decimal points
    addDecimal() {
        if (this.shouldResetDisplay) {
            this.displayValue = '0';
            this.shouldResetDisplay = false;
        }
        if (!this.displayValue.includes('.')) {
            this.displayValue += '.';
        }
        this.updateDisplay();
    },

    // Method to handle backspace
    backspace() {
        if (this.displayValue.length === 1) {
            this.displayValue = '0';
        } else {
            this.displayValue = this.displayValue.slice(0, -1);
        }
        this.updateDisplay();
    },

    // Method to perform operations
    operate(operator, a, b) {
        switch (operator) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return null;
        }
    }
};
const buttons = document.getElementById('buttons');

buttons.addEventListener('click', (e) => {
    const button = e.target;
    const value = button.textContent;

    if (button.tagName !== 'BUTTON') return;

    if (value >= '0' && value <= '9') {
        Calculator.appendNumber(value);
    } else if (value === 'C') {
        Calculator.clear();
    } else if (value === '=') {
        Calculator.evaluate();
    } else if (value === '.') {
        Calculator.addDecimal();
    } else if (value === '←') {
        Calculator.backspace();
    } else {
        Calculator.setOperator(value);
    }
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        Calculator.appendNumber(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        Calculator.evaluate();
    } else if (e.key === 'Backspace') {
        Calculator.backspace();
    } else if (e.key === 'Escape') {
        Calculator.clear();
    } else if (e.key === '.') {
        Calculator.addDecimal();
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        Calculator.setOperator(e.key);
    }
});