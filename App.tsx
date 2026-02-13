
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, 
  User as UserIcon, 
  ArrowLeft,
  Check,
  ChevronRight,
  Languages,
  TrendingUp,
  Package,
  Briefcase,
  Home,
  Map,
  ShoppingCart,
  Bell,
  Gavel,
  Shield,
  MessageCircle,
  Phone,
  Search,
  MapPin,
  Settings,
  Moon,
  Sun
} from 'lucide-react';

import LoadingThela from './components/LoadingThela';
import FullScreenToggle from './components/FullScreenToggle';
import Toast from './components/Toast';
import Chatbot from './components/Chatbot';
import { 
  BuyLandView, SellLandView, MapView, LicenseGuideView, LegalRightsView, MessagesView, ProfileView,
  EditProfileView, HistoryView, SavedListingsView, SettingsView, HelpSupportView
} from './components/DashboardViews';
import { AuthMode, ToastMessage, Language, AppView } from './types';

// --- Translations ---
const translations = {
  en: {
    title: "Empowering Traders, Enriching the City",
    subtitle: "Your Digital Street Shop",
    mobilePlaceholder: "Mobile Number",
    agree: "I Agree to T&C's Privacy Policy",
    loginBtn: "Login with OTP",
    orContinue: "or continue with",
    googleBtn: "Google",
    welcomeBack: "Welcome Back",
    verifyOtp: "Verify OTP",
    enterOtp: "Enter the code sent to",
    resend: "Resend OTP",
    verifyBtn: "Verify & Proceed",
    setupProfile: "Complete Your Profile",
    fullName: "Full Name",
    email: "Email Address",
    role: "Select Role",
    vendor: "Vendor",
    user: "User",
    openShop: "Continue",
    dashboard: "Vendor Dashboard",
    logout: "Logout",
    greetings: {
      namaste: "Namaste,",
      subtitle: "Find or list your perfect vending spot."
    },
    errors: {
      enterMobile: "Please enter a valid mobile number",
      invalidOtp: "Invalid OTP",
      fillAll: "Please fill in all fields"
    },
    success: {
      otpSent: "OTP Sent",
      verified: "Verified Successfully",
      welcome: "Welcome to NukkadBazaar"
    },
    // Dashboard Translations
    nav: { home: "Home", map: "Map", buy: "Buy", sell: "Sell", profile: "Profile" },
    home: {
      searchPlaceholder: "Find vending spots in Hazratganj...",
      whatLookingFor: "What are you looking for?",
      listSpace: "List Your Space",
      services: "Services",
      recentListings: "Recent Listings",
      license: "License",
      rights: "Rights",
      chat: "Chat",
      support: "Support"
    },
    map: { search: "Search Area (e.g., Sharma, Chaat)" },
    buy: { 
      title: "Buy Land", 
      listings: "Listings", 
      type: "Listing Type", 
      budget: "Budget", 
      rent: "Rent", 
      sell: "Sell", 
      all: "All", 
      under5k: "Under ₹5k", 
      above10k: "Above ₹10k",
      selectState: "Select State",
      selectCity: "Select City",
      noListings: "No listings found",
      tryFilters: "Try changing filters",
      call: "Call",
      chat: "Chat"
    },
    sell: { 
      title: "Add New Listing", 
      upload: "Upload Photos", 
      propTitle: "Property Title", 
      price: "Price (₹)", 
      size: "Size (sq.ft)", 
      location: "Location", 
      pin: "Pin on map", 
      post: "Post Listing" 
    },
    license: {
      title: "Vending Certificate",
      desc: "Step-by-step guide to get your official license.",
      docs: "Required Documents",
      scheme: "PM SVANidhi Scheme",
      apply: "Apply Online (FSSAI)",
      municipal: "Municipal Corporation"
    },
    legal: {
      title: "Know Your Rights",
      subtitle: "Protected under Street Vendors Act, 2014",
      act2014: "Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act, 2014",
      actDesc: "A central Act passed by the Government of India to recognise and protect the rights of street vendors, regulate vending activities, and provide livelihood protection and grievance redressal.",
      officialAct: "Official Act Source (Government)",
      actLink: "https://www.indiacode.nic.in/handle/123456789/2124",
      
      keyRights: "Key Legal Rights & Provisions",
      
      right1: "Right to Carry on Vending Activities (Section 12)",
      right1Desc: "Every certified street vendor has the legal right to sell goods and services in accordance with the terms and conditions of their Vending Certificate. Limit: Cannot sell in designated no–vending zones.",
      
      right2: "Right to Relocation (Section 13)",
      right2Desc: "If a vendor must be moved by authorities, they are entitled to an alternative site or area determined in consultation with the Town Vending Committee. This ensures continuity of livelihood.",
      
      right3: "Protection from Harassment (Section 27)",
      right3Desc: "A certified vendor who is lawfully vending cannot be prevented from doing so by police or any authority so long as they comply with the Act's terms. This protects vendors from arbitrary harassment or illegal removal.",
      
      right4: "Duty to Maintain Public Hygiene and Cleanliness",
      right4Desc: "Certified vendors are required to: Keep the vending location clean, Maintain public property in good condition, Remove goods at end of daily vending period, Pay periodic maintenance charges if applicable.",
      
      right5: "No Arbitrary Eviction Before Survey",
      right5Desc: "The Act mandates that vendors cannot be evicted before surveys and allocation of vending zones are completed – offering security against sudden displacement.",
      
      right6: "Penalties & Legal Compliance (Section 28)",
      right6Desc: "Selling without a vending certificate or contravening conditions can result in a penalty determined by local authorities (often up to ₹2,000). So vendors must comply with certificate terms to avoid fines.",
      
      constitutional: "Constitutional Rights Supporting Vendors",
      constitutionalDesc: "In addition to the Street Vendors Act, Indian Fundamental Rights support street vendors' economic activity:",
      
      article191g: "Article 19(1)(g)",
      article191gDesc: "Freedom to practise any profession, trade, or business. This can be invoked to protect street vending as a legitimate occupation.",
      
      article14: "Article 14",
      article14Desc: "Equality before law — vendors must be treated equally and not discriminated against in law enforcement.",
      
      article21: "Article 21",
      article21Desc: "Protection of life and personal liberty — interpreted to include the right to livelihood and protection against arbitrary actions affecting livelihood.",
      
      enforcement: "Enforcement & Institutional Framework",
      tvc: "Town Vending Committee (TVC)",
      tvcDesc: "Local bodies (municipal corporations / Nagar Panchayats) must form TVCs to: Conduct vendor surveys, Allocate vending spaces, Issue vending certificates, Recommend relocation, Balance public convenience with livelihoods.",
      
      resources: "Useful Resources & Links",
      legalDocs: "Legal Documents",
      legalServiceIndia: "Legal Service India - Rights Article",
      legalServiceIndiaLink: "https://www.legalserviceindia.com/legal/article-14339-rights-of-street-vendors-and-their-exploitation.html",
      
      complaint: "File a Complaint"
    },
    messages: { title: "Messages" },
    profile: {
      edit: "Edit Profile",
      history: "History",
      saved: "Saved Listings",
      settings: "Settings",
      help: "Help & Support",
      logout: "Logout",
      vendor: "Street Vendor"
    },
    editProfile: { title: "Edit Profile", name: "Full Name", mobile: "Mobile Number", city: "City", save: "Save Changes" },
    history: { title: "Activity History", listed: "Listed Property", contacted: "Contacted Seller", updated: "Updated Profile" },
    saved: { title: "Saved Listings" },
    settings: { title: "Settings", notifications: "Notifications", language: "Language", privacy: "Privacy Policy", terms: "Terms of Service" },
    help: {
      title: "Help & Support",
      needHelp: "Need Help?",
      helpDesc: "Our support team is available from 9 AM to 6 PM, Monday to Saturday.",
      call: "Call Support",
      email: "Email Us",
      faq: "FAQs",
      founders: "Founders & Contact",
      emailSupport: "Email Support",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        { q: "How do I list my shop?", a: "Navigate to the 'Sell' tab and click on 'List Your Space'. Fill in the details and upload photos." },
        { q: "Is it free to use?", a: "Yes, NukkadBazaar is currently free for all street vendors and buyers." },
        { q: "How do I verify my account?", a: "Profile verification happens automatically via OTP. Vendor licenses can be uploaded in the License section." }
      ]
    }
  },
  hi: {
    title: "व्यापारी का स्थान, शहर को व्यापार",
    subtitle: "आपकी डिजिटल दुकान",
    mobilePlaceholder: "मोबाइल नंबर",
    agree: "मैं नियमों और गोपनीयता नीति से सहमत हूँ",
    loginBtn: "ओटीपी के साथ लॉगिन करें",
    orContinue: "या जारी रखें",
    googleBtn: "गूगल",
    welcomeBack: "वापसी पर स्वागत है",
    verifyOtp: "ओटीपी सत्यापित करें",
    enterOtp: "कोड दर्ज करें जो भेजा गया है",
    resend: "ओटीपी फिर भेजें",
    verifyBtn: "सत्यापित करें और आगे बढ़ें",
    setupProfile: "अपनी प्रोफाइल पूरी करें",
    fullName: "पूरा नाम",
    email: "ईमेल पता",
    role: "भूमिका चुनें",
    vendor: "विक्रेता",
    user: "उपयोगकर्ता",
    openShop: "जारी रखें",
    dashboard: "विक्रेता डैशबोर्ड",
    logout: "लॉग आउट",
    greetings: {
      namaste: "नमस्ते,",
      subtitle: "अपना सही स्थान खोजें या सूची बनाएं।"
    },
    errors: {
      enterMobile: "कृपया मान्य मोबाइल नंबर दर्ज करें",
      invalidOtp: "अमान्य ओटीपी",
      fillAll: "कृपया सभी फ़ील्ड भरें"
    },
    success: {
      otpSent: "ओटीपी भेजा गया",
      verified: "सत्यापन सफल",
      welcome: "नुक्कड़ बाज़ार में आपका स्वागत है"
    },
    // Dashboard Translations
    nav: { home: "होम", map: "नक्शा", buy: "खरीदें", sell: "बेचें", profile: "प्रोफाइल" },
    home: {
      searchPlaceholder: "हजरतगंज में वेंडिंग स्पॉट खोजें...",
      whatLookingFor: "आप क्या ढूंढ रहे हैं?",
      listSpace: "अपनी जगह बेचें",
      services: "सेवाएं",
      recentListings: "हाल की लिस्टिंग",
      license: "लाइसेंस",
      rights: "अधिकार",
      chat: "चैट",
      support: "सहायता"
    },
    map: { search: "क्षेत्र खोजें (जैसे, शर्मा, चाट)" },
    buy: { 
      title: "ज़मीन खरीदें", 
      listings: "लिस्टिंग", 
      type: "प्रकार", 
      budget: "बजट", 
      rent: "किराया", 
      sell: "बेचना", 
      all: "सभी", 
      under5k: "₹5k से कम", 
      above10k: "₹10k से ऊपर",
      selectState: "राज्य चुनें",
      selectCity: "शहर चुनें",
      noListings: "कोई लिस्टिंग नहीं मिली",
      tryFilters: "फ़िल्टर बदलने का प्रयास करें",
      call: "कॉल",
      chat: "चैट"
    },
    sell: { 
      title: "नई लिस्टिंग जोड़ें", 
      upload: "फोटो अपलोड करें", 
      propTitle: "संपत्ति का शीर्षक", 
      price: "कीमत (₹)", 
      size: "आकार (sq.ft)", 
      location: "स्थान", 
      pin: "नक्शे पर पिन करें", 
      post: "लिस्टिंग पोस्ट करें" 
    },
    license: {
      title: "वेंडिंग सर्टिफिकेट",
      desc: "अपना आधिकारिक लाइसेंस प्राप्त करने के लिए गाइड।",
      docs: "आवश्यक दस्तावेज़",
      scheme: "पीएम स्वानिधि योजना",
      apply: "ऑनलाइन आवेदन (FSSAI)",
      municipal: "नगर निगम"
    },
    legal: {
      title: "अपने अधिकार जानें",
      subtitle: "स्ट्रीट वेंडर्स एक्ट, 2014 के तहत संरक्षित",
      act2014: "स्ट्रीट वेंडर्स (लिवलीहुड की सुरक्षा और स्ट्रीट वेंडिंग के विनियमन) अधिनियम, 2014",
      actDesc: "भारत सरकार द्वारा पारित एक केंद्रीय अधिनियम जो स्ट्रीट विक्रेताओं के अधिकारों को मान्यता देता है और उनकी रक्षा करता है, विक्रय गतिविधियों को विनियमित करता है, और आजीविका सुरक्षा और शिकायत निवारण प्रदान करता है।",
      officialAct: "आधिकारिक अधिनियम स्रोत (सरकार)",
      actLink: "https://www.indiacode.nic.in/handle/123456789/2124",
      
      keyRights: "मुख्य कानूनी अधिकार और प्रावधान",
      
      right1: "विक्रय गतिविधियां करने का अधिकार (धारा 12)",
      right1Desc: "प्रत्येक प्रमाणित स्ट्रीट विक्रेता को अपने विक्रय प्रमाणपत्र की शर्तों के अनुसार का सामान और सेवाएं बेचने का कानूनी अधिकार है। सीमा: नामित गैर-विक्रय क्षेत्रों में नहीं बेच सकते।",
      
      right2: "स्थानांतरण का अधिकार (धारा 13)",
      right2Desc: "यदि किसी विक्रेता को अधिकारियों द्वारा स्थानांतरित किया जाना चाहिए, तो वह शहर विक्रय समिति के परामर्श से निर्धारित वैकल्पिक स्थान या क्षेत्र का हकदार है।",
      
      right3: "उत्पीड़न से सुरक्षा (धारा 27)",
      right3Desc: "एक प्रमाणित विक्रेता जो वैधतापूर्वक विक्रय कर रहा है, पुलिस या किसी भी प्राधिकरण द्वारा रोका नहीं जा सकता है जब तक वह अधिनियम की शर्तों का पालन करता है।",
      
      right4: "जनता सफाई और स्वच्छता बनाए रखने का कर्तव्य",
      right4Desc: "प्रमाणित विक्रेताओं को आवश्यक है: विक्रय स्थान को स्वच्छ रखें, सार्वजनिक संपत्ति को अच्छी स्थिति में रखें, दैनिक विक्रय अवधि के अंत में सामान हटाएं।",
      
      right5: "सर्वेक्षण से पहले मनमानी बेदखली नहीं",
      right5Desc: "अधिनियम अनिवार्य करता है कि विक्रेताओं को तब तक बेदखल नहीं किया जा सकता जब तक सर्वेक्षण और विक्रय क्षेत्र आवंटन पूरा नहीं हो जाता।",
      
      right6: "दंड और कानूनी अनुपालन (धारा 28)",
      right6Desc: "प्रमाणपत्र के बिना विक्रय या शर्तों का उल्लंघन स्थानीय प्राधिकारियों द्वारा निर्धारित दंड का कारण बन सकता है।",
      
      constitutional: "विक्रेताओं का समर्थन करने वाले संवैधानिक अधिकार",
      constitutionalDesc: "स्ट्रीट वेंडर्स अधिनियम के अतिरिक्त, भारतीय मौलिक अधिकार स्ट्रीट विक्रेताओं की आर्थिक गतिविधि का समर्थन करते हैं:",
      
      article191g: "अनुच्छेद 19(1)(g)",
      article191gDesc: "किसी भी पेशा, व्यापार या व्यवसाय को अपनाने की स्वतंत्रता। इसे स्ट्रीट विक्रय को वैध व्यवसाय के रूप में सुरक्षित करने के लिए लागू किया जा सकता है।",
      
      article14: "अनुच्छेद 14",
      article14Desc: "कानून के समक्ष समानता — विक्रेताओं को समान व्यवहार किया जाना चाहिए और कानून प्रवर्तन में भेदभाव नहीं किया जाना चाहिए।",
      
      article21: "अनुच्छेद 21",
      article21Desc: "जीवन और व्यक्तिगत स्वतंत्रता की सुरक्षा — आजीविका का अधिकार और आजीविका को प्रभावित करने वाली मनमानी कार्रवाई से सुरक्षा शामिल है।",
      
      enforcement: "प्रवर्तन और संस्थागत ढांचा",
      tvc: "शहर विक्रय समिति (TVC)",
      tvcDesc: "स्थानीय निकायों (नगर निगम / नगर पंचायत) को TVC बनाने चाहिए जो: विक्रेता सर्वेक्षण करें, विक्रय स्थान आवंटित करें, विक्रय प्रमाणपत्र जारी करें।",
      
      resources: "उपयोगी संसाधन और लिंक",
      legalDocs: "कानूनी दस्तावेज़",
      legalServiceIndia: "लीगल सर्विस इंडिया - अधिकार लेख",
      legalServiceIndiaLink: "https://www.legalserviceindia.com/legal/article-14339-rights-of-street-vendors-and-their-exploitation.html",
      
      complaint: "शिकायत दर्ज करें"
    },
    messages: { title: "संदेश" },
    profile: {
      edit: "प्रोफाइल बदलें",
      history: "इतिहास",
      saved: "सहेजे गए",
      settings: "सेटिंग्स",
      help: "सहायता और समर्थन",
      logout: "लॉग आउट",
      vendor: "स्ट्रीट वेंडर"
    },
    editProfile: { title: "प्रोफाइल बदलें", name: "पूरा नाम", mobile: "मोबाइल नंबर", city: "शहर", save: "बदलाव सहेजें" },
    history: { title: "गतिविधि इतिहास", listed: "सूचीबद्ध संपत्ति", contacted: "विक्रेता से संपर्क किया", updated: "प्रोफाइल अपडेट की" },
    saved: { title: "सहेजी गई लिस्टिंग" },
    settings: { title: "सेटिंग्स", notifications: "सूचनाएं", language: "भाषा", privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें" },
    help: {
      title: "सहायता और समर्थन",
      needHelp: "मदद चाहिए?",
      helpDesc: "हमारी सहायता टीम सोमवार से शनिवार, सुबह 9 बजे से शाम 6 बजे तक उपलब्ध है।",
      call: "कॉल सपोर्ट",
      email: "हमें ईमेल करें",
      faq: "सामान्य प्रश्न",
      founders: "संस्थापक और संपर्क",
      emailSupport: "ईमेल सहायता",
      faqTitle: "सामान्य प्रश्न",
      faqs: [
        { q: "मैं अपनी दुकान कैसे लिस्ट करूं?", a: "'बेचें' टैब पर जाएं और 'लिस्ट योर स्पेस' पर क्लिक करें। विवरण भरें और फोटो अपलोड करें।" },
        { q: "क्या यह उपयोग करने के लिए मुफ़्त है?", a: "हाँ, नुक्कड़ बाज़ार अभी सभी स्ट्रीट वेंडर्स और खरीदारों के लिए मुफ़्त है।" },
        { q: "मैं अपना खाता कैसे सत्यापित करूं?", a: "प्रोफाइल सत्यापन ओटीपी के माध्यम से स्वचालित रूप से होता है। वेंडर लाइसेंस को लाइसेंस अनुभाग में अपलोड किया जा सकता है।" }
      ]
    }
  }
};

