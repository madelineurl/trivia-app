import { useState } from 'react'
import PropTypes from 'prop-types'
import { Question, PotentialAnswer, Count } from '../components/'

const Display = (props) => {
  const [selected, setSelected] = useState('');

  const handleChange = (evt) => {
    setSelected(evt.target.value)
  }

  const {
    counter,
    total,
    question,
    answer,
    potentialAnswers,
    submitAnswer,
    showAnswer,
    nextQuestion
  } = props;

  const answerColor = selected === answer ? 'correct' : 'incorrect'

  return (
    <>
      <Count
          currentQuestion={counter}
          total={total}
        />
      <div className='display-container'>
        <Question content={question}/>
        <div className='answer-options-container flex'>
          <div>
          {
            potentialAnswers.map(candidate => (
              <PotentialAnswer
                key={candidate}
                content={candidate}
                handleChange={handleChange}
                selected={selected}
                showAnswer={showAnswer}
              />
            ))
          }
          <button
            className='button'
            type='button'
            disabled={showAnswer}
            onClick={() => {submitAnswer(selected)}}>
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
  submitAnswer: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  showAnswer: PropTypes.bool.isRequired
}

export default Display;
