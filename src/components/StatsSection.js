import React from 'react';

export default function StatsSection({ stats = [] }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className="detail-section">
      <h2>Stats</h2>
      <div className="stats-list">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="stat-row">
            <span className="stat-name">{stat.stat.name}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
            </div>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

