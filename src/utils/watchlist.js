// src/utils/watchlist.js

export const getWatchlist = () => {
  const watchlist = localStorage.getItem('watchlist');
  return watchlist ? JSON.parse(watchlist) : { movie: [], tv: [] };
};

export const updateWatchlist = (newWatchlist) => {
  localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
  window.dispatchEvent(new CustomEvent('watchlistUpdated'));
};

export const addItemToWatchlist = (item, mediaType) => {
  const watchlist = getWatchlist();
  const existingItems = watchlist[mediaType] || [];
  
  if (!existingItems.some(existing => existing.id === item.id)) {
    const title = mediaType === 'movie' ? (item.title || item.name) : (item.name || item.title);
    
    const watchlistItem = { 
      id: item.id, 
      title: title, 
      poster_path: item.poster_path, 
      vote_average: item.vote_average,
      mediaType 
    };
    
    updateWatchlist({
      ...watchlist,
      [mediaType]: [...existingItems, watchlistItem]
    });
    
    return true;
  }
  
  return false;
};

export const removeItemFromWatchlist = (itemId, mediaType) => {
  const watchlist = getWatchlist();
  const existingItems = watchlist[mediaType] || [];
  
  const updatedItems = existingItems.filter(item => item.id !== itemId);
  
  if (updatedItems.length !== existingItems.length) {
    updateWatchlist({
      ...watchlist,
      [mediaType]: updatedItems
    });
    return true;
  }
  
  return false;
};

export const isItemInWatchlist = (itemId, mediaType) => {
  const watchlist = getWatchlist();
  return (watchlist[mediaType] || []).some(item => item.id === itemId);
};
