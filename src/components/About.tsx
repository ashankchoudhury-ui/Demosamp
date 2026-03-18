import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-medical-teal/10 rounded-full z-0"></div>
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
            alt="Clinic Interior" 
            className="rounded-2xl shadow-2xl relative z-10 w-full aspect-[4/3] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-6 -right-6 bg-medical-blue text-white p-6 rounded-xl shadow-xl z-20 hidden lg:block">
            <p className="text-3xl font-bold">15+</p>
            <p className="text-sm font-medium opacity-80">Years of Experience</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Welcome to Our Practice</h2>
          <h3 className="text-4xl font-bold mb-6 text-slate-900">Patient-First Care in a Modern Facility</h3>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              At Dr. Rajib Acharyya Dental Clinic, we believe that a healthy smile is the foundation of overall well-being. Our practice is dedicated to providing the highest quality dental care in a warm, welcoming environment that puts our patients at ease.
            </p>
            <p>
              Located in the heart of Guwahati, we've been serving our community with comprehensive dental services ranging from routine check-ups to complex restorative procedures. Our team of experienced professionals utilizes the latest dental technology to ensure your treatments are as effective and comfortable as possible.
            </p>
            <p>
              We understand that visiting the dentist can be stressful for many. That's why we prioritize clear communication, gentle techniques, and personalized treatment plans tailored to each patient's unique needs and goals.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              <ShieldCheck className="text-medical-blue w-5 h-5" />
              <span className="font-semibold text-slate-700">ISO Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              <Users className="text-medical-blue w-5 h-5" />
              <span className="font-semibold text-slate-700">10k+ Happy Patients</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