// --- Floating Sticker Component ---
const FloatingSticker = ({ emoji, initialX, initialY, delay, size = "text-4xl" }: { emoji: string, initialX: string, initialY: string, delay: number, size?: string }) => (
  <motion.div
    className={`absolute pointer-events-none select-none opacity-20 z-0 ${size} drop-shadow-md floating-3d`}
    style={{ left: initialX, top: initialY }}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration: 5, 
      delay: delay, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    {emoji}
  </motion.div>
);

// --- Component ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<AuthMode>(AuthMode.MOBILE_ENTRY);
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [backgroundUrl, setBackgroundUrl] = useState<string>('/images/background.jpeg');
  
  const t = translations[lang];
  
  const [generatedOTP, setGeneratedOTP] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    role: 'User' as 'Vendor' | 'User', 
    phone: '',
    city: '',
    otpInput: '',
    agreeToTerms: true
  });

  // Handle Theme Change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Check if local background image exists; otherwise use an online placeholder
  useEffect(() => {
    const img = new Image();
    img.onload = () => setBackgroundUrl('/images/background.jpeg');
    img.onerror = () => setBackgroundUrl('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&q=80&w=1600');
    img.src = '/images/background.jpeg';
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ id: Date.now().toString(), title, message, type });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || formData.phone.length < 10) {
      showToast("Error", t.errors.enterMobile, "error");
      return;
    }
    
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    setAuthMode(AuthMode.VERIFY_OTP);
    setFormData(prev => ({ ...prev, otpInput: '' }));
    
    showToast("Messages", `Your OTP is ${otp}`, 'info');
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.otpInput === generatedOTP) {
      showToast("Success", t.success.verified, 'success');
      if (!formData.name) {
        setAuthMode(AuthMode.COMPLETE_PROFILE);
      } else {
        setAuthMode(AuthMode.HOME);
      }
    } else {
      showToast("Error", t.errors.invalidOtp, "error");
    }
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.role) {
      setAuthMode(AuthMode.HOME);
      showToast("Success", t.success.welcome, 'success');
    } else {
      showToast("Error", t.errors.fillAll, "error");
    }
  };

  const handleLogout = () => {
    setAuthMode(AuthMode.MOBILE_ENTRY);
    setCurrentView(AppView.HOME);
    setFormData(prev => ({ ...prev, phone: '', otpInput: '', name: '', city: '' }));
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'hi' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  if (isLoading) {
    return <LoadingThela />;
  }

  // --- MAIN APP (Authenticated) ---
  if (authMode === AuthMode.HOME) {
    
    const renderContent = () => {
      const props = { t, lang, onNavigate: setCurrentView, onLogout: handleLogout, formData, setFormData };
      switch (currentView) {
        case AppView.HOME:
          return (
            <div className="flex flex-col gap-5 pb-24">
              {/* Greeting Card */}
              <div className="bg-gradient-to-r from-brick to-brick-dark dark:from-red-900 dark:to-red-950 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden border-2 border-saffron-500 dark:border-red-800">
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                      <h2 className="text-xl font-bold mb-1 tracking-wide drop-shadow-sm">{t.greetings.namaste} {formData.name || 'User'}</h2>
                      <p className="text-brick-light font-medium text-xs drop-shadow-sm">{t.greetings.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-white/80 font-medium text-xs bg-white/20 inline-block px-2 py-0.5 rounded-full">{formData.role === 'Vendor' ? t.vendor : t.user}</p>
                        {formData.role === 'Vendor' ? (
                          <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Vendor Mode</span>
                        ) : (
                          <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full">User Mode</span>
                        )}
                      </div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                      <Store size={24} className="text-saffron-100" />
                  </div>
                </div>
              </div>

              {/* SEARCH & LIST ACTION AREA */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border-2 border-wood-light/10 dark:border-gray-700 space-y-3">
                 <h3 className="text-sm font-bold text-wood-darkest dark:text-gray-100">{t.home.whatLookingFor}</h3>
                 
                 {/* Search Bar */}
                 <div className="relative flex items-center" onClick={() => setCurrentView(AppView.BUY)}>
                    <div className="absolute left-3 p-1.5 bg-brick text-white rounded-lg">
                       <Search size={14} />
                    </div>
                    <input 
                      readOnly 
                      placeholder={t.home.searchPlaceholder}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm font-semibold text-wood-dark dark:text-gray-200 focus:border-brick outline-none cursor-pointer"
                    />
                 </div>

                 <div className="flex items-center gap-2 text-xs text-wood-light font-bold my-1">
                    <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></span>
                    OR
                    <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></span>
                 </div>

                 {/* List Space Button */}
                 <button 
                   onClick={() => setCurrentView(AppView.SELL)}
                   className="w-full py-3 bg-gradient-to-r from-teal to-teal-dark dark:from-teal-800 dark:to-teal-900 text-white rounded-xl font-bold shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                 >
                    <MapPin size={18} />
                    {t.home.listSpace}
                 </button>
              </div>

              {/* Quick Actions Grid */}
              <h3 className="font-bold text-wood-darkest dark:text-gray-100 mt-2">{t.home.services}</h3>
              <div className="grid grid-cols-4 gap-3">
                 {(
                   formData.role === 'Vendor' ? [
                     { id: AppView.SELL, icon: Package, label: 'My Listings', color: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400' },
                     { id: AppView.LICENSE, icon: Gavel, label: 'Payments', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' },
                     { id: AppView.HISTORY, icon: History, label: 'Orders', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' },
                     { id: AppView.SETTINGS, icon: Settings as any, label: 'Store Settings', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' },
                   ] : [
                     { id: AppView.LICENSE, icon: Gavel, label: t.home.license, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' },
                     { id: AppView.LEGAL, icon: Shield, label: t.home.rights, color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' },
                     { id: AppView.MESSAGES, icon: MessageCircle, label: t.home.chat, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' },
                     { id: AppView.SUPPORT, icon: Phone, label: t.home.support, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400' },
                   ]
                 ).map((item: any) => (
                   <button key={item.id} onClick={() => setCurrentView(item.id)} className="flex flex-col items-center gap-2 active:scale-95 transition-transform">
                      <div className={`p-3 rounded-2xl ${item.color} shadow-sm border border-white/50 dark:border-gray-700`}>
                        <item.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-wood-dark dark:text-gray-300">{item.label}</span>
                   </button>
                 ))}
              </div>

              {/* Recent Listing Teaser */}
              <h3 className="font-bold text-wood-darkest dark:text-gray-100 mt-2">{t.home.recentListings}</h3>
              <div onClick={() => setCurrentView(AppView.BUY)} className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 flex gap-3 items-center shadow-sm cursor-pointer active:scale-[0.99] transition-transform">
                 <img src="https://images.unsplash.com/photo-1579618172909-66c5db321016?auto=format&fit=crop&q=80&w=100" className="w-16 h-16 rounded-lg object-cover" />
                 <div>
                   <h4 className="font-bold text-sm text-wood-darkest dark:text-gray-100">Prime Spot, Jaipur</h4>
                   <p className="text-xs text-gray-500 dark:text-gray-400">Rent • ₹5,000/mo</p>
                 </div>
                 <ChevronRight className="ml-auto text-gray-400" size={16} />
              </div>
            </div>
          );
        case AppView.MAP: return <MapView {...props} />;
        case AppView.BUY: return <BuyLandView {...props} />;
        case AppView.SELL: return <SellLandView {...props} />;
        case AppView.PROFILE: return <ProfileView {...props} />;
        case AppView.EDIT_PROFILE: return <EditProfileView {...props} />;
        case AppView.HISTORY: return <HistoryView {...props} />;
        case AppView.SAVED: return <SavedListingsView {...props} />;
        case AppView.SETTINGS: return <SettingsView {...props} />;
        case AppView.SUPPORT: return <HelpSupportView {...props} />;
        case AppView.LICENSE: return <LicenseGuideView {...props} />;
        case AppView.LEGAL: return <LegalRightsView {...props} />;
        case AppView.MESSAGES: return <MessagesView {...props} />;
        case AppView.NOTIFICATIONS: return <div className="p-4 text-center text-gray-500 dark:text-gray-400">No new notifications</div>;
        default: return <div className="p-4">Coming Soon</div>;
      }
    };

    const getTitle = () => {
        if (currentView === AppView.HOME) return 'NukkadBazaar';
        if (currentView === AppView.EDIT_PROFILE) return t.editProfile.title;
        if (currentView === AppView.SAVED) return t.saved.title;
        if (currentView === AppView.SETTINGS) return t.settings.title;
        if (currentView === AppView.SUPPORT) return t.help.title;
        if (currentView === AppView.HISTORY) return t.history.title;
        if (currentView === AppView.MESSAGES) return t.messages.title;
        if (currentView === AppView.LICENSE) return t.license.title;
        if (currentView === AppView.LEGAL) return t.legal.title;
        if (currentView === AppView.BUY) return t.buy.title;
        if (currentView === AppView.SELL) return t.sell.title;
        if (currentView === AppView.PROFILE) return t.nav.profile;
        if (currentView === AppView.MAP) return t.nav.map;
        return 'NukkadBazaar';
    };

    return (
      <div className="min-h-screen bg-market-theme relative font-sans text-wood-darkest dark:text-gray-100">
        {/* Background image (low opacity). Prefers local /images/background.jpeg, falls back to Unsplash */}
        <div className="absolute inset-0 -z-10" style={{ backgroundImage: `url('${backgroundUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06 }} />
        <FullScreenToggle />
        <Toast toast={toast} onClose={() => setToast(null)} />
        
        {/* Header */}
        <header className="glass-effect shadow-md p-3 px-4 flex justify-between items-center sticky top-0 z-30 border-b border-wood-light/30 dark:border-gray-700 desi-border-top">
             <div className="flex items-center gap-3">
             <img src="/images/logo.jpeg" alt="logo" className="w-8 h-8 rounded object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            {currentView !== AppView.HOME && (
               <button 
                 onClick={() => {
                    if ([AppView.EDIT_PROFILE, AppView.HISTORY, AppView.SAVED, AppView.SETTINGS, AppView.SUPPORT].includes(currentView)) {
                        setCurrentView(AppView.PROFILE);
                    } else {
                        setCurrentView(AppView.HOME);
                    }
                 }} 
                 className="p-1 -ml-1 text-wood-dark dark:text-gray-200 hover:text-brick transition-colors"
               >
                 <ArrowLeft size={20} />
               </button>
             )}
             <h1 className="font-display text-xl text-wood-darkest dark:text-gray-100 tracking-wide font-bold truncate max-w-[200px]">
               {getTitle()}
             </h1>
           </div>
           <div className="flex items-center gap-2">
             <button onClick={toggleLanguage} className="p-2 active:scale-95 transition-transform bg-white/50 dark:bg-gray-800 rounded-lg border border-wood-light/20 dark:border-gray-600">
                <Languages size={20} className="text-brick dark:text-orange-400" />
             </button>
             <button onClick={toggleTheme} className="p-2 active:scale-95 transition-transform bg-white/50 dark:bg-gray-800 rounded-lg border border-wood-light/20 dark:border-gray-600">
                {theme === 'light' ? (
                  <Moon size={20} className="text-wood-dark" />
                ) : (
                  <Sun size={20} className="text-yellow-400" />
                )}
             </button>
             <button onClick={() => setCurrentView(AppView.NOTIFICATIONS)} className="p-2 relative active:scale-95 transition-transform">
                <Bell size={20} className="text-wood-dark dark:text-gray-200" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brick rounded-full border border-white"></span>
             </button>
           </div>
        </header>

        {/* Content Area */}
        <main className="p-4 max-w-lg mx-auto relative z-10 h-full">
           <AnimatePresence mode="wait">
             <motion.div
               key={currentView + lang} // Remount on lang change to refresh content
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.2 }}
             >
               {renderContent()}
             </motion.div>
           </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-2 pb-5 z-40 flex justify-around shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
           {[
             { id: AppView.HOME, icon: Home, label: t.nav.home },
             { id: AppView.MAP, icon: Map, label: t.nav.map },
             { id: AppView.BUY, icon: ShoppingCart, label: t.nav.buy },
             { id: AppView.SELL, icon: Store, label: t.nav.sell },
             { id: AppView.PROFILE, icon: UserIcon, label: t.nav.profile },
           ].map(item => (
             <button 
               key={item.id} 
               onClick={() => setCurrentView(item.id)}
               className={`flex flex-col items-center p-2 rounded-xl transition-all ${
                  currentView === item.id 
                  ? 'text-brick dark:text-orange-400 -translate-y-2' 
                  : 'text-wood-light/80 dark:text-gray-500 hover:text-wood-dark dark:hover:text-gray-300'
                }`}
             >
               <div className={`${currentView === item.id ? 'bg-brick/10 dark:bg-orange-500/10 p-2 rounded-full' : ''}`}>
                 <item.icon size={22} strokeWidth={currentView === item.id ? 2.5 : 2} />
               </div>
               <span className={`text-[10px] font-bold mt-1 ${currentView === item.id ? 'opacity-100' : 'opacity-0'}`}>
                 {item.label}
               </span>
             </button>
           ))}
        </nav>

        {/* Floating Background Elements (Only on Home) */}
        {currentView === AppView.HOME && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
             <FloatingSticker emoji="🧺" initialX="10%" initialY="20%" delay={0} />
             <FloatingSticker emoji="🥦" initialX="85%" initialY="30%" delay={2} />
          </div>
        )}
        {/* Chatbot (bottom-right) */}
        <Chatbot />
      </div>
    );
  }
  
  // --- AUTH SCREENS ---
  return (
    <div className="min-h-screen w-full flex flex-col bg-market-theme relative font-sans overflow-hidden">
      <FullScreenToggle />
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <FloatingSticker emoji="🛺" initialX="5%" initialY="15%" delay={0} size="text-6xl" />
         <FloatingSticker emoji="☕" initialX="85%" initialY="10%" delay={1.5} size="text-5xl" />
         <FloatingSticker emoji="🪁" initialX="10%" initialY="75%" delay={3} size="text-5xl" />
         <FloatingSticker emoji="🏮" initialX="80%" initialY="80%" delay={2} size="text-5xl" />
         <FloatingSticker emoji="🥭" initialX="40%" initialY="5%" delay={4} size="text-4xl" />
      </div>

      {/* Top Left Toggles for Auth Screen */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <button 
          onClick={toggleLanguage}
          className="bg-white/95 dark:bg-gray-800/90 backdrop-blur px-4 py-2 rounded-full shadow-lg text-wood-darkest dark:text-gray-200 font-bold border-2 border-wood-light/30 dark:border-gray-600 flex items-center gap-2 hover:bg-sand-light dark:hover:bg-gray-700 transition-colors"
        >
          <Languages size={18} className="text-brick dark:text-orange-400" />
          {lang === 'en' ? 'Hindi' : 'English'}
        </button>
        <button 
          onClick={toggleTheme}
          className="bg-white/95 dark:bg-gray-800/90 backdrop-blur p-2 rounded-full shadow-lg text-wood-darkest dark:text-gray-200 font-bold border-2 border-wood-light/30 dark:border-gray-600 flex items-center justify-center hover:bg-sand-light dark:hover:bg-gray-700 transition-colors"
        >
          {theme === 'light' ? <Moon size={18} className="text-wood-dark" /> : <Sun size={18} className="text-yellow-400" />}
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-end md:justify-center p-0 md:p-4 z-10">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect w-full md:max-w-md mx-auto rounded-t-[30px] md:rounded-[30px] shadow-2xl overflow-hidden min-h-[60vh] md:min-h-0 border-x border-t border-white/80 dark:border-gray-700 relative desi-border-top"
        >
             <div className="bg-gradient-to-b from-sand-light/60 to-white/40 dark:from-gray-800 dark:to-gray-900 pt-10 pb-6 text-center relative overflow-hidden">
             <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-brick-light rounded-full mix-blend-multiply filter blur-xl opacity-40"></div>
             <div className="absolute top-[20px] right-[-20px] w-24 h-24 bg-saffron-100 rounded-full mix-blend-multiply filter blur-xl opacity-60"></div>
             
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ type: "spring", bounce: 0.5 }}
               className="relative w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 ring-4 ring-saffron-200 dark:ring-saffron-900 bg-white dark:bg-gray-800 flex items-center justify-center"
             >
                <img 
                  src="/images/logo.jpeg" 
                  alt="NukkadBazaar Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-brick font-display text-2xl text-center leading-tight dark:text-orange-400">Nukkad<br/>Bazaar</span>';
                  }}
                />
             </motion.div>

             <h2 className="text-2xl font-bold text-wood-darkest dark:text-gray-100 px-6 relative z-10 leading-snug tracking-wide font-display drop-shadow-sm">
               {t.title}
             </h2>
             <p className="text-base font-bold text-wood-dark dark:text-gray-300 mt-2 relative z-10 uppercase tracking-wider">{t.subtitle}</p>
          </div>

          <div className="px-8 pb-8 pt-4 bg-white/80 dark:bg-gray-900/90 backdrop-blur-md">
            <AnimatePresence mode="wait">
              
              {authMode === AuthMode.MOBILE_ENTRY && (
                <motion.form
                  key="mobile"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onSubmit={handleSendOTP}
                  className="space-y-6"
                >
                      <div className="space-y-4">
                        <div className="relative flex items-center border-2 border-wood-light/40 dark:border-gray-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-brick focus-within:border-transparent transition-all h-14 bg-white dark:bg-gray-800 shadow-sm">
                          <div className="bg-sand-light/40 dark:bg-gray-700 px-4 py-3 border-r border-wood-light/20 dark:border-gray-600 text-wood-darkest dark:text-gray-100 font-bold h-full flex items-center">
                            +91
                          </div>
                          <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder={t.mobilePlaceholder}
                            className="flex-1 px-4 py-3 outline-none text-wood-darkest dark:text-gray-100 font-semibold placeholder-wood-light dark:placeholder-gray-500 text-lg h-full bg-transparent"
                            maxLength={10}
                            autoFocus
                          />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer group select-none">
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.agreeToTerms ? 'bg-brick border-brick' : 'border-wood-light dark:border-gray-600 group-hover:border-brick'}`}>
                        {formData.agreeToTerms && <Check size={16} className="text-white" strokeWidth={3} />}
                      </div>
                      <input 
                        type="checkbox" 
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <span className="text-sm text-wood-dark dark:text-gray-300 font-semibold group-hover:text-brick transition-colors">{t.agree}</span>
                    </label>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-brick to-brick-dark dark:from-red-700 dark:to-red-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-brick/20 hover:shadow-xl hover:shadow-brick/30 active:scale-[0.98] transition-all tracking-wide"
                  >
                    {t.loginBtn}
                  </button>

                  <div className="relative text-center my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-wood-light/30 dark:border-gray-700"></div>
                    </div>
                    <span className="relative bg-white dark:bg-gray-900 px-4 text-xs text-wood-dark dark:text-gray-400 font-bold uppercase tracking-wider">{t.orContinue}</span>
                  </div>

                  <button type="button" className="w-full border-2 border-wood-light/30 dark:border-gray-600 bg-white dark:bg-gray-800 text-wood-darkest dark:text-gray-200 font-bold py-3.5 rounded-xl hover:bg-sand-light/20 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3 shadow-sm text-base">
                    <span className="text-xl">G</span> {t.googleBtn}
                  </button>
                </motion.form>
              )}

              {authMode === AuthMode.VERIFY_OTP && (
                <motion.form
                  key="otp"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onSubmit={handleVerifyOTP}
                  className="space-y-6"
                >
                  <div className="text-center relative">
                    <button 
                      type="button" 
                      onClick={() => setAuthMode(AuthMode.MOBILE_ENTRY)}
                      className="absolute top-0 left-0 p-2 text-wood-dark dark:text-gray-300 hover:text-brick transition-colors"
                    >
                      <ArrowLeft size={24} strokeWidth={2.5} />
                    </button>
                    <h3 className="text-xl font-bold text-wood-darkest dark:text-gray-100">{t.verifyOtp}</h3>
                    <p className="text-sm text-wood-dark dark:text-gray-400 mt-2 font-medium">
                      {t.enterOtp} <span className="text-brick dark:text-orange-400 font-bold tracking-wide">+91 {formData.phone}</span>
                    </p>
                  </div>

                  <div className="flex justify-center py-6">
                    <input
                      type="text"
                      name="otpInput"
                      value={formData.otpInput}
                      onChange={handleInputChange}
                      placeholder="XXXX"
                      className="w-48 py-3 text-center text-4xl tracking-[0.4em] font-display border-b-4 border-wood-light/40 dark:border-gray-600 focus:border-brick dark:focus:border-orange-500 outline-none bg-transparent text-wood-darkest dark:text-gray-100 placeholder-wood-light/50 dark:placeholder-gray-600"
                      maxLength={4}
                      autoFocus
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-saffron-600 to-saffron-700 dark:from-orange-600 dark:to-orange-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                  >
                    {t.verifyBtn}
                  </button>

                  <div className="text-center">
                    <button type="button" onClick={handleSendOTP} className="text-sm text-wood-dark dark:text-gray-400 font-bold hover:text-brick dark:hover:text-orange-400 transition-colors underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-brick">
                      {t.resend}
                    </button>
                  </div>
                </motion.form>
              )}

              {authMode === AuthMode.COMPLETE_PROFILE && (
                <motion.form
                  key="profile"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  onSubmit={handleCompleteProfile}
                  className="space-y-5"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-wood-darkest dark:text-gray-100">{t.setupProfile}</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-4 text-wood-dark dark:text-gray-400" size={20} strokeWidth={2.5} />
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.fullName}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-wood-light/40 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brick outline-none text-wood-darkest dark:text-gray-100 placeholder-wood-light dark:placeholder-gray-500 font-semibold shadow-sm text-lg"
                      />
                    </div>
                    
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-4 text-wood-dark dark:text-gray-400" size={20} strokeWidth={2.5} />
                      <select 
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-wood-light/40 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-brick outline-none text-wood-darkest dark:text-gray-100 font-semibold shadow-sm text-lg appearance-none cursor-pointer"
                      >
                         <option value="User">{t.user}</option>
                         <option value="Vendor">{t.vendor}</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                         <ChevronRight className="rotate-90 text-wood-dark dark:text-gray-400" size={20} />
                      </div>
                      <label className="absolute left-12 -top-2.5 bg-white dark:bg-gray-800 px-1 text-xs font-bold text-wood-dark dark:text-gray-400">{t.role}</label>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal to-teal-dark dark:from-teal-800 dark:to-teal-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all"
                  >
                    {t.openShop}
                  </button>
                </motion.form>
              )}

            </AnimatePresence>
          </div>
        </motion.div>

        <div className="text-center mt-6 text-xs text-wood-darkest dark:text-gray-300 font-extrabold hidden md:block drop-shadow-sm bg-white/80 dark:bg-gray-800/80 inline-block px-4 py-1.5 rounded-full mx-auto backdrop-blur-md shadow-sm border border-white/60 dark:border-gray-600 tracking-widest relative z-10">
          MADE IN INDIA ❤️ NUKKADBAZAAR
        </div>
      </div>
    </div>
  );
}
