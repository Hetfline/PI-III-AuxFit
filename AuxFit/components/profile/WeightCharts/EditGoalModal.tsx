import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from '@/components/profile/WeightCharts/styles';

interface EditGoalModalProps {
  visible: boolean;
  currentGoal: number;
  onClose: () => void;
  onSubmit: (value: number) => void;
}

/**
 * Modal component for editing weight goal
 */
export const EditGoalModal: React.FC<EditGoalModalProps> = ({
  visible,
  currentGoal,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState(currentGoal.toString());

  useEffect(() => {
    setValue(currentGoal.toString());
  }, [currentGoal]);

  const handleSubmit = () => {
    const numValue = parseFloat(value);

    if (isNaN(numValue) || numValue <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    onSubmit(numValue);
  };

  const handleClose = () => {
    setValue(currentGoal.toString());
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Meta de Peso</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite a meta em kg"
            placeholderTextColor="#6B7280"
            keyboardType="decimal-pad"
            value={value}
            onChangeText={setValue}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.confirmButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};