import { useEffect, useRef, useState } from 'react';
import { IVoiceSearch } from '../types';

export const useVoiceSearch: IVoiceSearch = (
  lang = 'en-US',
  continuous = false
) => {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const SpeechRegnition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRegnition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRegnition();

    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setIsListening(false);

      switch (e.error) {
        case 'not-allowed':
        case 'service-not-allowed':
          setError('Microphone permission denied');
          break;

        case 'network':
          setError('Network error.Check your internet connection.');
          break;

        case 'no-speech':
          setError(null);
          break;

        case 'aborted':
          setError(null);
          break;

        default:
          setError('Voice search failed. Please try again.');
      }
    };

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const result = e.results[e.results.length - 1];
      const text = result[0].transcript.trim();

      // const text = Array.from(e.results)
      //   .map((result) => result[0].transcript)
      //   .join('');

      setTranscript(text);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [continuous, lang]);

  const startListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition || isListening) return;

    try {
      recognition.start();
    } catch {
      //
    }
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const toggleListening = () => {
    return isListening ? stopListening() : startListening();
  };

  return {
    isListening,
    error,
    transcript,
    startListening,
    stopListening,
    toggleListening,
  };
};
