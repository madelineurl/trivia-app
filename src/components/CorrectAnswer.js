import PropTypes from 'prop-types'
import { Button } from '../components'

const ShowAnswer = ({ answerColor, answer, nextQuestion }) => {
  return (
    <div className='show-answer'>
      <div className='correct-answer'>
        <div className={answerColor}>{answer}</div>
        <Button
          className='next button'
          onClick={nextQuestion}
          text='→'
        />
      </div>
    </div>
  )
}

ShowAnswer.propTypes = {
  answerColor: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired
}

export default ShowAnswer;
