import { render, screen } from '@testing-library/react';
import App from './App';
// import { Display } from './components'

test('renders play button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/Play/i);
  expect(buttonElement).toBeInTheDocument();
});

test('renders welcome message', () => {
  render(<App />);
  const welcome = screen.getByText(/Welcome to the Trivia App!/i);
  expect(welcome).toBeInTheDocument();
});


// test('renders the count', () => {
//   render(<Display />);
//   const questionCount = screen.getByText(/Question/i);
//   expect(questionCount).toBeInTheDocument();
// });
