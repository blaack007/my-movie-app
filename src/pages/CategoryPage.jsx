import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from "../apis/config";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import '../styles/pages/CategoryPage.css';

export default function CategoryPage() {
  const { category: routeCategory } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const mediaType = useMemo(() => queryParams.get('type') || 'tv', [queryParams]);

  const pageConfig = useMemo(() => {
    const baseConfig = {
      tv: {
        popular: { title: "Popular Shows", endpoint: "/tv/popular" },
        topRated: { title: "Top Rated Shows", endpoint: "/tv/top_rated" },
        airing: { title: "Currently Airing Shows", endpoint: "/tv/on_the_air" }
      },
      movie: {
        popular: { title: "Popular Movies", endpoint: "/movie/popular" },
        topRated: { title: "Top Rated Movies", endpoint: "/movie/top_rated" },
        upcoming: { title: "Upcoming Movies", endpoint: "/movie/upcoming" }
    }
  };
    return baseConfig[mediaType]?.[routeCategory];
  }, [mediaType, routeCategory]);

  useEffect(() => {
    if (!pageConfig) {
      navigate('/not-found', { replace: true });
      return;
    }

    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          `${pageConfig.endpoint}`, { params: { page: currentPage } }
        );
        setItems(response.data.results);
        setTotalPages(response.data.total_pages > 500 ? 500 : response.data.total_pages);
      } catch (err) {
        console.error(`Error fetching ${mediaType} category ${routeCategory}:`, err);
        setError(err);
        setItems([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, pageConfig, navigate, mediaType, routeCategory]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="loading-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="error-message">
          Error loading {mediaType === 'tv' ? 'shows' : 'movies'}: {error.message}
        </div>
      </div>
    );
  }

  if (!pageConfig) {
    return (
      <div className="container py-5">
        <div className="error-message">Invalid category or media type specified.</div>
      </div>
    );
  }

  return (
    <div className="category-page container-xl py-4">
      <div className="category-page-header">
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate(mediaType === 'tv' ? '/tv' : '/')}
        >
          ← Back
        </button>
        <h1 className="page-title-text">{pageConfig.title}</h1>
      </div>

      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {items.map(item => (
          <div key={item.id} className="col">
            <ItemCard item={item} mediaType={mediaType} />
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
    </div>
  );
} 