
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Search, Filter, Phone, MessageCircle, Share2, 
  Upload, Camera, DollarSign, FileText, Shield, AlertTriangle,
  ExternalLink, ChevronRight, User, Settings as SettingsIcon,
  LogOut, Star, Clock, Heart, Gavel, X, Bell, Languages, HelpCircle, Mail, Lock, History, Save, ChevronDown, ChevronUp, Briefcase
} from 'lucide-react';
import VendorMap from './VendorMap';
import { LandListing, AppView } from '../types';

// Location Data
const locationData: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry", "Kadapa", "Anantapur", "Eluru"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Tawang", "Ziro", "Pasighat", "Bomdila"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tezpur", "Tinsukia", "Bongaigaon"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Arrah", "Begusarai", "Katihar"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Durg", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand", "Junagadh"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Hisar", "Karnal", "Rohtak", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Solan", "Mandi", "Kullu", "Una"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi", "Davanagere", "Shivamogga", "Ballari"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Alappuzha", "Kannur", "Palakkad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur", "Balasore"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur"],
  "Sikkim": ["Gangtok", "Namchi", "Gyalshing"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore"],
  "Telangana": ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj", "Meerut", "Noida", "Ghaziabad", "Gorakhpur", "Bareilly"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Roorkee"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda"],
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa"],
  "Delhi": ["New Delhi"],
  "Jammu and Kashmir": ["Srinagar", "Jammu"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"]
};

export const MapView = ({ t }: { t: any }) => {
  const [mapSearch, setMapSearch] = useState('');

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex gap-2">
         <div className="relative flex-1">
           <Search className="absolute left-3 top-3 text-wood-light" size={18} />
           <input 
             type="text" 
             placeholder={t.map.search} 
             className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-wood-light/20 dark:border-gray-600 bg-white dark:bg-gray-800 text-wood-darkest dark:text-gray-100 focus:border-brick outline-none text-sm font-medium shadow-sm"
             value={mapSearch}
             onChange={(e) => setMapSearch(e.target.value)}
           />
           {mapSearch && (
              <button 
                onClick={() => setMapSearch('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-brick"
              >
                <X size={16} />
              </button>
           )}
         </div>
         <button className="p-2.5 bg-white dark:bg-gray-800 border-2 border-wood-light/20 dark:border-gray-600 rounded-xl text-wood-dark dark:text-gray-200 hover:border-brick hover:text-brick active:scale-95 transition-all shadow-sm">
           <Filter size={20} />
         </button>
      </div>
      <div className="flex-1 rounded-2xl overflow-hidden relative border-4 border-white dark:border-gray-700 shadow-lg bg-saffron-50 dark:bg-gray-800">
        <VendorMap fullScreen interactive searchQuery={mapSearch} />
      </div>
    </div>
  );
};

export const BuyLandView = ({ t }: { t: any }) => {
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  // Mock Data
  const allListings: LandListing[] = [
    { id: '1', title: 'Prime Corner Spot', price: 5000, area: '50 sq.ft', location: 'Hazratganj, Lucknow', city: 'Lucknow', type: 'Rent', image: 'https://images.unsplash.com/photo-1579618172909-66c5db321016?auto=format&fit=crop&q=80&w=400' },
    { id: '2', title: 'Vending Zone A', price: 12000, area: '100 sq.ft', location: 'Gomti Nagar, Lucknow', city: 'Lucknow', type: 'Sell', image: 'https://images.unsplash.com/photo-1605218427306-633ba8729d53?auto=format&fit=crop&q=80&w=400' },
    { id: '3', title: 'Busy Street Stall', price: 3500, area: '30 sq.ft', location: 'Chandni Chowk, Delhi', city: 'New Delhi', type: 'Rent', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400' },
    { id: '4', title: 'Main Market Hub', price: 4500, area: '40 sq.ft', location: 'Bandra West, Mumbai', city: 'Mumbai', type: 'Rent', image: 'https://images.unsplash.com/photo-1541696229559-a54992569502?auto=format&fit=crop&q=80&w=400' },
  ];

  const filteredListings = allListings.filter(item => {
    if (typeFilter !== 'All' && item.type !== typeFilter) return false;
    if (priceFilter === 'Under ₹5k' && item.price >= 5000) return false;
    if (priceFilter === '₹5k - ₹10k' && (item.price < 5000 || item.price > 10000)) return false;
    if (priceFilter === 'Above ₹10k' && item.price <= 10000) return false;
    if (cityFilter && !item.city.toLowerCase().includes(cityFilter.toLowerCase())) return false;
    if (stateFilter && !cityFilter) {
       const stateCities = locationData[stateFilter] || [];
       if (!stateCities.some(c => item.city.includes(c))) return false;
    }
    return true;
  });

  const availableCities = stateFilter ? locationData[stateFilter] || [] : [];

  return (
    <div className="space-y-4 pb-24">
       <div className="flex justify-between items-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-3 rounded-xl border-2 border-wood-light/20 dark:border-gray-700 shadow-sm">
         <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.buy.title}</h2>
         <span className="text-xs font-bold bg-brick dark:bg-red-700 text-white px-2 py-1 rounded-md shadow-sm">{filteredListings.length} {t.buy.listings}</span>
       </div>

       <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-2xl shadow-md border-2 border-wood-light/20 dark:border-gray-700 space-y-4">
          <div>
            <label className="text-[10px] font-bold text-wood-light dark:text-gray-400 uppercase tracking-wider mb-1.5 block">{t.buy.type}</label>
            <div className="flex gap-2">
               {['All', 'Rent', 'Sell'].map((type) => {
                  let label = type;
                  if (type === 'All') label = t.buy.all;
                  if (type === 'Rent') label = t.buy.rent;
                  if (type === 'Sell') label = t.buy.sell;
                  return (
                    <button 
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all shadow-sm border-2 ${
                        typeFilter === type 
                        ? 'bg-brick dark:bg-red-700 text-white border-brick dark:border-red-700' 
                        : 'bg-white dark:bg-gray-700 text-wood-darkest dark:text-gray-200 border-wood-light/20 dark:border-gray-600 hover:border-brick/50 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95'
                      }`}
                    >
                      {label}
                    </button>
                  );
               })}
            </div>
          </div>

          <div>
             <label className="text-[10px] font-bold text-wood-light dark:text-gray-400 uppercase tracking-wider mb-1.5 block">{t.buy.budget}</label>
             <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {['All', 'Under ₹5k', '₹5k - ₹10k', 'Above ₹10k'].map((price) => {
                   let label = price;
                   if (price === 'All') label = t.buy.all;
                   if (price === 'Under ₹5k') label = t.buy.under5k;
                   if (price === 'Above ₹10k') label = t.buy.above10k;
                   return (
                     <button 
                       key={price}
                       onClick={() => setPriceFilter(price)}
                       className={`px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all shadow-sm border-2 ${
                         priceFilter === price 
                         ? 'bg-teal text-white border-teal dark:bg-teal-700 dark:border-teal-700' 
                         : 'bg-white dark:bg-gray-700 text-wood-darkest dark:text-gray-200 border-wood-light/20 dark:border-gray-600 hover:border-teal/50 hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95'
                       }`}
                     >
                       {label}
                     </button>
                   );
                })}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
             <div className="relative">
                <MapPin size={14} className="absolute left-3 top-3.5 text-brick dark:text-orange-400" />
                <select 
                  className="w-full pl-9 pr-7 py-3 bg-white dark:bg-gray-700 border-2 border-wood-light/20 dark:border-gray-600 rounded-xl text-xs font-bold text-wood-darkest dark:text-gray-200 outline-none focus:border-brick dark:focus:border-orange-500 focus:ring-1 focus:ring-brick appearance-none shadow-sm cursor-pointer hover:border-wood-light transition-colors"
                  value={stateFilter}
                  onChange={(e) => {
                    setStateFilter(e.target.value);
                    setCityFilter(''); 
                  }}
                >
                   <option value="">{t.buy.selectState}</option>
                   {Object.keys(locationData).sort().map(state => (
                     <option key={state} value={state}>{state}</option>
                   ))}
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <ChevronRight size={14} className="rotate-90 text-gray-400" />
                </div>
                {stateFilter && (
                   <button onClick={() => {setStateFilter(''); setCityFilter('');}} className="absolute right-7 top-3.5 text-gray-400 hover:text-red-500">
                     <X size={14} />
                   </button>
                )}
             </div>

             <div className="relative">
                <Search size={14} className="absolute left-3 top-3.5 text-brick dark:text-orange-400" />
                <select 
                  className={`w-full pl-9 pr-7 py-3 bg-white dark:bg-gray-700 border-2 border-wood-light/20 dark:border-gray-600 rounded-xl text-xs font-bold text-wood-darkest dark:text-gray-200 outline-none focus:border-brick dark:focus:border-orange-500 focus:ring-1 focus:ring-brick appearance-none shadow-sm cursor-pointer hover:border-wood-light transition-colors ${!stateFilter ? 'opacity-50 cursor-not-allowed' : ''}`}
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  disabled={!stateFilter}
                >
                   <option value="">{t.buy.selectCity}</option>
                   {availableCities.sort().map(city => (
                      <option key={city} value={city}>{city}</option>
                   ))}
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <ChevronRight size={14} className="rotate-90 text-gray-400" />
                </div>
             </div>
          </div>
       </div>

       <div className="grid gap-4">
         {filteredListings.map((item) => (
           <motion.div 
             key={item.id}
             layout
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border-2 border-wood-light/10 dark:border-gray-700 group relative hover:border-brick/30 dark:hover:border-orange-500/30 transition-colors"
           >
             <div className="h-32 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className={`absolute top-2 right-2 px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-md ${
                  item.type === 'Sell' ? 'bg-brick dark:bg-red-700 text-white' : 'bg-teal dark:bg-teal-700 text-white'
                }`}>
                  {item.type === 'Sell' ? t.buy.sell : t.buy.rent}
                </div>
                <button className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur rounded-full text-brick dark:text-orange-500 shadow-sm hover:scale-110 transition-transform active:scale-95 border border-brick/10 dark:border-gray-600">
                  <Heart size={16} fill="none" className="hover:fill-brick dark:hover:fill-orange-500 transition-colors" />
                </button>
             </div>
             
             <div className="p-3.5">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-wood-darkest dark:text-gray-100 text-sm line-clamp-1">{item.title}</h3>
                  <span className="text-brick dark:text-orange-400 font-extrabold text-sm whitespace-nowrap">₹{item.price.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-wood dark:text-gray-400 font-medium mb-3">
                  <MapPin size={12} className="text-saffron-600 dark:text-orange-400" /> 
                  <span className="truncate">{item.location}, {item.city}</span>
                  <span className="text-wood-light dark:text-gray-500">•</span>
                  <span>{item.area}</span>
                </div>
                
                <div className="flex gap-2 mt-auto">
                   <button className="flex-1 bg-wood-darkest dark:bg-gray-900 text-white py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-black dark:hover:bg-black transition-colors shadow-md border-2 border-transparent active:scale-95">
                     <Phone size={14} className="text-saffron-500" /> {t.buy.call}
                   </button>
                   <button className="flex-1 bg-white dark:bg-gray-700 border-2 border-wood-light/20 dark:border-gray-600 text-wood-darkest dark:text-gray-200 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-wood-light transition-all shadow-sm active:scale-95">
                     <MessageCircle size={14} className="text-teal dark:text-teal-400" /> {t.buy.chat}
                   </button>
                </div>
             </div>
           </motion.div>
         ))}
       </div>
       
       {filteredListings.length === 0 && (
          <div className="text-center py-10 opacity-60">
             <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-full mb-3 shadow-sm border-2 border-wood-light/20 dark:border-gray-700">
               <Filter size={32} className="text-wood-light dark:text-gray-500" />
             </div>
             <p className="text-wood-dark dark:text-gray-400 font-bold text-sm">{t.buy.noListings}</p>
             <p className="text-xs text-wood-light dark:text-gray-500">{t.buy.tryFilters}</p>
          </div>
       )}
    </div>
  );
};

export const SellLandView = ({ t }: { t: any }) => (
  <div className="space-y-5 pb-24">
    <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.sell.title}</h2>
    
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700 space-y-4">
       <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl h-32 flex flex-col items-center justify-center text-gray-400 gap-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer hover:border-brick dark:hover:border-orange-500">
          <Camera size={32} />
          <span className="text-xs font-bold">{t.sell.upload}</span>
       </div>

       <div className="space-y-3">
         <div>
           <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.sell.propTitle}</label>
           <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" placeholder="e.g. Corner Stall near Metro" />
         </div>
         <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.sell.price}</label>
              <div className="relative">
                <DollarSign size={14} className="absolute left-3 top-3.5 text-gray-400" />
                <input type="number" className="w-full pl-8 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" placeholder="5000" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.sell.size}</label>
              <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" placeholder="50" />
            </div>
         </div>
         <div>
            <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.sell.location}</label>
            <div className="flex gap-2">
               <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" placeholder={t.sell.pin} />
               <button className="bg-brick/10 dark:bg-orange-500/20 text-brick dark:text-orange-400 p-3 rounded-lg border-2 border-brick/20 dark:border-orange-500/20 hover:bg-brick dark:hover:bg-orange-500 hover:text-white transition-colors"><MapPin size={20} /></button>
            </div>
         </div>
       </div>

       <button className="w-full bg-brick dark:bg-red-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-brick/20 dark:shadow-red-900/20 border-2 border-transparent hover:bg-brick-dark dark:hover:bg-red-800 active:scale-[0.98] transition-all">
         {t.sell.post}
       </button>
    </div>
  </div>
);

export const LicenseGuideView = ({ t }: { t: any }) => (
  <div className="space-y-4 pb-24">
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 rounded-xl p-5 text-white shadow-lg border-2 border-blue-400 dark:border-blue-700">
      <h2 className="text-xl font-bold font-display mb-1">{t.license.title}</h2>
      <p className="text-blue-100 text-xs">{t.license.desc}</p>
    </div>

    <div className="space-y-2">
       {[
         { title: t.license.docs, icon: FileText, color: "text-blue-600 dark:text-blue-400" },
         { title: t.license.scheme, icon: DollarSign, color: "text-green-600 dark:text-green-400" },
         { title: t.license.apply, icon: ExternalLink, color: "text-orange-600 dark:text-orange-400" },
         { title: t.license.municipal, icon: MapPin, color: "text-purple-600 dark:text-purple-400" }
       ].map((item, i) => (
         <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-2 border-gray-100 dark:border-gray-700 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-wood-light/30 active:scale-[0.99] transition-all">
            <div className="flex items-center gap-3">
               <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700 ${item.color}`}>
                 <item.icon size={20} />
               </div>
               <span className="font-bold text-wood-darkest dark:text-gray-200 text-sm">{item.title}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
         </div>
       ))}
    </div>
  </div>
);

export const LegalRightsView = ({ t }: { t: any }) => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>('act2014');
  
  const RightCard = ({ title, description, color = 'brick' }: { title: string; description: string; color?: string }) => {
    const colorMap: Record<string, { border: string; text: string; bg: string }> = {
      brick: { border: 'border-brick dark:border-red-600', text: 'text-brick dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
      teal: { border: 'border-teal dark:border-teal-600', text: 'text-teal dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-900/20' },
      blue: { border: 'border-blue-500 dark:border-blue-600', text: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
      purple: { border: 'border-purple-500 dark:border-purple-600', text: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
      green: { border: 'border-green-500 dark:border-green-600', text: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
      orange: { border: 'border-orange-500 dark:border-orange-600', text: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    };
    const colors = colorMap[color] || colorMap.brick;
    
    return (
      <div className={`${colors.bg} border-l-4 ${colors.border} rounded-xl p-4 border-t border-r border-b border-gray-100 dark:border-gray-700 shadow-sm`}>
        <h4 className={`font-bold ${colors.text} mb-2 text-sm`}>{title}</h4>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>
    );
  };
  
  const ExpandableSection = ({ title, sectionId, children, icon = Gavel }: { title: string; sectionId: string; children: React.ReactNode; icon?: any }) => {
    const isExpanded = expandedSection === sectionId;
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
        <button
          onClick={() => setExpandedSection(isExpanded ? null : sectionId)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="text-brick dark:text-red-500 flex-shrink-0">
              <icon size={20} />
            </div>
            <h3 className="font-bold text-wood-darkest dark:text-gray-100 text-sm truncate">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp size={20} className="text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
          )}
        </button>
        {isExpanded && (
          <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-700 space-y-3">
            {children}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-4 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron-600 to-saffron-700 dark:from-orange-700 dark:to-orange-800 rounded-xl p-5 text-white shadow-lg border-2 border-saffron-400 dark:border-orange-600">
        <h2 className="text-xl font-bold font-display mb-1 flex items-center gap-2">
          <Shield size={24} /> {t.legal.title}
        </h2>
        <p className="text-saffron-100 text-xs">{t.legal.subtitle}</p>
      </div>

      {/* Street Vendors Act 2014 */}
      <ExpandableSection title={t.legal.act2014} sectionId="act2014" icon={Shield}>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">{t.legal.actDesc}</p>
        <a
          href={t.legal.actLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-brick dark:bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-brick-dark dark:hover:bg-red-700 transition-colors active:scale-[0.98]"
        >
          <ExternalLink size={14} />
          {t.legal.officialAct}
        </a>
      </ExpandableSection>

      {/* Key Legal Rights */}
      <ExpandableSection title={t.legal.keyRights} sectionId="rights" icon={Gavel}>
        <div className="space-y-3">
          <RightCard title={t.legal.right1} description={t.legal.right1Desc} color="brick" />
          <RightCard title={t.legal.right2} description={t.legal.right2Desc} color="teal" />
          <RightCard title={t.legal.right3} description={t.legal.right3Desc} color="blue" />
          <RightCard title={t.legal.right4} description={t.legal.right4Desc} color="green" />
          <RightCard title={t.legal.right5} description={t.legal.right5Desc} color="purple" />
          <RightCard title={t.legal.right6} description={t.legal.right6Desc} color="orange" />
        </div>
      </ExpandableSection>

      {/* Constitutional Rights */}
      <ExpandableSection title={t.legal.constitutional} sectionId="constitutional" icon={Shield}>
        <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{t.legal.constitutionalDesc}</p>
        <div className="space-y-3">
          <RightCard title={t.legal.article191g} description={t.legal.article191gDesc} color="brick" />
          <RightCard title={t.legal.article14} description={t.legal.article14Desc} color="blue" />
          <RightCard title={t.legal.article21} description={t.legal.article21Desc} color="teal" />
        </div>
      </ExpandableSection>

      {/* Enforcement & TVC */}
      <ExpandableSection title={t.legal.enforcement} sectionId="enforcement" icon={Briefcase}>
        <div className="space-y-3">
          <RightCard title={t.legal.tvc} description={t.legal.tvcDesc} color="green" />
        </div>
      </ExpandableSection>

      {/* External Resources */}
      <ExpandableSection title={t.legal.resources} sectionId="resources" icon={ExternalLink}>
        <div className="space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border-l-4 border-blue-500 dark:border-blue-600">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">{t.legal.legalDocs}</p>
            <a
              href={t.legal.actLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              <ExternalLink size={14} />
              Official Act Text
            </a>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg border-l-4 border-purple-500 dark:border-purple-600">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">{t.legal.legalServiceIndia}</p>
            <a
              href={t.legal.legalServiceIndiaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-purple-500 dark:bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors"
            >
              <ExternalLink size={14} />
              Rights Article
            </a>
          </div>
        </div>
      </ExpandableSection>

      {/* File Complaint Button */}
      <button className="w-full py-3 border-2 border-wood-light/20 dark:border-gray-600 rounded-xl font-bold text-wood-dark dark:text-gray-200 flex items-center justify-center gap-2 hover:bg-brick dark:hover:bg-red-700 hover:border-brick dark:hover:border-red-700 hover:text-white transition-all active:scale-[0.98]">
         <Gavel size={18} /> {t.legal.complaint}
      </button>
    </div>
  );
};

export const MessagesView = ({ t }: { t: any }) => (
   <div className="space-y-2 pb-24">
      <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display mb-4">{t.messages.title}</h2>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 flex gap-3 items-center hover:border-wood-light/30 dark:hover:border-gray-500 transition-colors cursor-pointer active:scale-[0.99]">
           <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-100 dark:border-gray-600">
             <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" />
           </div>
           <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-bold text-sm text-wood-darkest dark:text-gray-200">Rakesh Kumar</h4>
                <span className="text-[10px] text-gray-400">10:30 AM</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Is the stall still available for rent?</p>
           </div>
        </div>
      ))}
   </div>
);

// --- New Views for Profile Functionality ---

export const EditProfileView = ({ t, formData, setFormData }: { t: any; formData: any; setFormData: any }) => {
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4 pb-24">
      <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.editProfile.title}</h2>
      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700 space-y-4">
        <div className="flex justify-center mb-4">
           <div className="relative">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full border-2 border-brick dark:border-orange-500 flex items-center justify-center text-4xl overflow-hidden">
                 👨🏽‍🍳
              </div>
              <button className="absolute bottom-0 right-0 bg-wood-dark dark:bg-gray-900 text-white p-2 rounded-full border-2 border-white dark:border-gray-800 shadow-md">
                 <Camera size={14} />
              </button>
           </div>
        </div>
        <div className="space-y-3">
           <div>
             <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.editProfile.name}</label>
             <input type="text" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" />
           </div>
           <div>
             <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.editProfile.mobile}</label>
             <input type="text" value={formData.phone} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" disabled />
           </div>
           <div>
             <label className="text-xs font-bold text-wood-dark dark:text-gray-300 mb-1 block">{t.editProfile.city}</label>
             <input type="text" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-2 border-gray-200 dark:border-gray-600 text-sm focus:border-brick dark:focus:border-orange-500 text-wood-darkest dark:text-gray-100 outline-none transition-colors" />
           </div>
        </div>
        <button onClick={() => {}} className="w-full bg-brick dark:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-brick/20 dark:shadow-red-900/20 border-2 border-transparent hover:bg-brick-dark dark:hover:bg-red-800 active:scale-[0.98] transition-all">
           {t.editProfile.save}
        </button>
      </div>
    </div>
  );
};

export const HistoryView = ({ t }: { t: any }) => (
  <div className="space-y-4 pb-24">
    <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.history.title}</h2>
    <div className="space-y-3">
       {[
         { action: t.history.listed, detail: "Corner Stall near Metro", time: "2 days ago", icon: Upload, color: "text-blue-500 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/40" },
         { action: t.history.contacted, detail: "Rakesh Kumar", time: "5 days ago", icon: MessageCircle, color: "text-green-500 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/40" },
         { action: t.history.updated, detail: "Changed profile picture", time: "1 week ago", icon: User, color: "text-purple-500 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/40" }
       ].map((item, i) => (
         <div key={i} className="bg-white dark:bg-gray-800 p-3 rounded-xl border-2 border-gray-100 dark:border-gray-700 flex gap-3 items-center">
            <div className={`p-3 rounded-lg ${item.bg} ${item.color}`}>
               <item.icon size={18} />
            </div>
            <div className="flex-1">
               <h4 className="font-bold text-sm text-wood-darkest dark:text-gray-100">{item.action}</h4>
               <p className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</p>
            </div>
            <span className="text-[10px] text-gray-400 font-bold">{item.time}</span>
         </div>
       ))}
    </div>
  </div>
);

export const SavedListingsView = ({ t }: { t: any }) => (
  <div className="space-y-4 pb-24">
    <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.saved.title}</h2>
    <div className="grid gap-4">
         {[
           { id: '1', title: 'Prime Corner Spot', price: 5000, area: '50 sq.ft', location: 'Hazratganj, Lucknow', type: 'Rent', image: 'https://images.unsplash.com/photo-1579618172909-66c5db321016?auto=format&fit=crop&q=80&w=400' },
           { id: '3', title: 'Busy Street Stall', price: 3500, area: '30 sq.ft', location: 'Chandni Chowk, Delhi', type: 'Rent', image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=400' },
         ].map((item) => (
           <div key={item.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border-2 border-gray-100 dark:border-gray-700 flex h-24">
             <div className="w-24 bg-gray-200 dark:bg-gray-700 relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 p-2 flex flex-col justify-between">
                <div>
                   <h3 className="font-bold text-wood-darkest dark:text-gray-100 text-sm line-clamp-1">{item.title}</h3>
                   <span className="text-xs text-gray-500 dark:text-gray-400">{item.location}</span>
                </div>
                <div className="flex justify-between items-end">
                   <span className="text-brick dark:text-orange-400 font-extrabold text-sm">₹{item.price}</span>
                   <button className="p-1.5 bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900">
                      <Heart size={14} fill="currentColor" />
                   </button>
                </div>
             </div>
           </div>
         ))}
    </div>
  </div>
);

export const SettingsView = ({ t }: { t: any }) => (
  <div className="space-y-4 pb-24">
    <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.settings.title}</h2>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700 overflow-hidden">
       {[
         { icon: Bell, label: t.settings.notifications, toggle: true },
         { icon: Languages, label: t.settings.language, value: "English/Hindi" },
         { icon: Lock, label: t.settings.privacy, link: true },
         { icon: FileText, label: t.settings.terms, link: true },
       ].map((item, i) => (
         <div key={i} className="p-4 border-b border-gray-50 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
             <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-600 dark:text-gray-300"><item.icon size={20} /></div>
             <span className="font-bold text-gray-700 dark:text-gray-200 text-sm flex-1">{item.label}</span>
             {item.toggle && (
                <div className="w-10 h-6 bg-brick dark:bg-orange-600 rounded-full relative">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
             )}
             {item.value && <span className="text-xs text-gray-400 font-bold">{item.value}</span>}
             {item.link && <ChevronRight size={16} className="text-gray-400" />}
         </div>
       ))}
    </div>
  </div>
);

export const HelpSupportView = ({ t }: { t: any }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const founders = [
    { name: "Harshita Aghnihotri", phone: "8957420402" },
    { name: "Jahnvi Singh", phone: "8707231029" },
    { name: "Sonu Yadav", phone: "6392173081" },
    { name: "Naman Srivastava", phone: "7307026112" }
  ];

  return (
    <div className="space-y-6 pb-24">
      <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100 font-display">{t.help.title}</h2>

      {/* Founders Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border-2 border-wood-light/10 dark:border-gray-700 overflow-hidden">
        <div className="bg-saffron-50 dark:bg-orange-900/20 p-3 border-b border-saffron-100 dark:border-orange-800/30 flex items-center gap-2">
           <User size={18} className="text-saffron-600 dark:text-orange-400" />
           <h3 className="font-bold text-wood-darkest dark:text-gray-200 text-sm">{t.help.founders}</h3>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-700">
           {founders.map((f, i) => (
             <div key={i} className="p-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
                <div>
                   <p className="font-bold text-sm text-wood-dark dark:text-gray-300">{f.name}</p>
                   <a href={`tel:${f.phone}`} className="text-xs text-gray-500 dark:text-gray-400 hover:text-brick dark:hover:text-orange-400 font-medium flex items-center gap-1 mt-0.5">
                      <Phone size={10} /> +91 {f.phone}
                   </a>
                </div>
                <a href={`tel:${f.phone}`} className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 border border-green-200 dark:border-green-800">
                   <Phone size={16} />
                </a>
             </div>
           ))}
        </div>
      </div>

      {/* Email Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border-2 border-wood-light/10 dark:border-gray-700 flex items-center gap-4">
         <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
            <Mail size={24} />
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-sm text-wood-darkest dark:text-gray-200">{t.help.emailSupport}</h4>
            <a href="mailto:nukkadbazaar34@gmail.com" className="text-xs font-bold text-brick dark:text-orange-400 mt-1 block hover:underline">
               nukkadbazaar34@gmail.com
            </a>
         </div>
      </div>

      {/* FAQ Section */}
      <div>
         <h3 className="font-bold text-wood-dark dark:text-gray-300 text-sm mb-3 px-1">{t.help.faqTitle}</h3>
         <div className="space-y-2">
            {t.help.faqs.map((item: any, i: number) => (
               <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-100 dark:border-gray-700 overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                     <span className="font-bold text-sm text-wood-darkest dark:text-gray-200">{item.q}</span>
                     {openFaq === i ? <ChevronUp size={16} className="text-brick dark:text-orange-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {openFaq === i && (
                     <div className="px-4 pb-4 pt-0 text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed bg-gray-50/50 dark:bg-gray-700/30 border-t border-gray-50 dark:border-gray-700">
                        <div className="pt-3">{item.a}</div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// Helper for InfoCircle which I missed importing
const InfoCircle = ({ className, size }: { className?: string, size?: number }) => (
   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);

export const ProfileView = ({ t, onLogout, onNavigate, formData }: { t: any; onLogout: () => void, onNavigate: (view: AppView) => void, formData?: any }) => (
  <div className="pb-24">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-20 h-20 bg-saffron-200 dark:bg-orange-900 rounded-full border-4 border-white dark:border-gray-700 shadow-lg flex items-center justify-center text-3xl">
        👨🏽‍🍳
      </div>
      <div>
        <h2 className="text-xl font-bold text-wood-darkest dark:text-gray-100">{(formData && formData.name) || 'User'}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.profile.vendor} • {(formData && formData.city) || '—'}</p>
        <div className="flex gap-1 mt-1">
         {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />)}
        </div>
      </div>
    </div>

     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border-2 border-gray-100 dark:border-gray-700 overflow-hidden">
        {[
          { icon: User, label: t.profile.edit, view: AppView.EDIT_PROFILE },
          { icon: History, label: t.profile.history, view: AppView.HISTORY },
          { icon: Heart, label: t.profile.saved, view: AppView.SAVED },
          { icon: SettingsIcon, label: t.profile.settings, view: AppView.SETTINGS },
          { icon: AlertTriangle, label: t.profile.help, view: AppView.SUPPORT },
        ].map((item, i) => (
          <div key={i} onClick={() => onNavigate(item.view)} className="p-4 border-b border-gray-50 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer active:bg-gray-100 transition-colors">
             <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"><item.icon size={20} /></div>
             <span className="font-bold text-gray-700 dark:text-gray-200 text-sm flex-1">{item.label}</span>
             <ChevronRight size={16} className="text-gray-400" />
          </div>
        ))}
        <div onClick={onLogout} className="p-4 flex items-center gap-4 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer text-red-600 dark:text-red-400 active:bg-red-100 transition-colors">
             <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg border border-red-200 dark:border-red-900"><LogOut size={20} /></div>
             <span className="font-bold text-sm flex-1">{t.profile.logout}</span>
        </div>
     </div>
  </div>
);
