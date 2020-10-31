import { Results } from '../components'

const EndScreen = ({ score, resetGame }) => {
  return (
    <div className='app'>
      <header className='app header'>
        <Results score={score} resetGame={resetGame}/>
      </header>
    </div>
  )
}

export default EndScreen;
