import PropTypes from 'prop-types'
import { Question, AnswerOptions, CorrectAnswer, Count, Button } from '../components/'

const Display = (props) => {
  const {
    counter,
    total,
    question,
    answer,
    potentialAnswers,
    userAnswer,
    setUserAnswer,
    submitAnswer,
    showAnswer,
    answerColor,
    nextQuestion,
    selectionRequired
  } = props;

  return (
    <>
      <Count
          currentQuestion={counter}
          total={total}
        />
      <div className='display-container flex'>
        <Question content={question}/>
        <div className='answer-options-container flex'>
          <div className='answer-options'>
            <AnswerOptions
              answerOptions={potentialAnswers}
              userAnswer={userAnswer}
              setUserAnswer={setUserAnswer}
              showAnswer={showAnswer}
            />
            <Button
              className='submit button'
              onClick={submitAnswer}
              disabled={showAnswer}
              text='Submit'
            />
            {
              selectionRequired &&
              <div className='warning'>
                Please select an answer
              </div>
            }
          </div>
          {
            showAnswer &&
            <CorrectAnswer
              nextQuestion={nextQuestion}
              answerColor={answerColor}
              answer={answer}
            />
          }
        </div>
      </div>
    </>
  )
}

Display.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  potentialAnswers: PropTypes.array.isRequired,
  setUserAnswer: PropTypes.func.isRequired,
  submitAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired,
  answerColor: PropTypes.string.isRequired,
  selectionRequired: PropTypes.bool.isRequired
}

export default Display;
