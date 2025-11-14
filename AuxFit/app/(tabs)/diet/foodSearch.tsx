// * Tela de pesquisa de alimento.
// TODO modificar a forma que os elementos são renderizados para quando o backend for feito e adicionar funcionalidade de pesquisa.

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import Header from "@/components/universal/Header";
import InputField from "@/components/universal/InputField";
import getFormattedDate from "@/utils/getFormattedDate";
import FilterBtn from "@/components/universal/FilterBtn";
import FoodHistory from "@/components/diet/FoodHistory";
import FilterModal from "@/components/universal/FilterModal";

export default function foodSearch() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  let date = getFormattedDate();

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
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.scrollContent}>
            <Header
              title={"Café da manhã"}
              subtitle={date}
              backArrow
              subtitleColor={Colors.text}
            />

            <View style={{ flexDirection: "row", gap: Spacing.lg }}>
              <InputField placeholder="Pesquisar" icon="search" />
              <FilterBtn onPress={() => setIsFilterVisible((prev) => !prev)} />
            </View>

            {/* // Container do histórico de alimentos */}
            {/* // TODO adicionar funcionalidade de histórico de alimentos */}
            <View style={{ gap: Spacing.sm }}>
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
            </View>

            <FilterModal filterTitle="Alimentos" isFilterVisible={isFilterVisible} onClose={() => setIsFilterVisible(false)}>
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
              <FoodHistory onPress={() => null} />
            </FilterModal>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 24,
    gap: Spacing.xl,
  },
});
