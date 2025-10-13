import React from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, StyleSheet, Text } from "react-native";
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
import MacrosTable from "@/components/diet/MacrosTable";
import MacroDonutChart from "@/components/diet/MacroDonutChart";
import MacroTableLegend from "@/components/diet/MacroTableLegend";
import MacrosProgress from "@/components/diet/MacrosProgress";
import WaterProgress from "@/components/diet/WaterProgress";

export default function HomeScreen() {
  const router = useRouter();

  const handleTestOnboarding = () => {
    router.push("/onboarding");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        
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
            {/* <Header
              title="Home"
              subtitle="Bem-vindo ao seu treino"
              icon="more-vert"
              onIconPress={handleHeaderIcon}
            />

            <Button
              title="Testar Onboarding"
              onPress={handleTestOnboarding}
              bgColor={Colors.secondary}
            />
          </View>
        </View>

            <Button title="Abrir Modal Genérico" onPress={handleGenericModal} /> */}

            <MacrosTable
              calories={calories}
              protein={macros.protein}
              carbs={macros.carbs}
              fats={macros.fats}
            />
            <View style={styles.macrosContainer}>
              <MacroTableLegend
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />
              <MacroDonutChart
                protein={macros.protein}
                carbs={macros.carbs}
                fats={macros.fats}
              />
            </View>

            <MacrosProgress
              calories={calories}
              logs={2}
              caloriesIngested={1200}
              protein={macros.protein}
              carbs={macros.carbs}
              fats={macros.fats}
            />

            <WaterProgress currentWater={0}/>
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
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  title: {
    ...Texts.title,
    fontSize: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    width: '100%',
    maxWidth: 300,
  },
});