import React, { useState } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface CreateMealModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { nome: string; horario: string; tipo_refeicao: string }) => void;
}

export default function CreateMealModal({
  visible,
  onClose,
  onSave,
}: CreateMealModalProps) {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");

  const handleSave = () => {
    if (!nome.trim()) return;

    // Lógica simples para definir o tipo exigido pelo banco baseado no nome
    // Se não casar com nada, define como 'lanche'
    let tipo = 'lanche';
    const lowerName = nome.toLowerCase();

    if (lowerName.includes('café') || lowerName.includes('manhã')) tipo = 'cafe_da_manha';
    else if (lowerName.includes('almoço')) tipo = 'almoco';
    else if (lowerName.includes('jantar') || lowerName.includes('janta')) tipo = 'jantar';
    else if (lowerName.includes('ceia')) tipo = 'ceia';
    else if (lowerName.includes('pre') || lowerName.includes('pré')) tipo = 'pre_treino';
    else if (lowerName.includes('pos') || lowerName.includes('pós')) tipo = 'pos_treino';

    onSave({
      nome,
      horario: horario || "00:00",
      tipo_refeicao: tipo
    });

    // Limpa campos
    setNome("");
    setHorario("");
    onClose();
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
              <Text style={[Texts.subtitle, { marginBottom: Spacing.lg, textAlign: 'center' }]}>
                Nova Refeição
              </Text>

              <View style={{ gap: Spacing.md }}>
                <InputField
                  placeholder="Nome (ex: Café da Tarde)"
                  icon="restaurant"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="sentences"
                />

                <InputField
                  placeholder="Horário (ex: 16:00)"
                  icon="access-time"
                  value={horario}
                  onChangeText={setHorario}
                  keyboardType="numbers-and-punctuation"
                />

                <View style={{ marginTop: Spacing.sm }}>
                  <Button 
                    title="Criar Refeição" 
                    onPress={handleSave} 
                    bgColor={Colors.primary}
                  />
                  <View style={{ height: 10 }} />
                  <Button 
                    title="Cancelar" 
                    onPress={onClose} 
                    bgColor="transparent" 
                    color={Colors.subtext}
                    borderColor={Colors.subtext}
                    dashBorder
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
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.md,
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.bg,
    borderRadius: 20,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});