import PropTypes from 'prop-types'

const PotentialAnswer = ({ selected, content, handleChange }) => {
  return (
    <div className='answer-option'>
        <input
          type='radio'
          alt='answer-option'
          value={content}
          checked={content === selected}
          onChange={handleChange}
        />
        <label htmlFor={content}>
          {content}
        </label>
    </div>
  )
}

PotentialAnswer.propTypes = {
  content: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default PotentialAnswer
