import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Check, X, Trash2, Clock, User, Phone, Mail, Calendar, Activity, MessageSquare } from 'lucide-react';

interface Submission {
  id: string;
  patientUid: string;
  patientName: string;
  title: string;
  beforeUrl: string;
  afterUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  preferredDate: string;
  preferredTime: string;
  serviceType: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

const AdminDashboard = () => {
  const { isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'gallery' | 'appointments'>('appointments');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState<'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    if (!isAdmin) return;

    const collectionName = activeTab === 'gallery' ? 'gallery_submissions' : 'appointments';
    
    const q = query(
      collection(db, collectionName),
      where('status', '==', filter),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (activeTab === 'gallery') {
        setSubmissions(fetched as Submission[]);
      } else {
        setAppointments(fetched as Appointment[]);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, collectionName);
    });

    return () => unsubscribe();
  }, [isAdmin, filter, activeTab]);

  const handleStatusUpdate = async (id: string, status: 'approved' | 'rejected') => {
    const collectionName = activeTab === 'gallery' ? 'gallery_submissions' : 'appointments';
    try {
      await updateDoc(doc(db, collectionName, id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const collectionName = activeTab === 'gallery' ? 'gallery_submissions' : 'appointments';
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${id}`);
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!isAdmin) return <div className="pt-32 text-center text-red-500 font-bold">Access Denied</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`pb-2 font-bold transition-all border-b-2 ${activeTab === 'appointments' ? 'text-medical-blue border-medical-blue' : 'text-slate-400 border-transparent'}`}
            >
              Appointments
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`pb-2 font-bold transition-all border-b-2 ${activeTab === 'gallery' ? 'text-medical-blue border-medical-blue' : 'text-slate-400 border-transparent'}`}
            >
              Gallery Submissions
            </button>
          </div>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {(['pending', 'approved', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === s ? 'bg-white text-medical-blue shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'gallery' ? (
        <div className="grid gap-8">
          {submissions.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <Clock className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">No {filter} gallery submissions found.</p>
            </div>
          ) : (
            submissions.map((sub) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-8"
              >
                <div className="grid grid-cols-2 gap-4 w-full lg:w-1/3 shrink-0">
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Before</p>
                    <img src={sub.beforeUrl} className="w-full aspect-square object-cover rounded-xl border border-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">After</p>
                    <img src={sub.afterUrl} className="w-full aspect-square object-cover rounded-xl border border-slate-100" />
                  </div>
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{sub.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        sub.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        {sub.patientName}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={16} />
                        {sub.createdAt?.toDate().toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {sub.status !== 'approved' && (
                      <button 
                        onClick={() => handleStatusUpdate(sub.id, 'approved')}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold transition-colors"
                      >
                        <Check size={18} />
                        Approve
                      </button>
                    )}
                    {sub.status !== 'rejected' && (
                      <button 
                        onClick={() => handleStatusUpdate(sub.id, 'rejected')}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl font-bold transition-colors"
                      >
                        <X size={18} />
                        Reject
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(sub.id)}
                      className="flex items-center gap-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 px-6 py-2 rounded-xl font-bold transition-colors"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {appointments.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
              <Calendar className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">No {filter} appointments found.</p>
            </div>
          ) : (
            appointments.map((apt) => (
              <motion.div 
                key={apt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-medical-blue/10 rounded-full flex items-center justify-center text-medical-blue">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{apt.patientName}</h3>
                        <p className="text-sm text-slate-500">Requested on {apt.createdAt?.toDate().toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={16} className="text-medical-teal" />
                        <span className="text-sm font-medium">{apt.patientPhone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Mail size={16} className="text-medical-teal" />
                        <span className="text-sm font-medium">{apt.patientEmail || 'No Email'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Calendar size={16} className="text-medical-teal" />
                        <span className="text-sm font-medium">{apt.preferredDate} at {apt.preferredTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Activity size={16} className="text-medical-teal" />
                        <span className="text-sm font-medium">{apt.serviceType}</span>
                      </div>
                    </div>

                    {apt.message && (
                      <div className="bg-slate-50 p-4 rounded-xl flex gap-3">
                        <MessageSquare size={16} className="text-slate-400 shrink-0 mt-1" />
                        <p className="text-sm text-slate-600 italic">"{apt.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between items-end gap-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      apt.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      apt.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status === 'approved' ? 'Confirmed' : apt.status === 'rejected' ? 'Cancelled' : 'Pending'}
                    </span>

                    <div className="flex gap-2">
                      {apt.status !== 'approved' && (
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'approved')}
                          className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
                          title="Confirm Appointment"
                        >
                          <Check size={20} />
                        </button>
                      )}
                      {apt.status !== 'rejected' && (
                        <button 
                          onClick={() => handleStatusUpdate(apt.id, 'rejected')}
                          className="p-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                          title="Cancel Appointment"
                        >
                          <X size={20} />
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(apt.id)}
                        className="p-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors"
                        title="Delete Request"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
