import { useState, useEffect } from 'react';
import './App.css';
import triviaData from './data/Apprentice_TandemFor400_Data.json'
import Question from './components/Question'
import Results from './components/Results'

const App = () => {
  const [playing, setPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [score, setScore] = useState(0)

  useEffect(() => {
    triviaData.forEach(question => {
      let options = [...question.incorrect, question.correct];
      question.options = shuffle(options)
    })
  })

   function shuffle (array, currentIdx = array.length - 1) {
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


  const startGame = () => {
    setPlaying(true)
  }

  const submitAnswer = (answer) => {
    const currentQuestion = triviaData[questionIdx]
    console.log(currentQuestion.correct, answer)
    if (answer === currentQuestion.correct) {
      setScore(score + 1);
    }
    setQuestionIdx(questionIdx + 1);

    if (questionIdx === triviaData.length) {
      setGameOver(true);
    };
    console.log('score: ', score, 'current question: ', questionIdx)
  }

    if (!playing) {
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

    if (gameOver) {
      return (
        <>
          <div>Game over!</div>
          <Results score={score} />
        </>
      )
    }

    return (
      <div className="App">
        <header>
          {
            triviaData.map((question, index) => (
              <Question
                key={index}
                data={triviaData[index]}
                currentQuestion={questionIdx}
                submitAnswer={submitAnswer}
              />
            ))
          }
        </header>
      </div>
    );
}

export default App;
