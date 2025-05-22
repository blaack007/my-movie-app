import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../apis/config";
import ShowsSlider from "../components/ShowsSlider";
import '../styles/pages/MoviesPage.css';

export default function MoviesPage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    popular: {
      title: "Popular Movies",
      endpoint: "/movie/popular",
      data: popularMovies,
      setData: setPopularMovies
    },
    topRated: {
      title: "Top Rated Movies",
      endpoint: "/movie/top_rated",
      data: topRatedMovies,
      setData: setTopRatedMovies
    },
    upcoming: {
      title: "Upcoming Movies",
      endpoint: "/movie/upcoming",
      data: upcomingMovies,
      setData: setUpcomingMovies
    }
  };

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [popularRes, topRatedRes, upcomingRes] = await Promise.all([
          axiosInstance.get(`/movie/popular`),
          axiosInstance.get(`/movie/top_rated`),
          axiosInstance.get(`/movie/upcoming`)
        ]);

        setPopularMovies(popularRes.data.results);
        setTopRatedMovies(topRatedRes.data.results);
        setUpcomingMovies(upcomingRes.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

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
          Error loading movies: {error.message}
        </div>
      </div>
    );
  }

  const renderCategory = (categoryKey) => {
    const category = categories[categoryKey];
    
    return (
      <div key={categoryKey} className="category-section mb-5">
        <div className="section-header">
          <div className="section-title-container">
            <h2 className="section-title">{category.title}</h2>
            <div className="section-title-decoration"></div>
          </div>
          <Link 
            to={`/category/${categoryKey}?type=movie`}
            className="view-all-link"
          >
            <span>View All</span>
            <i className="fas fa-chevron-right ms-2"></i>
          </Link>
        </div>

        <ShowsSlider 
          shows={category.data}
          title={category.title}
          mediaType="movie"
        />
      </div>
    );
  };

  return (
    <div className="movies-container">
      <div className="page-header">
        <div className="container-xl">
          <div className="header-content">
            <h1 className="page-title">Movies Hub</h1>
            <p className="header-description">Discover the latest and greatest films from around the world</p>
            <div className="header-decoration">
              <i className="fas fa-film"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-xl py-4">
        {Object.keys(categories).map(categoryKey => renderCategory(categoryKey))}
      </div>
    </div>
  );
} 