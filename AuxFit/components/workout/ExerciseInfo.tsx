// * Componente híbrido de informações sobre exercício e execução de exercício 

import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ExerciseInfoProps {
  about?: boolean;
  description?: string;
  steps?: string;
}

export default function ExerciseInfo({ about, description, steps }: ExerciseInfoProps) {
  const [isFocus, setIsFocus] = useState(false);

  const handleArrowPress = () => {
    setIsFocus((prev) => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        { borderLeftColor: about ? Colors.secondary : Colors.correct },
      ]}
    >
      <Pressable 
        onPress={handleArrowPress}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            Texts.subtitle,
            { color: about ? Colors.secondary : Colors.correct },
          ]}
        >
          {about ? "Sobre o exercício" : "Como executar"}
        </Text>
        <View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={32}
            color={about ? Colors.secondary : Colors.primary}
            style={
              isFocus && {
                transform: [{ rotate: "180deg" }],
              }
            }
          />
        </View>
      </Pressable>

      {isFocus && about && (
        <Text style={[Texts.body, { marginTop: Spacing.sm }]}>
          {description || "Descrição não disponível."}
        </Text>
      )}
      
      {isFocus && !about && (
        <Text style={[Texts.body, { marginTop: Spacing.sm }]}>
           {steps || "Passo a passo não disponível."}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, // Removi flex:1 para não esticar desnecessariamente se estiver dentro de ScrollView
    width: '100%',
    padding: Spacing.md,
    backgroundColor: Colors.bgLight,
    borderRadius: 10,
    borderLeftWidth: 2,
    // gap: Spacing.md // Gap removido pois aplicamos margin no texto condicional
  },
});