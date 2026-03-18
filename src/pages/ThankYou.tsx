import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center bg-medical-light">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white p-12 rounded-3xl shadow-2xl text-center border border-slate-100"
      >
        <div className="w-24 h-24 bg-medical-teal/10 rounded-full flex items-center justify-center text-medical-teal mx-auto mb-8">
          <CheckCircle2 size={64} />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Thank You!</h1>
        <p className="text-xl text-slate-600 mb-12">
          Your appointment request has been received. Our team will contact you shortly to confirm your visit.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
            <div className="bg-medical-blue/10 w-10 h-10 rounded-lg flex items-center justify-center text-medical-blue mb-4">
              <Calendar size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Next Steps</h3>
            <p className="text-sm text-slate-600">We'll review your preferred date and time and call you to finalize the slot.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
            <div className="bg-medical-blue/10 w-10 h-10 rounded-lg flex items-center justify-center text-medical-blue mb-4">
              <Phone size={20} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">Need Help?</h3>
            <p className="text-sm text-slate-600">If you have an emergency, please call us directly at +91-98640-28348.</p>
          </div>
        </div>
        
        <Link to="/" className="btn-teal inline-flex items-center gap-2 px-8 py-4">
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ThankYou;
