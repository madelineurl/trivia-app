import PropTypes from 'prop-types'
import { Question, PotentialAnswer, Count } from '../components/'


const Display = (props) => {
  const { counter, total, question, potentialAnswers } = props;
  return (
    <div>
      <Count
        currentQuestion={counter}
        total={total}
      />
      <Question content={question}/>
      <div className='answer-options-container'>
        {
          potentialAnswers.map(answer => (
            <PotentialAnswer key={answer} answer={answer}/>
          ))
        }
      </div>
    </div>
  )
}

Display.propTypes = {
  counter: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default Display;
