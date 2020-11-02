import PropTypes from 'prop-types'
import { Button } from '../components'

const ShowAnswer = ({ answerColor, answer, nextQuestion }) => {
  return (
    <div className='show-answer fade-in'>
      <div className='correct-answer'>
        <div
          className={answerColor}
          data-testid='correct-answer'>
            {answer}
        </div>
        <div>
        <Button
          className='next button'
          onClick={nextQuestion}
          text='→'
        />
        </div>
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
