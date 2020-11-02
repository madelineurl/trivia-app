import PropTypes from 'prop-types'
import { PotentialAnswer } from '../components'

const AnswerOptions = (props) => {
  const { answerOptions, setUserAnswer, userAnswer, showAnswer } = props;
  return (
    <>
      {
        answerOptions.map(candidate => (
          <PotentialAnswer
            key={candidate}
            content={candidate}
            handleChange={setUserAnswer}
            selected={userAnswer}
            showAnswer={showAnswer}
          />
        ))
      }
    </>
  )
}

AnswerOptions.propTypes = {
  answerOptions: PropTypes.array.isRequired,
  setUserAnswer: PropTypes.func.isRequired,
  userAnswer: PropTypes.string.isRequired,
  showAnswer: PropTypes.bool.isRequired
}

export default AnswerOptions
