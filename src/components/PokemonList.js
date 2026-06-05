import React from 'react';
import { Link } from 'react-router-dom';

function resolveId(pokemon) {
  if (pokemon.id) return pokemon.id;
  if (pokemon.url) {
    const parts = pokemon.url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }
  return '';
}

export default function PokemonList({ pokemon }) {
  if (!pokemon || pokemon.length === 0) return <p>No Pokémon found.</p>;

  return (
    <div className="pokemon-list">
      {pokemon.map((p) => {
        const name = p.name || (p.species && p.species.name) || '';
        const id = resolveId(p);
        const key = name || id;

        // Determine an image URL: prefer sprites from full object, otherwise construct
        // official-artwork URL from the id (works for list items with url)
        let imageUrl = '';
        if (p.sprites?.other?.['official-artwork']?.front_default) {
          imageUrl = p.sprites.other['official-artwork'].front_default;
        } else if (p.sprites?.front_default) {
          imageUrl = p.sprites.front_default;
        } else if (id) {
          imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        }

        return (
          <Link key={key} to={`/pokemon/${name}`} className="pokemon-card-link">
            <div className="pokemon-card">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={name}
                  className="pokemon-thumb"
                  onError={(e) => {
                    // fallback to small sprite if official artwork fails
                    if (p.sprites?.front_default) e.target.src = p.sprites.front_default;
                    else e.target.style.display = 'none';
                  }}
                />
              ) : null}
              <h3>{name}</h3>
              <p>ID: {p.id || id}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

