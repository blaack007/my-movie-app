import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axiosInstance from '../apis/config';
import ItemCard from '../components/ItemCard';
import Pagination from '../components/Pagination';
import '../styles/pages/SearchPage.css';

export default function SearchPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const query = useMemo(() => new URLSearchParams(location.search).get('query') || '', [location.search]);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setTotalPages(0);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `/search/multi`, { 
            params: { 
              query: encodeURIComponent(query), 
              page: currentPage
            } 
          }
        );
        
        const filteredResults = response.data.results.filter(
          item => (item.media_type === 'movie' || item.media_type === 'tv') && item.poster_path
        );

        setSearchResults(filteredResults);
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);

      } catch (err) {
        console.error("Error fetching search results:", err);
        setError(err);
        setSearchResults([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="search-page container-xl py-4">
      <div className="page-header mb-4">
        {query ? (
          <h1 className="page-title">Search Results for: <span className="search-query-display">{query}</span></h1>
        ) : (
          <h1 className="page-title">Search</h1>
        )}
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="loading-spinner" />
        </div>
      )}

      {error && (
        <div className="error-message text-center py-5">
          Error loading search results: {error.message}
        </div>
      )}

      {!loading && !error && searchResults.length === 0 && query && (
        <div className="text-center py-5">
          <p className="lead">No results found for "{query}".</p>
          <p>Try a different search term or check your spelling.</p>
        </div>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
            {searchResults.map(item => (
              <div key={`${item.media_type}-${item.id}`} className="col">
                <ItemCard item={item} mediaType={item.media_type} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {!query && !loading && (
        <div className="text-center py-5">
          <p className="lead">Please enter a search term in the navigation bar to find movies and TV shows.</p>
        </div>
      )}
    </div>
  );
} 