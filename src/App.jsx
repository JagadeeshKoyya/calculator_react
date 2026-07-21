import { useState } from 'react';

const buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'];

function evaluateExpression(expression) {
  const sanitized = expression.replace(/[^0-9+\-*/.]/g, '');
  if (!sanitized) return '0';
  const result = Function(`return (${sanitized})`)();
  return Number.isFinite(result) ? String(result) : 'Error';
}

export default function App() {
  const [expression, setExpression] = useState('');
  const [display, setDisplay] = useState('0');

  const clearAll = () => {
    setExpression('');
    setDisplay('0');
  };

  const handleButtonPress = (value) => {
    if (value === 'C') {
      clearAll();
      return;
    }

    if (value === '=') {
      try {
        const result = evaluateExpression(expression);
        setExpression(result);
        setDisplay(result);
      } catch {
        setExpression('');
        setDisplay('Error');
      }
      return;
    }

    if (/[+\-*/]/.test(value)) {
      if (!expression) {
        setExpression('0' + value);
        setDisplay('0' + value);
        return;
      }

      const trimmedExpression = expression.replace(/[+\-*/]+$/, '');
      setExpression(trimmedExpression + value);
      setDisplay(trimmedExpression + value);
      return;
    }

    if (value === '.') {
      const parts = expression.split(/[+\-*/]/);
      const current = parts[parts.length - 1];
      if (current.includes('.')) return;
    }

    const nextExpression = expression === '' ? value : expression + value;
    setExpression(nextExpression);
    setDisplay(nextExpression);
  };

  return (
    <div className="app-shell">
      <div className="calculator-card">
        <div className="display-panel">
          <span className="display-label">Simple Calculator</span>
          <div className="display-value">{display}</div>
        </div>

        <div className="button-row">
          <button className="clear-button" onClick={() => handleButtonPress('C')}>
            C
          </button>
        </div>

        <div className="button-grid">
          {buttons.map((button) => (
            <button
              key={button}
              className={`calc-button ${/[+\-*/]/.test(button) ? 'operator' : ''}`.trim()}
              onClick={() => handleButtonPress(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
