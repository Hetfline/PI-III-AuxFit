// * Componente de refeição. Recebe o valor de nome da refeição totais como props.
// TODO adicionar funcionalidade de renderizar os alimentos com base nos dados puxados do banco

import { useState } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBtn from "../universal/CheckBtn";

// interface FoodItem {
//   id: number;
//   name: string;
//   quantity: string;
//   calories: string
// }

interface MealProps {
  name: string;
  increaseLogs: () => void
  decreaseLogs: () => void
}

// * Dados mockados para renderizar os componentes
const foodItems = [
  { id: 1, name: "Alimento 1", quantity: "150g", calories: 357 },
  { id: 2, name: "Alimento 2", quantity: "100g", calories: 120 },
  { id: 3, name: "Alimento 3", quantity: "50g", calories: 50 },
];

const totalFoodCalories = foodItems.reduce(
  (sum, item) => sum + item.calories,
  0
);

export default function Meal({ name, increaseLogs, decreaseLogs }: MealProps) {
  const [isMealCompleted, setIsMealCompleted] = useState(false);
  const [currentCalories, setCurrentCalories] = useState(0);
  const [isFocus, setIsFocus] = useState(false); // state para lidar com o estado do componente (aberto e fechado)
  const [isBtnChecked, setIsBtnChecked] = useState(false)

  const handleCheckBtnPress = () => {
    if (!isMealCompleted) {
      setIsMealCompleted((prev) => !prev);
      setIsBtnChecked((prev) => !prev);
      setCurrentCalories(totalFoodCalories);
      increaseLogs()
    } else {
      setIsMealCompleted((prev) => !prev);
      setIsBtnChecked((prev) => !prev);
      setCurrentCalories(0);
      decreaseLogs()
    }
  };

  const handleFoodQuantityPress = () => {
    setIsFocus((prev) => !prev);
  };

  const renderIcon = () => {
    switch (name) {
      case "Café da manhã":
        return (
          <MaterialIcons name="local-cafe" size={36} color={Colors.warning} />
        );
      case "Almoço":
        return (
          <MaterialIcons name="restaurant" size={36} color={Colors.correct} />
        );
      case "Lanche":
        return (
          <MaterialCommunityIcons
            name="food-apple"
            size={36}
            color={Colors.incorrect}
          />
        );
      case "Jantar":
        return (
          <MaterialIcons name="soup-kitchen" size={36} color={Colors.warning} />
        );
      case "Ceia":
        return (
          <MaterialIcons name="nightlight" size={36} color={Colors.secondary} />
        );
      default:
        return (
          <MaterialIcons name="fastfood" size={36} color={Colors.warning} />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {renderIcon()}

        <View style={styles.progressContainer}>
          <View style={styles.progressText}>
            <Text style={Texts.bodyBold}>{name}</Text>
            <Text style={Texts.body}>
              {currentCalories} / {totalFoodCalories}
            </Text>
          </View>

          {/* Barra de progresso */}
          <View
            style={[
              styles.progressBarContainer,
              {
                backgroundColor: isMealCompleted
                  ? Colors.warning
                  : Colors.border,
              },
            ]}
          >
            <View
              style={[
                styles.progressBar,
                {
                  width: `0%`,
                  backgroundColor: Colors.warning,
                },
              ]}
            >
              <Text style={{ color: Colors.warning }}>a</Text>
            </View>
          </View>
        </View>

        <CheckBtn size={32} onPress={handleCheckBtnPress} isChecked={isBtnChecked}/>
      </View>

      <Pressable
        style={styles.foodQuantityContainer}
        onPress={handleFoodQuantityPress}
      >
        <View style={styles.foodQuantity}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[Texts.subtextBold, { color: Colors.secondary }]}>
              {foodItems.length}
            </Text>
            <Text style={Texts.subtext}> </Text>
            <Text style={[Texts.subtext, { color: Colors.text }]}>items</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color={Colors.text}
            style={isFocus && { transform: [{ rotate: "180deg" }] }}
          />
        </View>
      </Pressable>

      {isFocus &&
        foodItems.map((item) => (
          <Pressable
            key={item.id} // * nunca se pode esquecer de colocar a chave de cada item individual quando se faz um map()
            style={styles.food}
          >
            <View style={{ flex: 1 }}>
              <Text style={[Texts.subtext, { color: Colors.text }]}>
                {item.name}
              </Text>
              <Text style={[Texts.subtext, { color: Colors.correct }]}>
                {item.quantity}
              </Text>
            </View>

            <Text
              style={[
                Texts.subtextBold,
                { color: Colors.text, textAlign: "right" },
              ]}
            >
              {item.calories} kcal
            </Text>
            <MaterialIcons
              name="arrow-right"
              size={24}
              color={Colors.primary}
            />
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bgMedium,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
    paddingHorizontal: Spacing.sm,
    gap: Spacing.md,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressContainer: {
    flexGrow: 1,
    gap: Spacing.xs,
    height: 40,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBarContainer: {
    borderRadius: 100,
    flexDirection: "row",
    height: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 100,
  },
  foodQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  foodQuantity: {
    marginLeft: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  food: {
    marginLeft: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderColor: Colors.subtext,
  },
});
