import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../types';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    service: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'appointments'), {
        patientName: formData.name,
        patientPhone: formData.phone,
        patientEmail: formData.email || null,
        preferredDate: formData.date,
        preferredTime: formData.time,
        serviceType: formData.service,
        message: formData.message || '',
        status: 'pending',
        createdAt: Timestamp.now()
      });

      setStatus('success');
      navigate('/thank-you');
    } catch (err) {
      console.error('Form Submission Error:', err);
      handleFirestoreError(err, OperationType.CREATE, 'appointments');
      setStatus('error');
    }
  };

  return (
    <section id="appointment" className="section-padding bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Book Your Visit</h2>
          <h3 className="text-4xl font-bold text-slate-900">Schedule Your Visit Today</h3>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Full Name *</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Phone Number *</label>
              <input 
                required
                type="tel" 
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Email Address</label>
              <input 
                type="email" 
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Preferred Date *</label>
              <input 
                required
                type="date" 
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Preferred Time *</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all bg-white"
                value={formData.time}
                onChange={e => setFormData({...formData, time: e.target.value})}
              >
                <option value="">Select Time Slot</option>
                <option value="Morning 9-12">Morning 9:00 AM - 12:00 PM</option>
                <option value="Afternoon 12-5">Afternoon 12:00 PM - 5:00 PM</option>
                <option value="Evening 5-8">Evening 5:00 PM - 8:00 PM</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Service Needed *</label>
              <select 
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all bg-white"
                value={formData.service}
                onChange={e => setFormData({...formData, service: e.target.value})}
              >
                <option value="">Select Service</option>
                <option value="General Check-up">General Check-up</option>
                <option value="Cosmetic">Cosmetic Dentistry</option>
                <option value="Restorative">Restorative Dentistry</option>
                <option value="Orthodontics">Orthodontics (Braces)</option>
                <option value="Pediatric">Pediatric Dentistry</option>
                <option value="Emergency">Emergency Dental Care</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Message / Special Requests</label>
              <textarea 
                rows={4}
                placeholder="Tell us about your concerns..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-blue focus:border-transparent outline-none transition-all"
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button 
                disabled={status === 'loading'}
                type="submit" 
                className="w-full btn-teal text-xl py-4 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Request Appointment'
                )}
              </button>
              {status === 'error' && (
                <p className="text-red-500 text-center mt-4 font-medium">Something went wrong. Please try again or call us directly.</p>
              )}
              <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-1">
                <ShieldCheck size={14} />
                Your information is secure and will never be shared.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AppointmentForm;
