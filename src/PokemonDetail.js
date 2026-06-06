import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './PokemonDetail.css';
import AbilitiesSection from './components/AbilitiesSection';
import StatsSection from './components/StatsSection';
import PhysicalAttributes from './components/PhysicalAttributes';
import MoveList from './components/MoveList';
import EvolutionChain from './components/EvolutionChain';

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

  return (
    <div className="pokemon-detail">
      <Link to="/" className="back-link">← Back to Search</Link>

      <div className="detail-container">
        {/* Pokemon Header Box - Top Section */}
        <div className="pokemon-header-box">
          <div className="pokemon-image-evolution">
            <div className="detail-image">
              <img
                src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
                alt={pokemon.name}
              />
            </div>
            <EvolutionChain pokemonName={pokemon.name} />
          </div>
          <div className="pokemon-header-info">
            <h1>{pokemon.name.toUpperCase()}</h1>
            <p className="detail-id">#{String(pokemon.id).padStart(4, '0')}</p>
          </div>
        </div>

        {/* Stats and Types Row */}
        <div className="stats-types-row">
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
        </div>

        <div className="detail-info">
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

