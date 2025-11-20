import React, { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView, Pressable } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface ManageWorkoutModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: { nome: string; duracao: number; areas_foco: string[] }) => void;
  initialData?: { nome: string; duracao: number; areas_foco?: string[] } | null;
}

// Lista fixa de áreas para seleção manual
const POSSIBLE_FOCUS_AREAS = [
  "Peito", "Costas", "Pernas", "Quadríceps", "Posterior", 
  "Glúteos", "Ombro", "Bíceps", "Tríceps", "Abdômen", 
  "Cardio", "Full Body"
];

export default function ManageWorkoutModal({
  visible,
  onClose,
  onSave,
  initialData,
}: ManageWorkoutModalProps) {
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setNome(initialData.nome);
        setDuracao(initialData.duracao.toString());
        setSelectedAreas(initialData.areas_foco || []);
      } else {
        setNome("");
        setDuracao("");
        setSelectedAreas([]);
      }
    }
  }, [visible, initialData]);

  const handleSave = () => {
    if (!nome.trim()) return; 
    
    onSave({
      nome,
      duracao: parseInt(duracao) || 0,
      areas_foco: selectedAreas,
    });
    onClose();
  };

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
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
                {initialData ? "Editar Treino" : "Novo Treino"}
              </Text>

              <View style={{ gap: Spacing.md }}>
                <InputField
                  placeholder="Nome do treino"
                  icon="edit"
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="sentences"
                />

                <InputField
                  placeholder="Duração estimada"
                  icon="timer"
                  value={duracao}
                  onChangeText={setDuracao}
                  keyboardType="numeric"
                />

                <View>
                  <Text style={[Texts.bodyBold, { marginBottom: Spacing.xs }]}>
                    Foco do Treino:
                  </Text>
                  <View style={styles.tagsContainer}>
                    {POSSIBLE_FOCUS_AREAS.map(area => {
                      const isSelected = selectedAreas.includes(area);
                      return (
                        <Pressable
                          key={area}
                          onPress={() => toggleArea(area)}
                          style={[
                            styles.tag,
                            isSelected ? styles.tagSelected : styles.tagUnselected
                          ]}
                        >
                          <Text style={[
                            Texts.subtext, 
                            { color: isSelected ? Colors.bg : Colors.text }
                          ]}>
                            {area}
                          </Text>
                        </Pressable>
                      )
                    })}
                  </View>
                </View>

                <View style={{ marginTop: Spacing.sm }}>
                  <Button 
                    title="Salvar" 
                    onPress={handleSave} 
                    bgColor={Colors.primary}
                  />
                  <View style={{ height: 10 }} />
                  <Button 
                    title="Cancelar" 
                    onPress={onClose} 
                    bgColor={Colors.incorrect}
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  tagUnselected: {
    backgroundColor: 'transparent',
    borderColor: Colors.border,
  }
});