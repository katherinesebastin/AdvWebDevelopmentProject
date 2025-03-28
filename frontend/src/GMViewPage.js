// src/GMViewPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

const GMViewPage = () => {
  const { id } = useParams();  // Get campaign ID from URL

  return (
    <div>
      <h1>GM view for campaign ID: {id}</h1>
    </div>
  );
};

export default GMViewPage;
