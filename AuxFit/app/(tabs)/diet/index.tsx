import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { Text } from "@/components/Themed";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import FavoriteBtn from "@/components/universal/FavoriteBtn";
import Header from "@/components/universal/Header";
import CheckBtn from "@/components/universal/CheckBtn";
import WeeklyStreak from "@/components/universal/WeeklyStreak";
import AddBtn from "@/components/universal/AddBtn";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";

export default function DietScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        paddingHorizontal: Spacing.md,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.components}>
            <InputField icon="person" placeholder="Nome" password={false} />
            <View style={{ margin: Spacing.md }}></View>
            <InputField icon="lock" placeholder="Senha" password={true} />
            <View style={{ margin: Spacing.md }}></View>
            <Button title="Teste" icon={true} />
            <View style={{ margin: Spacing.md }}></View>
            <FavoriteBtn />
            <View style={{ margin: Spacing.md }}></View>
            <CheckBtn />
            <View style={{ margin: Spacing.md }}></View>
            <Header
              title="Titulo"
              subtitle="Subtitulo"
              subtitleColor={Colors.accent}
              timer={true}
              icon="more-vert"
              iconColor={Colors.subtext}
            />
            <View style={{ margin: Spacing.md }}></View>
            <WeeklyStreak />
            <View style={{ margin: Spacing.md }}></View>
            <AddBtn/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.md,
  },
  inputs: {
    justifyContent: "space-evenly",
    width: "100%",
  },
  components: {
    alignItems: "center",
    justifyContent: "center",
  },
});
