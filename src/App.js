import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from './PokemonDetail';
import './App.css';
import SearchBar from './components/SearchBar';
import PokemonList from './components/PokemonList';

function App() {
  const [Pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 150;
  const [totalCount, setTotalCount] = useState(0);

  // Fetch Pokemon data from PokeAPI
  const fetchPokemon = useCallback(async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      if (query.trim()) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
        if (!response.ok) throw new Error(`Pokemon "${query}" not found`);
        const data = await response.json();
        setPokemon([data]);
        setTotalCount(1);
      } else {
        const offset = (page - 1) * perPage;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`);
        if (!response.ok) throw new Error('Failed to fetch Pokemon list');
        const data = await response.json();
        setPokemon(data.results || []);
        setTotalCount(data.count || 0);
      }
    } catch (err) {
      setError(err.message);
      setPokemon([]);
    } finally {
      setLoading(false);
    }
  }, [page, perPage]);

  useEffect(() => {
    if (searchTerm.trim()) return;
    fetchPokemon();
  }, [page, searchTerm, fetchPokemon]);

  useEffect(() => {
    // If a search term is active, don't re-fetch the paginated list when page changes
    if (searchTerm.trim()) return;
    fetchPokemon();
  }, [page, searchTerm]);

  const handlePrevPage = () => {
    setPage((p) => Math.max(1, p - 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.max(1, Math.ceil(totalCount / perPage));
    setPage((p) => Math.min(totalPages, p + 1));
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <header className="App-header">
                <h1>🔴 Pokemon Database</h1>
                <SearchBar
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  onSearch={() => {
                    setPage(1);
                    fetchPokemon(searchTerm);
                  }}
                  onReset={() => {
                    setSearchTerm('');
                    setPage(1);
                  }}
                />
              </header>

              <main className="App-main">
                {loading && <p className="loading">Loading...</p>}
                {error && <p className="error">Error: {error}</p>}

                <PokemonList pokemon={Pokemon} />

                <div className="pagination" style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <button className="page-button" onClick={handlePrevPage} disabled={page <= 1}>
                    Previous
                  </button>
                  <span style={{ margin: '0 1rem', color: 'white' }}>
                    Page {page} of {Math.max(1, Math.ceil(totalCount / perPage))}
                  </span>
                  <button
                    className="page-button"
                    onClick={handleNextPage}
                    disabled={page >= Math.max(1, Math.ceil(totalCount / perPage))}
                  >
                    Next
                  </button>
                </div>
              </main>
            </div>
          }
        />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

