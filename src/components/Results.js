import PropTypes from 'prop-types'
import { Button } from '../components'

const Results = ({ score, total, resetGame }) => {
  return (
    <>
      <h2>Game over!</h2>
      <h3>You got {score} out of {total}</h3>
      <Button
        onClick={resetGame}
        className='button'
        text='Play again'
      />
    </>
  )
}

Results.propTypes = {
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired
}

export default Results;
