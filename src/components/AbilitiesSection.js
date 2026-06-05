import React from 'react';

export default function AbilitiesSection({ abilities = [] }) {
  if (!abilities || abilities.length === 0) return null;

  return (
    <div className="detail-section">
      <h2>Abilities</h2>
      <div className="abilities">
        {abilities.map((ability) => (
          <span key={ability.ability.name} className="ability">
            {ability.ability.name}
            {ability.is_hidden && <span className="hidden-badge">Hidden</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

