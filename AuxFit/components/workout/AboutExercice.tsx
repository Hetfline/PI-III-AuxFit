// * Componente híbrido de informaçõe sobre exercício e execução de exercício 

import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface AboutExerciceProps {
  about?: boolean;
}

export default function AboutExercice({ about }: AboutExerciceProps) {
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
      <View
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
          <Pressable hitSlop={15} onPress={handleArrowPress}>
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
          </Pressable>
        </View>
      </View>

      {isFocus && about && (
        <Text style={Texts.body}>
          Exercício clássico de peito, realizado deitado em banco reto,
          utilizando barra. Trabalha principalmente o peitoral maior, além de
          deltoides anteriores e tríceps. É um dos movimentos básicos de força e
          hipertrofia para a parte superior do corpo.
        </Text>
      )}
      {isFocus && !about && (
        <Text style={Texts.body}>
          1. Deite-se no banco reto e posicione os pés firmes no chão.{"\n"}
          2. Segure a barra com pegada um pouco maior que a largura dos ombros.{" "}
          {"\n"}
          3. Retire a barra do suporte e mantenha os braços estendidos acima do
          peito. {"\n"}
          4. Desça a barra de forma controlada até encostar levemente no meio do
          peito.{"\n"}
          5. Empurre a barra para cima até estender completamente os braços
          novamente.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.bgLight,
    borderRadius: 10,
    borderLeftWidth: 2,
    gap: Spacing.md
  },
});
