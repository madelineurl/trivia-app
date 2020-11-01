import './App.css';
import { Game } from './components'

const App = () => {
  return (
    <header className='header'>
      <div className='app fade-in'>
        <Game />
      </div>
    </header>
  )
}

export default App;
