import React from 'react';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Gallery from '../components/Gallery';

const ServicesPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-medical-blue py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-blue-100">Comprehensive Dental Care for Your Family</p>
      </div>
      <Services />
      <WhyChooseUs />
      <Gallery />
    </div>
  );
};

export default ServicesPage;
