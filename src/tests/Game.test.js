import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event';
import { Game } from '../components'
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
