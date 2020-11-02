import '@testing-library/jest-dom/extend-expect'
import { Question, AnswerOptions, Count, Results, CorrectAnswer } from '../components'
import { render, screen } from '@testing-library/react'


describe('Count', () => {
  const props = {
    currentQuestion: 1,
    total: 9
  }

  const differentProps = {
    currentQuestion: 0,
    total: 19
  }

  it('renders the current question count and total, shifted by one index, passed in as props', () => {
    render(<Count {...props} />)

    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/10/)).toBeInTheDocument();
  })

  it('renders a different question count and total, shifted by one index, passed in as props', () => {

    render(<Count {...differentProps} />)

    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
  })
})

describe('Question', () => {
  const question = 'Who threw the first brick at the Stonewall riots?';
  const newQuestion = 'What cultural event sparked the birth of Chicago House music?';

  it('renders a question passed as props', () => {
    render(<Question content={question} />)

    expect(screen.getByText('Who threw the first brick at the Stonewall riots?')).toBeInTheDocument();
  })

  it('renders a different question passed as props', () => {
    render(<Question content={newQuestion} />)

    expect(screen.getByText('What cultural event sparked the birth of Chicago House music?')).toBeInTheDocument();
  })

  it('renders a question with the correct class name', () => {
    render(<Question content={question} />)

    expect(screen.getByText('Who threw the first brick at the Stonewall riots?')).toHaveClass('question');
  })
})

describe('AnswerOptions', () => {
  const props = {
    answerOptions: ['Jane Fonda', 'Audre Lorde', 'Harvey Milk', 'Marsha P Johnson'],
    userAnswer: '',
    showAnswer: false,
    setUserAnswer: jest.fn()
  }

  it('displays answer options passed in as props', () => {
    render(<AnswerOptions {...props} />)

    expect(screen.getByText('Jane Fonda')).toBeInTheDocument();
    expect(screen.getByText('Harvey Milk')).toBeInTheDocument();
    expect(screen.getByText('Marsha P Johnson')).toBeInTheDocument();
    expect(screen.getByText('Audre Lorde')).toBeInTheDocument();
  })

  it("displays options as radio inputs", () => {
    render(<AnswerOptions {...props} />)

    const options = screen.getAllByRole('radio')
    expect(options.length).toBe(props.answerOptions.length)
  })


  it('renders answer options with the correct class name', () => {
    render(<AnswerOptions {...props} />)

    const options = screen.getAllByRole('radio')

    options.forEach(answer => {
      expect(answer).toHaveClass('input')
    })
  })

})

describe('CorrectAnswer', () => {
  const answerColor = 'incorrect';
  const answer ='Marsha P Johnson';
  const nextQuestion = jest.fn()

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
  let score = 8;
  let total = 10;
  const resetGame = jest.fn()

  it('displays user score out of the total, passed in as props', () => {
    render(<Results score={score} resetGame={resetGame} total={total} />)

    expect(screen.getByText(`You got 8 out of 10`)).toBeInTheDocument();
  })

  it('displays a different score and different total, passed in as props', () => {
    score = 5;
    total = 20;
    render(<Results score={score} resetGame={resetGame} total={total} />)

    expect(screen.getByText(`You got 5 out of 20`)).toBeInTheDocument();
  })

  it("displays a 'play again' button", () => {
    render(<Results score={score} resetGame={resetGame} total={total} />)

    expect(screen.getByRole('button')).toHaveTextContent('Play again');
  })
})

