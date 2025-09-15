import React from "react";
import SustainabilityHero from "./components/SustainabilityHero/SustainabilityHero";
import SustainabilityGallery from "./components/SustainabilityGallery/SustainabilityGallery";
import SustainabilityCertifications from "./components/SustainabilityCertifications/SustainabilityCertifications";
import SustainabilityHistory from "./components/SustainabilityHistory/SustainabilityHistory"
import FlexImages from "./components/FlexImages/FlexImages";

const page = () => {
  return (
    <>
      <SustainabilityHero />
      <SustainabilityGallery />
      <SustainabilityCertifications />
      <SustainabilityHistory/>
      <FlexImages/>
    </>
  );
};

export default page;
