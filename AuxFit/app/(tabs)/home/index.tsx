import React, { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Background from "@/components/universal/Background";
import Button from "@/components/universal/Button";
import AddBtn from "@/components/universal/AddBtn";
import CheckBtn from "@/components/universal/CheckBtn";
import Favorite from "@/components/universal/FavoriteBtn";
import FilterBtn from "@/components/universal/FilterBtn";
import GenericModal from "@/components/universal/GenericModal";
import Header from "@/components/universal/Header";
import InputField from "@/components/universal/InputField";
import WeeklyStreak from "@/components/universal/WeeklyStreak";
import WeightIn from "@/components/universal/WeightIn";
import ProgressBar from "@/components/questions/ProgressBar";
import FilterModal from "@/components/universal/FilterModal";

export default function HomeScreen() {
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleStartWorkout = () => {
    Alert.alert("Treino", "Iniciando treino!");
  };

  const handleAddNew = () => {
    console.log("Adicionar novo item");
  };

  const handleFilter = () => {
    setIsFilterVisible((prev) => !prev);
  };

  const handleGenericModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleHeaderIcon = () => {
    Alert.alert("Opções", "Menu de opções");
  };

  const handleTestOnboarding = () => {
    router.push("/onboarding");
  };

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
            {/* Cabeçalho */}
            <Header
              title="Home"
              subtitle="Bem-vindo ao seu treino"
              icon="more-vert"
              onIconPress={handleHeaderIcon}
            />

            {/* Botão de teste do Onboarding - REMOVER depois */}
            <Button
              title="Testar Onboarding"
              onPress={handleTestOnboarding}
              bgColor="#35e1ffff"
            />

            <View>
              <ProgressBar />
            </View>

            <WeeklyStreak />

            <WeightIn />

            <InputField
              icon="person"
              placeholder="Digite seu nome"
              value={nameValue}
              onChangeText={setNameValue}
            />

            <InputField
              icon="lock"
              placeholder="Digite sua senha"
              password={true}
              value={passwordValue}
              onChangeText={setPasswordValue}
            />

            <InputField placeholder="Email" keyboardType="email-address" />

            <Button title="Iniciar Treino" onPress={handleStartWorkout} />

            <View style={styles.smallButtonsRow}>
              <AddBtn onPress={handleAddNew} />
              <CheckBtn />
              <Favorite />
              <FilterBtn onPress={handleFilter} />

              <FilterModal
                isFilterVisible={isFilterVisible}
                filterTitle="Teste"
                onClose={handleFilter}
              >
                <Text>Olá</Text>
              </FilterModal>
            </View>

            <Button title="Abrir Modal Genérico" onPress={handleGenericModal} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal genérico */}
      <GenericModal isVisible={isModalVisible} onClose={handleGenericModal}>
        <Text style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>
          Modal Genérico
        </Text>
        <Text style={{ color: "#fff" }}>Este é um modal personalizável.</Text>
      </GenericModal>
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
});
