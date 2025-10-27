// * Componente de círculo de progressão para exibir a quantidade de água ingerida. Recebe o valor da quantidade de água ingerida.

import { View, StyleSheet, Text, Pressable } from "react-native";
import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import Button from "../universal/Button";
import DropdownSelector from "../universal/DropdownSelector";

interface WaterProgressProps {
  currentWater: number;
}
let cupVolume: number = 200;
let bottleVolume: number = 500;
let bigBottleVolume: number = 1000;
let maxWater: number = 3500;

export default function WaterProgress({ currentWater }: WaterProgressProps) {
  const [currentWaterProgress, setCurrentWaterProgress] = useState(currentWater);
  const [waterMeasure, setWaterMeasure] = useState(cupVolume);

  // * Mocks para o componente de dropdown
  const data = [
    { label: "Copo (200ml)", value: cupVolume },
    { label: "Garrafa (500ml)", value: bottleVolume },
    { label: "Garrafa (1L)", value: bigBottleVolume },
  ];

  // Variável para determinar a cor ativa da barra de progresso
  const activeProgressColor =
    currentWaterProgress > maxWater ? Colors.secondary : Colors.border;

  const progressMaxValue =
    currentWaterProgress > maxWater ? currentWaterProgress : maxWater;

  const addWater = (volumeToAdd: number) => {
    setCurrentWaterProgress((prev) => prev + volumeToAdd);
  };

  const removeWater = (volumeToRemove: number) => {
    setCurrentWaterProgress((prev) => Math.max(0, prev - volumeToRemove)); // Garante que não seja negativo
  };

  const handleDropdownChange = (value: number) => {
    setWaterMeasure(value);
  };

  const renderWaterIcon = (size = 24) => {
    switch (waterMeasure) {
      case bottleVolume:
        return (
          // Usando ícone de garrafa, e ajustando o tamanho dinamicamente
          <FontAwesome6
            name="bottle-water"
            size={size} // ✨ Tamanho dinâmico
            color={Colors.secondary}
          />
        );
      case bigBottleVolume:
        return (
          <FontAwesome6
            name="bottle-water"
            size={size} // ✨ Tamanho dinâmico
            color={Colors.secondary}
          />
        );
      case cupVolume:
      default:
        return (
          <MaterialCommunityIcons
            name="cup-water"
            size={size} // ✨ Tamanho dinâmico
            color={Colors.secondary}
          />
        );
    }
  };

  const totalIcons = Math.floor(currentWaterProgress / waterMeasure);
  const iconsArray = Array.from({ length: totalIcons }, (_, i) => i);

  // Variável para determinar se devemos renderizar um ícone parcial
  const shouldRenderPartialIcon = currentWaterProgress > 0 && totalIcons === 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleContainer}>
          <CircularProgress
            value={currentWaterProgress}
            maxValue={progressMaxValue}
            showProgressValue={false}
            radius={65}
            activeStrokeWidth={12}
            inActiveStrokeWidth={12}
            circleBackgroundColor={"transparent"}
            activeStrokeColor={Colors.secondary}
            inActiveStrokeColor={activeProgressColor}
            progressValueColor={Colors.text}
          />
          <View style={styles.calories}>
            <MaterialIcons
              name="water-drop"
              size={24}
              color={Colors.secondary}
            />
            <Text style={[Texts.bodyBold, { color: Colors.text }]}>
              {currentWaterProgress} ml
            </Text>
          </View>
        </View>

        <View style={styles.waterLeftContainer}>
          <Text style={[Texts.bodyBold, { color: Colors.secondary }]}>
            {Math.round(progressMaxValue - currentWaterProgress)}{" "}
            <MaterialIcons
              name="water-drop"
              size={16}
              color={Colors.secondary}
            />
          </Text>

          <Text style={[Texts.bodyBold, { color: Colors.secondary }]}>
            Restantes
          </Text>
        </View>
      </View>

      <View style={styles.waterHistory}>
        <DropdownSelector
          placeholder="Copo (200ml)"
          data={data}
          onValueChange={handleDropdownChange}
          initialValue={waterMeasure}
        />

        <View style={styles.measuresContainer}>
          {iconsArray.map((index) => (
            <Pressable
              key={index}
              onPress={() => removeWater(waterMeasure)}
              hitSlop={15}
              style={{
                width: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {renderWaterIcon(24)}
            </Pressable>
          ))}

          {/* RENDERIZA O ÍCONE PARCIAL (se houver consumo, mas menos que a medida) */}
          {shouldRenderPartialIcon && (
            <Pressable
              key="partial-icon"
              onPress={() => removeWater(currentWaterProgress)}
              hitSlop={15}
              style={{
                width: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Renderiza o ícone com o tamanho menor (12) */}
              {renderWaterIcon(18)}
            </Pressable>
          )}
        </View>
        <Button
          title="Adicionar"
          icon="add"
          onPress={() => addWater(waterMeasure)}
          bgColor={Colors.secondary}
          color={Colors.text}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
    backgroundColor: Colors.bgMedium,
    borderRadius: 20,
    padding: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  calories: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    alignItems: "center",
    gap: Spacing.md,
  },
  progressCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 130, // radius (65 * 2 = 130)
    width: 130,
    alignSelf: "flex-start",
  },
  waterLeftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  waterHistory: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: Spacing.sm,
    maxWidth: 180,
    width: 180,
    gap: Spacing.md,
  },
  measuresContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    flexWrap: "wrap",
    maxWidth: 180,
    width: 180,
  },
});
