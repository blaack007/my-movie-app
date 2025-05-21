import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from "../apis/config";
import ShowsSlider from "../components/ShowsSlider";
import '../styles/pages/TvShowsPage.css';

export default function TvShowsPage() {
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [airingTV, setAiringTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = {
    popular: {
      title: "Popular Shows",
      endpoint: "/tv/popular",
      data: popularTV,
      setData: setPopularTV
    },
    topRated: {
      title: "Top Rated Shows",
      endpoint: "/tv/top_rated",
      data: topRatedTV,
      setData: setTopRatedTV
    },
    airing: {
      title: "Currently Airing",
      endpoint: "/tv/on_the_air",
      data: airingTV,
      setData: setAiringTV
    }
  };

  useEffect(() => {
    const fetchAllShows = async () => {
      try {
        const [popularRes, topRatedRes, airingRes] = await Promise.all([
          axiosInstance.get(`/tv/popular`),
          axiosInstance.get(`/tv/top_rated`),
          axiosInstance.get(`/tv/on_the_air`)
        ]);

        setPopularTV(popularRes.data.results);
        setTopRatedTV(topRatedRes.data.results);
        setAiringTV(airingRes.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllShows();
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
          Error loading TV shows: {error.message}
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
            to={`/category/${categoryKey}?type=tv`}
            className="view-all-link"
          >
            <span>View All</span>
            <i className="fas fa-chevron-right ms-2"></i>
          </Link>
        </div>

        <ShowsSlider 
          shows={category.data}
          title={category.title}
          mediaType="tv"
        />
      </div>
    );
  };

  return (
    <div className="tv-shows-container">
      <div className="page-header">
        <div className="container-xl">
          <div className="header-content">
            <h1 className="page-title">TV Shows Hub</h1>
            <p className="header-description">Explore trending series and discover your next binge-worthy show</p>
            <div className="header-decoration">
              <i className="fas fa-tv"></i>
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
