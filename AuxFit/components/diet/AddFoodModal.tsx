import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import InputField from "@/components/universal/InputField";
import Button from "@/components/universal/Button";

interface AddFoodModalProps {
  visible: boolean;
  foodName: string;
  baseUnit: string; // ex: "100g", "1un"
  onClose: () => void;
  onSave: (quantity: number) => void;
}

export default function AddFoodModal({
  visible,
  foodName,
  baseUnit,
  onClose,
  onSave,
}: AddFoodModalProps) {
  const [quantity, setQuantity] = useState("");

  const handleSave = () => {
    const qty = parseFloat(quantity);
    if (!qty || qty <= 0) return;

    onSave(qty);
    setQuantity(""); // Reset
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
              <Text
                style={[
                  Texts.subtitle,
                  { textAlign: "center", marginBottom: Spacing.xs },
                ]}
              >
                Adicionar Alimento
              </Text>
              <Text
                style={[
                  Texts.body,
                  {
                    textAlign: "center",
                    color: Colors.accent,
                    marginBottom: Spacing.lg,
                  },
                ]}
              >
                {foodName}
              </Text>

              <View style={{ gap: Spacing.md }}>
                <View>
                  <Text style={[Texts.subtext, { marginBottom: 5 }]}>
                    Quantidade (
                    {baseUnit.includes("g") || baseUnit.includes("ml")
                      ? "em gramas/ml"
                      : "unidades"}
                    )
                  </Text>
                  <InputField
                    placeholder="Peso"
                    icon="scale"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric"
                    autoFocus
                  />
                </View>

                <View style={{ marginTop: Spacing.sm }}>
                  <Button
                    title="Adicionar"
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
