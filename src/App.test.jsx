import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Calculator app', () => {
  it('renders the calculator display and buttons', () => {
    render(<App />);

    expect(screen.getByText('Simple Calculator')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '7' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
  });

  it('adds two numbers correctly', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '2' }));
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: '=' }));

    expect(screen.getByText('5', { selector: '.display-value' })).toBeInTheDocument();
  });

  it('clears the display when C is pressed', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: '9' }));
    await user.click(screen.getByRole('button', { name: 'C' }));

    expect(screen.getByText('0', { selector: '.display-value' })).toBeInTheDocument();
  });
});
