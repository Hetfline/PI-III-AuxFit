import { View, StyleSheet, Text, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import CircularProgress from "react-native-circular-progress-indicator";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import Button from "../universal/Button"; // Certifique-se que este caminho está correto no seu projeto
import DropdownSelector from "../universal/DropdownSelector";

interface WaterProgressProps {
  currentWater: number;
  onAddWater: (amount: number) => Promise<void>; 
}

let cupVolume: number = 200;
let bottleVolume: number = 500;
let bigBottleVolume: number = 1000;
let maxWater: number = 3500;

export default function WaterProgress({ currentWater, onAddWater }: WaterProgressProps) {
  const [waterMeasure, setWaterMeasure] = useState(cupVolume);
  const [loading, setLoading] = useState(false);

  const data = [
    { label: "Copo (200ml)", value: cupVolume },
    { label: "Garrafa (500ml)", value: bottleVolume },
    { label: "Garrafa (1L)", value: bigBottleVolume },
  ];

  const activeProgressColor =
    currentWater > maxWater ? Colors.secondary : Colors.border;

  const progressMaxValue =
    currentWater > maxWater ? currentWater : maxWater;

  const handleAddWater = async (amount: number) => {
    setLoading(true);
    await onAddWater(amount);
    setLoading(false);
  };

  const handleRemoveWater = async (amount: number) => {
    if (currentWater <= 0) return;
    setLoading(true);
    await onAddWater(-amount);
    setLoading(false);
  };

  const handleDropdownChange = (value: number) => {
    setWaterMeasure(value);
  };

  const renderWaterIcon = (size = 24) => {
    switch (waterMeasure) {
      case bottleVolume:
      case bigBottleVolume:
        return (
          <FontAwesome6
            name="bottle-water"
            size={size}
            color={Colors.secondary}
            style={{ opacity: 0.8 }}
          />
        );
      case cupVolume:
      default:
        return (
          <MaterialCommunityIcons
            name="cup-water"
            size={size}
            color={Colors.secondary}
            style={{ opacity: 0.8 }}
          />
        );
    }
  };

  const totalIcons = Math.floor(currentWater / waterMeasure);
  
  // Aumentado para permitir muitas linhas (ex: 42 ícones = ~7 linhas)
  const iconsToRender = Math.min(totalIcons, 42); 
  const iconsArray = Array.from({ length: iconsToRender }, (_, i) => i);
  const shouldRenderPartialIcon = currentWater > 0 && totalIcons === 0;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressCircleContainer}>
          <CircularProgress
            value={currentWater}
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
              {currentWater} ml
            </Text>
          </View>
        </View>

        <View style={styles.waterLeftContainer}>
          <Text style={[Texts.bodyBold, { color: Colors.secondary }]}>
            {Math.max(0, Math.round(progressMaxValue - currentWater))}{" "}
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
                onPress={() => handleRemoveWater(waterMeasure)}
                hitSlop={10}
                disabled={loading}
                style={({pressed}) => ({
                    width: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed || loading ? 0.5 : 1,
                })}
                >
                {renderWaterIcon(24)}
                </Pressable>
            ))}

            {shouldRenderPartialIcon && (
                <Pressable
                key="partial-icon"
                onPress={() => handleRemoveWater(currentWater)}
                hitSlop={10}
                disabled={loading}
                style={({pressed}) => ({
                    width: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed || loading ? 0.5 : 1,
                    marginBottom: 6
                })}
                >
                {renderWaterIcon(18)}
                </Pressable>
            )}
        </View>
        
        {loading ? (
            <ActivityIndicator color={Colors.secondary} style={{ padding: 10 }} />
        ) : (
            <Button
            title="Adicionar"
            icon="add"
            onPress={() => handleAddWater(waterMeasure)}
            bgColor={Colors.secondary}
            color={Colors.text}
            />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 260, // Altura inicial mínima
    gap: Spacing.md,
    borderRadius: 20,
    padding: Spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Permite que os itens cresçam para baixo independentemente
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
    // sticky no topo se o container crescer muito
    marginTop: Spacing.sm, 
  },
  progressCircleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 130, 
    width: 130,
  },
  waterLeftContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  waterHistory: {
    justifyContent: "space-between",
    maxWidth: 180,
    width: 180,
    gap: Spacing.md,
  },
  measuresContainer: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    flexWrap: "wrap",
    maxWidth: 180,
    width: 180,
  },
});