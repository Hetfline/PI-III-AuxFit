export interface UserNutritionProfile {
  sexo: string;
  data_nascimento: string; // YYYY-MM-DD
  altura: number; // em cm
  peso: number; // em kg
  nivel_atividade: string; // 'sedentario', 'leve', 'moderado', 'alto', 'muito_alto'
  objetivo: string; // 'emagrecer', 'manter', 'ganhar'
}

export interface Macros {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export const calculateMacros = (profile: UserNutritionProfile): Macros => {
  // 1. Calcular Idade
  const birthDate = new Date(profile.data_nascimento);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Se dados inválidos, retorna padrão
  if (!profile.peso || !profile.altura) {
    return { calories: 2000, protein: 150, carbs: 200, fats: 65 };
  }

  // 2. Calcular TMB (Taxa Metabólica Basal) - Fórmula de Mifflin-St Jeor
  let tmb = 0;
  if (profile.sexo === 'F') {
    tmb = (10 * profile.peso) + (6.25 * profile.altura) - (5 * age) - 161;
  } else {
    // Masculino ou Outro (padrão masculino)
    tmb = (10 * profile.peso) + (6.25 * profile.altura) - (5 * age) + 5;
  }

  // 3. Ajustar pelo Nível de Atividade
  let activityMultiplier = 1.2; // Sedentário
  const activity = profile.nivel_atividade ? profile.nivel_atividade.toLowerCase() : 'moderado';

  if (activity.includes('leve')) activityMultiplier = 1.375;
  else if (activity.includes('moderado') || activity.includes('intermediário')) activityMultiplier = 1.55;
  else if (activity.includes('alto') || activity.includes('avançado')) activityMultiplier = 1.725;
  else if (activity.includes('muito')) activityMultiplier = 1.9;

  let tdee = tmb * activityMultiplier;

  // 4. Ajustar pelo Objetivo
  const goal = profile.objetivo ? profile.objetivo.toLowerCase() : 'manter';
  if (goal.includes('perder') || goal.includes('emagrec') || goal.includes('sec')) {
    tdee -= 500; // Déficit calórico
  } else if (goal.includes('ganhar') || goal.includes('hipertrofia') || goal.includes('massa')) {
    tdee += 300; // Superávit calórico
  }

  // Evitar calorias perigosamente baixas
  if (tdee < 1200) tdee = 1200;

  // 5. Divisão de Macros (Padrão Fitness)
  // Proteína: ~2g por kg de peso corporal
  // Gordura: ~0.8g a 1g por kg de peso
  // Carbo: O resto

  const proteinGrams = Math.round(profile.peso * 2.0); 
  const fatGrams = Math.round(profile.peso * 0.9);
  
  const proteinCals = proteinGrams * 4;
  const fatCals = fatGrams * 9;
  
  const remainingCals = tdee - (proteinCals + fatCals);
  const carbGrams = Math.max(0, Math.round(remainingCals / 4));

  return {
    calories: Math.round(tdee),
    protein: proteinGrams,
    fats: fatGrams,
    carbs: carbGrams
  };
};