'use client';

import React, { useState, useEffect } from 'react';

const ImageBackground: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // Images locales dans le dossier public/
  const backgroundImages = [
    '/bg1.jpg',
    '/bg2.jpg',
    '/bg3.jpg'
  ];

  useEffect(() => {
    setIsClient(true);
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change d'image toutes les 5 secondes

    return () => clearInterval(interval);
  }, []);

  // Afficher une image de base pendant le rendu serveur
  if (!isClient) {
    return (
      <div 
        id="image-background-container"
        className="fixed inset-0 -z-10 overflow-hidden"
        style={{ 
          opacity: 0.6,
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgroundImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>
    );
  }

  return (
    <div 
      id="image-background-container"
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ 
        zIndex: -1,
        opacity: 0.6,
      }}
    >
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ))}
    </div>
  );
};

export default ImageBackground;