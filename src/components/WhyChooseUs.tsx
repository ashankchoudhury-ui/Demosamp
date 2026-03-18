import React from 'react';
import { motion } from 'motion/react';
import { Users, Activity, MessageSquare, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  const points = [
    {
      title: "Experienced Expertise",
      desc: "15+ years of practice with advanced certifications in modern dentistry.",
      icon: <Users className="w-6 h-6" />,
    },
    {
      title: "Modern Technology",
      desc: "Digital X-rays, latest sterilization, and painless treatment techniques.",
      icon: <Activity className="w-6 h-6" />,
    },
    {
      title: "Patient Comfort First",
      desc: "Anxiety-free treatments with detailed explanations at every step.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Flexible Scheduling",
      desc: "Same-day emergency slots and evening appointments for your convenience.",
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <section className="section-padding bg-medical-blue text-white">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {points.map((point, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center md:text-left"
          >
            <div className="bg-white/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0">
              {point.icon}
            </div>
            <h4 className="text-xl font-bold mb-3">{point.title}</h4>
            <p className="text-blue-100 leading-relaxed text-sm">
              {point.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
