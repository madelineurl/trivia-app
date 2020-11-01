import PropTypes from 'prop-types'
import { Button } from '../components'

const Results = ({ score, resetGame }) => {
  return (
    <>
      <h2>Game over!</h2>
      <h3>You got {score} out of 10</h3>
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
  resetGame: PropTypes.func.isRequired
}

export default Results;
