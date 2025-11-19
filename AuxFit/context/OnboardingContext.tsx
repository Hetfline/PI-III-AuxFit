import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Definimos o formato dos dados do usuário
interface OnboardingData {
  sexo: string;
  data_nascimento: string;
  altura: number;
  peso_inicial: number;
  nivel_atividade: string;
  objetivo: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (key: keyof OnboardingData, value: any) => void;
}


const OnboardingContext = createContext<OnboardingContextType>({} as OnboardingContextType);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    sexo: '',
    data_nascimento: '',
    altura: 0,
    peso_inicial: 0,
    nivel_atividade: '',
    objetivo: ''
  });

  const updateOnboardingData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Dados atualizados [${key}]:`, value);
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);