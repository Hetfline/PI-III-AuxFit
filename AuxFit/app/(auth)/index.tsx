// Essa é a tela inicial de login. Essa será a tela que o usuário será redirecionado por padrão, e caso ele já esteja logado, ele vai direto pra Home, senão, ele vem aqui quando abrir o app

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Text } from "@/components/Themed";
import InputField from "@/components/universal/InputField";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function Login() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={Texts.title}>Index dentro de (auth)</Text>
            <View style={styles.inputs}>
              <InputField icon="person" placeholder="Nome" password={false} />
              <View style={{ margin: Spacing.md }}></View>
              <InputField icon="lock" placeholder="Senha" password={true} />
            </View>
            {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },
  inputs: {
    justifyContent: "space-evenly",
    width: "100%",
  },
});
