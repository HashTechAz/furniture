import React from 'react';
import ColoursHero from './components/ColoursHero/ColoursHero';
import ColoursAbout from './components/ColoursAbout/ColoursAbout';
import ColoursImg from './components/ColoursImg/ColoursImg';
import ColoursPalette from './components/ColoursPalette/ColoursPalette';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import Palette from '@/components/Palette/Palette';

const ColoursPage = () => {
  return (
    <div>
      <ColoursHero />
      <ColoursAbout />
      <ColoursImg />
      <ColoursPalette />
      <ProductSlider />
      <Palette
        category=""
        title="Paint your walls in a Montana colour "
        description="Refresh your walls with Montana colours. Pair wall hues with your furniture for a soothing, cohesive look, or choose contrasting shades for a more dynamic interior style. Our carefully curated palette features a range of colours that work well together, allowing you to design a home that is uniquely yours. Get an overview of the RAL/NCS codes for painting in all of our 41 lacquer colours here."
        buttonText="View all colours"
        buttonLink="/product"
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/landscape-images/montana-home/2019/montana_home19_20_ng_hall_hide_oyster_figure_masala_mushroom_w.jpg?mode=crop&width=828&height=595"
        backgroundColor="#B48451"
        layout="textRight"
        variant="third"
        imagePosition={{
          width: "550px",
          height: "430px",
          top: "80px",
          right: "0px",
        }}
      />
    </div>
  );
};

export default ColoursPage;