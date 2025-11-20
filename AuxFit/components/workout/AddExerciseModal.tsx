import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface AddExerciseModalProps {
  visible: boolean;
  exerciseName: string;
  onClose: () => void;
  onSave: (data: { series: number; repeticoes: number; carga: number; descanso: number }) => void;
}

export default function AddExerciseModal({
  visible,
  exerciseName,
  onClose,
  onSave,
}: AddExerciseModalProps) {
  const [series, setSeries] = useState("4");
  const [reps, setReps] = useState("12");
  const [carga, setCarga] = useState("0");
  const [descanso, setDescanso] = useState("60");

  const handleSave = () => {
    const s = parseInt(series);
    const r = parseInt(reps);
    const c = parseFloat(carga); // Carga pode ser decimal
    const d = parseInt(descanso);

    if (!s || !r) {
      Alert.alert("Erro", "Séries e repetições são obrigatórios.");
      return;
    }

    onSave({
      series: s,
      repeticoes: r,
      carga: isNaN(c) ? 0 : c,
      descanso: isNaN(d) ? 60 : d,
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text style={[Texts.subtitle, { marginBottom: Spacing.sm, textAlign: 'center' }]}>
                Configurar Exercício
              </Text>
              <Text style={[Texts.body, { marginBottom: Spacing.lg, textAlign: 'center', color: Colors.accent }]}>
                {exerciseName}
              </Text>

              <View style={{ gap: Spacing.md }}>
                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <InputField placeholder="Séries" icon="repeat" value={series} onChangeText={setSeries} keyboardType="numeric" />
                    </View>
                    <View style={{flex: 1}}>
                        <InputField placeholder="Reps" icon="fitness-center" value={reps} onChangeText={setReps} keyboardType="numeric" />
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <InputField placeholder="Carga" icon="scale" value={carga} onChangeText={setCarga} keyboardType="numeric" />
                    </View>
                    <View style={{flex: 1}}>
                        <InputField placeholder="Descanso (s)" icon="timer" value={descanso} onChangeText={setDescanso} keyboardType="numeric" />
                    </View>
                </View>

                <View style={{ marginTop: Spacing.sm }}>
                  <Button title="Adicionar ao Treino" onPress={handleSave} bgColor={Colors.primary} />
                  <View style={{ height: 10 }} />
                  <Button title="Cancelar" onPress={onClose} bgColor={Colors.incorrect} color={Colors.bg}/>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    padding: Spacing.md,
  },
  modalContent: {
    backgroundColor: Colors.bg,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.md
  }
});