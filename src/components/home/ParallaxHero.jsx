import React from 'react';

const ParallaxHero = () => {
  return (
    <div
      className="relative  h-[500px] bg-fixed bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url('/peralex.png')`, // Your image path
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      {/* Text content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">IFBB Academy<br />Australia</h1>
        <p className="mt-4 text-lg md:text-2xl font-medium">
          Elevate Your Fitness Career with IFBB Fitness and<br />Sports Academy in Australia
        </p>
      </div>
    </div>
  );
};

export default ParallaxHero;
