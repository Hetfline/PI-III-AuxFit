import React from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '../../../components/universal/Background';

export default function WorkoutScreen() {
  return (
    <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.bg,
            paddingHorizontal: Spacing.md,
          }}
        >
          {/* Background com linhas decorativas */}
          <Background />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
            >
              
                <View style={styles.content}>
          <Text style={Texts.title}>🏋️ Workout Screen</Text>
          <Text style={Texts.subtitle}>Seus treinos personalizados</Text>
        </View>
                
              
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});