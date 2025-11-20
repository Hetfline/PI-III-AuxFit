import { authStorage } from "./auth-storage";

// * SEMPRE MUDAR ENDEREÇO DE IP DE QUEM ESTIVER RODANDO
const API_URL = "http://xxx:3000/api"; 

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

  // --- EXERCÍCIOS ---
  getExercises: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");

      const response = await fetch(`${API_URL}/exercicios`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar exercícios");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // --- TREINOS (CRUD) ---
  getWorkouts: async () => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");

      const response = await fetch(`${API_URL}/treinos`, { 
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar treino");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // --- ITENS DE TREINO (Adicionar Exercício ao Treino) ---
  
  // Busca os exercícios vinculados a um treino específico
  getWorkoutExercises: async (treinoId) => {
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");

      const response = await fetch(`${API_URL}/treino-exercicios/treino/${treinoId}`, {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao buscar itens do treino");
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Adiciona um exercício ao treino (cria registro na tabela de junção)
  addExerciseToWorkout: async (data) => {
    // data deve conter: { treino_fk, exercicio_fk, series, repeticoes, carga, descanso_segundos }
    try {
      const token = await authStorage.getToken();
      if (!token) throw new Error("Usuário não autenticado");

      const response = await fetch(`${API_URL}/treino-exercicios`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Erro ao adicionar exercício");
      return result;
    } catch (error) {
      throw error;
    }
  },

  // --- NOVAS FUNÇÕES ADICIONADAS PARA EDIÇÃO ---

  updateWorkoutItem: async (itemId, data) => {
    try {
      const token = await authStorage.getToken();
      const response = await fetch(`${API_URL}/treino-exercicios/${itemId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
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
        headers: { 
          "Authorization": `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error("Erro ao deletar item");
      return true;
    } catch (error) {
      throw error;
    }
  }
};