import React from 'react';
import { motion } from 'framer-motion';

const LoadingThela: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FFF8E1] relative overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-saffron-100 rounded-bl-full opacity-60 mix-blend-multiply blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-light rounded-tr-full opacity-60 mix-blend-multiply blur-3xl"></div>

      {/* Moving Road/Ground */}
      <div className="absolute bottom-0 w-full h-1/3 overflow-hidden">
          <motion.div 
            className="w-[200%] h-full flex items-end opacity-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
          >
             <div className="w-full h-2 border-t-4 border-dashed border-wood-dark/30 mb-20"></div>
          </motion.div>
      </div>

      <motion.div
        className="relative z-10 scale-125"
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 15 }}
      >
        <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
            <svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Shadow */}
              <motion.ellipse 
                cx="100" cy="170" rx="60" ry="8" 
                fill="black" opacity="0.1" 
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.05, 0.1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />

              {/* Cart Body */}
              <path
                d="M40 120 L160 120 L160 150 L50 150 L40 120 Z"
                fill="#8B4513" // Brown wood
                stroke="#5D2906"
                strokeWidth="2"
              />
              <rect x="50" y="100" width="100" height="20" fill="#CD853F" stroke="#5D2906" strokeWidth="2" />
              <rect x="55" y="105" width="90" height="10" fill="#DEB887" opacity="0.5" />
              
              {/* Umbrella Stick */}
              <line x1="100" y1="100" x2="100" y2="40" stroke="#C0C0C0" strokeWidth="4" />
              
              {/* Umbrella Group */}
              <motion.g
                 style={{ originX: "100px", originY: "40px" }}
                 animate={{ rotate: [-2, 2, -2] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                  {/* Umbrella Top - Saffron & Green Stripes */}
                  <path
                    d="M50 40 Q100 0 150 40 Z"
                    fill="#FF9933" 
                    stroke="#E67300"
                    strokeWidth="2"
                  />
                  {/* Decorative Stripes */}
                  <path d="M85 20 Q100 12 115 20 L120 40 Q100 25 80 40 Z" fill="#138808" opacity="0.9" />
                  <path d="M50 40 Q60 25 70 25 L75 40 Z" fill="#FFFFFF" opacity="0.6" />
                  <path d="M130 25 Q140 25 150 40 L125 40 Z" fill="#FFFFFF" opacity="0.6" />

                  {/* Decorative Hangings (Chili/Lemon) */}
                  <motion.g
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ originX: "150px", originY: "40px" }}
                  >
                    <line x1="150" y1="40" x2="150" y2="45" stroke="#333" strokeWidth="1"/>
                    <circle cx="150" cy="47" r="4" fill="#FFD700" stroke="#B8860B" /> {/* Lemon */}
                    <path d="M150 51 Q155 60 145 65" stroke="#138808" strokeWidth="3" fill="none" strokeLinecap="round" /> {/* Chili */}
                    <path d="M150 51 Q145 60 155 65" stroke="#138808" strokeWidth="3" fill="none" strokeLinecap="round" /> {/* Chili 2 */}
                  </motion.g>
              </motion.g>

              {/* Items on Cart */}
              <rect x="60" y="85" width="15" height="15" fill="#C0392B" stroke="black" strokeWidth="1" /> {/* Jar */}
              <rect x="80" y="90" width="12" height="10" fill="#F1C40F" stroke="black" strokeWidth="1" /> {/* Box */}
              <circle cx="120" cy="95" r="8" fill="#E67E22" /> {/* Fruit */}
              <circle cx="130" cy="98" r="6" fill="#2ECC71" /> {/* Fruit */}

              
              {/* Wheels */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ originX: "60px", originY: "150px" }}
              >
                 <circle cx="60" cy="150" r="15" fill="#222" stroke="#000" strokeWidth="2" />
                 <circle cx="60" cy="150" r="12" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="4 2" />
                 <line x1="60" y1="135" x2="60" y2="165" stroke="#888" strokeWidth="2" />
                 <line x1="45" y1="150" x2="75" y2="150" stroke="#888" strokeWidth="2" />
                 <circle cx="60" cy="150" r="4" fill="#FFD700" /> {/* Gold Hubcap */}
              </motion.g>

              <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ originX: "140px", originY: "150px" }}
              >
                 <circle cx="140" cy="150" r="15" fill="#222" stroke="#000" strokeWidth="2" />
                 <circle cx="140" cy="150" r="12" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="4 2" />
                 <line x1="140" y1="135" x2="140" y2="165" stroke="#888" strokeWidth="2" />
                 <line x1="125" y1="150" x2="155" y2="150" stroke="#888" strokeWidth="2" />
                 <circle cx="140" cy="150" r="4" fill="#FFD700" /> {/* Gold Hubcap */}
              </motion.g>

            </svg>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-8 font-display text-4xl text-saffron-700 tracking-wider drop-shadow-sm text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        NukkadBazaar
      </motion.div>
      <motion.p
        className="text-wood mt-2 font-display tracking-wider text-xl text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        व्यापारी का स्थान, शहर को व्यापार
      </motion.p>
    </div>
  );
};

export default LoadingThela;