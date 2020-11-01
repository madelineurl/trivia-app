import PropTypes from 'prop-types'

const StartScreen = ({ startGame }) => {
  return (
    <>
      <h2>
        Welcome to the Trivia App!
      </h2>
      <button onClick={startGame} className='button'>
        Play
      </button>
    </>
  )
}

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired
}

export default StartScreen;
