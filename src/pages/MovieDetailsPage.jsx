import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance, { IMAGE_BASE_URL } from "../apis/config";
import ShowsSlider from "../components/ShowsSlider";
import HeroSection from "../components/details/HeroSection";
import MovieInfo from "../components/details/MovieInfo";
import CastList from "../components/details/CastList";
import ReleaseDateAndProduction from "../components/details/ReleaseDateAndProduction";
import TrailerPlayer from "../components/details/TrailerPlayer";
import '../styles/pages/MovieDetailsPage.css';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageBaseUrl = `${IMAGE_BASE_URL}original`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [movieDetails, credits, similar, videos] = await Promise.all([
          axiosInstance.get(`/movie/${id}`),
          axiosInstance.get(`/movie/${id}/credits`),
          axiosInstance.get(`/movie/${id}/similar`),
          axiosInstance.get(`/movie/${id}/videos`)
        ]);
        setDetails({ ...movieDetails.data, credits: credits.data, similar: similar.data.results, videos: videos.data.results });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (!loading && details) window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loading, details]);

  if (loading) return <div className="d-flex justify-content-center align-items-center min-vh-100"><div className="loading-spinner" /></div>;
  if (error) return <div className="container py-5"><div className="error-message">Error loading movie details: {error.message}</div></div>;
  if (!details) return null;

  const trailer = details.videos?.find(video => video.site === "YouTube" && video.type === "Trailer");

  return (
    <div className="movie-details">
      <HeroSection details={details} imageBaseUrl={imageBaseUrl} />
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-12">
            <h3 className="section-title">Movie Information</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            <MovieInfo details={details} />
            <CastList cast={details.credits.cast} imageBaseUrl={imageBaseUrl} />
          </div>
          <div className="col-lg-4">
            <ReleaseDateAndProduction details={details} imageBaseUrl={imageBaseUrl} />
          </div>
        </div>
        {trailer && (
          <section className="mt-4">
            <div className="row">
              <div className="col-12">
                <TrailerPlayer videoId={trailer.key} />
              </div>
            </div>
          </section>
        )}
        {details.similar.length > 0 && (
          <section className="mt-5">
            <ShowsSlider shows={details.similar} title="Similar Movies" />
          </section>
        )}
      </div>
    </div>
  );
}
