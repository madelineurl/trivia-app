import PropTypes from 'prop-types'
import { Question, PotentialAnswer, Count } from '../components/'

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
    nextQuestion
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
          <div>
            {
              potentialAnswers.map(candidate => (
                <PotentialAnswer
                  key={candidate}
                  content={candidate}
                  handleChange={setUserAnswer}
                  selected={userAnswer}
                  showAnswer={showAnswer}
                />
              ))
            }
            <button
              className='button'
              type='button'
              disabled={showAnswer}
              onClick={submitAnswer}>
                Submit
            </button>
          </div>
        <div className='show-answer'>
            {
              showAnswer &&
                <div className='correct-answer'>
                  <div className={answerColor}>{answer}</div>
                  <button
                    className='button'
                    onClick={nextQuestion}>
                      →
                  </button>
                </div>
            }
        </div>
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
  answerColor: PropTypes.string.isRequired
}

export default Display;
