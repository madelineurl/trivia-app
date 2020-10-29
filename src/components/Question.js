import { useState } from 'react'

const Question = ({ data, questionIndex, score }) => {
  const { question, options, correct } = data;
  const [ answer, setAnswer ] = useState('')

  const handleChange = (evt) => {
    setAnswer(evt.target.value)
  }

  const submitAnswer = () => {
    if (answer === correct) score++;
    questionIndex++;
    setAnswer('');
    console.log(score)
    console.log(questionIndex)
  }

  return (
    <>
      <div>Question {questionIndex}</div>
      <div>{question}</div>
      {
        options.map((candidate, index) => (
          <>
            <input
              key={index}
              type='radio'
              alt={`answer${index}`}
              value={candidate}
              checked={candidate === answer}
              onChange={handleChange}
            />
            {candidate}
          </>
        ))
      }
      <button onClick={submitAnswer}>Submit</button>
    </>
  )
}

export default Question;
