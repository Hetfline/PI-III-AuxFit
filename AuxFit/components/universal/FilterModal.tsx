// * Componente de modal do filtro de seleção. Esse modal permite que sejam passados props de título, estado de visibilidade (isVisible), um título e seu conteúdo interior (children). Ele usa o Modal da biblioteca react-native-modal ao invés do Modal padrão do react native, pois essa biblioteca permite mais estilos e ações
// TODO quando for criado os elementos que vão ser colocados no modal, é necessário editar o container de conteúdo para dar um espaçamento inferior

import { StyleSheet, Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ReactNode } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Texts } from "@/constants/Styles";

interface FilterModalProps {
  isFilterVisible: boolean;
  onClose: () => void;
  filterTitle: string;
  children: ReactNode; // "ReactNode" é o tipo para qualquer coisa que o React pode renderizar. Definimos o prop "children" com esse tipo pois o modal vai envolver outros elementos React Native
}

export default function FilterModal({
  isFilterVisible,
  onClose,
  filterTitle,
  children,
}: FilterModalProps) {
  return (
    <Modal
      animationIn="slideInUp"
      isVisible={isFilterVisible}
      onBackdropPress={onClose} // Fecha ao tocar no fundo
      style={styles.container}
    >
      <ScrollView style={styles.modalContent}>
        <View style={styles.modalTop}>
          <Text style={Texts.title}>{filterTitle}</Text>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={32}
            color={Colors.incorrect}
            onPress={onClose}
          />
        </View>
        <View style={styles.childrenContainer}>{children}</View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginHorizontal: 0 // por padrão, a biblioteca react-native-modal faz o modal ter margens laterais. Para ocupar a largura total, zeramos a margem aqui
  },
  modalContent: {
    width: "100%",
    height: "90%",
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 20,
  },
  modalTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  childrenContainer: {
    flex: 1,
    gap: Spacing.sm
  },
});
