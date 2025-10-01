import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import SeriesText from "./components/SeriesText/SeriesText";
import NewsSection from "@/components/NewsSection/NewsSection";
import ProductNewsSlider from "@/components/ProductNewsSlider/ProductNewsSlider";
import PaletteLeftImage from "@/components/Palette/PaletteLeftImage/PaletteLeftImage";
import Form from "@/components/Form/Form";


const ProductSeriesPage = () => {
  return (
    <div>
      <HeroSection 
        title="Series"
        titleSpan="Find our top product series and latest news"
        buttonText="Explore Series"
        buttonLink="/product"
        backgroundImage="https://png.pngtree.com/background/20250227/original/pngtree-vibrant-room-interior-yellow-armchair-plant-dark-wood-wall-and-parquet-picture-image_13315139.jpg"
        variant="productseries"
      />
      <div id="header-trigger" style={{ height: 1 }} />
      <SeriesText/>
      <NewsSection showTitle={false}/>
      <ProductNewsSlider/>
      <PaletteLeftImage
        title='Unique Montana creations in your favourite colours'
        description='Design the home of your dreams with classic Montana. 36 basic modules, 4 depths, and 41 colours let you create storage solutions with character. Make your composition with our many modules. Customise it with your choice of components. And finish it all off with your favourite colours. Very simple – and with plenty of room for personality.'
        buttonText='Discover Colour Classes here'
        buttonLink='/collections/summer'
        imageUrl='https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2019/montana_home_19_diningroom_rhubarb_cumin_jwtable_w.jpg?mode=crop&width=828&height=595'
        backgroundColor='#FEF4BD'
        imageSize='large'
      />
      <Form/>
    </div>
  );
};

export default ProductSeriesPage;