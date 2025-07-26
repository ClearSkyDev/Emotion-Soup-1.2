import React, { createContext, useContext, useEffect, useState } from 'react';
import * as Speech from 'expo-speech';

const TTSContext = createContext();

export function TTSProvider({ children }) {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    async function init() {
      try {
        const voices = await Speech.getAvailableVoicesAsync();
        const childVoice = voices.find((v) => /child|kid/i.test(v.name));
        setVoice(childVoice ? childVoice.identifier : voices[0]?.identifier);
      } catch (e) {
        console.log('TTS init error', e);
      }
    }
    init();
  }, []);

  const speak = (text) => {
    if (!text) return;
    Speech.stop();
    Speech.speak(text, {
      voice,
      rate: 0.8,
      pitch: 1.1,
    });
  };

  return (
    <TTSContext.Provider value={{ speak }}>
      {children}
    </TTSContext.Provider>
  );
}

export function useTTS() {
  return useContext(TTSContext);
}
