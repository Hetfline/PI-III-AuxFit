// @/services/api.js

// IP da máquina (192.168.89.122)
// Mantenha a porta 3000
const API_URL = "http://192.168.89.122:3000/api";

export const api = {
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
          "Authorization": `Bearer ${token}` // O Token é essencial aqui
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Erro ao atualizar perfil");
      return data;
    } catch (error) {
      throw error;
    }
  }
};