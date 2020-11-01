import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Game, Question, Count, Results, CorrectAnswer } from '../components'
import {
  render,
  screen,
  // Tip: all queries are also exposed on an object
  // called "queries" which you could import here as well
} from '@testing-library/react'


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

describe('Count', () => {
  it('renders the current question count and total', () => {
    const count = 1;
    const total = 9;

    render(<Count currentQuestion={count} total={total} />)

    expect(screen.getByText(`Question ${count + 1} of ${total + 1}`)).toBeInTheDocument();
  })
})

describe('Question', () => {
  it('renders the appropriate question passed as props', () => {
    const question = 'Who threw the first brick at the Stonewall riots?'

    render(<Question content={question} />)

    expect(screen.getByText('Who threw the first brick at the Stonewall riots?')).toBeInTheDocument();
  })
})

describe('CorrectAnswer', () => {
  const answerColor = 'incorrect';
  const answer ='Marsha P Johnson';
  const nextQuestion = () => { return 'testing' }

  it('renders the correct answer passed in as props', () => {
    render(<CorrectAnswer
      answerColor={answerColor}
      answer={answer}
      nextQuestion={nextQuestion}
    />)

    expect(screen.getByText('Marsha P Johnson')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('→');
  })

  it('renders the correct className based on answerColor', () => {
    render(<CorrectAnswer
      answerColor={answerColor}
      answer={answer}
      nextQuestion={nextQuestion}
    />)

    expect(screen.getByText('Marsha P Johnson')).toHaveClass('incorrect');
  })
})

describe('Results', () => {
  const score = 8;
  const resetGame = () => {
    //return <Game />
    return <div>Welcome to the Trivia App!</div>
  }

  it('renders user score based on props', () => {
    render(<Results score={score} resetGame={resetGame} />)

    expect(screen.getByText(`You got ${score} out of 10`)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Play again');
  })
})


// describe('Display', () => {
//     const question = 'What is the national animal of Scotland?'
//     const answer = 'Unicorn'
//     const options = ['Seal', 'Walrus', 'Scottie']

//     const setUserAnswer = () => 'Hello!'
//     const submitAnswer = () => 'Answer'
//     const nextQuestion = () => 'next Question'

//     render(<Display
//         counter={0}
//         total={9}
//         question={question}
//         answer={answer}
//         potentialAnswers={options}
//         showAnswer={false}
//         answerColor='red'
//         setUserAnswer={setUserAnswer}
//         submitAnswer={submitAnswer}
//         nextQuestion={nextQuestion}
//     />)

//   it('renders the correct data when provided the required props', () => {
//     expect(screen.getByRole('heading')).toHaveTextContent('What is the national animal of Scotland?')
//     screen.getByText('Walrus').toBeInTheDocument();
//   })

//   it('renders the correct answer after user submission', () => {
//     userEvent.click(screen.getByRole('button'))

//     expect(screen.getByText('Unicorn')).toBeInTheDocument();
//   })
// })

