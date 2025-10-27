import React, { useState } from "react";
import { Colors, Spacing } from "@/constants/Styles";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import WaterProgress from "@/components/diet/WaterProgress";
import Favorite from "@/components/universal/FavoriteBtn";
import InputField from "@/components/universal/InputField";

export default function HomeScreen() {
  const router = useRouter();
  const [isModalVisible] = useState(false);

  const handleTestOnboarding = () => {
    router.push("/onboarding");
  };

  const macros: { protein: number; carbs: number; fats: number } = {
    protein: 150,
    carbs: 225,
    fats: 56,
  };

  let calories: number =
    macros.protein * 4 + macros.carbs * 4 + macros.fats * 9;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      {/* Background decorativo */}
      <Background />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.scrollContent}>
            <Button
              title="Testar Onboarding"
              onPress={handleTestOnboarding}
              bgColor="#35e1ffff"
            />

            <Button title="Botão" onPress={() => null} />
            <Button
              title="Botão de adicionar"
              icon="add"
              onPress={() => null}
            />
            <Button
              title="Botão de adicionar"
              icon="add"
              dashBorder
              bgColor="transparent"
              borderColor={Colors.border}
              color={Colors.text}
              onPress={() => null}
            />

            <Favorite/>

            <InputField placeholder="Senha" icon="person"/>
            <InputField placeholder="Senha" icon="lock" password/>
            <InputField placeholder="Pesquisar" icon="search"/>
            <InputField placeholder="Genérico"/>

            
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
    gap: 20,
  },
  smallButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
  },
  macrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
