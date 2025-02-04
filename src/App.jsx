import { useState } from 'react';
import ResetButton from './components/ResetButton';

import { colors } from './data/color';

function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [guessResult, setGuessResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let currentColor = colors[colorIndex] || colors[0];

  const resetGame = () => {
    setColorIndex(0);
    setScore(0);
    setGuessResult(null);
    setShowModal(false);
    setIsLoading(false);
  };

  const handleButtonClick = (e) => {
    if (!isLoading) {
      setIsLoading(true);
      const selectedColor = e.target.id;
      const correctColor = colors[colorIndex].displayColor;

      if (selectedColor === correctColor) {
        setScore((prevScore) => prevScore + 5);
        setGuessResult(true);
        setTimeout(() => {
          setGuessResult(null);
          setIsLoading(false);
          setColorIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            if (newIndex >= colors.length) {
              setShowModal(true);
              return prevIndex;
            }
            return newIndex;
          });
        }, 1200);
      } else {
        setGuessResult(false);
        setTimeout(() => {
          setShowModal(true);
          setIsLoading(false);
        }, 1200);
      }
    }
  };

  return (
    <>
      <div className="container">
        <h1>Color Game</h1>

        <div className="score-container">
          <div className="score-board">
            <img src="trophy.webp" alt="trophy img" width={30} height={30} />
            <span id="score">{score}</span> points
          </div>
          <div className="page-number">
            <p>
              {colorIndex + 1} / {colors.length}
            </p>
          </div>
        </div>

        <div className="color-container">
          <p data-testid="gameInstructions">Guess the correct color!</p>
          <div
            className="color-box"
            id="color-box"
            data-testid="colorBox"
            style={{ backgroundColor: currentColor.displayColor }}
          ></div>
        </div>

        <div className="option-container">
          <p>Click on the correct color</p>

          {guessResult === false && (
            <p className={`${!guessResult && 'shake-lr'}`}>
              Oops! try again ❌
            </p>
          )}
          {guessResult === true && (
            <p className={`${guessResult && 'slide-in-fwd-center'}`}>
              You got it right! 👍
            </p>
          )}

          <div className="buttons" data-testid="colorOptions">
            {Object.keys(currentColor.options).map((option, index) => (
              <div
                type="button"
                className="btn"
                data-testid="colorOption"
                id={currentColor.options[option]}
                key={index}
                disabled={isLoading}
                style={{ backgroundColor: currentColor.options[option] }}
                onClick={handleButtonClick}
              ></div>
            ))}
          </div>
        </div>

        <div className="reset">
          <ResetButton
            btnTitle="Restart Game"
            onClick={resetGame}
            isLoading={isLoading}
          />
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className={`modal-content ${showModal && 'bounce-in-top'}`}>
            <h2>Game Over!</h2>
            <p>
              Your got {score} {score > 1 ? 'points' : 'point'}
            </p>
            <ResetButton
              btnTitle="Play Again"
              onClick={resetGame}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
