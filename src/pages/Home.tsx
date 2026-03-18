import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import MeetDoctor from '../components/MeetDoctor';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import LocationHours from '../components/LocationHours';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <Services />
      <MeetDoctor />
      <Gallery />
      <Testimonials />
      <LocationHours />
    </>
  );
};

export default Home;
