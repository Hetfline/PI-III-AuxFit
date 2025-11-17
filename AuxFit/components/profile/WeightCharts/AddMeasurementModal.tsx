import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { styles } from '@/components/profile/WeightCharts/styles';
import { MetricConfig } from '@/components/profile/WeightCharts/types';

interface AddMeasurementModalProps {
  visible: boolean;
  metricConfig: MetricConfig;
  onClose: () => void;
  onSubmit: (value: number) => void;
}

/**
 * Modal component for adding a new measurement
 */
export const AddMeasurementModal: React.FC<AddMeasurementModalProps> = ({
  visible,
  metricConfig,
  onClose,
  onSubmit,
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const numValue = parseFloat(value);

    if (isNaN(numValue) || numValue <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido');
      return;
    }

    onSubmit(numValue);
    setValue('');
  };

  const handleClose = () => {
    setValue('');
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
          <Text style={styles.modalTitle}>Nova Medição - {metricConfig.label}</Text>

          <TextInput
            style={styles.input}
            placeholder={`Digite o valor em ${metricConfig.unit}`}
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
              <Text style={styles.confirmButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};