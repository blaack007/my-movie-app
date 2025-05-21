import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const TvShowDetailsPage = lazy(() => import("./pages/TvShowDetailsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchPage"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-content">
        <Suspense fallback={
          <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="loading-spinner" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/tv" element={<TvShowsPage />} />
            <Route path="/tv/:id" element={<TvShowDetailsPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
