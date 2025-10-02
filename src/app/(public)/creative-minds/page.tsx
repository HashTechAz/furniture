import React from 'react';
import SeriesText from '../productseries/components/SeriesText/SeriesText';
import NewsSection from '@/components/NewsSection/NewsSection';
import Form from '@/components/Form/Form';
import Hero from '@/components/Hero/Hero';

const CreativeMindsPage = () => {
  return (
    <>
      <Hero
        title="Creative minds"
        titleSpan="Let's create playful spaces"
        description="The family-owned Montana Furniture has provided generations with personalized storage solutions, since 1982. The Danish high-end furniture company was established by Peter J. Lassen, who alsor Montana System. Today, the company is run by Peter's son Joakim Lassen, who is the."
        imageUrl="https://b2c.montana-episerver.com/globalassets/ambient-images/portrait-images/creative-minds/cathdelichtenberg/montana_cathrinedelicthenberg19903_final_v2.jpg?mode=crop&width=1080&height=776"
        imageAlt="Montana Company"
        backgroundColor="#5F90CA"
        textColor="#000"
      />
      <div style={{ marginTop: '50px' }}>
        <SeriesText/>
      </div>
      <NewsSection 
        showTitle={false} 
        customGridClass="creative-minds-grid"
      />
      <NewsSection limit={4} />
      <Form/>
    </>
  );
};

export default CreativeMindsPage;
