import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur' | 'hi' | 'id' | 'ar' | 'tr' | 'ms' | 'bn';

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
    document.documentElement.dir = ['ar', 'ur'].includes(lang) ? 'rtl' : 'ltr';
  };

  const isRTL = ['ar', 'ur'].includes(language);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      ziaraat: 'Ziaraat',
      taxi: 'Taxi Booking',
      guide: 'Umrah Guide',
      train: 'Train Details',
      blogs: 'Blogs',
      faq: 'FAQs',
      about: 'About Us',
      guestLogin: 'Guest Login',
      adminLogin: 'Admin Login',
      partnerLogin: 'Partner Login',
      language: 'Language',
      logout: 'Logout'
    },
    hero: {
      title: 'Book Your Blessing',
      subtitle: 'Umrah Journey',
      description: 'Premium hotel accommodations in Makkah and Madina with flexible Cash on Arrival payments',
      hotelBooking: 'Hotel Booking',
      taxiBooking: 'Taxi Booking',
      exploreZiaraat: 'Explore Ziaraat',
      noAdvancePayment: 'No advance payment required',
      instantVoucher: 'Instant voucher generation',
      support247: '24/7 support'
    },
    bookingSteps: {
      title: 'How To Book Your Umrah?',
      subtitle: 'Follow these simple steps to book your complete Umrah journey',
      getVisa: 'Get Your Visa',
      visaSubtitle: 'In less than 10 minutes',
      visaDesc: 'Quick visa processing with our streamlined application',
      bookFlight: 'Book Your Flight',
      flightSubtitle: 'Search 1000+ Flights',
      flightDesc: 'Compare and book from thousands of flight options',
      bookHotel: 'Book Your Hotel',
      hotelSubtitle: '913 Hotels Available',
      hotelDesc: 'Choose from premium accommodations near Haram',
      transfers: 'Your Transfers',
      transfersSubtitle: 'Book Your Taxi',
      transfersDesc: 'Reliable transportation throughout your journey'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Umrah services to make your pilgrimage journey comfortable and spiritually fulfilling',
      ziaraatDesc: 'Explore blessed places in Makkah and Madinah with guided tours',
      taxiDesc: 'Safe and reliable taxi services for pilgrims',
      guideDesc: 'Complete Umrah guide with step-by-step instructions',
      explorePlaces: 'Explore Places',
      bookTaxi: 'Book Taxi',
      readGuide: 'Read Guide'
    },
    whyChoose: {
      title: 'Why Choose Umrah Asan?',
      subtitle: 'Experience the difference with our dedicated team and comprehensive services',
      trusted: 'Trusted & Reliable',
      trustedDesc: 'Years of experience serving pilgrims with dedication',
      support: '24/7 Support',
      supportDesc: 'Round-the-clock assistance for all your needs',
      spiritual: 'Spiritual Care',
      spiritualDesc: 'Guidance that nurtures your spiritual journey',
      quality: 'Quality Service',
      qualityDesc: 'Premium services at competitive prices'
    },
    testimonials: {
      title: 'What Our Pilgrims Say',
      subtitle: 'Hear from thousands of satisfied pilgrims who trusted us with their blessing journey'
    },
    cta: {
      title: 'Ready to Begin Your Blessing Journey?',
      subtitle: 'Join thousands of pilgrims who have trusted us with their Umrah experience',
      getStarted: 'Get Started Today'
    },
    stats: {
      pilgrims: 'Pilgrims Served',
      experience: 'Years Experience',
      support: 'Support Available',
      satisfaction: 'Satisfaction Rate'
    },
    home: {
      title: 'Your Trusted Partner for Blessed Umrah Journey',
      subtitle: 'Experience the spiritual journey of a lifetime with our comprehensive Umrah services in Blessed Makkah and Madina',
      bookHotel: 'Book Hotel',
      bookTaxi: 'Book Taxi',
      explorePlaces: 'Explore Blessed Places',
      bookingForm: {
        title: 'Book Your Stay',
        checkin: 'Check-in Date',
        checkout: 'Check-out Date',
        makkah: 'Makkah',
        madina: 'Madina',
        nights: 'nights',
        doubleRoom: 'Double Room',
        quadRoom: 'Quad Room (4 Guests)',
        multiSharing: 'Multi-sharing (up to 8 guests)',
        pricePerNight: 'Price per night',
        searchHotels: 'Search Hotels'
      },
      reviews: {
        title: 'What Our Pilgrims Say',
        review1: {
          text: 'Excellent service! The hotel booking was smooth and the location was perfect near Haram.',
          name: 'Ahmed Hassan',
          country: 'Egypt'
        },
        review2: {
          text: 'Very helpful staff and clean accommodations. Made our Umrah journey comfortable.',
          name: 'Fatima Ali',
          country: 'Pakistan'
        },
        review3: {
          text: 'Great taxi service and reliable drivers. Highly recommended for Umrah pilgrims.',
          name: 'Abdullah Rahman',
          country: 'Indonesia'
        }
      },
      whyChoose: {
        title: 'Why Choose Umrah Asan?',
        feature1: {
          title: 'Blessed Accommodations',
          description: 'Comfortable hotels near the blessed Haramain'
        },
        feature2: {
          title: 'Reliable Transport',
          description: 'Safe and convenient taxi services'
        },
        feature3: {
          title: '24/7 Support',
          description: 'Round-the-clock assistance for pilgrims'
        },
        feature4: {
          title: 'Competitive Prices',
          description: 'Best rates for quality services'
        }
      }
    },
    footer: {
      description: 'Your trusted partner for a blessed Umrah journey with comfortable accommodations and reliable transport services.',
      quickLinks: 'Quick Links',
      legal: 'Legal',
      services: 'Services',
      contact: 'Contact Us',
      address: 'Makkah, Saudi Arabia',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 Umrah Asan. All rights reserved.'
    }
  },
  ur: {
    nav: {
      home: 'ہوم',
      ziaraat: 'زیارات',
      taxi: 'ٹیکسی بکنگ',
      guide: 'عمرہ گائیڈ',
      train: 'ٹرین کی تفصیلات',
      blogs: 'بلاگز',
      faq: 'عام سوالات',
      about: 'ہمارے بارے میں',
      guestLogin: 'مہمان لاگ ان',
      adminLogin: 'ایڈمن لاگ ان',
      partnerLogin: 'پارٹنر لاگ ان',
      language: 'زبان',
      logout: 'لاگ آؤٹ'
    },
    hero: {
      title: 'اپنا مبارک',
      subtitle: 'عمرہ کا سفر بک کریں',
      description: 'مکہ اور مدینہ میں پریمیم ہوٹل کی رہائش نقد ادائیگی کے ساتھ',
      hotelBooking: 'ہوٹل بکنگ',
      taxiBooking: 'ٹیکسی بکنگ',
      exploreZiaraat: 'زیارات دیکھیں',
      noAdvancePayment: 'پیشگی ادائیگی کی ضرورت نہیں',
      instantVoucher: 'فوری واؤچر جنریشن',
      support247: '24/7 سپورٹ'
    },
    bookingSteps: {
      title: 'اپنا عمرہ کیسے بک کریں؟',
      subtitle: 'اپنے مکمل عمرہ سفر کو بک کرنے کے لیے یہ آسان اقدامات اپنائیں',
      getVisa: 'اپنا ویزا حاصل کریں',
      visaSubtitle: '10 منٹ سے کم میں',
      visaDesc: 'ہمارے آسان درخواست کے ساتھ تیز ویزا پروسیسنگ',
      bookFlight: 'اپنی فلائٹ بک کریں',
      flightSubtitle: '1000+ فلائٹس تلاش کریں',
      flightDesc: 'ہزاروں فلائٹ کے آپشنز سے موازنہ اور بکنگ کریں',
      bookHotel: 'اپنا ہوٹل بک کریں',
      hotelSubtitle: '913 ہوٹل دستیاب',
      hotelDesc: 'حرم کے قریب پریمیم رہائش سے انتخاب کریں',
      transfers: 'آپ کی ٹرانسفر',
      transfersSubtitle: 'اپنی ٹیکسی بک کریں',
      transfersDesc: 'آپ کے پورے سفر میں قابل اعتماد نقل و حمل'
    },
    services: {
      title: 'ہماری خدمات',
      subtitle: 'آپ کے حج کے سفر کو آرام دہ اور روحانی طور پر پرورش دینے کے لیے جامع عمرہ خدمات',
      ziaraatDesc: 'رہنمائی کے ساتھ مکہ اور مدینہ کی مبارک جگہوں کا دورہ کریں',
      taxiDesc: 'حجاج کے لیے محفوظ اور قابل اعتماد ٹیکسی خدمات',
      guideDesc: 'قدم بہ قدم ہدایات کے ساتھ مکمل عمرہ گائیڈ',
      explorePlaces: 'جگہیں دیکھیں',
      bookTaxi: 'ٹیکسی بک کریں',
      readGuide: 'گائیڈ پڑھیں'
    },
    whyChoose: {
      title: 'عمرہ آسان کیوں منتخب کریں؟',
      subtitle: 'ہماری مخصوص ٹیم اور جامع خدمات کے ساتھ فرق کا تجربہ کریں',
      trusted: 'قابل اعتماد اور موثق',
      trustedDesc: 'عقیدت کے ساتھ حجاج کی خدمت کا سالوں کا تجربہ',
      support: '24/7 سپورٹ',
      supportDesc: 'آپ کی تمام ضروریات کے لیے 24 گھنٹے معاونت',
      spiritual: 'روحانی دیکھ بھال',
      spiritualDesc: 'رہنمائی جو آپ کے روحانی سفر کو پروان چڑھاتی ہے',
      quality: 'معیاری خدمت',
      qualityDesc: 'مسابقتی قیمتوں پر پریمیم سروسز'
    },
    testimonials: {
      title: 'ہمارے حجاج کیا کہتے ہیں',
      subtitle: 'ہزاروں مطمئن حجاج سے سنیں جنہوں نے اپنے مبارک سفر کے لیے ہم پر بھروسہ کیا'
    },
    cta: {
      title: 'اپنا مبارک سفر شروع کرنے کے لیے تیار ہیں؟',
      subtitle: 'ہزاروں حجاج میں شامل ہوں جنہوں نے اپنے عمرہ کے تجربے کے لیے ہم پر بھروسہ کیا',
      getStarted: 'آج ہی شروع کریں'
    },
    stats: {
      pilgrims: 'حجاج کی خدمت',
      experience: 'سال کا تجربہ',
      support: 'سپورٹ دستیاب',
      satisfaction: 'اطمینان کی شرح'
    },
    home: {
      title: 'مبارک عمرہ کے سفر کے لیے آپ کا قابل اعتماد ساتھی',
      subtitle: 'مقدس مکہ اور مدینہ میں ہماری جامع عمرہ خدمات کے ساتھ زندگی بھر کا روحانی سفر کا تجربہ کریں',
      bookHotel: 'ہوٹل بک کریں',
      bookTaxi: 'ٹیکسی بک کریں',
      explorePlaces: 'مقدس مقامات دیکھیں',
      bookingForm: {
        title: 'اپنا قیام بک کریں',
        checkin: 'چیک ان کی تاریخ',
        checkout: 'چیک آؤٹ کی تاریخ',
        makkah: 'مکہ',
        madina: 'مدینہ',
        nights: 'راتیں',
        doubleRoom: 'ڈبل روم',
        quadRoom: 'کواڈ روم (4 مہمان)',
        multiSharing: 'ملٹی شیئرنگ (8 مہمان تک)',
        pricePerNight: 'فی رات قیمت',
        searchHotels: 'ہوٹل تلاش کریں'
      },
      reviews: {
        title: 'ہمارے حجاج کیا کہتے ہیں',
        review1: {
          text: 'بہترین سروس! ہوٹل بکنگ آسان تھی اور حرم کے قریب بہترین جگہ تھی۔',
          name: 'احمد حسن',
          country: 'مصر'
        },
        review2: {
          text: 'بہت مددگار عملہ اور صاف ستھری رہائش۔ ہمارے عمرہ کے سفر کو آرام دہ بنایا۔',
          name: 'فاطمہ علی',
          country: 'پاکستان'
        },
        review3: {
          text: 'بہترین ٹیکسی سروس اور قابل اعتماد ڈرائیور۔ عمرہ حجاج کے لیے انتہائی تجویز کردہ۔',
          name: 'عبداللہ رحمن',
          country: 'انڈونیشیا'
        }
      },
      whyChoose: {
        title: 'عمرہ آسان کیوں منتخب کریں؟',
        feature1: {
          title: 'مبارک رہائش',
          description: 'حرمین شریفین کے قریب آرام دہ ہوٹل'
        },
        feature2: {
          title: 'قابل اعتماد ٹرانسپورٹ',
          description: 'محفوظ اور آسان ٹیکسی خدمات'
        },
        feature3: {
          title: '24/7 سپورٹ',
          description: 'حجاج کے لیے چوبیس گھنٹے مدد'
        },
        feature4: {
          title: 'مناسب قیمتیں',
          description: 'معیاری خدمات کے لیے بہترین ریٹ'
        }
      }
    },
    footer: {
      description: 'آرام دہ رہائش اور قابل اعتماد ٹرانسپورٹ سروسز کے ساتھ مبارک عمرہ کے سفر کے لیے آپ کا قابل اعتماد ساتھی۔',
      quickLinks: 'فوری لنکس',
      legal: 'قانونی',
      services: 'خدمات',
      contact: 'رابطہ کریں',
      address: 'مکہ، سعودی عرب',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 عمرہ آسان۔ تمام حقوق محفوظ ہیں۔'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      ziaraat: 'ज़ियारत',
      taxi: 'टैक्सी बुकिंग',
      guide: 'उमराह गाइड',
      train: 'ट्रेन विवरण',
      blogs: 'ब्लॉग्स',
      faq: 'FAQ',
      about: 'हमारे बारे में',
      guestLogin: 'गेस्ट लॉगिन',
      adminLogin: 'एडमिन लॉगिन',
      partnerLogin: 'पार्टनर लॉगिन',
      language: 'भाषा',
      logout: 'लॉगआउट'
    },
    hero: {
      title: 'अपना आशीर्वाद',
      subtitle: 'उमराह यात्रा बुक करें',
      description: 'मक्का और मदीना में प्रीमियम होटल आवास नकद आगमन भुगतान के साथ',
      hotelBooking: 'होटल बुकिंग',
      taxiBooking: 'टैक्सी बुकिंग',
      exploreZiaraat: 'ज़ियारत देखें',
      noAdvancePayment: 'कोई अग्रिम भुगतान आवश्यक नहीं',
      instantVoucher: 'त्वरित वाउचर जेनरेशन',
      support247: '24/7 सहायता'
    },
    bookingSteps: {
      title: 'अपना उमराह कैसे बुक करें?',
      subtitle: 'अपनी पूरी उमराह यात्रा बुक करने के लिए इन सरल चरणों का पालन करें',
      getVisa: 'अपना वीज़ा प्राप्त करें',
      visaSubtitle: '10 मिनट से कम में',
      visaDesc: 'हमारे सुव्यवस्थित आवेदन के साथ त्वरित वीज़ा प्रसंस्करण',
      bookFlight: 'अपनी फ्लाइट बुक करें',
      flightSubtitle: '1000+ फ्लाइट खोजें',
      flightDesc: 'हजारों फ्लाइट विकल्पों से तुलना और बुकिंग करें',
      bookHotel: 'अपना होटल बुक करें',
      hotelSubtitle: '913 होटल उपलब्ध',
      hotelDesc: 'हरम के पास प्रीमियम आवास से चुनें',
      transfers: 'आपका स्थानांतरण',
      transfersSubtitle: 'अपनी टैक्सी बुक करें',
      transfersDesc: 'आपकी पूरी यात्रा में विश्वसनीय परिवहन'
    },
    services: {
      title: 'हमारी सेवाएं',
      subtitle: 'आपकी तीर्थयात्रा को आरामदायक और आध्यात्मिक रूप से संतुष्ट बनाने के लिए व्यापक उमराह सेवाएं',
      ziaraatDesc: 'निर्देशित टूर के साथ मक्का और मदीना में पवित्र स्थानों का अन्वेषण करें',
      taxiDesc: 'तीर्थयात्रियों के लिए सुरक्षित और विश्वसनीय टैक्सी सेवाएं',
      guideDesc: 'चरण-दर-चरण निर्देशों के साथ पूर्ण उमराह गाइड',
      explorePlaces: 'स्थान देखें',
      bookTaxi: 'टैक्सी बुक करें',
      readGuide: 'गाइड पढ़ें'
    },
    whyChoose: {
      title: 'उमराह आसान क्यों चुनें?',
      subtitle: 'हमारी समर्पित टीम और व्यापक सेवाओं के साथ अंतर का अनुभव करें',
      trusted: 'विश्वसनीय और भरोसेमंद',
      trustedDesc: 'समर्पण के साथ तीर्थयात्रियों की सेवा करने का वर्षों का अनुभव',
      support: '24/7 सहायता',
      supportDesc: 'आपकी सभी आवश्यकताओं के लिए चौबीसों घंटे सहायता',
      spiritual: 'आध्यात्मिक देखभाल',
      spiritualDesc: 'मार्गदर्शन जो आपकी आध्यात्मिक यात्रा का पोषण करता है',
      quality: 'गुणवत्तापूर्ण सेवा',
      qualityDesc: 'प्रतिस्पर्धी मूल्यों पर प्रीमियम सेवाएं'
    },
    testimonials: {
      title: 'हमारे तीर्थयात्री क्या कहते हैं',
      subtitle: 'हजारों संतुष्ट तीर्थयात्रियों से सुनें जिन्होंने अपनी आशीर्वाद यात्रा के लिए हम पर भरोसा किया'
    },
    cta: {
      title: 'अपनी आशीर्वाद यात्रा शुरू करने के लिए तैयार हैं?',
      subtitle: 'हजारों तीर्थयात्रियों में शामिल हों जिन्होंने अपने उमराह अनुभव के लिए हम पर भरोसा किया',
      getStarted: 'आज ही शुरू करें'
    },
    stats: {
      pilgrims: 'तीर्थयात्री परोसे गए',
      experience: 'वर्षों का अनुभव',
      support: 'सहायता उपलब्ध',
      satisfaction: 'संतुष्टि दर'
    },
    home: {
      title: 'पवित्र उमराह यात्रा के लिए आपका विश्वसनीय साथी',
      subtitle: 'पवित्र मक्का और मदीना में हमारी व्यापक उमराह सेवाओं के साथ जीवन भर की आध्यात्मिक यात्रा का अनुभव करें',
      bookHotel: 'होटल बुक करें',
      bookTaxi: 'टैक्सी बुक करें',
      explorePlaces: 'पवित्र स्थानों का अन्वेषण करें',
      bookingForm: {
        title: 'अपना प्रवास बुक करें',
        checkin: 'चेक-इन तारीख',
        checkout: 'चेक-आउट तारीख',
        makkah: 'मक्का',
        madina: 'मदीना',
        nights: 'रातें',
        doubleRoom: 'डबल रूम',
        quadRoom: 'क्वाड रूम (4 अतिथि)',
        multiSharing: 'मल्टी-शेयरिंग (8 अतिथि तक)',
        pricePerNight: 'प्रति रात मूल्य',
        searchHotels: 'होटल खोजें'
      },
      reviews: {
        title: 'हमारे तीर्थयात्री क्या कहते हैं',
        review1: {
          text: 'उत्कृष्ट सेवा! होटल बुकिंग सुचारू थी और स्थान हरम के पास बिल्कुल सही था।',
          name: 'अहमद हसन',
          country: 'मिस्र'
        },
        review2: {
          text: 'बहुत सहायक स्टाफ और साफ आवास। हमारी उमराह यात्रा को आरामदायक बनाया।',
          name: 'फातिमा अली',
          country: 'पाकिस्तान'
        },
        review3: {
          text: 'बेहतरीन टैक्सी सेवा और विश्वसनीय ड्राइवर। उमराह तीर्थयात्रियों के लिए अत्यधिक अनुशंसित।',
          name: 'अब्दुल्लाह रहमान',
          country: 'इंडोनेशिया'
        }
      },
      whyChoose: {
        title: 'उमराह आसान क्यों चुनें?',
        feature1: {
          title: 'पवित्र आवास',
          description: 'पवित्र हरमैन के पास आरामदायक होटल'
        },
        feature2: {
          title: 'विश्वसनीय परिवहन',
          description: 'सुरक्षित और सुविधाजनक टैक्सी सेवाएं'
        },
        feature3: {
          title: '24/7 सहायता',
          description: 'तीर्थयात्रियों के लिए चौबीसों घंटे सहायता'
        },
        feature4: {
          title: 'प्रतिस्पर्धी मूल्य',
          description: 'गुणवत्तापूर्ण सेवाओं के लिए सर्वोत्तम दरें'
        }
      }
    },
    footer: {
      description: 'आरामदायक आवास और विश्वसनीय परिवहन सेवाओं के साथ पवित्र उमराह यात्रा के लिए आपका विश्वसनीय साथी।',
      quickLinks: 'त्वरित लिंक',
      legal: 'कानूनी',
      services: 'सेवाएं',
      contact: 'संपर्क करें',
      address: 'मक्का, सऊदी अरब',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 उमराह आसान। सभी अधिकार सुरक्षित।'
    }
  },
  id: {
    nav: {
      home: 'Beranda',
      ziaraat: 'Ziarah',
      taxi: 'Booking Taksi',
      guide: 'Panduan Umrah',
      train: 'Detail Kereta',
      blogs: 'Blog',
      faq: 'FAQ',
      about: 'Tentang Kami',
      guestLogin: 'Login Tamu',
      adminLogin: 'Login Admin',
      partnerLogin: 'Login Mitra',
      language: 'Bahasa',
      logout: 'Keluar'
    },
    hero: {
      title: 'Pesan Perjalanan Berkah',
      subtitle: 'Umrah Anda',
      description: 'Akomodasi hotel premium di Makkah dan Madinah dengan pembayaran fleksibel Cash on Arrival',
      hotelBooking: 'Booking Hotel',
      taxiBooking: 'Booking Taksi',
      exploreZiaraat: 'Jelajahi Ziarah',
      noAdvancePayment: 'Tidak perlu uang muka',
      instantVoucher: 'Pembuatan voucher instan',
      support247: 'Dukungan 24/7'
    },
    bookingSteps: {
      title: 'Bagaimana Cara Memesan Umrah Anda?',
      subtitle: 'Ikuti langkah sederhana ini untuk memesan perjalanan Umrah lengkap Anda',
      getVisa: 'Dapatkan Visa Anda',
      visaSubtitle: 'Dalam waktu kurang dari 10 menit',
      visaDesc: 'Pemrosesan visa cepat dengan aplikasi yang disederhanakan',
      bookFlight: 'Pesan Penerbangan Anda',
      flightSubtitle: 'Cari 1000+ Penerbangan',
      flightDesc: 'Bandingkan dan pesan dari ribuan pilihan penerbangan',
      bookHotel: 'Pesan Hotel Anda',
      hotelSubtitle: '913 Hotel Tersedia',
      hotelDesc: 'Pilih dari akomodasi premium dekat Haram',
      transfers: 'Transfer Anda',
      transfersSubtitle: 'Pesan Taksi Anda',
      transfersDesc: 'Transportasi yang dapat diandalkan sepanjang perjalanan Anda'
    },
    services: {
      title: 'Layanan Kami',
      subtitle: 'Layanan Umrah komprehensif untuk membuat perjalanan ibadah Anda nyaman dan spiritual',
      ziaraatDesc: 'Jelajahi tempat-tempat suci di Makkah dan Madinah dengan tur berpemandu',
      taxiDesc: 'Layanan taksi yang aman dan dapat diandalkan untuk jamaah',
      guideDesc: 'Panduan Umrah lengkap dengan instruksi langkah demi langkah',
      explorePlaces: 'Jelajahi Tempat',
      bookTaxi: 'Pesan Taksi',
      readGuide: 'Baca Panduan'
    },
    whyChoose: {
      title: 'Mengapa Memilih Umrah Asan?',
      subtitle: 'Rasakan perbedaan dengan tim berpengalaman dan layanan komprehensif kami',
      trusted: 'Terpercaya & Dapat Diandalkan',
      trustedDesc: 'Bertahun-tahun pengalaman melayani jamaah dengan dedikasi',
      support: 'Dukungan 24/7',
      supportDesc: 'Bantuan sepanjang waktu untuk semua kebutuhan Anda',
      spiritual: 'Perawatan Spiritual',
      spiritualDesc: 'Bimbingan yang memelihara perjalanan spiritual Anda',
      quality: 'Layanan Berkualitas',
      qualityDesc: 'Layanan premium dengan harga kompetitif'
    },
    testimonials: {
      title: 'Apa Kata Jamaah Kami',
      subtitle: 'Dengar dari ribuan jamaah yang puas yang mempercayai kami dengan perjalanan berkah mereka'
    },
    cta: {
      title: 'Siap Memulai Perjalanan Berkah Anda?',
      subtitle: 'Bergabunglah dengan ribuan jamaah yang telah mempercayai kami dengan pengalaman Umrah mereka',
      getStarted: 'Mulai Hari Ini'
    },
    stats: {
      pilgrims: 'Jamaah Dilayani',
      experience: 'Tahun Pengalaman',
      support: 'Dukungan Tersedia',
      satisfaction: 'Tingkat Kepuasan'
    },
    home: {
      title: 'Mitra Terpercaya untuk Perjalanan Umrah yang Berkah',
      subtitle: 'Rasakan perjalanan spiritual seumur hidup dengan layanan Umrah komprehensif kami di Makkah dan Madinah yang Suci',
      bookHotel: 'Pesan Hotel',
      bookTaxi: 'Pesan Taksi',
      explorePlaces: 'Jelajahi Tempat Suci',
      bookingForm: {
        title: 'Pesan Akomodasi Anda',
        checkin: 'Tanggal Check-in',
        checkout: 'Tanggal Check-out',
        makkah: 'Makkah',
        madina: 'Madinah',
        nights: 'malam',
        doubleRoom: 'Kamar Double',
        quadRoom: 'Kamar Quad (4 Tamu)',
        multiSharing: 'Multi-sharing (hingga 8 tamu)',
        pricePerNight: 'Harga per malam',
        searchHotels: 'Cari Hotel'
      },
      reviews: {
        title: 'Apa Kata Jamaah Kami',
        review1: {
          text: 'Layanan yang sangat baik! Booking hotel lancar dan lokasinya sempurna dekat Haram.',
          name: 'Ahmed Hassan',
          country: 'Mesir'
        },
        review2: {
          text: 'Staf yang sangat membantu dan akomodasi yang bersih. Membuat perjalanan Umrah kami nyaman.',
          name: 'Fatima Ali',
          country: 'Pakistan'
        },
        review3: {
          text: 'Layanan taksi yang hebat dan sopir yang dapat diandalkan. Sangat direkomendasikan untuk jamaah Umrah.',
          name: 'Abdullah Rahman',
          country: 'Indonesia'
        }
      },
      whyChoose: {
        title: 'Mengapa Memilih Umrah Asan?',
        feature1: {
          title: 'Akomodasi Berkah',
          description: 'Hotel nyaman dekat Haramain yang suci'
        },
        feature2: {
          title: 'Transportasi Terpercaya',
          description: 'Layanan taksi yang aman dan nyaman'
        },
        feature3: {
          title: 'Dukungan 24/7',
          description: 'Bantuan sepanjang waktu untuk jamaah'
        },
        feature4: {
          title: 'Harga Kompetitif',
          description: 'Tarif terbaik untuk layanan berkualitas'
        }
      }
    },
    footer: {
      description: 'Mitra terpercaya Anda untuk perjalanan Umrah yang berkah dengan akomodasi nyaman dan layanan transportasi yang dapat diandalkan.',
      quickLinks: 'Tautan Cepat',
      legal: 'Hukum',
      services: 'Layanan',
      contact: 'Hubungi Kami',
      address: 'Makkah, Arab Saudi',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 Umrah Asan. Semua hak dilindungi.'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      ziaraat: 'الزيارات',
      taxi: 'حجز تاكسي',
      guide: 'دليل العمرة',
      train: 'تفاصيل القطار',
      blogs: 'المدونات',
      faq: 'الأسئلة الشائعة',
      about: 'من نحن',
      guestLogin: 'دخول الضيف',
      adminLogin: 'دخول المدير',
      partnerLogin: 'دخول الشريك',
      language: 'اللغة',
      logout: 'خروج'
    },
    hero: {
      title: 'احجز رحلتك المباركة',
      subtitle: 'رحلة العمرة',
      description: 'إقامة فندقية فاخرة في مكة والمدينة مع مدفوعات مرنة عند الوصول',
      hotelBooking: 'حجز فندق',
      taxiBooking: 'حجز تاكسي',
      exploreZiaraat: 'استكشف الزيارات',
      noAdvancePayment: 'لا حاجة لدفع مقدم',
      instantVoucher: 'إنشاء فوري للقسيمة',
      support247: 'دعم 24/7'
    },
    bookingSteps: {
      title: 'كيفية حجز عمرتك؟',
      subtitle: 'اتبع هذه الخطوات البسيطة لحجز رحلة العمرة الكاملة',
      getVisa: 'احصل على التأشيرة',
      visaSubtitle: 'في أقل من 10 دقائق',
      visaDesc: 'معالجة سريعة للتأشيرة مع تطبيقنا المبسط',
      bookFlight: 'احجز رحلتك',
      flightSubtitle: 'ابحث في 1000+ رحلة',
      flightDesc: 'قارن واحجز من آلاف خيارات الرحلات',
      bookHotel: 'احجز فندقك',
      hotelSubtitle: '913 فندق متاح',
      hotelDesc: 'اختر من الإقامة الفاخرة بالقرب من الحرم',
      transfers: 'نقلاتك',
      transfersSubtitle: 'احجز تاكسيك',
      transfersDesc: 'نقل موثوق طوال رحلتك'
    },
    services: {
      title: 'خدماتنا',
      subtitle: 'خدمات عمرة شاملة لجعل رحلة حجك مريحة ومليئة بالروحانية',
      ziaraatDesc: 'استكشف الأماكن المباركة في مكة والمدينة مع جولات مع مرشد',
      taxiDesc: 'خدمات تاكسي آمنة وموثوقة للحجاج',
      guideDesc: 'دليل عمرة كامل مع تعليمات خطوة بخطوة',
      explorePlaces: 'استكشف الأماكن',
      bookTaxi: 'احجز تاكسي',
      readGuide: 'اقرأ الدليل'
    },
    whyChoose: {
      title: 'لماذا تختار عمرة آسان؟',
      subtitle: 'اختبر الفرق مع فريقنا المخصص والخدمات الشاملة',
      trusted: 'موثوق وموثق',
      trustedDesc: 'سنوات من الخبرة في خدمة الحجاج بإخلاص',
      support: 'دعم 24/7',
      supportDesc: 'مساعدة على مدار الساعة لجميع احتياجاتك',
      spiritual: 'العناية الروحية',
      spiritualDesc: 'إرشاد يغذي رحلتك الروحية',
      quality: 'خدمة عالية الجودة',
      qualityDesc: 'خدمات فاخرة بأسعار تنافسية'
    },
    testimonials: {
      title: 'ماذا يقول حجاجنا',
      subtitle: 'اسمع من آلاف الحجاج الراضين الذين وثقوا بنا في رحلتهم المباركة'
    },
    cta: {
      title: 'هل أنت مستعد لبدء رحلتك المباركة؟',
      subtitle: 'انضم إلى آلاف الحجاج الذين وثقوا بنا في تجربة العمرة',
      getStarted: 'ابدأ اليوم'
    },
    stats: {
      pilgrims: 'الحجاج المخدومون',
      experience: 'سنوات الخبرة',
      support: 'الدعم المتاح',
      satisfaction: 'معدل الرضا'
    },
    home: {
      title: 'شريككم الموثوق لرحلة العمرة المباركة',
      subtitle: 'اختبروا الرحلة الروحانية لعمر مع خدماتنا الشاملة للعمرة في مكة المكرمة والمدينة المنورة',
      bookHotel: 'احجز فندق',
      bookTaxi: 'احجز تاكسي',
      explorePlaces: 'استكشف الأماكن المقدسة',
      bookingForm: {
        title: 'احجز إقامتك',
        checkin: 'تاريخ الوصول',
        checkout: 'تاريخ المغادرة',
        makkah: 'مكة',
        madina: 'المدينة',
        nights: 'ليالي',
        doubleRoom: 'غرفة مزدوجة',
        quadRoom: 'غرفة رباعية (4 ضيوف)',
        multiSharing: 'مشاركة متعددة (حتى 8 ضيوف)',
        pricePerNight: 'السعر لكل ليلة',
        searchHotels: 'البحث عن فنادق'
      },
      reviews: {
        title: 'ماذا يقول حجاجنا',
        review1: {
          text: 'خدمة ممتازة! حجز الفندق كان سهلاً والموقع مثالي بالقرب من الحرم.',
          name: 'أحمد حسن',
          country: 'مصر'
        },
        review2: {
          text: 'طاقم مفيد جداً وإقامة نظيفة. جعلوا رحلة العمرة مريحة.',
          name: 'فاطمة علي',
          country: 'باكستان'
        },
        review3: {
          text: 'خدمة تاكسي رائعة وسائقون موثوقون. ننصح به بشدة لحجاج العمرة.',
          name: 'عبدالله رحمن',
          country: 'إندونيسيا'
        }
      },
      whyChoose: {
        title: 'لماذا تختار عمرة آسان؟',
        feature1: {
          title: 'إقامة مباركة',
          description: 'فنادق مريحة بالقرب من الحرمين الشريفين'
        },
        feature2: {
          title: 'نقل موثوق',
          description: 'خدمات تاكسي آمنة ومريحة'
        },
        feature3: {
          title: 'دعم 24/7',
          description: 'مساعدة على مدار الساعة للحجاج'
        },
        feature4: {
          title: 'أسعار تنافسية',
          description: 'أفضل الأسعار للخدمات عالية الجودة'
        }
      }
    },
    footer: {
      description: 'شريككم الموثوق لرحلة العمرة المباركة مع إقامة مريحة وخدمات نقل موثوقة.',
      quickLinks: 'روابط سريعة',
      legal: 'قانوني',
      services: 'الخدمات',
      contact: 'اتصل بنا',
      address: 'مكة المكرمة، المملكة العربية السعودية',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 عمرة آسان. جميع الحقوق محفوظة.'
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      ziaraat: 'Ziyaret',
      taxi: 'Taksi Rezervasyonu',
      guide: 'Umre Rehberi',
      train: 'Tren Detayları',
      blogs: 'Blog',
      faq: 'SSS',
      about: 'Hakkımızda',
      guestLogin: 'Misafir Girişi',
      adminLogin: 'Admin Girişi',
      partnerLogin: 'Partner Girişi',
      language: 'Dil',
      logout: 'Çıkış'
    },
    home: {
      title: 'Mübarek Umre Yolculuğunuz İçin Güvenilir Ortağınız',
      subtitle: 'Kutsal Mekke ve Medine\'deki kapsamlı Umre hizmetlerimizle hayatınızın manevi yolculuğunu deneyimleyin',
      bookHotel: 'Otel Rezervasyonu',
      bookTaxi: 'Taksi Rezervasyonu',
      explorePlaces: 'Kutsal Yerleri Keşfedin',
      bookingForm: {
        title: 'Konaklamanızı Rezerve Edin',
        checkin: 'Giriş Tarihi',
        checkout: 'Çıkış Tarihi',
        makkah: 'Mekke',
        madina: 'Medine',
        nights: 'gece',
        doubleRoom: 'Çift Kişilik Oda',
        quadRoom: 'Dörtlü Oda (4 Misafir)',
        multiSharing: 'Çoklu Paylaşım (8 misafire kadar)',
        pricePerNight: 'Gecelik fiyat',
        searchHotels: 'Otel Ara'
      },
      reviews: {
        title: 'Hacılarımız Ne Diyor',
        review1: {
          text: 'Mükemmel hizmet! Otel rezervasyonu sorunsuzdu ve Harem\'e yakın konum mükemmeldi.',
          name: 'Ahmed Hassan',
          country: 'Mısır'
        },
        review2: {
          text: 'Çok yardımcı personel ve temiz konaklama. Umre yolculuğumuzu rahatlatıcı hale getirdi.',
          name: 'Fatima Ali',
          country: 'Pakistan'
        },
        review3: {
          text: 'Harika taksi hizmeti ve güvenilir şoförler. Umre hacıları için şiddetle tavsiye edilir.',
          name: 'Abdullah Rahman',
          country: 'Endonezya'
        }
      },
      whyChoose: {
        title: 'Neden Umrah Asan\'ı Seçmelisiniz?',
        feature1: {
          title: 'Mübarek Konaklama',
          description: 'Kutsal Haremain\'e yakın rahat oteller'
        },
        feature2: {
          title: 'Güvenilir Ulaşım',
          description: 'Güvenli ve uygun taksi hizmetleri'
        },
        feature3: {
          title: '24/7 Destek',
          description: 'Hacılar için 7/24 yardım'
        },
        feature4: {
          title: 'Rekabetçi Fiyatlar',
          description: 'Kaliteli hizmetler için en iyi oranlar'
        }
      }
    },
    footer: {
      description: 'Rahat konaklama ve güvenilir ulaşım hizmetleri ile mübarek Umre yolculuğunuz için güvenilir ortağınız.',
      quickLinks: 'Hızlı Bağlantılar',
      legal: 'Yasal',
      services: 'Hizmetler',
      contact: 'İletişim',
      address: 'Mekke, Suudi Arabistan',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 Umrah Asan. Tüm hakları saklıdır.'
    }
  },
  ms: {
    nav: {
      home: 'Laman Utama',
      ziaraat: 'Ziarah',
      taxi: 'Tempahan Teksi',
      guide: 'Panduan Umrah',
      train: 'Butiran Kereta',
      blogs: 'Blog',
      faq: 'Soalan Lazim',
      about: 'Tentang Kami',
      guestLogin: 'Log Masuk Tetamu',
      adminLogin: 'Log Masuk Admin',
      partnerLogin: 'Log Masuk Rakan Kongsi',
      language: 'Bahasa',
      logout: 'Log Keluar'
    },
    home: {
      title: 'Rakan Kongsi Dipercayai untuk Perjalanan Umrah yang Berkat',
      subtitle: 'Alami perjalanan kerohanian seumur hidup dengan perkhidmatan Umrah komprehensif kami di Makkah dan Madinah yang Suci',
      bookHotel: 'Tempah Hotel',
      bookTaxi: 'Tempah Teksi',
      explorePlaces: 'Terokai Tempat Suci',
      bookingForm: {
        title: 'Tempah Penginapan Anda',
        checkin: 'Tarikh Daftar Masuk',
        checkout: 'Tarikh Daftar Keluar',
        makkah: 'Makkah',
        madina: 'Madinah',
        nights: 'malam',
        doubleRoom: 'Bilik Berkembar',
        quadRoom: 'Bilik Empat (4 Tetamu)',
        multiSharing: 'Berkongsi-ramai (sehingga 8 tetamu)',
        pricePerNight: 'Harga semalam',
        searchHotels: 'Cari Hotel'
      },
      reviews: {
        title: 'Apa Kata Jemaah Kami',
        review1: {
          text: 'Perkhidmatan yang cemerlang! Tempahan hotel lancar dan lokasinya sempurna berhampiran Haram.',
          name: 'Ahmed Hassan',
          country: 'Mesir'
        },
        review2: {
          text: 'Kakitangan yang sangat membantu dan penginapan yang bersih. Menjadikan perjalanan Umrah kami selesa.',
          name: 'Fatima Ali',
          country: 'Pakistan'
        },
        review3: {
          text: 'Perkhidmatan teksi yang hebat dan pemandu yang boleh dipercayai. Sangat disyorkan untuk jemaah Umrah.',
          name: 'Abdullah Rahman',
          country: 'Indonesia'
        }
      },
      whyChoose: {
        title: 'Mengapa Pilih Umrah Asan?',
        feature1: {
          title: 'Penginapan Berkat',
          description: 'Hotel selesa berhampiran Haramain yang suci'
        },
        feature2: {
          title: 'Pengangkutan Dipercayai',
          description: 'Perkhidmatan teksi yang selamat dan mudah'
        },
        feature3: {
          title: 'Sokongan 24/7',
          description: 'Bantuan sepanjang masa untuk jemaah'
        },
        feature4: {
          title: 'Harga Kompetitif',
          description: 'Kadar terbaik untuk perkhidmatan berkualiti'
        }
      }
    },
    footer: {
      description: 'Rakan kongsi dipercayai anda untuk perjalanan Umrah yang berkat dengan penginapan selesa dan perkhidmatan pengangkutan yang boleh dipercayai.',
      quickLinks: 'Pautan Pantas',
      legal: 'Undang-undang',
      services: 'Perkhidmatan',
      contact: 'Hubungi Kami',
      address: 'Makkah, Arab Saudi',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© 2024 Umrah Asan. Semua hak terpelihara.'
    }
  },
  bn: {
    nav: {
      home: 'হোম',
      ziaraat: 'জিয়ারত',
      taxi: 'ট্যাক্সি বুকিং',
      guide: 'উমরাহ গাইড',
      train: 'ট্রেন বিবরণ',
      blogs: 'ব্লগ',
      faq: 'FAQ',
      about: 'আমাদের সম্পর্কে',
      guestLogin: 'গেস্ট লগইন',
      adminLogin: 'অ্যাডমিন লগইন',
      partnerLogin: 'পার্টনার লগইন',
      language: 'ভাষা',
      logout: 'লগআউট'
    },
    home: {
      title: 'আপনার পবিত্র উমরাহ যাত্রার জন্য বিশ্বস্ত সঙ্গী',
      subtitle: 'পবিত্র মক্কা ও মদিনায় আমাদের ব্যাপক উমরাহ সেবার সাথে জীবনের আধ্যাত্মিক যাত্রার অভিজ্ঞতা নিন',
      bookHotel: 'হোটেল বুক করুন',
      bookTaxi: 'ট্যাক্সি বুক করুন',
      explorePlaces: 'পবিত্র স্থান অন্বেষণ করুন',
      bookingForm: {
        title: 'আপনার থাকার ব্যবস্থা বুক করুন',
        checkin: 'চেক-ইন তারিখ',
        checkout: 'চেক-আউট তারিখ',
        makkah: 'মক্কা',
        madina: 'মদিনা',
        nights: 'রাত',
        doubleRoom: 'ডাবল রুম',
        quadRoom: 'কোয়াড রুম (৪ জন অতিথি)',
        multiSharing: 'মাল্টি-শেয়ারিং (৮ জন অতিথি পর্যন্ত)',
        pricePerNight: 'প্রতি রাতের দাম',
        searchHotels: 'হোটেল খুঁজুন'
      },
      reviews: {
        title: 'আমাদের হাজীরা কী বলেন',
        review1: {
          text: 'চমৎকার সেবা! হোটেল বুকিং মসৃণ ছিল এবং হারামের কাছে অবস্থান নিখুঁত ছিল।',
          name: 'আহমেদ হাসান',
          country: 'মিশর'
        },
        review2: {
          text: 'অত্যন্ত সহায়ক কর্মী এবং পরিষ্কার থাকার ব্যবস্থা। আমাদের উমরাহ যাত্রা আরামদায়ক করেছে।',
          name: 'ফাতিমা আলী',
          country: 'পাকিস্তান'
        },
        review3: {
          text: 'দুর্দান্ত ট্যাক্সি সেবা এবং নির্ভরযোগ্য চালক। উমরাহ হাজীদের জন্য অত্যন্ত প্রশংসিত।',
          name: 'আব্দুল্লাহ রহমান',
          country: 'ইন্দোনেশিয়া'
        }
      },
      whyChoose: {
        title: 'কেন উমরাহ আসান বেছে নেবেন?',
        feature1: {
          title: 'পবিত্র থাকার ব্যবস্থা',
          description: 'পবিত্র হারামাইনের কাছে আরামদায়ক হোটেল'
        },
        feature2: {
          title: 'নির্ভরযোগ্য পরিবহন',
          description: 'নিরাপদ ও সুবিধাজনক ট্যাক্সি সেবা'
        },
        feature3: {
          title: '২৪/৭ সহায়তা',
          description: 'হাজীদের জন্য চব্বিশ ঘন্টা সহায়তা'
        },
        feature4: {
          title: 'প্রতিযোগিতামূলক দাম',
          description: 'মানসম্পন্ন সেবার জন্য সেরা দর'
        }
      }
    },
    footer: {
      description: 'আরামদায়ক থাকার ব্যবস্থা এবং নির্ভরযোগ্য পরিবহন সেবার সাথে পবিত্র উমরাহ যাত্রার জন্য আপনার বিশ্বস্ত সঙ্গী।',
      quickLinks: 'দ্রুত লিংক',
      legal: 'আইনি',
      services: 'সেবাসমূহ',
      contact: 'যোগাযোগ করুন',
      address: 'মক্কা, সৌদি আরব',
      email: 'info@umrahasan.com',
      phone: '+966 123 456 789',
      copyright: '© ২০২৪ উমরাহ আসান। সকল অধিকার সংরক্ষিত।'
    }
  }
};