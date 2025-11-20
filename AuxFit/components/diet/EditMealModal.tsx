import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface EditMealModalProps {
  visible: boolean;
  meal: { id: number; nome: string; horario?: string; meta_calorias?: number; tipo_refeicao?: string } | null;
  onClose: () => void;
  onSave: (id: number, data: { nome: string; horario: string; meta_calorias: number; tipo_refeicao: string }) => void;
  onDelete: (id: number) => void;
}

export default function EditMealModal({
  visible,
  meal,
  onClose,
  onSave,
  onDelete,
}: EditMealModalProps) {
  const [nome, setNome] = useState("");
  const [horario, setHorario] = useState("");
  const [metaCalorias, setMetaCalorias] = useState("");

  useEffect(() => {
    if (visible && meal) {
      setNome(meal.nome);
      setHorario(meal.horario || "");
      setMetaCalorias(meal.meta_calorias ? meal.meta_calorias.toString() : "");
    }
  }, [visible, meal]);

  const handleSave = () => {
    if (!nome.trim() || !meal) return;

    // Lógica simples para manter ou atualizar o tipo
    let tipo = meal.tipo_refeicao || 'lanche';
    // Se quiser re-inferir o tipo baseado no novo nome, pode adicionar a lógica aqui

    onSave(meal.id, {
      nome,
      horario: horario || "00:00",
      meta_calorias: parseFloat(metaCalorias) || 0,
      tipo_refeicao: tipo
    });
    onClose();
  };

  const handleDelete = () => {
    if (!meal) return;
    Alert.alert(
      "Excluir Refeição",
      `Tem certeza que deseja excluir "${meal.nome}"? Isso apagará todos os alimentos registrados nela.`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive", 
          onPress: () => {
            onDelete(meal.id);
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
              <Text style={[Texts.subtitle, { marginBottom: Spacing.lg, textAlign: 'center' }]}>
                Editar Refeição
              </Text>

              <View style={{ gap: Spacing.md }}>
                <InputField
                  placeholder="Nome (ex: Café da Tarde)"
                  icon="restaurant"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="sentences"
                />

                <View style={{ flexDirection: 'row', gap: Spacing.md }}>
                    <View style={{ flex: 1 }}>
                        <InputField
                        placeholder="Horário"
                        icon="access-time"
                        value={horario}
                        onChangeText={setHorario}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputField
                        placeholder="Meta (kcal)"
                        icon="flag" // ícone de meta
                        value={metaCalorias}
                        onChangeText={setMetaCalorias}
                        keyboardType="numeric"
                        />
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
                    title="Excluir Refeição" 
                    onPress={handleDelete} 
                    bgColor="transparent" 
                    color={Colors.incorrect}
                    borderColor={Colors.incorrect}
                    dashBorder
                    icon="delete"
                  />
                  <View style={{ height: 10 }} />
                  <Button 
                    title="Cancelar" 
                    onPress={onClose} 
                    bgColor="transparent" 
                    color={Colors.subtext} 
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