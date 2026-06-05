import React from 'react';

const formatMoveName = (s) =>
  s
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

export default function MoveList({ moves = [] }) {
  if (!moves || moves.length === 0) return null;

  return (
    <div className="detail-section">
      <h2>Moves</h2>
      <div className="moves">
        {moves.map((move) => (
          <span key={move.move.name} className="move-badge">
            {formatMoveName(move.move.name)}
          </span>
        ))}
      </div>
    </div>
  );
}

