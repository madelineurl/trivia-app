import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import { Game, Question, AnswerOptions, Count, Results, CorrectAnswer } from '../components'
import { render, screen } from '@testing-library/react'


describe("Game", () => {
  it("renders the start screen initially", () => {
    render(<Game />);

    expect(screen.getByText('Welcome to the Trivia App!')).toBeInTheDocument();
    expect(screen.getByText('Each round has 10 questions.')).toBeInTheDocument();
  })

  it("renders a 'play' button", () => {
    render(<Game />);

    expect(screen.getByRole('button')).toHaveTextContent('Play');
  })

  it("the 'play' button renders the first question when clicked",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    expect(screen.getByRole('button')).toHaveTextContent('Submit');
    expect(screen.getByText('Question 1 of 10')).toBeInTheDocument();
  })

  it("the 'submit' button shows a warning if no value is selected",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))
    userEvent.click(screen.getByText('Submit'))

    expect(screen.getByText('Please select an answer')).toBeInTheDocument();
  })

  it("the warning disappears once an option is selected",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))
    userEvent.click(screen.getByText('Submit'))

    expect(screen.getByText('Please select an answer')).toBeInTheDocument();

    const inputs = (screen.getAllByRole('radio'))
    userEvent.click(inputs[0])

    expect(screen.queryByText(/Please select an answer/)).toBeNull();
  })

  it("displays the selected answer as 'checked'",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    const answers = (screen.getAllByRole('radio'))
    userEvent.click(answers[0])

    expect(answers[0]).toBeChecked();
  })

  it("only one answer can be checked at a time",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    const answers = (screen.getAllByRole('radio'))
    userEvent.click(answers[0])

    expect(answers[0]).toBeChecked();

    userEvent.click(answers[2]);

    expect(answers[2]).toBeChecked();
    // does the equivalent 'to not be checked' exist?
    // unsuccessfully tried expect(answers[2]).toHaveAttribute('checked', 'false');
  })

  it("disables option inputs after the user submits their answer",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    const answers = (screen.getAllByRole('radio'))
    userEvent.click(answers[0])
    userEvent.click(screen.getByRole('button'))

    expect(answers[0]).toBeDisabled();
    expect(answers[1]).toBeDisabled();
    expect(answers[2]).toBeDisabled();
    expect(answers[3]).toBeDisabled();
  })

  it("displays the correct answer after the user submits their answer",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    const answers = (screen.getAllByRole('radio'))
    userEvent.click(answers[0])
    userEvent.click(screen.getByText('Submit'))

    // resulting text is dynamic here, so getting by testId as last resort
    expect(screen.getByTestId('correct-answer')).toBeInTheDocument()
  })

  it("displays a 'next' button along with the correct answer",  () => {
    render(<Game />);

    userEvent.click(screen.getByText('Play'))

    const answers = (screen.getAllByRole('radio'))
    userEvent.click(answers[0])
    userEvent.click(screen.getByText('Submit'))
    const buttons = screen.getAllByRole('button')

    expect(buttons[1]).toHaveTextContent('→')
  })
})

describe("Count", () => {
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

  // it("sets an option as checked when a user clicks the input", () => {
  //   render(<AnswerOptions {...props} />)

  //   userEvent.click(screen.getByLabelText('Jane Fonda'))

  //   screen.debug();
  //   //expect(screen.getByText('Jane Fonda')).toHaveAttribute('checked')
  //   // expect checked to be true
  // })
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

  // it("the 'play again' button re-renders the home page when clicked", () => {
  //   render(<Results score={score} resetGame={resetGame} total={total} />)

  //   userEvent.click(screen.getByRole('button'))

  //   expect(screen.getByText('Welcome to the Trivia App!')).toBeInTheDocument();
  // })
})

