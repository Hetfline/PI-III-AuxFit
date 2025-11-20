import { useState, useEffect } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBtn from "../universal/CheckBtn";
import AddBtn from "../universal/AddBtn";
import ProgressBar from "../universal/ProgressBar";

export interface FoodDisplayItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

interface MealProps {
  name: string;
  metaCalories?: number; // Nova prop para a meta definida pelo usuário
  foodItems: FoodDisplayItem[];
  increaseLogs: () => void;
  decreaseLogs: () => void;
  onPress: () => void;
  onAddFood: () => void;
  onFoodPress?: (item: FoodDisplayItem) => void;
  onEdit?: () => void; // Nova prop para abrir o modal de edição
  isCompleted: boolean;
}

export default function Meal({
  name,
  metaCalories = 0,
  foodItems = [],
  increaseLogs,
  decreaseLogs,
  onPress,
  onAddFood,
  onFoodPress,
  onEdit,
  isCompleted = false,
}: MealProps) {
  
  // Total calculado pela soma dos alimentos (o que tem dentro da marmita)
  const sumFoodCalories = foodItems.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  // O total visual para a barra de progresso é a Meta (se existir) ou a Soma (fallback)
  const totalForProgress = metaCalories > 0 ? metaCalories : (sumFoodCalories > 0 ? sumFoodCalories : 1);

  const [currentCalories, setCurrentCalories] = useState(0);
  const [isMealCompleted, setIsMealCompleted] = useState(isCompleted);
  const [isFocus, setIsFocus] = useState(false);

  // Sincroniza quando a prop isCompleted muda
  useEffect(() => {
    setIsMealCompleted(isCompleted);
    if (isCompleted) {
      // Se está completo, "enche" a barra até o total de alimentos
      setCurrentCalories(sumFoodCalories);
    } else {
      setCurrentCalories(0);
    }
  }, [isCompleted, sumFoodCalories]);

  const handleCheckBtnPress = () => {
    if (!isMealCompleted) {
      setIsMealCompleted(true);
      setCurrentCalories(sumFoodCalories);
      increaseLogs();
    } else {
      setIsMealCompleted(false);
      setCurrentCalories(0);
      decreaseLogs();
    }
  };

  const handleFoodQuantityPress = () => {
    setIsFocus((prev) => !prev);
  };

  const renderIcon = () => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("café") || lowerName.includes("cafe")) 
      return <MaterialIcons name="local-cafe" size={36} color={Colors.warning} />;
    if (lowerName.includes("almoço") || lowerName.includes("almoco")) 
      return <MaterialIcons name="restaurant" size={36} color={Colors.correct} />;
    if (lowerName.includes("lanche")) 
      return <MaterialCommunityIcons name="food-apple" size={36} color={Colors.incorrect} />;
    if (lowerName.includes("jantar")) 
      return <MaterialIcons name="soup-kitchen" size={36} color={Colors.warning} />;
    if (lowerName.includes("ceia")) 
      return <MaterialIcons name="nightlight" size={36} color={Colors.secondary} />;
    
    return <MaterialIcons name="fastfood" size={36} color={Colors.warning} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {renderIcon()}

        <Pressable style={styles.progressContainer} onPress={onPress}>
          <View style={styles.progressText}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <Text style={Texts.bodyBold}>{name}</Text>
                {/* Ícone de Lápis para Editar (só aparece se a função for passada) */}
                {onEdit && (
                    <Pressable onPress={onEdit} hitSlop={15}>
                        <MaterialCommunityIcons name="pencil" size={16} color={Colors.primary} />
                    </Pressable>
                )}
            </View>
            
            {/* Texto de calorias: Soma Atual / Meta (ou Soma Total se não houver meta) */}
            <Text style={[Texts.subtext, {color: Colors.text}]}>
                {Math.round(isMealCompleted ? sumFoodCalories : 0)} / {Math.round(metaCalories > 0 ? metaCalories : sumFoodCalories)} kcal
            </Text>
          </View>

          <ProgressBar 
            progress={currentCalories} 
            total={totalForProgress} 
            fillColor={Colors.warning} 
            progressTextColor={Colors.bg}
          />
        </Pressable>

        <CheckBtn
          size={32}
          onPress={handleCheckBtnPress}
          isChecked={isMealCompleted}
        />
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

      {isFocus && (
        <>
          {foodItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.food}
              onPress={() => onFoodPress && onFoodPress(item)}
            >
              <View style={{ flex: 1 }}>
                <Text style={[Texts.subtext, { color: Colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[Texts.subtext, { color: Colors.correct }]}>
                  {item.quantity}g
                </Text>
              </View>

              <Text
                style={[
                  Texts.subtextBold,
                  { color: Colors.text, textAlign: "right" },
                ]}
              >
                {Math.round(item.calories)} kcal
              </Text>
              
              <MaterialIcons
                name="arrow-right"
                size={24}
                color={Colors.primary}
              />
            </Pressable>
          ))}

          {foodItems.length === 0 && (
            <Text style={[Texts.subtext, { textAlign: 'center', padding: 10, color: Colors.subtext }]}>
                Nenhum alimento adicionado.
            </Text>
          )}

          <View style={{ alignItems: 'flex-end', marginTop: Spacing.sm, width: '100%' }}>
             <AddBtn onPress={onAddFood} size={24} />
          </View>
        </>
      )}
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
    width: '100%',
  },
  progressContainer: {
    flex: 1,
    flexShrink: 1,
    gap: Spacing.xs,
    marginHorizontal: Spacing.xs,
  },
  progressText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'baseline',
    marginBottom: 2,
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