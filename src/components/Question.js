import PropTypes from 'prop-types'

const Question = ({ content }) => {
  return (
    <h3 className='question'>{content}</h3>
  )}

Question.propTypes = {
  currentQuestion: PropTypes.string.isRequired
}

export default Question;
