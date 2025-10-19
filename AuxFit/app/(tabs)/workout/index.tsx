import React, { useState, useRef } from 'react';
import { View, Animated, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { Colors, Spacing } from "@/constants/Styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../../components/universal/Background';
import TabSelector from '../../../components/universal/TabSelector';
import WorkoutSection from './WorkoutSection';
import ExerciseSection from './ExerciseSection';

const { width } = Dimensions.get("window");

export default function WorkoutScreen() {
  const [activeTab, setActiveTab] = useState<"treino" | "exercicios">("treino");
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabChange = (tab: "treino" | "exercicios") => {
    setActiveTab(tab);
    Animated.spring(translateX, {
      toValue: tab === "treino" ? 0 : -width,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Spacing.md }}>
      {/* Background decorativo */}
      <Background />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            {/* Seletor de abas */}
            <TabSelector activeTab={activeTab} onTabChange={handleTabChange} />

            {/* Conteúdo animado das abas */}
            <Animated.View
              style={{
                flexDirection: "row",
                width: width * 2, // duas abas lado a lado
                transform: [{ translateX }],
              }}
            >
              <View style={{ width }}>
                <WorkoutSection />
              </View>

              <View style={{ width }}>
                <ExerciseSection />
              </View>
            </Animated.View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
    
  },
});
