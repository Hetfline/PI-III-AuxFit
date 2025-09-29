import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Text } from "@/components/Themed";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";
import FavoriteBtn from "@/components/universal/FavoriteBtn";
import Header from "@/components/universal/Header";
import CheckBtn from "@/components/universal/CheckBtn";
import WeeklyStreak from "@/components/universal/WeeklyStreak";
import AddBtn from "@/components/universal/AddBtn";
import FilterModal from "@/components/universal/FilterModal";
import FilterBtn from "@/components/universal/FilterBtn";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import GenericModal from "@/components/universal/GenericModal";
import WeightIn from "@/components/universal/WeightIn";
import ProgressBar from "@/components/questions/ProgressBar";
import HeightSelect from "@/components/questions/HeightSelect";

export default function DietScreen() {
  // * Os useStates que controlam estados de componentes devem estar presentes na TELA DE IMPORTAÇÃO!

  const [isVisible, setIsVisible] = useState(false); // muda o estado do componente de modal FilterModal
  const openModal = () => setIsVisible(true); // função para abrir o modal
  const closeModal = () => setIsVisible(false); // função para fechar o modal

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
        {/* <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        > */}
          <View style={styles.components}>
            <GenericModal isVisible={isVisible} onClose={closeModal}>
              <WeightIn />
            </GenericModal>
            <View style={{ margin: Spacing.md }}></View>
            <Button onPress={openModal} title="Abrir modal" />
            <View style={styles.progressContainer}>
              <ProgressBar />
            </View>
            <HeightSelect/>
          </View>
        {/* </ScrollView> */}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row", 
    width: "100%", 
  }
});
