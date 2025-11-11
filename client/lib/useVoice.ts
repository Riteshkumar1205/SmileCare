import { useState, useCallback } from 'react';

interface UseVoiceReturn {
  isListening: boolean;
  transcript: string;
  isSpeaking: boolean;
  startListening: () => void;
  stopListening: () => void;
  speak: (text: string, lang?: string) => void;
  stopSpeaking: () => void;
  isSupported: boolean;
}

export const useVoice = (): UseVoiceReturn => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Check if browser supports Web Speech API
  const SpeechRecognition =
    typeof window !== 'undefined' &&
    (window.SpeechRecognition || (window as any).webkitSpeechRecognition);

  const isSupported = !!SpeechRecognition;

  const startListening = useCallback(() => {
    if (!isSupported) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    // Auto-detect language from browser or default to Hindi
    const lang =
      localStorage.getItem('selectedLanguage') === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript('');
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcript + ' ');
        } else {
          interim += transcript;
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    // Auto stop after 30 seconds
    setTimeout(() => {
      recognition.stop();
    }, 30000);
  }, [isSupported, SpeechRecognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  const speak = useCallback((text: string, lang: string = 'en') => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Set language
    const langMap: Record<string, string> = {
      en: 'en-US',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      gu: 'gu-IN',
    };

    utterance.lang = langMap[lang] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  return {
    isListening,
    transcript,
    isSpeaking,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSupported,
  };
};

// Type for SpeechRecognition event
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
