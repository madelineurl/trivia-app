import PropTypes from 'prop-types'

const Results = ({ score, resetGame }) => {
  return (
    <>
      <h2>Game over!</h2>
      <h3>You got {score} out of 10</h3>
      <button
        type='button'
        onClick={resetGame}
        className='button'
      >
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
