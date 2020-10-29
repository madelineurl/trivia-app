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
      <div>Question {currentQuestion}</div>
      <div>{question}</div>
      {
        options.map((candidate, index) => (
          <div key={index}>
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
      <button onClick={submitAnswer}>Submit</button>
    </>
  )
}

export default Question;
