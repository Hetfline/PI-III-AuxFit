import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auxfit_user_token';

export const authStorage = {
  // Salvar o token (Login/Cadastro)
  saveToken: async (token) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error("Erro ao salvar token", error);
    }
  },

  // Ler o token (Para fazer requisições)
  getToken: async () => {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Erro ao ler token", error);
      return null;
    }
  },

  // Apagar o token (Logout)
  removeToken: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error("Erro ao remover token", error);
    }
  }
};