import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";



const ProductSeriesPage = () => {
  return (
    <div>
      <HeroSection 
        title="Series"
        titleSpan="Find our top product series and latest news"
        buttonText="Explore Series"
        buttonLink="/product"
        backgroundImage="https://celmomobilya.com/wp-content/uploads/2025/03/urun-lexus-1.jpg"
      />
      <div id="header-trigger" style={{ height: 1 }} />
      
      
    </div>
  );
};

export default ProductSeriesPage;