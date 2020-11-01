import PropTypes from 'prop-types'

const PotentialAnswer = ({ selected, content, handleChange, showAnswer }) => {
  return (
    <div className='answer-option flex'>
        <input
          type='radio'
          alt='answer-option'
          value={content}
          checked={content === selected}
          onChange={handleChange}
          disabled={showAnswer}
          className='input'
        />
        <label htmlFor={content} className='label' aria-labelledby={content} >
          {content}
        </label>
    </div>
  )
}

PotentialAnswer.propTypes = {
  content: PropTypes.string.isRequired,
  selected: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default PotentialAnswer
