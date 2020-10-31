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
    this.pickTenRandomQuestions(triviaData);
  }

  pickTenRandomQuestions = (data) => {
    let questions = [];
    let randomIndices = [];

    for (let i = 0; i < 10; i++) {
      // doing an inner loop here to make sure we get ten total questions, and that they are randomized
      // but it's bad (quadratic) time complexity!
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

  setQuestion = () => {
    // grab the appropriate question using the ten questions and our current question index
    const { tenQuestions, currentQuestionIdx } = this.state
    const currentQuestion = tenQuestions[currentQuestionIdx]

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

  startGame = () => {
    // when we start the game, we set playing to true and load the first question from our randomized questions list
    this.setState({ playing: true })
    this.setQuestion()
  }

  setUserAnswer = (evt) => {
    console.log(evt.target.value)
    this.setState({ userAnswer: evt.target.value })
  }

  submitAnswer = () => {
    const { correctAnswer, score, userAnswer } = this.state;
    if (userAnswer) {
      //const nextQuestionIdx = currentQuestionIdx + 1;

      if (userAnswer === correctAnswer) {
        const newScore = score + 1;
        this.setState({
          score: newScore
        })
      }
      const answerColor = userAnswer === correctAnswer ? 'correct' : 'incorrect'

      this.setState({
        //currentQuestionIdx: nextQuestionIdx,
        showAnswer: true,
        answerColor,
        userAnswer: ''
      })

      //setTimeout(() => this.nextQuestion(), 1500)

      // if (currentQuestionIdx === total) {
      //   setTimeout(() => {
      //     this.setState({
      //       gameOver: true
      //     })
      //   }, 1000)
      // }
      //console.log('score: ', score, 'current question: ', currentQuestionIdx)
    }
  }

  nextQuestion = () => {
    const { tenQuestions, currentQuestionIdx } = this.state
    const nextQuestionIdx = currentQuestionIdx + 1;
    this.setQuestion(tenQuestions[currentQuestionIdx]);
    this.setState({
      showAnswer: false,
      currentQuestionIdx: nextQuestionIdx
    })

    if (currentQuestionIdx === this.state.total) {
      this.setState({
        gameOver: true
      })
    }
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
    if (!this.state.playing) {
      return  <StartScreen startGame={this.startGame} />
    }

    if (this.state.gameOver) {
      return <Results
                resetGame={this.resetGame}
                score={this.state.score}
              />
    }

    const {
      correctAnswer,
      total,
      answerOptions,
      userAnswer,
      currentQuestion,
      currentQuestionIdx,
      showAnswer,
      answerColor
    } = this.state

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
      />
    );
  }
}

export default Game;
