import React from "react";
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";
import SustainabilityHistory from "./components/SustainabilityHistory/SustainabilityHistory";
import FlexImages from "./components/FlexImages/FlexImages";
import Companies from "./components/Companies/Companies";
import Ecolabel from "./components/Ecolabel/Ecolabel";
import HomeVideo from "@/components/HomeVideo/HomeVideo";
import Palette from "@/components/Palette/Palette";

const sustainabilityPaletteData = {
  category: "Sustainability",
  title: "41 water-based colours – a body-mind philosophy",
  description:
    "Every eight years, Montana develops a new colour palette. Our current palette was created in collaboration with colour expert Margrethe Odgaard. Read more about Margrethe's creative process towards a new and more sensual colour palette. ",
  buttonText: "Learn more",
  buttonLink: "/sustainability",
  imageUrl:
    "https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/montana-home/2023/margrethe-collab/montana_3newcolours_2023_margretheodgaard_05_h.jpg?mode=crop&width=540&height=720",
  backgroundColor: "#E6F3EC",
  imagePosition: {
    width: "370px",
    height: "500px",
    top: "40px",
    left: "0px",
  },
  layout: "textLeft",
} as const;

const page = () => {
  return (
    <>
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
      <SustainabilityHistory />
      <FlexImages />
      <Companies />
      <Ecolabel />
      <HomeVideo />
      <Palette {...sustainabilityPaletteData} />
    </>
  );
};

export default page;
