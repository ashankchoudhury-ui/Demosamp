import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Star } from 'lucide-react';

const MeetDoctor = () => {
  return (
    <section className="section-padding bg-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-2 md:order-1"
        >
          <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Meet the Specialist</h2>
          <h3 className="text-4xl font-bold mb-6 text-slate-900">Dr. Rajib Acharyya</h3>
          <p className="text-medical-teal font-bold text-lg mb-4">BDS, MDS (Oral & Maxillofacial Surgery)</p>
          
          <div className="space-y-4 text-slate-600 leading-relaxed mb-8">
            <p>
              Dr. Rajib Acharyya is a highly skilled dental surgeon with over 15 years of experience in providing comprehensive dental care. He completed his BDS from a premier medical institution and has since pursued advanced training in implantology and cosmetic dentistry.
            </p>
            <p>
              His philosophy is simple: treat every patient like family. He takes the time to listen to your concerns, explain all treatment options clearly, and ensure that you are comfortable and informed throughout your dental journey.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-medical-blue font-bold text-2xl">15k+</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Procedures Done</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <p className="text-medical-blue font-bold text-2xl">99%</p>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Patient Satisfaction</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <CheckCircle2 className="text-medical-teal w-5 h-5" />
              Member of IDA
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <CheckCircle2 className="text-medical-teal w-5 h-5" />
              Board Certified
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 relative"
        >
          <div className="aspect-[4/5] bg-medical-blue/5 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1000" 
              alt="Dr. Rajib Acharyya" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-medical-teal rounded-full flex items-center justify-center text-white">
              <Star fill="currentColor" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Top Rated Dentist</p>
              <p className="text-xs text-slate-500">Guwahati Dental Association</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MeetDoctor;
