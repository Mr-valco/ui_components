import React from 'react';
import ContentLoader from 'react-content-loader';

const KPICardLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width={400}
      height={150}
      viewBox="0 0 400 150"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      style={{ boxShadow: '0 0 0 2px #ecebeb', borderRadius: '5px' }} // Add the box shadow
    >
      

      {/* Title Block */}
      <rect x="20" y="20" rx="4" ry="4" width="250" height="20" fill="#ecebeb" />

      {/* Number Block */}
      <rect x="20" y="60" rx="4" ry="4" width="150" height="30" fill="#ecebeb" />

      {/* Subtitle Block */}
      <rect x="20" y="110" rx="4" ry="4" width="200" height="15" fill="#ecebeb" />
      <circle cx="356" cy="68" r="36" />
    </ContentLoader>
  );
};

export default KPICardLoader;
