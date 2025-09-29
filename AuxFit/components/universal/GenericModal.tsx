// * Componente de modal genérico. Além dos props padrão de modal (booleano que define a visualização do modal e função para fechar), o componente espera um conteúdo para envolver
// TODO diminuir o tamanho do container do modal

import { StyleSheet, Pressable } from "react-native";
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
      onBackdropPress={onClose} // Fecha ao tocar no fundo
      style={styles.container}
    >
      <Pressable>
        {children}
        </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgLight,
    borderRadius: 20,
  },
  modalContent: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
