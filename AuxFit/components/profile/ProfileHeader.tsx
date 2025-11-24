import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface ProfileHeaderProps {
  userName: string;
  date: string;
  caloriesConsumed: number;
  caloriesGoal: number;
  waterConsumed: number;
  waterGoal: number;
  onLogout: () => void;
}

export default function ProfileHeader({
  userName,
  date,
  caloriesConsumed,
  caloriesGoal,
  waterConsumed,
  waterGoal,
  onLogout,
}: ProfileHeaderProps) {
  // Cálculo das porcentagens (limitadas a 100%)
  const caloriesPercent = caloriesGoal > 0 ? Math.min((caloriesConsumed / caloriesGoal) * 100, 100) : 0;
  const waterPercent = waterGoal > 0 ? Math.min((waterConsumed / waterGoal) * 100, 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Informações do usuário */}
        <View style={styles.userInfo}>
          {/* Nome + Logout */}
          <View style={styles.topRow}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{userName}</Text>
            </View>
            
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                <MaterialIcons name="logout" size={24} color={Colors.incorrect} />
            </TouchableOpacity>
          </View>

          {/* Data */}
          <Text style={styles.date}>{date}</Text>

          {/* Barras de Progresso */}
          <View style={styles.barsContainer}>
            
            {/* Barra de Calorias */}
            <View style={styles.progressRow}>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${caloriesPercent}%`,
                      backgroundColor: Colors.accent, 
                    },
                  ]}
                />
                <View style={styles.barContent}>
                  <MaterialIcons
                    name="local-fire-department"
                    size={12}
                    color="#000"
                  />
                  <Text style={styles.barValue}>
                    {Math.round(caloriesConsumed)}
                  </Text>
                </View>
              </View>
              <Text style={styles.barGoal}>{caloriesGoal} kcal / d</Text>
            </View>

            {/* Barra de Água */}
            <View style={styles.progressRow}>
              <View style={styles.barBackground}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${waterPercent}%`,
                      backgroundColor: Colors.secondary,
                    },
                  ]}
                />
                <View style={styles.barContent}>
                  <MaterialIcons name="water-drop" size={12} color="#000" />
                  <Text style={styles.barValue}>{waterConsumed}</Text>
                </View>
              </View>
              <Text style={styles.barGoalWater}>{waterGoal} ml / d</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  header: {
    flexDirection: "row",
    gap: Spacing.md,
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoutButton: {
    padding: 4,
  },
  userName: {
    ...Texts.title,
    color: Colors.text,
  },
  date: {
    ...Texts.subtext,
  },
  barsContainer: {
    marginTop: Spacing.sm,
    gap: 8,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  barBackground: {
    width: 120,
    height: 14,
    backgroundColor: Colors.bgLight,
    borderRadius: 20,
    overflow: "hidden",
  },
  barFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  barContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 4,
    zIndex: 1,
    height: "100%",
  },
  barValue: {
    ...Texts.bodyBold,
    fontSize: 10,
    color: "#000",
  },
  barGoal: {
    ...Texts.subtext,
    fontSize: 11,
    color: Colors.accent,
  },
  barGoalWater: {
    ...Texts.subtext,
    fontSize: 11,
    color: Colors.secondary,
  },
});