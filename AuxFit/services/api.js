import { authStorage } from "./auth-storage";

// ⚠️ Se seu IP mudar (reiniciar roteador/PC), lembre de atualizar aqui.
const API_URL = "http://192.168.89.122:3000/api"; 

export const api = {
  // --- AUTENTICAÇÃO ---
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro no login");
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro no cadastro");
      return data;
    } catch (error) {
      throw error;
    }
  },

  me: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) return null; 
      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar usuário");
      return data.user; 
    } catch (error) {
      console.log("Erro ao buscar dados do usuário:", error);
      return null;
    }
  },

  completeProfile: async (profileData, token) => {
    try {
      const response = await fetch(`${API_URL}/auth/complete-profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar perfil");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // --- PERFIL DE TREINO ---
  saveTrainingProfile: async (data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/perfil-treino`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao salvar perfil de treino");
      return result;
    } catch (error) {
      throw error;
    }
  },

  // --- EXERCÍCIOS ---
  getExercises: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/exercicios`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar exercícios");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // --- TREINOS ---
  getWorkouts: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/treinos`, { 
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar treinos");
      return data;
    } catch (error) {
      throw error;
    }
  },

  createWorkout: async (workoutData) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/treinos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(workoutData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao criar treino");
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateWorkout: async (id, workoutData) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/treinos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(workoutData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar treino");
      return data;
    } catch (error) {
      throw error;
    }
  },

  getWorkoutExercises: async (treinoId) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/treino-exercicios/treino/${treinoId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar itens do treino");
      return data;
    } catch (error) {
      throw error;
    }
  },

  addExerciseToWorkout: async (data) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/treino-exercicios`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao adicionar exercício");
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateWorkoutItem: async (itemId, data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/treino-exercicios/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao atualizar item");
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteWorkoutItem: async (itemId) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/treino-exercicios/${itemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao deletar item");
      return true;
    } catch (error) {
      throw error;
    }
  },

  // --- DIETA & REFEIÇÕES ---
  getMeals: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/refeicoes`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar refeições");
      return data;
    } catch (error) {
      throw error;
    }
  },

  getMeal: async (id) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/refeicoes/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar refeição");
      return data;
    } catch (error) {
      throw error;
    }
  },

  createMeal: async (data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicoes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao criar refeição");
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateMeal: async (id, data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicoes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao atualizar refeição");
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteMeal: async (id) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicoes/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao deletar refeição");
      return true;
    } catch (error) {
      throw error;
    }
  },

  getFoods: async () => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/alimentos`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar alimentos");
      return data;
    } catch (error) {
      throw error;
    }
  },

  addFoodToMeal: async (itemData) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicao-itens`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(itemData),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao adicionar alimento");
      return result;
    } catch (error) {
      throw error;
    }
  },

  updateMealItem: async (itemId, data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicao-itens/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao atualizar item da refeição");
      return result;
    } catch (error) {
      throw error;
    }
  },

  deleteMealItem: async (itemId) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/refeicao-itens/${itemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao deletar item da refeição");
      return true;
    } catch (error) {
      throw error;
    }
  },

  // --- DESPENSA ---
  // NOVO: Buscar lista da despensa
  getPantry: async () => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/despensa`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar despensa");
      return data;
    } catch (error) {
      throw error;
    }
  },

  checkPantryItem: async (alimentoId) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/despensa/check/${alimentoId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      return data; 
    } catch (error) {
      console.error(error);
      return { inPantry: false, item: null };
    }
  },

  addToPantry: async (alimentoId) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/despensa`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ alimento_fk: alimentoId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      return data;
    } catch (error) {
      throw error;
    }
  },

  removeFromPantry: async (despensaItemId) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/despensa/${despensaItemId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Erro ao remover da despensa");
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // --- ÁGUA & PROGRESSO ---
  // NOVO: Buscar histórico completo (Gráficos)
  getProgressHistory: async () => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/progresso`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar histórico");
      return data;
    } catch (error) {
      throw error;
    }
  },

  getTodayWaterProgress: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/progresso/today`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar progresso de hoje");
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateWaterProgress: async (amount) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      const response = await fetch(`${API_URL}/progresso/water`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ amount }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar água");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // NOVO: Salvar Peso
  saveWeight: async (id, weight) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");
      
      // Usa a rota genérica de update do ProgressoController
      const response = await fetch(`${API_URL}/progresso/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ peso: weight }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao salvar peso");
      return data;
    } catch (error) {
      throw error;
    }
  },

  finishWorkout: async (workoutData) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/historico-treinos/finalizar`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workoutData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao finalizar treino");
      return data;
    } catch (error) {
      throw error;
    }
  },
};