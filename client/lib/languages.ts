// client/lib/languages.ts

export type Language =
  | "en"
  | "hi"
  | "te"
  | "mr"
  | "gu"
  | "bn"
  | "pa"
  | "mai"
  | "ur"
  | "or";

export const LANGUAGES: Record<
  Language,
  { name: string; nativeName: string; flag: string }
> = {
  en: { name: "English", nativeName: "English", flag: "🇮🇳" },
  hi: { name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  te: { name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  mr: { name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  bn: { name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  mai: { name: "Maithili", nativeName: "मैथिली", flag: "🇮🇳" },
  ur: { name: "Urdu", nativeName: "اُردُو", flag: "🇮🇳" },
  or: { name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
};

type FlatTranslations = Record<string, string>;

export const translations: Record<Language, FlatTranslations> = {
  en: {
    // navigation
    home: "Home",
    assessTeeth: "Assess Teeth",
    findDoctor: "Find Doctor",
    ambulance: "Ambulance",
    myReports: "My Reports",
    consultNow: "Consult Now",

    // assessment
    assessYourTeeth: "AI-Powered Teeth Assessment",
    uploadToGetAnalysis:
      "Upload a photo of your teeth to get instant AI-powered analysis.",
    currentPainLevel: "Current Pain Level",
    noPain: "No pain",
    mild: "Mild",
    moderate: "Moderate",
    severe: "Severe",
    extreme: "Extreme",
    perfectlyFine: "Perfectly fine",
    slightDiscomfort: "Slight discomfort",
    noticeablePain: "Noticeable pain",
    hardToManage: "Hard to manage",
    unbearable: "Unbearable",
    additionalSymptoms: "Additional Symptoms?",
    selectSymptoms: "Select any symptoms you are experiencing",
    uploadTeethImages: "Upload Teeth Images for AI Analysis",
    uploadOrDrag: "Click to upload or drag",
    uploadImageReady: "Image uploaded — ready for AI analysis",
    analyzeWithAI: "Analyze with AI",
    analyzingWithAI: "Analyzing with AI...",
    useVoiceNotes: "Or use voice notes",
    useMicrophone: "Use Microphone",
    microphoneActive: "Microphone Active",
    describeSymptoms: "Describe your symptoms in your language",
    backToHome: "Back to Home",
    next: "Next",
    back: "Back",
    reAssess: "Re-assess",

    // results
    greatNews: "Great News!",
    attentionNeeded: "Attention Needed",
    immediateCareRequired: "Immediate Care Required",
    healthScoreGood:
      "Your dental health looks good. Continue with preventive care.",
    healthScoreCaution:
      "Some issues detected. We recommend consulting a dentist soon.",
    healthScoreCritical:
      "Urgent attention required. Please consult a dentist immediately.",

    emergencyAmbulance: "Emergency Ambulance Service",
    consultNowBtn: "Consult Now",

    voiceNotSupported: "Voice input not supported on your device.",
  },

  // Other languages – minimal, anything missing falls back to English
  hi: {
    home: "होम",
    assessTeeth: "दांतों का मूल्यांकन करें",
    findDoctor: "डॉक्टर खोजें",
    ambulance: "एम्बुलेंस",
    myReports: "मेरी रिपोर्टें",
    consultNow: "अभी परामर्श करें",
    assessYourTeeth: "एआई-संचालित दांतों का मूल्यांकन",
    uploadToGetAnalysis:
      "तत्काल एआई विश्लेषण के लिए अपने दांतों की फोटो अपलोड करें।",
    currentPainLevel: "वर्तमान दर्द स्तर",
    additionalSymptoms: "अतिरिक्त लक्षण?",
    selectSymptoms: "जो लक्षण हैं उन्हें चुनें",
    uploadTeethImages: "एआई विश्लेषण के लिए दांतों की छवियाँ अपलोड करें",
    uploadOrDrag: "अपलोड करने के लिए क्लिक करें या खींचें",
    analyzeWithAI: "एआई से विश्लेषण करें",
    analyzingWithAI: "एआई से विश्लेषण हो रहा है...",
    useVoiceNotes: "या वॉइस नोट्स का उपयोग करें",
    useMicrophone: "माइक्रोफ़ोन का उपयोग करें",
    microphoneActive: "माइक्रोफ़ोन सक्रिय",
    describeSymptoms: "अपनी भाषा में लक्षण बताएं",
    next: "आगे",
    back: "वापस",
    reAssess: "फिर से परीक्षण करें",
    greatNews: "बहुत अच्छी खबर!",
    attentionNeeded: "ध्यान आवश्यक",
    immediateCareRequired: "तत्काल देखभाल आवश्यक",
  },

  te: { home: "హోమ్", assessTeeth: "దంతాలను అంచనా వేయండి" },
  mr: { home: "होम", assessTeeth: "दातांचे मूल्यांकन करा" },
  gu: { home: "હોમ", assessTeeth: "દાંતોનું મૂલ્યાંકન કરો" },
  bn: { home: "হোম", assessTeeth: "দাঁত মূল্যায়ন করুন" },
  pa: { home: "ਹੋਮ", assessTeeth: "ਦੰਦਾਂ ਦੀ ਜਾਂਚ ਕਰੋ" },
  mai: { home: "होम", assessTeeth: "दाँत के जाँच करु" },
  ur: {
    home: "ہوم",
    assessTeeth: "دانتوں کا معائنہ کریں",
    consultNow: "فوراً مشورہ کریں",
  },
  or: { home: "ହୋମ", assessTeeth: "ଦାନ୍ତ ଯାଞ୍ଚ କରନ୍ତୁ" },
};
