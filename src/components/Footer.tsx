import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-medical-blue text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-white p-2 rounded-lg">
              <Stethoscope className="text-medical-blue w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">Dr. Rajib Acharyya</span>
              <span className="text-xs font-medium tracking-wider uppercase text-blue-200">Dental Clinic</span>
            </div>
          </div>
          <p className="text-blue-100 leading-relaxed mb-8">
            Providing expert dental care with a gentle touch in Guwahati for over 15 years. Your smile is our priority.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-teal transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-teal transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-medical-teal transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-blue-100 hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Our Services</Link></li>
            <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/#gallery" className="text-blue-100 hover:text-white transition-colors">Smile Gallery</Link></li>
            <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">Contact & Location</Link></li>
            <li><Link to="/contact#appointment" className="text-blue-100 hover:text-white transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">Our Services</h4>
          <ul className="space-y-4">
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">General Dentistry</Link></li>
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Cosmetic Dentistry</Link></li>
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Orthodontics</Link></li>
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Dental Implants</Link></li>
            <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Emergency Care</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="text-medical-teal shrink-0" size={20} />
              <span className="text-blue-100">Maligaon Chariali, Guwahati, Assam 781011</span>
            </li>
            <li className="flex gap-3">
              <Phone className="text-medical-teal shrink-0" size={20} />
              <span className="text-blue-100">+91-98640-28348</span>
            </li>
            <li className="flex gap-3">
              <Mail className="text-medical-teal shrink-0" size={20} />
              <span className="text-blue-100">info@drrajibdental.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-blue-200 text-sm">
          © {new Date().getFullYear()} Dr. Rajib Acharyya Dental Clinic. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-blue-200">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
