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
      tenQuestions: [],
      currentQuestion: '',
      currentAnswer: '',
      answerOptions: [],
      currentQuestionId: 0,
      score: 0,
      total: 10,
    }
  }

  componentDidMount() {
    // when the component mounts, we pick ten random questions from the provided data
    this.pickTenRandomQuestions(triviaData);
  }

  pickTenRandomQuestions = (array) => {
    let questions = [];
    let randomIndices = [];

    function getRandomNum() {
      return Math.floor(Math.random() * triviaData.length);
    }

    for (let i = 0; i < 10; i++) {
      // doing inner loop here until we get a non random number to be sure it's randomized
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

  // submitAnswer = (answer) => {
  //   const currentQuestion = triviaData[questionIdx]
  //   console.log(currentQuestion.correct, answer)
  //   if (answer === currentQuestion.correct) {
  //     setScore(score + 1);
  //   }
  //   setQuestionIdx(questionIdx + 1);

  //   if (questionIdx === triviaData.length) {
  //     setGameOver(true);
  //   };
  //   console.log('score: ', score, 'current question: ', questionIdx)
  // }
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

    if (this.state.gameOver) {
      return (
        <>
          <div>Game over!</div>
          <Results score={this.state.score} />
        </>
      )
    }

    //before mapping, we shuffle the answers for the chosen 10 questions
    this.state.allQuestions.forEach(question => {
      let options = [...question.incorrect, question.correct];
      question.options = this.shuffle(options)
    })

    const { question, answer, total } = this.state
    return (
      <div className="App">
        <header>
          <Display
            question={currentQuestion}
            answer={answer}
            total={total}
          />
        </header>
      </div>
    );
  }
}

export default App;
