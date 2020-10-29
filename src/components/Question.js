import { useState } from 'react'

const Question = ({ data, currentQuestion, score, gameOver, total }) => {
  const { question, options, correct } = data;
  const [ answer, setAnswer ] = useState('');

  const handleChange = (evt) => {
    setAnswer(evt.target.value)
  }

  const submitAnswer = () => {
    if (answer === correct) score++;
    currentQuestion++;
    setAnswer('');
    if (currentQuestion === total) gameOver = true;
    // console.log(score)
    // console.log(currentQuestion)
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
      <button onClick={submitAnswer}>Submit</button>
    </>
  )
}

export default Question;
