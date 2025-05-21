# MyMovieApp

A modern, responsive React application for browsing movies and TV shows using The Movie Database (TMDB) API. This application provides users with an intuitive interface to discover movies and TV shows, view details, search for specific titles, and maintain a personal watchlist.

## Live Demo

Visit the application at [https://my-movie-app-demo.vercel.app]([https://my-movie-app-demo.vercel.app](https://vercel.com/mohamed-ahmed-khalifas-projects/my-movie-app)) (placeholder URL)


## Features

- **Movie & TV Show Browsing**: Navigate through popular, top-rated, and upcoming movies; popular, top-rated, and currently airing TV shows
- **Detailed Information**: View comprehensive details including cast, ratings, release dates, trailers, and related content
- **Personal Watchlist**: Add movies and TV shows to a persistent watchlist for later viewing
- **Search Functionality**: Find specific movies and TV shows quickly with an integrated search feature
- **Category Exploration**: Browse content by different categories
- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Modern UI**: Sleek, intuitive interface with smooth animations and transitions

## Technology Stack

- **React**: Frontend library for building user interfaces
- **React Router**: Handling navigation and routing
- **Axios**: API requests with centralized configuration
- **Bootstrap**: Base styling and responsive grid system
- **Custom CSS**: Personalized styling using CSS variables for theming
- **Vite**: Fast and efficient development and build tooling
- **Local Storage**: Persisting user watchlist data
- **TMDB API**: External API for movie and TV show data

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- TMDB API key (sign up at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup))

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/my-movie-app.git
   cd my-movie-app
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Project Architecture

### Directory Structure

```
/src
  /apis
    config.js           # API configuration with axios
  /components
    /details            # Components for detail pages (cast, info, etc.)
    ItemCard.jsx        # Reusable card component for movies/shows
    Navbar.jsx          # Application navigation bar
    Footer.jsx          # Application footer with navigation
    ShowsSlider.jsx     # Horizontal scrollable content display
  /pages
    MoviesPage.jsx      # Home page with movie categories
    TvShowsPage.jsx     # TV shows listings page
    MovieDetailsPage.jsx # Detailed view for a specific movie
    TvShowDetailsPage.jsx # Detailed view for a specific TV show
    CategoryPage.jsx    # Category-specific listings
    WatchlistPage.jsx   # User's saved content
    SearchPage.jsx      # Search results display
    NotFoundPage.jsx    # 404 page
  /styles
    /components         # Component-specific styles
    /pages              # Page-specific styles
    App.css             # Global application styles
  /utils
    watchlist.js        # Utilities for watchlist management
  App.jsx               # Main application component with routes
  main.jsx              # Application entry point
```

### Key Design Patterns

1. **Lazy Loading**: Components are loaded on-demand using React.lazy() to improve initial load performance
2. **Component Composition**: Complex UI elements are broken down into smaller, reusable components
3. **CSS Variables**: Theme colors and styling values are centralized with CSS variables
4. **Responsive Design**: Mobile-first approach with Bootstrap grid and custom media queries
5. **API Abstraction**: Centralized API configuration with error handling

## Performance Optimizations

- **Code Splitting**: Lazy loading for route-based code splitting
- **Image Optimization**: Proper sizing and lazy loading of images
- **Caching Strategy**: Browser caching for static assets
- **Minimal Dependencies**: Limited use of external libraries to reduce bundle size
- **Efficient Rendering**: Careful use of React's memo and useMemo for expensive operations

## Future Improvements

- Add user authentication for personalized experiences
- Implement advanced filtering options (by genre, year, etc.)
- Add user ratings and reviews
- Enhance accessibility features
- Add offline support with service workers
- Implement server-side rendering for improved SEO

## Credits and Acknowledgements

- **Developer**: Mohamed Khalifa
- **Data Source**: [The Movie Database (TMDB)](https://www.themoviedb.org/) API
- **Portfolio**: [Visit Developer Portfolio](https://portfolio-two-phi-53.vercel.app/)
- **Contact**: 
  - [GitHub](https://github.com/blaack007)
  - [LinkedIn](https://www.linkedin.com/in/mohamed-khalifa-656420269/)
  - [Instagram](https://www.instagram.com/mohaamed__khalifa)
  - [Facebook](https://www.facebook.com/mohamed.khaalifa)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

&copy; 2023 Mohamed Khalifa. All rights reserved.
