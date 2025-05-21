import React, { useState, useEffect } from 'react';
import ItemCard from '../components/ItemCard';
// Import watchlist utils
import { getWatchlist } from '../utils/watchlist'; 
import '../styles/pages/WatchlistPage.css'; // We'll create this CSS file next

// Helper function (can be moved to utils.js later)
// const getWatchlistFromLocalStorage = () => { ... }; // Removed

export default function WatchlistPage() {
  const [watchlistItems, setWatchlistItems] = useState({ movie: [], tv: [] });
  const [loading, setLoading] = useState(true);

  const loadWatchlist = () => {
    setLoading(true);
    const items = getWatchlist(); // Use imported function
    setWatchlistItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadWatchlist();

    // Optional: Listen for custom event to refresh watchlist if items are changed elsewhere
    const handleWatchlistUpdate = () => loadWatchlist();
    window.addEventListener('watchlistUpdated', handleWatchlistUpdate);
    return () => {
      window.removeEventListener('watchlistUpdated', handleWatchlistUpdate);
    };
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="loading-spinner" />
      </div>
    );
  }

  const { movie: movieItems, tv: tvShowItems } = watchlistItems;
  const isEmpty = movieItems.length === 0 && tvShowItems.length === 0;

  return (
    <div className="watchlist-page">
      <div className="page-header">
        <div className="container-xl">
          <div className="header-content">
            <h1 className="page-title">My Watchlist</h1>
            <p className="header-description">
              Keep track of your favorite movies and TV shows
            </p>
            <div className="header-decoration">
              <i className="fas fa-bookmark"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-4">
        {isEmpty ? (
          <div className="empty-watchlist text-center py-5">
            <p className="lead">Your watchlist is currently empty.</p>
            <p>Add movies and TV shows from their cards to see them here!</p>
          </div>
        ) : (
          <>
            {movieItems.length > 0 && (
              <section className="category-section mb-5">
                <div className="section-header">
                  <div className="section-title-container">
                    <h2 className="section-title">Movies</h2>
                    <div className="section-title-decoration"></div>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                  {movieItems.map(item => (
                    <div key={`movie-${item.id}`} className="col">
                      <ItemCard item={item} mediaType="movie" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tvShowItems.length > 0 && (
              <section className="category-section">
                <div className="section-header">
                  <div className="section-title-container">
                    <h2 className="section-title">TV Shows</h2>
                    <div className="section-title-decoration"></div>
                  </div>
                </div>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
                  {tvShowItems.map(item => (
                    <div key={`tv-${item.id}`} className="col">
                      {/* Ensure item has necessary props for ItemCard, may need to fetch full details if only IDs stored */}
                      <ItemCard item={item} mediaType="tv" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
} 