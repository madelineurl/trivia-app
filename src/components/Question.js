import { useState } from 'react'

const Question = ({ data, currentQuestion, submitAnswer  }) => {
  const { question, options } = data;
  const [ answer, setAnswer ] = useState('');

  const handleChange = (evt) => {
    setAnswer(evt.target.value)
  }

  return (
    <>
      <div className='question-count'>Question {currentQuestion}</div>
      <h3>{question}</h3>
      <div className='answers-container'>
        {
          options.map((candidate, index) => (
            <div key={index} className='option'>
              <input
                type='radio'
                alt={`answer ${index}`}
                value={candidate}
                checked={candidate === answer}
                onChange={handleChange}
              />
              {candidate}
            </div>
          ))
        }
      </div>
      <button onClick={() => {submitAnswer(answer)}}>Submit</button>
    </>
  )
}

export default Question;
