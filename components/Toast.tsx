import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, MessageSquare } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const isOTP = toast?.message.includes("OTP");

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-2 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
        >
          {isOTP ? (
            // SMS Notification Style for OTP
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-3 min-w-[340px] max-w-sm flex gap-3 items-center pointer-events-auto transform transition-all hover:scale-[1.02] cursor-pointer" onClick={onClose}>
               <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white shadow-md">
                 <MessageSquare size={20} fill="currentColor" className="opacity-90" />
               </div>
               <div className="flex-1">
                 <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-gray-900 text-sm">Messages</h4>
                    <span className="text-[10px] text-gray-500 font-medium">now</span>
                 </div>
                 <p className="text-gray-800 text-sm font-medium mt-0.5 leading-tight">
                    {toast.message}
                 </p>
                 <p className="text-xs text-gray-400 mt-1">NukkadBazaar verification code</p>
               </div>
            </div>
          ) : (
            // Standard Toast for other messages
            <div className="bg-white rounded-lg shadow-xl border-l-4 p-4 min-w-[300px] max-w-md flex items-start gap-3 pointer-events-auto backdrop-blur-sm bg-opacity-95"
              style={{
                 borderColor: toast.type === 'success' ? '#138808' : toast.type === 'error' ? '#DC2626' : '#FF9933'
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-indiaGreen" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-saffron-600" />}
              </div>
              
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${
                  toast.type === 'success' ? 'text-indiaGreen' : toast.type === 'error' ? 'text-red-600' : 'text-saffron-600'
                }`}>
                  {toast.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{toast.message}</p>
              </div>

              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;