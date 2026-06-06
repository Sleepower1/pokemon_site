# 🔴 Pokemon Database

A modern web application for searching and exploring Pokemon data. Built with React, this application provides an intuitive interface to browse, search, and view detailed information about Pokemon from the official PokeAPI.

## Features

- **Search Pokemon**: Quickly find Pokemon by name
- **Browse Database**: Paginated list of all Pokemon (150+ results)
- **Detailed View**: Click on any Pokemon to see comprehensive information including:
  - Physical attributes (height, weight, types)
  - Stats and abilities
  - Evolution chain
  - Available moves
  - Alternative forms
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Loading States**: Visual feedback while fetching data

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router DOM 6.30.4
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **API**: [PokéAPI](https://pokeapi.co/) - Free, open-source Pokemon data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon_site
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (⚠️ irreversible)

## Project Structure

```
pokemon_site/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AbilitiesSection.js     # Pokemon abilities display
│   │   ├── EvolutionChain.js       # Evolution information
│   │   ├── FormsList.js            # Alternative forms
│   │   ├── MoveList.js             # Available moves
│   │   ├── PhysicalAttributes.js   # Height, weight, types
│   │   ├── PokemonList.js          # List view component
│   │   ├── SearchBar.js            # Search functionality
│   │   └── StatsSection.js         # Stats visualization
│   ├── App.js                      # Main application component
│   ├── App.css                     # Application styling
│   ├── PokemonDetail.js            # Detail view component
│   ├── PokemonDetail.css           # Detail view styling
│   ├── index.js                    # React root entry point
│   └── index.css                   # Global styling
├── package.json                    # Project dependencies
└── README.md                       # This file
```

## Usage

### Searching for Pokemon

1. Use the search bar at the top of the page
2. Type the Pokemon name (case-insensitive)
3. Press Enter or click the Search button
4. View the detailed information for that Pokemon

### Browsing Pokemon List

1. The home page displays a paginated list of Pokemon
2. Use the Previous/Next buttons to navigate between pages
3. Click on any Pokemon card to view detailed information

### Viewing Pokemon Details

- Navigate to a Pokemon detail page to see:
  - Base stats with visual representations
  - Abilities and special abilities
  - Physical characteristics
  - Evolution chain
  - Move set
  - Available forms/variations

## API Integration

This application uses the free [PokéAPI](https://pokeapi.co/):
- No authentication required
- Rate limiting: 100 requests per minute (per IP)
- Endpoints used:
  - `GET /api/v2/pokemon` - List Pokemon with pagination
  - `GET /api/v2/pokemon/{id|name}` - Get specific Pokemon details

## Component Overview

- **App.js**: Main component handling routing, search, and pagination
- **SearchBar.js**: Search input and controls
- **PokemonList.js**: Displays list of Pokemon in cards
- **PokemonDetail.js**: Full detail view with multiple sections
- **StatsSection.js**: Visual stat bars and values
- **PhysicalAttributes.js**: Height, weight, and types display
- **AbilitiesSection.js**: Pokemon abilities information
- **EvolutionChain.js**: Evolution line visualization
- **MoveList.js**: Available moves listing
- **FormsList.js**: Alternative forms/variants

## Performance Considerations

- Pagination limits API calls (150 Pokemon per page)
- Search results cached during session
- Lazy loading of Pokemon details
- Optimized re-renders with React hooks

## Troubleshooting

### "Pokemon not found" error
- Ensure the Pokemon name is spelled correctly
- Try using the Pokemon's official English name
- Use the lowercase version of the name

### No Pokemon loading
- Check your internet connection
- Verify the PokéAPI is accessible (https://pokeapi.co/)
- Check browser console for specific error messages

### Slow performance
- Clear browser cache
- Check network connection speed
- Reduce number of simultaneous requests

## Future Enhancements

- [ ] Filter by type, generation, or stats
- [ ] Favorite/bookmark Pokemon
- [ ] Compare multiple Pokemon stats
- [ ] Trading card collection tracker
- [ ] Offline mode support
- [ ] Dark/Light theme toggle

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project uses data from PokéAPI, which is available under the BSD License.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Contact & Support

For issues or questions, please create an issue in the repository.

---

**Enjoy exploring the Pokemon database! 🎮**

