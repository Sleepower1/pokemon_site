import React from 'react';

export default function PhysicalAttributes({ height, weight, base_experience }) {
  return (
    <div className="detail-section">
      <h2>Physical Attributes</h2>
      <div className="attributes">
        <div className="attribute">
          <span className="attribute-label">Height:</span>
          <span className="attribute-value">{height != null ? `${height / 10} m` : '—'}</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">Weight:</span>
          <span className="attribute-value">{weight != null ? `${weight / 10} kg` : '—'}</span>
        </div>
        <div className="attribute">
          <span className="attribute-label">Base Experience:</span>
          <span className="attribute-value">{base_experience != null ? base_experience : '—'}</span>
        </div>
      </div>
    </div>
  );
}

