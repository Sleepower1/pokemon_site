import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../PokemonDetail.css';

function EvolutionChain({ pokemonName }) {
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvolutionChain = async () => {
      try {
        // Fetch species data to get evolution chain URL
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`
        );
        if (!speciesResponse.ok) throw new Error('Species not found');
        const speciesData = await speciesResponse.json();

        // Fetch evolution chain data
        const chainResponse = await fetch(speciesData.evolution_chain.url);
        if (!chainResponse.ok) throw new Error('Evolution chain not found');
        const chainData = await chainResponse.json();

        // Parse the evolution chain into an array of objects with name and image
        const evolutions = [];
        let current = chainData.chain;

        while (current) {
          evolutions.push(current.species.name);
          // Take the first evolution if there are multiple
          current = current.evolves_to?.[0] || null;
        }

        // Fetch images for each evolution
        const evolutionDataWithImages = await Promise.all(
          evolutions.map(async (name) => {
            try {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
              );
              if (!response.ok) throw new Error('Pokemon not found');
              const data = await response.json();
              return {
                name: name,
                image: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
              };
            } catch (err) {
              return { name: name, image: null };
            }
          })
        );

        setEvolutionChain(evolutionDataWithImages);
      } catch (err) {
        console.error('Error fetching evolution chain:', err);
        setEvolutionChain([]);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonName) {
      fetchEvolutionChain();
    }
  }, [pokemonName]);

  if (loading) return <div className="evolution-loading">Loading evolution chain...</div>;
  if (evolutionChain.length === 0) return null;
  if (evolutionChain.length === 1) return null; // Don't show if no evolution

  return (
    <div className="evolution-chain-section">
      <h3>Evolution Chain</h3>
      <div className="evolution-chain">
        {evolutionChain.map((pokemon, index) => (
          <React.Fragment key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`} className="evolution-link">
              <div className="evolution-pokemon-card">
                {pokemon.image && (
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="evolution-pokemon-image"
                  />
                )}
                <span className="evolution-pokemon-name">{pokemon.name}</span>
              </div>
            </Link>
            {index < evolutionChain.length - 1 && <span className="evolution-arrow">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChain;
