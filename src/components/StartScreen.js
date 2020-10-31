import PropTypes from 'prop-types'

const StartScreen = ({ startGame }) => {
  return (
    <div className="App">
    <header className="App-header">
      <p>
        Welcome to the Trivia App!
      </p>
      <button onClick={startGame}>
        Play
      </button>
    </header>
  </div>
  )
}

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired
}

export default StartScreen;
