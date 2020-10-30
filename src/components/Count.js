import PropTypes from 'prop-types'

const Count = ({ currentQuestion, total }) => {
  return (
    <div className='question-count'>
      Question {currentQuestion} of {total}
    </div>
  )
}

Count.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
}

export default Count;
