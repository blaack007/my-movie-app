import React, { useEffect, useState } from 'react';
import axiosInstance from "../apis/config";
import GenericModal from './GenericModal';

const API_KEY = `c3ba834e295dac6c3509ddb9e2387366`; // Consider moving to a central config

// Common fields to append for both movies and TV shows
const APPEND_TO_RESPONSE = "credits,recommendations,videos,keywords,reviews";

export default function ItemDetailsModal({ initialItem, mediaType, isOpen, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  useEffect(() => {
    if (isOpen && initialItem) {
      // Fetch details if they haven't been fetched for this item, or if the item ID changes
      if (!details || details.id !== initialItem.id) { 
        setIsLoadingDetails(true);
        setDetailsError(null);
        setDetails(null); // Clear previous details before fetching new ones

        const endpoint = `/${mediaType}/${initialItem.id}?api_key=${API_KEY}&append_to_response=${APPEND_TO_RESPONSE}`;
        
        axiosInstance.get(endpoint)
          .then(response => {
            setDetails(response.data);
            setIsLoadingDetails(false);
          })
          .catch(err => {
            console.error(`Error fetching ${mediaType} details:`, err);
            setDetailsError(err);
            setIsLoadingDetails(false);
          });
      }
    } else if (!isOpen) {
      // Reset states when modal is closed
      setDetails(null); 
      setIsLoadingDetails(false);
      setDetailsError(null);
    }
  }, [isOpen, initialItem, mediaType, details]); // Include details in dep array

  if (!isOpen || !initialItem) return null;

  // Merge initial item data with fetched details
  // The name/title from details might be more accurate or complete
  const itemForModal = details 
    ? { ...initialItem, ...details, 
        name: details.name || initialItem.name, // For TV
        title: details.title || initialItem.title // For Movie
      } 
    : initialItem; // Fallback to basic item info if details are not yet loaded

  return (
    <GenericModal 
      item={itemForModal} 
      isOpen={isOpen} 
      onClose={onClose} 
      mediaType={mediaType} 
      isLoadingDetails={isLoadingDetails}
      detailsError={detailsError}
    />
  );
} 