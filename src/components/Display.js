import { useState } from 'react'
import PropTypes from 'prop-types'
import { Question, PotentialAnswer, Count } from '../components/'

const Display = (props) => {
  const [selected, setSelected] = useState('')

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

  return (
    <div className='display-container'>
      <Count
        currentQuestion={counter}
        total={total}
      />
      <Question content={question}/>
      <div className='answer-options-container'>
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
          {
            showAnswer &&
              <div className='correct-answer'>
                <div>Answer: {answer}</div>
                <button
                  className='button'
                  onClick={nextQuestion}>
                    Next question
                </button>
              </div>
          }
      </div>
    </div>
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
