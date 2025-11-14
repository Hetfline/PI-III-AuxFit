// * Componente de pesagem. Gerencia a pesagem do usuário.
// TODO conectar ao backend futuramente

import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Button from "./Button";

export default function WeightIn() {
  const [weight, setWeight] = useState(95);
  let formattedWeight = weight.toLocaleString('pt-BR', { // por padrão, o separador é o ponto final, e para trocar para a vírgula precisamos usar essa função para "localizar" o valor
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
  const addWeight = () => setWeight(weight + 0.1);
  const removeWeight = () => setWeight(weight - 0.1);

  return (
    <View style={styles.container}>
      <Text style={Texts.title}>Peso</Text>
      <Text style={Texts.body}>
        Objetivo: <Text style={[Texts.body, { color: Colors.correct }]}>90,0 Kg</Text>
      </Text>

      <View style={styles.weightControls}>
        <Pressable onPress={removeWeight}>
          <MaterialIcons
          name="remove-circle-outline"
          size={32}
          color={Colors.incorrect}
        />
        </Pressable>
        <Text style={Texts.subtitle}>
          Peso:{" "}
          <Text style={[Texts.subtitle, { color: Colors.correct }]}>
            {formattedWeight}
          </Text>
        </Text>
        <Pressable onPress={addWeight}>
          <MaterialIcons
            name="add-circle-outline"
            size={32}
            color={Colors.primary}
          />
        </Pressable>
      </View>
      <Button title="Adicionar" onPress={() => null} icon="add"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing.md
  },
  weightControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.md
  },
});
