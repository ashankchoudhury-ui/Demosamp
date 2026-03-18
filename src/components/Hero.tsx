import React from 'react';
import { motion } from 'motion/react';
import { Phone, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern Dental Clinic" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-medical-blue/90 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <span className="inline-block bg-medical-teal/20 text-medical-teal px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 backdrop-blur-sm border border-medical-teal/30">
            Guwahati's Premier Dental Care
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your Trusted Dental Care Partner in <span className="text-medical-teal">Guwahati</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed">
            Experience gentle, expert dental care - serving families in Guwahati for over 15 years with modern techniques and a patient-first approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/contact#appointment" className="btn-teal text-center text-lg px-8 py-4">Book Appointment</Link>
            <a href="tel:+919864028348" className="btn-outline text-center text-lg px-8 py-4 flex items-center justify-center gap-2">
              <Phone size={20} />
              Call Now: +91-98640-28348
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Same-Day Appointments",
              "Painless Treatments",
              "Insurance Accepted",
              "Modern Equipment"
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-100">
                <CheckCircle2 className="text-medical-teal w-4 h-4" />
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
