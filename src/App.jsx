import { useState } from 'react';
import ResetButton from './components/ResetButton';

const colors = [
  {
    displayColor: '#00B9E8',
    options: {
      option1: '#00B9E8',
      option2: '#007FFF',
      option3: '#89CFF0',
      option4: '#318CE7',
      option5: '#7BAFD4',
      option6: '#468FEA',
    },
  },
  {
    displayColor: '#964B00',
    options: {
      option1: '#BF5700',
      option2: '#ED9121',
      option3: '#E09540',
      option4: '#964B00',
      option5: '#FF8C00',
      option6: '#E25822',
    },
  },
  {
    displayColor: '#FFEF00',
    options: {
      option1: '#E4D00A',
      option2: '#EEDC82',
      option3: '#D4AF37',
      option4: '#DFFF00',
      option5: '#FFEF00',
      option6: '#FCF75E',
    },
  },
  {
    displayColor: '#C04000',
    options: {
      option1: '#F04A00',
      option2: '#FF7538',
      option3: '#C04000',
      option4: '#FF5800',
      option5: '#EC5800',
      option6: '#FF8F00',
    },
  },
  {
    displayColor: '#9400D3',
    options: {
      option1: '#6F00FF',
      option2: '#BF00FF',
      option3: '#8806CE',
      option4: '#FF00FF',
      option5: '#5A4FCF',
      option6: '#9400D3',
    },
  },
  {
    displayColor: '#F4C430',
    options: {
      option1: '#FF8F00',
      option2: '#B56917',
      option3: '#F4C430',
      option4: '#F1B42F',
      option5: '#FFA000',
      option6: '#FFA500',
    },
  },
  {
    displayColor: '#317873',
    options: {
      option1: '#29AB87',
      option2: '#99FFFF',
      option3: '#3AA8C1',
      option4: '#317873',
      option5: '#DFFFFD',
      option6: '#3AB09E',
    },
  },
  {
    displayColor: '#008B8B',
    options: {
      option1: '#00FFFF',
      option2: '#007BA7',
      option3: '#B2FFFF',
      option4: '#0D98BA',
      option5: '#006D6F',
      option6: '#008B8B',
    },
  },
  {
    displayColor: '#F0F8FF',
    options: {
      option1: '#F0FFFF',
      option2: '#E0FFFF',
      option3: '#DFFFFD',
      option4: '#F0F8FF',
      option5: '#DFFFFD',
      option6: '#81D8D0',
    },
  },
  {
    displayColor: '#007FFF',
    options: {
      option1: '#0070BB',
      option2: '#89CFF0',
      option3: '#003262',
      option4: '#2072AF',
      option5: '#007FFF',
      option6: '#0000FF',
    },
  },
  {
    displayColor: '#246BCE',
    options: {
      option1: '#0070BB',
      option2: '#0047AB',
      option3: '#003262',
      option4: '#007BA7',
      option5: '#246BCE',
      option6: '#468FEA',
    },
  },
  {
    displayColor: '#00009C',
    options: {
      option1: '#1034A6',
      option2: '#0047AB',
      option3: '#1164B4',
      option4: '#00009C',
      option5: '#002FA7',
      option6: '#26619C',
    },
  },
  {
    displayColor: '#E52B50',
    options: {
      option1: '#AB274F',
      option2: '#E52B50',
      option3: '#FF91AF',
      option4: '#DE3163',
      option5: '#856088',
      option6: '#DC143C',
    },
  },
  {
    displayColor: '#8B008B',
    options: {
      option1: '#B53389',
      option2: '#683068',
      option3: '#FF00FF',
      option4: '#FF1DCE',
      option5: '#614051',
      option6: '#8B008B',
    },
  },
  {
    displayColor: '#FF00FF',
    options: {
      option1: '#F653A6',
      option2: '#683068',
      option3: '#FF00FF',
      option4: '#FF1DCE',
      option5: '#614051',
      option6: '#8B008B',
    },
  },
  {
    displayColor: '#C71585',
    options: {
      option1: '#F653A6',
      option2: '#FF6FFF',
      option3: '#CC33CC',
      option4: '#C71585',
      option5: '#CF71AF',
      option6: '#8B008B',
    },
  },
  {
    displayColor: '#555555',
    options: {
      option1: '#6082B6',
      option2: '#2A3439',
      option3: '#555555',
      option4: '#4D5D53',
      option5: '#BEBFC5',
      option6: '#2F4F4F',
    },
  },
  {
    displayColor: '#301934',
    options: {
      option1: '#301934',
      option2: '#343434',
      option3: '#191970',
      option4: '#111111',
      option5: '#301934',
      option6: '#414A4C',
    },
  },
  {
    displayColor: '#D05340',
    options: {
      option1: '#ED2939',
      option2: '#FF7F7F',
      option3: '#800000',
      option4: '#FFE4E1',
      option5: '#D05340',
      option6: '#C08081',
    },
  },
  {
    displayColor: '#32174D',
    options: {
      option1: '#483C32',
      option2: '#343434',
      option3: '#242124',
      option4: '#32174D',
      option5: '#301934',
      option6: '#343434',
    },
  },
];

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
              <button
                type="button"
                className="btn"
                data-testid="colorOption"
                id={currentColor.options[option]}
                key={index}
                disabled={isLoading}
                style={{ backgroundColor: currentColor.options[option] }}
                onClick={handleButtonClick}
              ></button>
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
