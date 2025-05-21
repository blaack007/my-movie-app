import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../styles/components/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="app-footer">
      <div className="back-to-top-container">
        <button 
          className="back-to-top-button" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <i className="fas fa-chevron-up"></i>
        </button>
      </div>
      <Container>
        <Row className="py-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="footer-brand mb-4">
              <h2>MyMovieApp</h2>
              <p className="mt-3">
                Discover your next favorite movies and TV shows with our comprehensive database and personalized recommendations.
              </p>
            </div>
            <div className="footer-social">
              <a href="https://www.facebook.com/mohamed.khaalifa" className="social-icon" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://github.com/blaack007" className="social-icon" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/mohamed-khalifa-656420269/" className="social-icon" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com/mohaamed__khalifa" className="social-icon" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
          <Col lg={2} md={6} sm={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tv">TV Shows</Link></li>
              <li><Link to="/watchlist">My Watchlist</Link></li>
              <li><Link to="/search">Search</Link></li>
            </ul>
          </Col>
          <Col lg={2} md={6} sm={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">Categories</h5>
            <ul className="footer-links">
              <li><Link to="/category/popular?type=movie">Popular Movies</Link></li>
              <li><Link to="/category/topRated?type=movie">Top Rated Movies</Link></li>
              <li><Link to="/category/popular?type=tv">Popular Shows</Link></li>
              <li><Link to="/category/topRated?type=tv">Top Rated Shows</Link></li>
            </ul>
          </Col>
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="footer-heading">About</h5>
            <ul className="footer-links">
              <li><a href="https://portfolio-two-phi-53.vercel.app/" target="_blank" rel="noopener noreferrer">About Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
            <div className="footer-attribution mt-3">
              <p className="mb-1">Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">The Movie Database API</a></p>
              <small>This product uses the TMDB API but is not endorsed or certified by TMDB.</small>
            </div>
          </Col>
        </Row>
        <div className="footer-divider"></div>
        <div className="footer-bottom py-3 text-center">
          <p className="mb-0">
            &copy; {currentYear} mohamed khalifa. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
