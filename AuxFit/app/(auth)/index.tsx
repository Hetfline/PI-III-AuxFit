import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import Background from "@/components/universal/Background";
import { api } from "@/services/api";
import { authStorage } from "@/services/auth-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response;

      if (isLogin) {
        // --- LOGIN ---
        response = await api.login(email, password);

        // 1. Salva o token de forma segura
        if (response.session?.access_token) {
          await authStorage.saveToken(response.session.access_token);
        }

        // 2. Redireciona para Home
        router.replace("/(tabs)/home");
      } else {
        // --- CADASTRO ---
        if (password !== confirmPassword) {
          Alert.alert("Erro", "As senhas não conferem.");
          setLoading(false);
          return;
        }

        const payload = { email, password, nome: name };

        // O backend modificado já retorna o 'session' no cadastro também!
        response = await api.register(payload);

        // 1. Salva o token de forma segura (Auto-login)
        if (response.session?.access_token) {
          await authStorage.saveToken(response.session.access_token);
        }

        Alert.alert("Sucesso", "Conta criada! Vamos finalizar seu perfil.");

        // 2. Redireciona para o Onboarding
        router.replace("/onboarding");
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      Alert.alert("Erro", msg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={styles.container}>
      <Background />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/icons/logo/logoOnboarding.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={[Texts.title, styles.title]}>
            {isLogin ? "LOGIN" : "CADASTRO"}
          </Text>

          <View style={styles.formContainer}>
            {!isLogin && (
              <InputField
                icon="person"
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            )}

            <InputField
              icon="email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              icon="lock"
              placeholder="Senha"
              password
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
            />

            {!isLogin && (
              <InputField
                icon="lock"
                placeholder="Confirmar senha"
                password
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : (
              <Button
                title={isLogin ? "Entrar" : "Cadastrar"}
                onPress={handleSubmit}
                bgColor={Colors.primary}
                color={Colors.bg}
              />
            )}
          </View>

          <View style={styles.linksContainer}>
            {isLogin ? (
              <>
                <View style={styles.linkRow}>
                  <Text style={[Texts.body, { color: Colors.text }]}>
                    Não tem uma conta?{" "}
                  </Text>
                  <Pressable onPress={toggleMode}>
                    <Text style={[Texts.bodyBold, { color: Colors.primary }]}>
                      Cadastre-se
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.linkRow}>
                  <Text style={[Texts.body, { color: Colors.text }]}>
                    Com preguiça?{" "}
                  </Text>
                  <Pressable onPress={() => console.log("Seguir sem conta")}>
                    <Text style={[Texts.bodyBold, { color: Colors.primary }]}>
                      Seguir sem conta
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <View style={styles.linkRow}>
                <Text style={[Texts.body, { color: Colors.text }]}>
                  Já tem uma conta?{" "}
                </Text>
                <Pressable onPress={toggleMode}>
                  <Text style={[Texts.bodyBold, { color: Colors.primary }]}>
                    Conecte-se
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  logo: {
    width: 200,
    height: 80,
  },
  title: {
    textAlign: "center",
    marginBottom: Spacing.lg,
    letterSpacing: 2,
  },
  formContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    marginBottom: Spacing.md,
    height: 50,
    justifyContent: "center",
  },
  linksContainer: {
    gap: Spacing.sm,
    alignItems: "center",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});