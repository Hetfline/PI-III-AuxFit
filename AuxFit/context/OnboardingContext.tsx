import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Definimos o formato dos dados do usuário
export interface OnboardingData {
  // Dados Pessoais (Obrigatórios)
  sexo: string;
  data_nascimento: string;
  altura: number;
  peso_inicial: number;
  nivel_atividade: string;
  objetivo: string;

  // Dados de Treino (Opcionais)
  nivel_experiencia?: string;
  dias_treino?: string;
  equipamentos?: string[];
  lesoes?: string[];
  duracao_treino?: string;
  preferencia_treino?: string;
  foco_muscular?: string[];

  // --- NOVOS DADOS DE DIETA ---
  // Adicionei aqui para corrigir o erro de tipagem
  restricoes_alimentares?: string[];
  tipo_dieta?: string;
  vegetariano?: boolean;
  vegano?: boolean;
  refeicoes_dia?: number;
  // ----------------------------
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  updateOnboardingData: (key: keyof OnboardingData, value: any) => void;
  resetOnboardingData: () => void;
}

const OnboardingContext = createContext<OnboardingContextType>({} as OnboardingContextType);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    sexo: '',
    data_nascimento: '',
    altura: 0,
    peso_inicial: 0,
    nivel_atividade: '',
    objetivo: '',
    // Campos opcionais não precisam ser inicializados aqui
  });

  const updateOnboardingData = (key: keyof OnboardingData, value: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Dados atualizados [${key}]:`, value);
  };

  const resetOnboardingData = () => {
    setOnboardingData({
        sexo: '',
        data_nascimento: '',
        altura: 0,
        peso_inicial: 0,
        nivel_atividade: '',
        objetivo: '',
    });
  };

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, resetOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);