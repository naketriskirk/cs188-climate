import React from 'react';
import './WebRatingButton.css';

const WebRatingButton = ({ onClick }) => {
  return (
    <button className="circular-button" onClick={onClick}>
      Open Extension
    </button>
  );
};

export default WebRatingButton;