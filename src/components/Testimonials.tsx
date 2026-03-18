import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Sasanka Pratim Kalita",
      text: "My tooth feels great, and I couldn't be happier with the service I received!",
      rating: 5
    },
    {
      name: "Amartya Chakraborty",
      text: "Very good hospitality and nice behavior by the staff and doctor.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      text: "Dr. Acharyya made my root canal completely painless! His gentle approach put me at ease. The clinic is very clean and modern.",
      rating: 5
    }
  ];

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Testimonials</h2>
        <h3 className="text-4xl font-bold text-slate-900">What Our Patients Say</h3>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-16">
        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">JD</div>
          <div>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-sm font-bold text-slate-900">4.7/5 on Justdial</p>
            <p className="text-xs text-slate-500">227+ Verified Votes</p>
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-medical-teal text-white p-2 rounded-lg font-bold text-xl">L</div>
          <div>
            <div className="flex text-yellow-400">
              {[...Array(4)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <Star size={14} className="text-slate-300" />
            </div>
            <p className="text-sm font-bold text-slate-900">4.3/5 on Lybrate</p>
            <p className="text-xs text-slate-500">Patient Recommendations</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative"
          >
            <div className="flex text-yellow-400 mb-4">
              {[...Array(review.rating)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
            </div>
            <p className="text-slate-600 italic mb-6 leading-relaxed">"{review.text}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center text-medical-blue font-bold">
                {review.name[0]}
              </div>
              <p className="font-bold text-slate-900">{review.name}</p>
            </div>
            <MessageSquare className="absolute top-8 right-8 text-slate-200 w-12 h-12 -z-0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
