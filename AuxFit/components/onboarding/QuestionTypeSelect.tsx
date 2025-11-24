import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";

// Certifique-se que esses caminhos de imagem existem
const WorkoutEnabled = require("@/assets/icons/bottomTabBar/iconsEnabled/workoutEnabled.png");
const DietEnabled = require("@/assets/icons/bottomTabBar/iconsEnabled/dietEnabled.png");

interface QuestionTypeSelectProps {
  selectedPath: string | null;
  onSelect: (path: string) => void;
}

export default function QuestionTypeSelect({
  selectedPath,
  onSelect,
}: QuestionTypeSelectProps) {
  return (
    <View style={styles.container}>
      <View style={styles.optionsContainer}>
        
        {/* Opção TREINO */}
        <Pressable
          style={[
            styles.option,
            styles.optionTreino,
            selectedPath === "workout" && styles.optionTreinoSelected,
          ]}
          onPress={() => onSelect("workout")} // ID padronizado
        >
          <Image
            source={WorkoutEnabled}
            style={styles.tabIcon}
            resizeMode="contain"
          />
          <Text style={[
            styles.optionText, 
            selectedPath === "workout" && { color: Colors.accent }
          ]}>Treino</Text>
        </Pressable>

        {/* Opção DIETA */}
        <Pressable
          style={[
            styles.option,
            styles.optionDieta,
            selectedPath === "diet" && styles.optionDietaSelected,
          ]}
          onPress={() => onSelect("diet")} // ID padronizado
        >
          <Image
            source={DietEnabled}
            style={styles.tabIcon}
            resizeMode="contain"
          />
          <Text style={[
            styles.optionText,
            selectedPath === "diet" && { color: Colors.primary }
          ]}>Dieta</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 24, // Reduzi um pouco o gap para caber melhor em telas menores
    justifyContent: 'center'
  },
  option: {
    flex: 1,
    minHeight: 140,
    paddingVertical: 24,
    paddingHorizontal: 10,
    backgroundColor: "#17181C",
    borderWidth: 1,
    borderColor: "transparent", // Borda padrão transparente
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  optionTreino: {
    borderRadius: 40, // Arredondado diferente propositalmente
    borderTopRightRadius: 10,
  },
  optionDieta: {
    borderRadius: 40,
    borderTopLeftRadius: 10,
  },
  optionTreinoSelected: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(255, 107, 53, 0.1)', // Fundo leve laranja
  },
  optionDietaSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(33, 150, 243, 0.1)', // Fundo leve azul/primary
  },
  optionText: {
    ...Texts.bodyBold,
    fontSize: 16,
    color: Colors.subtext,
  },
  tabIcon: {
    width: 32,
    height: 32,
  },
});