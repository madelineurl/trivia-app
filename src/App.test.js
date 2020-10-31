import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App from './App';
import {
  render,
  screen,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
} from '@testing-library/react'
import {
  Game, Display
} from './components'

//screen.debug();

describe('App', () => {
  it('renders game component', () => {
    render(<App />);

    // getByText expects a string or regular expression
    expect(screen.getByText('Welcome to the Trivia App!')).toBeInTheDocument();
    //expect(screen.getByRole('button')).toHaveTextContent('Play');
    expect(screen.getByText('Play')).toBeInTheDocument();
  })
})

describe('Game', () => {
  it('renders display component upon clicking play',  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
  })
})

describe('Display', () => {
    const question = 'What is the national animal of Scotland?'
    const answer = 'Unicorn'
    const options = ['Seal', 'Walrus', 'Scottie']

    const setUserAnswer = () => 'Hello!'
    const submitAnswer = () => 'Answer'
    const nextQuestion = () => 'next Question'

    render(<Display
        counter={0}
        total={9}
        question={question}
        answer={answer}
        potentialAnswers={options}
        showAnswer={false}
        answerColor='red'
        setUserAnswer={setUserAnswer}
        submitAnswer={submitAnswer}
        nextQuestion={nextQuestion}
    />)

  it('renders the correct data when provided the required props', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('What is the national animal of Scotland?')
    screen.getByText('Walrus').toBeInTheDocument();
  })

  it('renders the correct answer after user submission', () => {
    userEvent.click(screen.getByRole('button'))

    expect(screen.getByText('Unicorn')).toBeInTheDocument();
  })
})
