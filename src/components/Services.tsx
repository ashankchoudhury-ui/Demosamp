import React from 'react';
import { motion } from 'motion/react';
import { Stethoscope, Sparkles, Activity, CheckCircle2, Users, Calendar } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "General & Preventive",
      desc: "Comprehensive exams, professional cleanings, fluoride treatments, and digital X-rays to keep your smile healthy.",
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      title: "Cosmetic Dentistry",
      desc: "Transform your smile with professional teeth whitening, porcelain veneers, and complete smile makeovers.",
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "Restorative Dentistry",
      desc: "Restore function and beauty with high-quality crowns, bridges, dental implants, and root canal therapy.",
      icon: <Activity className="w-8 h-8" />,
    },
    {
      title: "Orthodontics",
      desc: "Achieve the perfect alignment with traditional braces or modern clear aligners for both teens and adults.",
      icon: <CheckCircle2 className="w-8 h-8" />,
    },
    {
      title: "Pediatric Dentistry",
      desc: "Gentle, friendly dental care designed specifically for children to build a lifetime of healthy habits.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Emergency Care",
      desc: "Immediate relief for toothaches, broken teeth, and other dental emergencies with same-day appointments.",
      icon: <Calendar className="w-8 h-8" />,
    },
  ];

  return (
    <section id="services" className="section-padding bg-medical-light">
      <div className="text-center mb-16">
        <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Our Expertise</h2>
        <h3 className="text-4xl font-bold text-slate-900">Comprehensive Dental Services</h3>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
          We offer a full range of dental treatments under one roof, using state-of-the-art technology to ensure the best outcomes for our patients.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className="bg-medical-blue/10 w-16 h-16 rounded-xl flex items-center justify-center text-medical-blue mb-6 group-hover:bg-medical-blue group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h4 className="text-xl font-bold mb-4 text-slate-900">{service.title}</h4>
            <p className="text-slate-600 leading-relaxed mb-6">
              {service.desc}
            </p>
            <button className="text-medical-blue font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
              Learn More <Activity size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
