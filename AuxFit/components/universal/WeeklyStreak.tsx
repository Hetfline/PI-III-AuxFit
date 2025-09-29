// * Componente de streak semanal. Ele contém uma função do próprio Javascript que faz com que ele seja atualizado conforme o dia atual (função getDay() do objeto Date())

import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

// Array contendo o nome dos dias da semana
const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// A função Date.getDay() retorna um número de 0 a 6 (domingo é 0 e sábado é 6)
const currentDayIndex = new Date().getDay();

// Ajustamos o índice pra semana começar na segunda ao invés do domingo: Segunda (índice 0) a Domingo (índice 6).
const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;

export default function WeeklyStreak() {
  return (
    <View style={styles.container}>
      {/* Mapeia a lista de dias para renderizar cada um */}
      {daysOfWeek.map((day, index) => {
        // Verifica se o dia atual no loop é o dia de hoje, ajustando para começar na segunda-feira
        const isActive = index === adjustedDayIndex;

        return (
          <View style={styles.dayWrapper}>
            <View
              key={index}
              style={[
                styles.day,
                isActive && styles.activeDayContainer,
              , {marginBottom: Spacing.sm}]}
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
