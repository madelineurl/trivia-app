import PropTypes from 'prop-types'

const PotentialAnswer = ( props ) => {
  const { index, answer, content, handleSelected } = props
  return (
    <div className='answer-option'>
        <input
          type='radio'
          alt={`answer ${index}`}
          value={content}
          checked={content === answer}
          onChange={handleSelected}
        />
        <label htmlFor={answer}>
          {content}
        </label>
    </div>
  )
}

PotentialAnswer.propTypes = {
  answerType: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  handleSelected: PropTypes.func.isRequired
}

export default PotentialAnswer
