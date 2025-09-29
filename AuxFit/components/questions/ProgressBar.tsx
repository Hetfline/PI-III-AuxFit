import { StyleSheet, Text, View } from "react-native";
import { Colors, Texts, Spacing } from "@/constants/Styles";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProgressBar() {
let questionQuantity = 6;
  const [progress, setProgress] = useState( 100 / questionQuantity);
  const [questionNumber, setQuestionNumber] = useState(1)

  return (
    <View style={styles.container}>
      <MaterialIcons name="first-page" size={32} color={Colors.text}/>
      <View style={styles.bar}>
        <View style={[styles.progress, { width: `${progress * questionNumber}%` }]}><Text style={{color: Colors.secondary}}>a</Text></View>
      </View>
      <Text style={Texts.bodyBold}>{questionNumber} / {questionQuantity}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    gap: Spacing.sm,
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.bgLight,
    height: "100%",
    borderRadius: 100,
    overflow: "hidden", // pra barra de progresso não atravessar essa barra de container
  },
  progress: {
    backgroundColor: Colors.secondary,
    borderRadius: 100,
  },
});
