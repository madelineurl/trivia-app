import PropTypes from 'prop-types'

const Results = ({ score, resetGame }) => {
  return (
    <>
      <h2>Game over!</h2>
      <div>You got {score} out of 10</div>
      <button
        type='button'
        onClick={resetGame}>
          Play again
      </button>
    </>
  )
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired
}

export default Results;
