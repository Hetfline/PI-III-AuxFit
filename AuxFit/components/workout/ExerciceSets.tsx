// * Componente de card de exercícios com séries e repetições. Recebe o prop de nome e quantidade de séries como prop.

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
  // ✅ ATUALIZADO: onSetCompletion agora passa o volume total do exercício.
  onSetCompletion: (exerciseId: number, count: number, volume: number) => void;
  onSetAdd: (exerciseId: number) => void;
}

// Nota: O estado inicial DEVE ter o mesmo número de sets que totalSets, ou ser adaptado
// para renderizar corretamente a proporção inicial.
const initialSets: SetItem[] = [
  { id: 1, set: 1, weight: 40, reps: 12, isDone: false },
  { id: 2, set: 2, weight: 40, reps: 10, isDone: false },
  { id: 3, set: 3, weight: 40, reps: 8, isDone: false },
  { id: 4, set: 4, weight: 40, reps: 6, isDone: false },
];

export default function ExerciseSets({
  name,
  totalSets,
  exerciseId,
  onSetCompletion,
  onSetAdd,
}: ExerciceSetsProps) {
  const [currentSet, setCurrentSet] = useState(0);
  const [sets, setSets] = useState<SetItem[]>(initialSets);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const completedSets = sets.filter((set) => set.isDone);
    const completedCount = completedSets.length;

    // ✅ CÁLCULO DO VOLUME
    const totalVolume = completedSets.reduce(
      (sum, set) => sum + set.weight * set.reps,
      0
    );

    setCurrentSet(completedCount);

    // ✅ Chamada com a contagem e o volume
    onSetCompletion(exerciseId, completedCount, totalVolume);
  }, [sets, exerciseId]);

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
      weight: lastExercice ? lastExercice.weight : 0,
      reps: lastExercice ? lastExercice.reps : 0,
      isDone: false,
    };

    setSets((prevSets) => [...prevSets, newExercice]);
    onSetAdd(exerciseId);
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
        {/* ... Conteúdo da Imagem (IMG) ... */}
        <View style={styles.imgContainer}>
          <Text>IMG</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={Texts.bodyBold}>{name}</Text>
              {/* ✅ Exibe a contagem ATUALIZADA de sets concluídos */}
              <Text style={[Texts.subtext, { color: Colors.secondary }]}>
                {currentSet} / {totalSets} Série(s)
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

      {/* Conteúdo Expansível (Séries) */}
      {isFocus &&
        sets.map((item) => (
          <View key={item.id}>
            <View style={styles.set}>
              <Text style={Texts.bodyBold}>{item.set}</Text>

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
                <Text style={Texts.body}>Repetições</Text>
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
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});