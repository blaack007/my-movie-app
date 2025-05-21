import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages/NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for seems to have vanished like a movie
          that never made it to the big screen.
        </p>
        <div className="not-found-links">
          <Link to="/" className="btn btn-primary me-3">
            <i className="fas fa-home me-2"></i>Home
          </Link>
          <Link to="/tv" className="btn btn-outline-secondary me-3">
            <i className="fas fa-tv me-2"></i>TV Shows
          </Link>
          <Link to="/watchlist" className="btn btn-outline-secondary">
            <i className="fas fa-bookmark me-2"></i>Watchlist
          </Link>
        </div>
      </div>
    </div>
  );
}
