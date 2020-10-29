import React, { Component } from 'react';
import './App.css';
import triviaData from './data/Apprentice_TandemFor400_Data.json'
import Question from './components/Question'

class App extends Component {
  constructor() {
    super()
    this.state = {
      playing: false,
      currentQuestion: 0,
      score: 0,
    }
    this.data = triviaData;
  }

  componentDidMount() {
    this.data.forEach(question => {
      let options = [...question.incorrect, question.correct];
      question.options = this.shuffle(options)
    })
  }

   shuffle = (array, currentIdx = array.length - 1) => {
    let randomIdx;
    let temp;

    while (currentIdx > 0) {
      randomIdx = Math.floor(Math.random() * currentIdx);
      currentIdx--;

      temp = array[currentIdx]
      array[currentIdx] = array[randomIdx];
      array[randomIdx] = temp;
    }

    return array;
  }


  startGame = () => {
    this.setState({ playing: true })
  }

  render() {
    if (!this.state.playing) {
      return (
        <div className="App">
        <header className="App-header">
          <p>
            Welcome to the Trivia App!
          </p>
          <button onClick={this.startGame}>
            Play
          </button>
        </header>
      </div>
      )
    }

    let { currentQuestion, score } = this.state;
    return (
      <div className="App">
        <header>
          <Question
            data={this.data[currentQuestion]}
            questionIndex={currentQuestion}
            score={score}
          />
        </header>
      </div>
    );
  }
}

export default App;
