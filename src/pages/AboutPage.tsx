import React from 'react';
import About from '../components/About';
import MeetDoctor from '../components/MeetDoctor';
import Testimonials from '../components/Testimonials';

const AboutPage = () => {
  return (
    <div className="pt-20">
      <div className="bg-medical-blue py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-blue-100">Serving Guwahati with Excellence Since 2008</p>
      </div>
      <About />
      <MeetDoctor />
      <Testimonials />
    </div>
  );
};

export default AboutPage;
