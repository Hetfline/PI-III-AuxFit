import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import Background from "@/components/universal/Background";

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estados dos inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      console.log("Login:", { email, password });
      // Lógica de login aqui
    } else {
      console.log("Cadastro:", { name, email, password, confirmPassword });
      // Lógica de cadastro aqui
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Limpa os campos ao trocar de modo
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Background/>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logoAux.svg")} // Ajuste o caminho conforme necessário
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Título */}
        <Text style={[Texts.title, styles.title]}>
          {isLogin ? "LOGIN" : "CADASTRO"}
        </Text>

        {/* Formulário */}
        <View style={styles.formContainer}>
          {/* Campo Nome (apenas no cadastro) */}
          {!isLogin && (
            <InputField
              icon="person"
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          {/* Campo Email */}
          <InputField
            icon="email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo Senha */}
          <InputField
            icon="lock"
            placeholder="Senha"
            password
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          {/* Campo Confirmar Senha (apenas no cadastro) */}
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

        {/* Botão Principal */}
        <View style={styles.buttonContainer}>
          <Button
            title={isLogin ? "Entrar" : "Cadastrar"}
            onPress={handleSubmit}
            bgColor={Colors.primary}
            color={Colors.bg}
          />
        </View>

        {/* Links de navegação */}
        <View style={styles.linksContainer}>
          {isLogin ? (
            <>
              <View style={styles.linkRow}>
                <Text style={[Texts.body, { color: Colors.text }]}>
                  Não tem uma conta?{" "}
                </Text>
                <Pressable onPress={toggleMode}>
                  <Text
                    style={[
                      Texts.bodyBold,
                      { color: Colors.primary },
                    ]}
                  >
                    Cadastre-se
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
                <Text
                  style={[
                    Texts.bodyBold,
                    { color: Colors.primary },
                  ]}
                >
                  Conecte-se
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: Spacing.xl,
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