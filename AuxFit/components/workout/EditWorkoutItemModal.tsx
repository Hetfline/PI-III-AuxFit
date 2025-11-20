import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface WorkoutItem {
  id: number;
  series: number;
  repeticoes: number;
  carga: number;
  descanso_segundos: number;
  exercicios: { 
    nome_exercicio: string;
  };
}

interface EditWorkoutItemModalProps {
  visible: boolean;
  item: WorkoutItem;
  onClose: () => void;
  onSave: (id: number, data: { series: number; repeticoes: number; carga: number; descanso: number }) => void;
  onDelete: (id: number) => void;
}

export default function EditWorkoutItemModal({
  visible,
  item,
  onClose,
  onSave,
  onDelete,
}: EditWorkoutItemModalProps) {
  const [series, setSeries] = useState("");
  const [reps, setReps] = useState("");
  const [carga, setCarga] = useState("");
  const [descanso, setDescanso] = useState("");

  // Preenche os campos quando o modal abre
  useEffect(() => {
    if (visible && item) {
      setSeries(item.series.toString());
      setReps(item.repeticoes.toString());
      setCarga(item.carga.toString());
      setDescanso(item.descanso_segundos.toString());
    }
  }, [visible, item]);

  const handleSave = () => {
    const s = parseInt(series);
    const r = parseInt(reps);
    const c = parseFloat(carga);
    const d = parseInt(descanso);

    if (!s || !r) {
      Alert.alert("Erro", "Séries e repetições são obrigatórios.");
      return;
    }

    onSave(item.id, {
      series: s,
      repeticoes: r,
      carga: isNaN(c) ? 0 : c,
      descanso: isNaN(d) ? 60 : d,
    });
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
        "Remover Exercício",
        "Tem certeza que deseja remover este exercício do treino?",
        [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Remover", 
                style: "destructive", 
                onPress: () => {
                    onDelete(item.id);
                    onClose();
                } 
            }
        ]
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text style={[Texts.subtitle, { marginBottom: Spacing.sm, textAlign: 'center' }]}>
                Editar Exercício
              </Text>
              <Text style={[Texts.body, { marginBottom: Spacing.lg, textAlign: 'center', color: Colors.accent }]}>
                {item.exercicios.nome_exercicio}
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
                        <InputField placeholder="Carga (kg)" icon="scale" value={carga} onChangeText={setCarga} keyboardType="numeric" />
                    </View>
                    <View style={{flex: 1}}>
                        <InputField placeholder="Descanso (s)" icon="timer" value={descanso} onChangeText={setDescanso} keyboardType="numeric" />
                    </View>
                </View>

                <View style={{ marginTop: Spacing.sm }}>
                  <Button 
                    title="Salvar Alterações" 
                    onPress={handleSave} 
                    bgColor={Colors.primary} 
                  />
                  <View style={{ height: 10 }} />
                  <Button 
                    title="Remover do Treino" 
                    onPress={handleDelete} 
                    bgColor={Colors.incorrect}
                    color={Colors.bg}
                  />
                  <View style={{ height: 10 }} />
                   <Button 
                    title="Cancelar" 
                    onPress={onClose} 
                    bgColor="transparent" 
                    color={Colors.subtext}
                    dashBorder
                    borderColor={Colors.subtext}
                  />
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