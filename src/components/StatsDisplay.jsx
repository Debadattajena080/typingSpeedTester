import React from 'react';

const StatsDisplay = ({ wpm, cpm, mistakes }) => (
  <div className="stats-display">
    <p>Words Per Minute: {wpm}</p>
    <p>Characters Per Minute: {cpm}</p>
    <p>Mistakes: {mistakes}</p>
  </div>
);

export default StatsDisplay;
