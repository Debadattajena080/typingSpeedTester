import React from 'react';

const TypingArea = ({ typedText, onInputChange, disabled }) => (
  <textarea
    value={typedText}
    onChange={(e) => onInputChange(e.target.value)}
    disabled={disabled}
    placeholder="Start typing here..."
    className="typing-area"
  />
);

export default TypingArea;
