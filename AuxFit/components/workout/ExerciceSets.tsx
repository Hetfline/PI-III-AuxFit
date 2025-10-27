import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import CheckBtn from "../universal/CheckBtn";
import Button from "../universal/Button";

interface ExerciceSetsProps {
  name: string;
  totalSets: number;
}

const initialSets = [
  { id: 1, set: 1, weight: 40, reps: 12 },
  { id: 2, set: 2, weight: 40, reps: 10 },
  { id: 3, set: 3, weight: 40, reps: 8 },
  { id: 4, set: 4, weight: 40, reps: 6 },
];

export default function ExerciseSets({ name, totalSets }: ExerciceSetsProps) {
  const [currentSet, setCurrentSet] = useState(0);
  const [sets, setSets] = useState(initialSets);
  const [isFocus, setIsFocus] = useState(false); // state para lidar com o estado do componente (aberto e fechado)

  const handleArrowPress = () => {
    setIsFocus((prev) => !prev);
  };

  const handleBtnPress = () => {
    const lastExercice = sets[sets.length - 1]; // Última série

    const newId = lastExercice ? lastExercice.id + 1 : 1; // ID da série a ser adicionada
    const newSet = lastExercice ? lastExercice.set + 1 : 1; // Número da série a ser adicionada

    // Cria o novo objeto a ser adicionado no array. Mantendo 'weight' e 'reps' como valores padrão/mock para o novo set.
    const newExercice = {
      id: newId,
      set: newSet,
      weight: lastExercice ? lastExercice.weight : 0,
      reps: lastExercice ? lastExercice.reps : 0,
    };

    // 3. Atualiza o estado de forma IMUTÁVEL
    setSets((prevSets) => [...prevSets, newExercice]);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.pressableContainer}
        hitSlop={15}
        onPress={handleArrowPress}
      >
        <View style={styles.imgContainer}>
          <Text>IMG</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={Texts.bodyBold}>{name}</Text>
              <Text style={[Texts.subtext, { color: Colors.secondary }]}>
                {currentSet} / {totalSets} Série(s)
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-down"
              size={24}
              color={Colors.text}
              style={isFocus && { transform: [{ rotate: "180deg" }] }}
            />
          </View>
        </View>
      </Pressable>

      {isFocus &&
        sets.map((item) => (
          <View key={item.id} style={styles.setsContainer}>
            <View style={styles.set}>
              <Text style={Texts.bodyBold}>{1}</Text>
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

              <CheckBtn onPress={() => null} size={24} iconSize={18} />
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
  },
  setsContainer: {
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
