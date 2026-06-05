import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';
import AbilitiesSection from './components/AbilitiesSection';
import StatsSection from './components/StatsSection';
import PhysicalAttributes from './components/PhysicalAttributes';
import MoveList from './components/MoveList';

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (loading) return <div className="detail-loading">Loading...</div>;
  if (error) return <div className="detail-error">Error: {error}</div>;
  if (!pokemon) return <div className="detail-error">Pokemon not found</div>;

  const formatMoveName = (s) =>
    s
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-link">← Back to Search</Link>

      <div className="detail-container">
        <div className="detail-image">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
          />
        </div>

        <div className="detail-info">
          <h1>{pokemon.name.toUpperCase()}</h1>
          <p className="detail-id">#{String(pokemon.id).padStart(4, '0')}</p>

          <div className="detail-section">
            <h2>Types</h2>
            <div className="types">
              {pokemon.types?.map((type) => (
                <span key={type.type.name} className={`type-badge type-${type.type.name}`}>
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>

          <StatsSection stats={pokemon.stats} />

          <AbilitiesSection abilities={pokemon.abilities} />

          <PhysicalAttributes
            height={pokemon.height}
            weight={pokemon.weight}
            base_experience={pokemon.base_experience}
          />

          <MoveList moves={pokemon.moves} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;

