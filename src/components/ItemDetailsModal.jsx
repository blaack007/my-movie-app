import React, { useEffect, useState } from 'react';
import axiosInstance from "../apis/config";
import GenericModal from './GenericModal';

const APPEND_TO_RESPONSE = "credits,recommendations,videos,keywords,reviews";

export default function ItemDetailsModal({ initialItem, mediaType, isOpen, onClose }) {
  const [details, setDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  useEffect(() => {
    if (isOpen && initialItem) {
      if (!details || details.id !== initialItem.id) { 
        setIsLoadingDetails(true);
        setDetailsError(null);
        setDetails(null);

        const endpoint = `/${mediaType}/${initialItem.id}?append_to_response=${APPEND_TO_RESPONSE}`;
        
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
      setDetails(null); 
      setIsLoadingDetails(false);
      setDetailsError(null);
    }
  }, [isOpen, initialItem, mediaType, details]);

  if (!isOpen || !initialItem) return null;

  const itemForModal = details 
    ? { ...initialItem, ...details, 
        name: details.name || initialItem.name,
        title: details.title || initialItem.title
      } 
    : initialItem;

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