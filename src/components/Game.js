import { Component } from 'react';
import triviaData from '../data/Apprentice_TandemFor400_Data.json'
import { StartScreen, Display, Results } from '../components'

class Game extends Component {
  constructor() {
    super();
    this.state = {
      playing: false,
      gameOver: false,
      showAnswer: false,
      selectionRequired: false,
      tenQuestions: [],
      currentQuestion: '',
      correctAnswer: '',
      userAnswer: '',
      answerColor: '',
      answerOptions: [],
      currentQuestionIdx: 0,
      score: 0,
      total: 9,
    }
  }

  componentDidMount() {
    // when the component mounts, pick ten random questions from the provided data
    // and set them as the current questions on the current gameState
    this.pickTenRandomQuestions(triviaData);
  }

  pickTenRandomQuestions = (data) => {
    let questions = [];
    let randomIndices = [];

    for (let i = 0; i < 10; i++) {
      // doing an inner loop here to make sure we get ten total questions, and that they are randomized. But, it's bad (quadratic) time complexity!
      let randomNum = getRandomNum()
      while (randomIndices.includes(randomNum)) {
        randomNum = getRandomNum()
      }
      randomIndices.push(randomNum)
    }

    data.forEach((question, index) => {
      if (randomIndices.includes(index)) {
        questions.push(question)
      }
    })

    this.setState({ tenQuestions: [...questions] });

    function getRandomNum() {
      return Math.floor(Math.random() * triviaData.length);
    }
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

  setQuestion = (index) => {
    // grab the appropriate question using our current question index
    const currentQuestion = this.state.tenQuestions[index]

    const { question, correct, incorrect } = currentQuestion;
    currentQuestion.options = [...incorrect, correct]
     // shuffle all possible answers, and add a property on the currentQuestion object
     // to hold the shuffled answers
    this.shuffle(currentQuestion.options);

    this.setState({
      currentQuestion: question,
      correctAnswer: correct,
      answerOptions: currentQuestion.options
    });
  }

  setUserAnswer = (evt) => {
    this.setState({ selectionRequired: false, userAnswer: evt.target.value })
  }

  submitAnswer = () => {
    const { correctAnswer, score, userAnswer, showAnswer } = this.state;
    const answerColor = userAnswer === correctAnswer ? 'correct' : 'incorrect'

    if (!userAnswer && !showAnswer) {
      this.setState({ selectionRequired: true })
    } else {
      if (userAnswer === correctAnswer) {
        const newScore = score + 1;
        this.setState({
          score: newScore
        })
      }

      this.setState({
        showAnswer: true,
        answerColor,
        userAnswer: ''
      })
    }
  }

  nextQuestion = () => {
    const { currentQuestionIdx } = this.state
    const nextQuestionIdx = currentQuestionIdx + 1;
    if (nextQuestionIdx > this.state.total) {
      this.setState({
        gameOver: true
      })
    } else {
      this.setQuestion(nextQuestionIdx);
      this.setState({
        showAnswer: false,
        currentQuestionIdx: nextQuestionIdx
      })
    }
  }

  startGame = () => {
    // when we start the game, we set playing to true and load the first question from our randomized questions list
    this.setState({ playing: true })
    this.setQuestion(0)
  }


  resetGame = () => {
    this.setState({
      playing: false,
      gameOver: false,
      showAnswer: false,
      tenQuestions: [],
      currentQuestion: '',
      correctAnswer: '',
      answerOptions: [],
      currentQuestionIdx: 0,
      score: 0,
      total: 9,
    })
    this.pickTenRandomQuestions(triviaData);
  }

  render() {
    const {
      correctAnswer,
      total,
      score,
      answerOptions,
      userAnswer,
      currentQuestion,
      currentQuestionIdx,
      showAnswer,
      answerColor,
      selectionRequired
    } = this.state

    if (!this.state.playing) {
      return  <StartScreen startGame={this.startGame} />
    }

    if (this.state.gameOver) {
      return (
        <Results resetGame={this.resetGame} score={score} />
      )
    }

    return (
      <Display
        question={currentQuestion}
        answer={correctAnswer}
        total={total}
        potentialAnswers={answerOptions}
        counter={currentQuestionIdx}
        userAnswer={userAnswer}
        setUserAnswer={this.setUserAnswer}
        submitAnswer={this.submitAnswer}
        showAnswer={showAnswer}
        nextQuestion={this.nextQuestion}
        answerColor={answerColor}
        selectionRequired={selectionRequired}
      />
    );
  }
}

export default Game;
