import { useState } from 'react'
import PropTypes from 'prop-types'
import { Question, PotentialAnswer, Count } from '../components/'

const Display = (props) => {
  const [selected, setSelected] = useState('')

  const handleChange = (evt) => {
    setSelected(evt.target.value)
  }

  const { counter, total, question, potentialAnswers, submitAnswer } = props;
  return (
    <div>
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
            />
          ))
        }
      </div>
      <button type='button' onClick={() => {submitAnswer(selected)}}>Submit</button>
    </div>
  )
}

Display.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  potentialAnswers: PropTypes.array.isRequired,
  submitAnswer: PropTypes.func.isRequired
}

export default Display;
