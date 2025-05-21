// src/utils/watchlist.js

export const getWatchlist = () => {
  const watchlist = localStorage.getItem('watchlist');
  return watchlist ? JSON.parse(watchlist) : { movie: [], tv: [] }; // Ensure a default structure
};

export const updateWatchlist = (newWatchlist) => {
  localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  // Dispatch a custom event to notify other components (like WatchlistPage)
  window.dispatchEvent(new CustomEvent('watchlistUpdated'));
};

// Added utility functions for specific operations
export const addItemToWatchlist = (item, mediaType) => {
  const watchlist = getWatchlist();
  const existingItems = watchlist[mediaType] || [];
  
  // Check if item already exists in watchlist
  if (!existingItems.some(existing => existing.id === item.id)) {
    // Determine title based on media type (fallback for API inconsistencies)
    const title = mediaType === 'movie' ? (item.title || item.name) : (item.name || item.title);
    
    // Add to watchlist with minimal required data
    const watchlistItem = { 
      id: item.id, 
      title: title, 
      poster_path: item.poster_path, 
      vote_average: item.vote_average,
      mediaType // Store mediaType for easier filtering/display
    };
    
    updateWatchlist({
      ...watchlist,
      [mediaType]: [...existingItems, watchlistItem]
    });
    
    return true; // Added successfully
  }
  
  return false; // Already exists
};

export const removeItemFromWatchlist = (itemId, mediaType) => {
  const watchlist = getWatchlist();
  const existingItems = watchlist[mediaType] || [];
  
  // Filter out the item to remove
  const updatedItems = existingItems.filter(item => item.id !== itemId);
  
  // Only update if we actually removed something
  if (updatedItems.length !== existingItems.length) {
    updateWatchlist({
      ...watchlist,
      [mediaType]: updatedItems
    });
    return true; // Removed successfully
  }
  
  return false; // Item not found
};

export const isItemInWatchlist = (itemId, mediaType) => {
  const watchlist = getWatchlist();
  return (watchlist[mediaType] || []).some(item => item.id === itemId);
};

// You could also add specific functions here like:
// export const addItemToWatchlist = (item, mediaType) => { ... }
// export const removeItemFromWatchlist = (itemId, mediaType) => { ... }
// For now, the get/update approach is fine as used by ItemCard. 