import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Mail, Phone } from 'lucide-react';

const LocationHours = () => {
  return (
    <section id="contact" className="section-padding bg-medical-light">
      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-8 text-slate-900">Location & Hours</h3>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
            <h4 className="flex items-center gap-2 font-bold text-medical-blue mb-6">
              <Clock size={20} />
              Operating Hours
            </h4>
            <div className="space-y-3">
              {[
                { day: "Monday - Saturday", hours: "10:30 AM - 9:30 PM" },
                { day: "Sunday", hours: "Closed (Emergency Only)" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-600 font-medium">{item.day}</span>
                  <span className="text-slate-900 font-bold">{item.hours}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-red-600 font-bold uppercase tracking-wider">Emergency 24/7</p>
                <p className="text-lg font-bold text-red-700">+91-98640-28348</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-medical-blue/10 p-3 rounded-lg text-medical-blue h-fit">
                <MapPin size={24} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Clinic Address</h5>
                <p className="text-slate-600">
                  Dr. Rajib Acharyya Dental Clinic<br />
                  2nd floor, care building, near apollo pharmacy<br />
                  Maligaon Chariali, Maligaon, Guwahati, Assam 781011
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-medical-blue/10 p-3 rounded-lg text-medical-blue h-fit">
                <Mail size={24} />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 mb-1">Email Us</h5>
                <p className="text-slate-600">info@drrajibdental.com</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-[400px] lg:h-auto rounded-3xl overflow-hidden shadow-lg border-4 border-white"
        >
          <iframe 
            src="https://maps.google.com/maps?q=Dr.%20Rajib%20Acharyya%20Dental%20Clinic%20Maligaon%20Guwahati&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Clinic Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationHours;
