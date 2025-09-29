// * Componente de modal genérico. Além dos props padrão de modal (booleano que define a visualização do modal e função para fechar), o componente espera um conteúdo para envolver
// TODO diminuir o tamanho do container do modal

import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { ReactNode } from "react";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface GenericModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function GenericModal({
  isVisible,
  onClose,
  children,
}: GenericModalProps) {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.bgLight,
    borderRadius: 20,
    padding: Spacing.lg,
    width: '90%',
  },
});