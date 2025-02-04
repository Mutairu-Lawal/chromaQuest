import PropTypes from 'prop-types';
import { useCallback } from 'react';

export default function ResetButton({ btnTitle, onClick, isLoading }) {
  const handleReset = useCallback(() => {
    if (!isLoading) {
      onClick();
    }
  }, [isLoading, onClick]);
  return (
    <button
      type="reset"
      className="reset-button"
      id="btn"
      data-testid="newGameButton"
      onClick={handleReset}
      disabled={isLoading}
    >
      <img src="/replay.png" alt="restart button" width={20} height={20} />
      {btnTitle}
    </button>
  );
}

ResetButton.propTypes = {
  btnTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
