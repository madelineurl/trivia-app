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
      currentQuestionIdx: 0,
      score: 0,
      total: 10,
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


  startGame = () => {
    // when we start the game, we load the first question
    const firstQuestion = this.state.tenQuestions[0]
    const { question, correct, incorrect } = firstQuestion;
    firstQuestion.options = [...incorrect, correct]
     // shuffle all the answers
    this.shuffle(firstQuestion.options);

    this.setState({
      playing: true,
      currentQuestion: question,
      currentAnswer: correct,
      answerOptions: firstQuestion.options
    });
  }

  nextQuestion = () => {
    const { tenQuestions, currentQuestionIdx } = this.state
    this.shuffle(tenQuestions[currentQuestionIdx])
  }

  submitAnswer = (answer) => {
    const { currentAnswer, score, currentQuestionIdx, total } = this.state;

    this.setState({
      currentQuestionIdx: currentQuestionIdx + 1
    })

    if (currentQuestionIdx === total) {
      this.setState({
        gameOver: true
      })
    };

    if (answer === currentAnswer) {
      this.setState({
        score: score + 1
      })
    }

    this.nextQuestion();

    //console.log('score: ', score, 'current question: ', currentQuestionIdx)
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

    if (this.state.gameOver) {
      return (
        <>
          <div>Game over!</div>
          <Results score={this.state.score} />
        </>
      )
    }


    const {  currentAnswer, total, answerOptions, currentQuestion, currentQuestionIdx } = this.state
    return (
      <div className="App">
        <header>
          <Display
            question={currentQuestion}
            answer={currentAnswer}
            total={total}
            potentialAnswers={answerOptions}
            counter={currentQuestionIdx}
            submitAnswer={this.submitAnswer}
          />
        </header>
      </div>
    );
  }
}

export default App;
