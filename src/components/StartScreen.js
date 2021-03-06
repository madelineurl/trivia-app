import PropTypes from 'prop-types'
import { Button } from '../components'

const StartScreen = ({ startGame }) => {
  return (
    <>
      <h2>
        Welcome to the Trivia App!
      </h2>
      <p>Each round has 10 questions.</p>
      <Button
        text='Play'
        className='play button'
        onClick={startGame}
      />
    </>
  )
}

StartScreen.propTypes = {
  startGame: PropTypes.func.isRequired
}

export default StartScreen;
