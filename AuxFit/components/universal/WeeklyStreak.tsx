// * Componente de streak semanal. Ele contém uma função do próprio Javascript que faz com que ele seja atualizado conforme o dia atual (função getDay() do objeto Date())

import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const currentDayIndex = new Date().getDay();
const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

export default function WeeklyStreak() {
  return (
    <View style={styles.container}>
      {daysOfWeek.map((day, index) => {
        const isActive = index === adjustedDayIndex;

        return (
          <View key={index} style={styles.dayWrapper}>
            <View
              style={[
                styles.day,
                isActive && styles.activeDayContainer,
                {marginBottom: Spacing.sm}
              ]}
            >
              {isActive && <MaterialIcons name="check" size={24} color={Colors.bg} />}
            </View>
            <Text style={[Texts.subtext, isActive && styles.activeDayText]}>
              {day}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayWrapper: {
    width: Spacing.xl,
    justifyContent: 'center',
    alignItems: 'center'
  },
  day: {
    width: Spacing.lg,
    height: Spacing.lg,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.subtext,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDayContainer: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary
  },
  activeDayText: {
    color: Colors.primary,
  },
});