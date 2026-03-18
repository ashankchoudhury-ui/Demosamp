import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Upload, X, CheckCircle2, Loader2 } from 'lucide-react';

interface GalleryItem {
  title: string;
  before: string;
  after: string;
  isStatic?: boolean;
}

const Gallery = () => {
  const { user, profile, login } = useAuth();
  const [submissions, setSubmissions] = useState<GalleryItem[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    beforeUrl: '',
    afterUrl: ''
  });

  const staticCases: GalleryItem[] = [
    { 
      title: "Teeth Whitening", 
      before: "/gallery/whitening_before.jpg", 
      after: "/gallery/whitening_after.jpg",
      isStatic: true
    },
    { 
      title: "Dental Veneers", 
      before: "/gallery/veneers_before.jpg", 
      after: "/gallery/veneers_after.jpg",
      isStatic: true
    },
    { 
      title: "Dental Implants", 
      before: "/gallery/implants_before.jpg", 
      after: "/gallery/implants_after.jpg",
      isStatic: true
    },
    { 
      title: "Clear Alignment", 
      before: "/gallery/alignment_before.jpg", 
      after: "/gallery/alignment_after.jpg",
      isStatic: true
    },
  ];

  useEffect(() => {
    const q = query(
      collection(db, 'gallery_submissions'),
      where('status', '==', 'approved'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSubmissions = snapshot.docs.map(doc => ({
        title: doc.data().title,
        before: doc.data().beforeUrl,
        after: doc.data().afterUrl,
        isStatic: false
      }));
      setSubmissions(fetchedSubmissions);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery_submissions');
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'beforeUrl' | 'afterUrl') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1048576) {
        alert("File size must be less than 1MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'gallery_submissions'), {
        patientUid: user.uid,
        patientName: profile.displayName || user.displayName || 'Patient',
        title: formData.title,
        beforeUrl: formData.beforeUrl,
        afterUrl: formData.afterUrl,
        status: 'pending',
        createdAt: Timestamp.now()
      });
      setUploadSuccess(true);
      setFormData({ title: '', beforeUrl: '', afterUrl: '' });
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadSuccess(false);
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'gallery_submissions');
    } finally {
      setIsSubmitting(false);
    }
  };

  const allGalleryItems = [...staticCases, ...submissions];

  return (
    <section id="gallery" className="section-padding bg-medical-light">
      <div className="text-center mb-16">
        <h2 className="text-medical-blue font-bold text-sm uppercase tracking-widest mb-2">Our Results</h2>
        <h3 className="text-4xl font-bold text-slate-900">Smile Gallery</h3>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto mb-8">
          Real transformations from our clinic. See the difference expert care makes.
        </p>
        
        <div className="flex justify-center">
          {user ? (
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="btn-teal flex items-center gap-2 px-6 py-3"
            >
              <Upload size={20} />
              Upload Your Transformation
            </button>
          ) : (
            <button 
              onClick={login}
              className="btn-outline flex items-center gap-2 px-6 py-3"
            >
              Login to Share Your Smile
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {allGalleryItems.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"
          >
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative group overflow-hidden rounded-lg">
                <img 
                  src={item.before} 
                  alt={`${item.title} Before`} 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">Before</span>
              </div>
              <div className="relative group overflow-hidden rounded-lg">
                <img 
                  src={item.after} 
                  alt={`${item.title} After`} 
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <span className="absolute bottom-2 left-2 bg-medical-teal text-white text-[10px] px-2 py-0.5 rounded uppercase font-bold">After</span>
              </div>
            </div>
            <h4 className="font-bold text-slate-800 text-center">{item.title}</h4>
            {!item.isStatic && (
              <p className="text-[10px] text-slate-400 text-center mt-1 uppercase tracking-widest">Patient Shared</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Share Your Smile</h3>
                  <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                    <X size={24} />
                  </button>
                </div>

                {uploadSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-medical-teal/10 rounded-full flex items-center justify-center text-medical-teal mx-auto mb-6">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">Submission Received!</h4>
                    <p className="text-slate-600">Our team will review your photos before they appear in the gallery.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Treatment Title</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g., Teeth Whitening, Braces"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-medical-teal focus:border-transparent outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Before Photo</label>
                        <div className="relative aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                          {formData.beforeUrl ? (
                            <img src={formData.beforeUrl} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-4">
                              <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Upload</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            required
                            onChange={(e) => handleFileChange(e, 'beforeUrl')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">After Photo</label>
                        <div className="relative aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center overflow-hidden bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                          {formData.afterUrl ? (
                            <img src={formData.afterUrl} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center p-4">
                              <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Upload</span>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            required
                            onChange={(e) => handleFileChange(e, 'afterUrl')}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full btn-teal py-4 flex items-center justify-center gap-2 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          Submitting...
                        </>
                      ) : (
                        'Submit for Approval'
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
