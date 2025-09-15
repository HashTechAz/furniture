import React from "react";
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";

const page = () => {
  return (
    <>
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
    </>
  );
};

export default page;
