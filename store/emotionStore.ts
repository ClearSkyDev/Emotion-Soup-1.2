import { create } from 'zustand';

interface EmotionState {
  age: number | null;
  emotion: string | null;
  bodily: number;
  temperature: number;
  size: number;
  premium: boolean;
  setAge: (age: number) => void;
  setEmotion: (emotion: string) => void;
  setBodily: (val: number) => void;
  setTemperature: (val: number) => void;
  setSize: (val: number) => void;
  setPremium: (val: boolean) => void;
}

export const useEmotionStore = create<EmotionState>((set) => ({
  age: null,
  emotion: null,
  bodily: 0,
  temperature: 0,
  size: 0,
  premium: false,
  setAge: (age) => set({ age }),
  setEmotion: (emotion) => set({ emotion }),
  setBodily: (bodily) => set({ bodily }),
  setTemperature: (temperature) => set({ temperature }),
  setSize: (size) => set({ size }),
  setPremium: (premium) => set({ premium }),
}));
