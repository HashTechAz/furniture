import React from "react";
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";
import SustainabilityHistory from "./components/SustainabilityHistory/SustainabilityHistory"

const page = () => {
  return (
    <>
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
      <SustainabilityHistory/>
    </>
  );
};

export default page;
