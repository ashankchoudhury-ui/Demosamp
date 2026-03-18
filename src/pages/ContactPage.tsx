import React, { useEffect } from 'react';
import LocationHours from '../components/LocationHours';
import AppointmentForm from '../components/AppointmentForm';
import { useLocation } from 'react-router-dom';

const ContactPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="pt-20">
      <div className="bg-medical-blue py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-blue-100">We're Here to Help You Smile</p>
      </div>
      <LocationHours />
      <AppointmentForm />
    </div>
  );
};

export default ContactPage;
