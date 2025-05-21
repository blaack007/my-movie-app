import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import '../styles/components/Navbar.css'; // Create this file for custom navbar styles

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); // Clear input after navigation
    }
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" sticky="top" className="app-navbar">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="app-navbar__brand">
          MyMovieApp
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto app-navbar__links">
            <Nav.Link as={NavLink} to="/" end className="app-navbar__link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tv" className="app-navbar__link">
              TV Shows
            </Nav.Link>
            <Nav.Link as={NavLink} to="/watchlist" className="app-navbar__link">
              My Watchlist
            </Nav.Link>
            {/* Add other links like Wishlist, Search as needed */}
          </Nav>
          {/* Search Form */}
          <Form className="d-flex app-navbar__search-form" onSubmit={handleSearchSubmit}>
            <div className="position-relative w-100">
              <i className="fas fa-search app-navbar__search-icon"></i>
              <FormControl
                type="search"
                placeholder="Search movies, TV shows..."
                className="app-navbar__search-input"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="danger" 
              type="submit" 
              className="app-navbar__search-button"
            >
              Search
            </Button>
          </Form>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
