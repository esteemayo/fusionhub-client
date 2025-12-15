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
    const SpeechRegnition = window.SpeechRecognition;

    if (!SpeechRegnition) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRegnition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      setError(e.error);
      setIsListening(false);
    };

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const text = Array.from(e.results)
        .map((result) => result[0].transcript)
        .join('');

      setTranscript(text);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [continuous, lang]);

  const startListening = () => recognitionRef.current?.start();
  const stopListening = () => recognitionRef.current?.stop();

  return {
    isListening,
    error,
    transcript,
    startListening,
    stopListening,
  };
};
