import { Component } from 'react';
import './App.css';
import triviaData from './data/Apprentice_TandemFor400_Data.json'
import { Display, Results } from './components'

class App extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      gameOver: false,
      showAnswer: false,
      tenQuestions: [],
      currentQuestion: '',
      currentAnswer: '',
      answerOptions: [],
      currentQuestionIdx: 0,
      score: 0,
      total: 9,
    }
  }

  componentDidMount() {
    // when the component mounts, pick ten random questions from the provided data
    this.pickTenRandomQuestions(triviaData);
  }

  pickTenRandomQuestions = (array) => {
    let questions = [];
    let randomIndices = [];

    function getRandomNum() {
      return Math.floor(Math.random() * triviaData.length);
    }

    for (let i = 0; i < 10; i++) {
      // doing an inner loop here to make sure we get ten total questions, and that they are randomized
      // but it's bad (quadratic) time complexity!
      let randomNum = getRandomNum()
      while (randomIndices.includes(randomNum)) {
        randomNum = getRandomNum()
      }
      randomIndices.push(randomNum)
    }

    array.forEach((question, index) => {
      if (randomIndices.includes(index)) questions.push(question)
    })

    this.setState({ tenQuestions: [...questions] });
  }

  shuffle = (array, currentIdx = array.length - 1) => {
    // use classic array shuffling algorithm to shuffle answer options
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

  setQuestion = () => {
    const { tenQuestions, currentQuestionIdx } = this.state
    const firstQuestion = tenQuestions[currentQuestionIdx]

    const { question, correct, incorrect } = firstQuestion;
    firstQuestion.options = [...incorrect, correct]
     // shuffle all possible answers
    this.shuffle(firstQuestion.options);

    this.setState({
      playing: true,
      currentQuestion: question,
      currentAnswer: correct,
      answerOptions: firstQuestion.options
    });
  }


  startGame = () => {
    // when we start the game, we set playing to true and load the first question
    this.setState({ playing: true })
    this.setQuestion()
  }


  nextQuestion = () => {
    const { tenQuestions, currentQuestionIdx } = this.state
    this.setQuestion(tenQuestions[currentQuestionIdx]);
    this.setState({ showAnswer: false})
  }


  submitAnswer = (answer) => {
    const { currentAnswer, score, currentQuestionIdx, total } = this.state;

    if (answer === currentAnswer) {
      this.setState({
        score: score + 1
      })
    }

    this.setState({
      currentQuestionIdx: currentQuestionIdx + 1,
      showAnswer: true
    })

    if (currentQuestionIdx === total) {
      this.setState({
        gameOver: true
      })
    }
    console.log('score: ', score, 'current question: ', currentQuestionIdx)
  }

  resetGame = () => {
    this.setState({
      playing: false,
      gameOver: false,
      showAnswer: false,
      tenQuestions: [],
      currentQuestion: '',
      currentAnswer: '',
      answerOptions: [],
      currentQuestionIdx: 0,
      score: 0,
      total: 9,
    })
  }

  renderStartScreen = () => {
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

  renderGameOver = () => {
    return (
      <>
        <div>Game over!</div>
        <Results score={this.state.score} />
      </>
    )
  }

  render() {
    if (!this.state.playing) {
      return (
        <div className="app">
        <header className="app header">
          <h2>
            Welcome to the Trivia App!
          </h2>
          <p>Each round consists of 10 questions. Click play to get started.</p>
          <button onClick={this.startGame}>
            Play
          </button>
        </header>
      </div>
      )
    }

    if (this.state.gameOver) {
      return (
        <div className='app'>
          <header className='app header'>
            <Results score={this.state.score} resetGame={this.resetGame}/>
          </header>
        </div>
      )
    }

    const {
      currentAnswer,
      total,
      answerOptions,
      currentQuestion,
      currentQuestionIdx,
      showAnswer
    } = this.state

    return (
      <div className="app">
        <header className="game header">
          <Display
            question={currentQuestion}
            answer={currentAnswer}
            total={total}
            potentialAnswers={answerOptions}
            counter={currentQuestionIdx}
            submitAnswer={this.submitAnswer}
            showAnswer={showAnswer}
            nextQuestion={this.nextQuestion}
          />
        </header>
      </div>
    );
  }
}

export default App;
