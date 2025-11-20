import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBtn from "../universal/CheckBtn";
import Button from "../universal/Button";

interface SetItem {
  id: number;
  set: number;
  weight: number;
  reps: number;
  isDone: boolean;
}

interface ExerciceSetsProps {
  name: string;
  totalSets: number;
  exerciseId: number;
  targetReps: number;
  targetWeight: number;
  imageUrl?: string;
  
  onSetCompletion: (exerciseId: number, count: number, volume: number) => void;
  onSetAdd: (exerciseId: number) => void;
}

export default function ExerciseSets({
  name,
  totalSets,
  exerciseId,
  targetReps,
  targetWeight,
  imageUrl,
  onSetCompletion,
  onSetAdd,
}: ExerciceSetsProps) {
  
  const [sets, setSets] = useState<SetItem[]>(() => {
    const safeTotalSets = totalSets || 0;
    return Array.from({ length: safeTotalSets }, (_, i) => ({
      id: i + 1,
      set: i + 1,
      weight: targetWeight || 0,
      reps: targetReps || 0,
      isDone: false,
    }));
  });

  const [currentSet, setCurrentSet] = useState(0);
  const [isFocus, setIsFocus] = useState(true);

  useEffect(() => {
    const completedSets = sets.filter((set) => set.isDone);
    const completedCount = completedSets.length;

    const totalVolume = completedSets.reduce(
      (sum, set) => sum + set.weight * set.reps,
      0
    );

    setCurrentSet(completedCount);
    
    // --- CORREÇÃO DE SEGURANÇA ---
    // Verifica se a função existe antes de chamar para evitar o crash
    if (onSetCompletion) {
      onSetCompletion(exerciseId, completedCount, totalVolume);
    }
  }, [sets, exerciseId, onSetCompletion]); 

  const handleSetCheckBtnPress = (idDoSet: number) => {
    setSets((prevSets) =>
      prevSets.map((set) =>
        set.id === idDoSet ? { ...set, isDone: !set.isDone } : set
      )
    );
  };

  const handleBtnPress = () => {
    const lastExercice = sets[sets.length - 1];
    const newId = lastExercice ? lastExercice.id + 1 : 1;
    const newSet = lastExercice ? lastExercice.set + 1 : 1;

    const newExercice: SetItem = {
      id: newId,
      set: newSet,
      weight: lastExercice ? lastExercice.weight : targetWeight,
      reps: lastExercice ? lastExercice.reps : targetReps,
      isDone: false,
    };

    setSets((prevSets) => [...prevSets, newExercice]);
    
    if (onSetAdd) {
      onSetAdd(exerciseId);
    }
  };

  const handleArrowPress = () => {
    setIsFocus((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        hitSlop={15}
        onPress={handleArrowPress}
      >
        <View style={styles.imgContainer}>
          {imageUrl ? (
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.image} 
              resizeMode="cover" 
            />
          ) : (
            <Text style={{ fontSize: 10, color: Colors.bg, fontWeight: 'bold' }}>IMG</Text>
          )}
        </View>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={Texts.bodyBold}>{name}</Text>
              <Text style={[Texts.subtext, { color: Colors.secondary }]}>
                {currentSet} / {sets.length} Série(s)
              </Text>
            </View>
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
        sets.map((item) => (
          <View key={item.id}>
            <View style={styles.set}>
              <Text style={[Texts.bodyBold, { width: 20, textAlign: 'center' }]}>{item.set}</Text>

              <View style={styles.setInfoContainer}>
                <View style={styles.setInfo}>
                  <Text style={Texts.bodyBold}>{item.weight}</Text>
                </View>
                <Text style={Texts.body}>KG</Text>
              </View>

              <View style={styles.setInfoContainer}>
                <View style={styles.setInfo}>
                  <Text style={Texts.bodyBold}>{item.reps}</Text>
                </View>
                <Text style={Texts.body}>Reps</Text>
              </View>

              <CheckBtn
                onPress={() => handleSetCheckBtnPress(item.id)}
                isChecked={item.isDone}
                size={24}
                iconSize={18}
              />
            </View>
          </View>
        ))}
        
      {isFocus && (
        <View style={{ marginTop: Spacing.md }}>
          <Button
            title="Adicionar nova série"
            onPress={handleBtnPress}
            radius={10}
            icon="add"
            dashBorder
            borderColor={Colors.subtext}
            bgColor={Colors.bgMedium}
            color={Colors.subtext}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  pressableContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    gap: Spacing.sm,
  },
  set: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.bgLight,
    borderRadius: 10,
    padding: Spacing.sm,
    marginTop: Spacing.sm
  },
  setInfoContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  setInfo: {
    backgroundColor: Colors.border,
    paddingHorizontal: Spacing.xs,
    borderRadius: 5,
    minWidth: 40,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});