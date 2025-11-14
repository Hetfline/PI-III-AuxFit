// * Componente de notificação toast. Permite que sejam passados vários props que definem a mensagem, a visibilidade, a função para esconder e o tipo de notificação ("error", "success" e "warning").
// TODO PRECISAR CRIAR A FUNCIONALIDADE DE EDITAR O TREINO!!!

import React from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

interface WorkoutCardProps {
  title: string;
  focusAreas: string;
  duration: number;
  numExercises: number;
  editable?: boolean;
  onPress: () => void;
}

export default function WorkoutCard({
  title,
  focusAreas,
  duration,
  numExercises,
  editable,
  onPress,
}: WorkoutCardProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.topContent}>
        <View>
          <Text style={Texts.bodyBold}>{title}</Text>
          <Text style={[Texts.subtext, { color: Colors.accent }]}>
            {focusAreas}
          </Text>
        </View>

        {editable && (
          <Pressable>
            <MaterialCommunityIcons
              name="pencil"
              size={24}
              color={Colors.primary}
            />
          </Pressable>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <MaterialIcons name="alarm" size={18} color={Colors.warning} />
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {duration} min
          </Text>
        </View>
        <View style={styles.info}>
          <MaterialCommunityIcons
            name="dumbbell"
            size={18}
            color={Colors.secondary}
          />
          <Text style={[Texts.subtext, { color: Colors.text }]}>
            {numExercises} exercícios
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.bgMedium,
    flex: 1,
    borderRadius: 10,
    gap: Spacing.md,
  },
  topContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    // backgroundColor: Colors.secondary
  },
  infoContainer: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  info: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
});
