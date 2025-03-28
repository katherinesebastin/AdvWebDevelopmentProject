// src/PlayerViewPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const PlayerViewPage = () => {
  const { id } = useParams();  // Get campaign ID from URL

  return (
    <div>
      <h1>Player View for Campaign ID: {id}</h1>
    </div>
  );
};

export default PlayerViewPage;
