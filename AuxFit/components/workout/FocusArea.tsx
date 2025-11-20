import { Colors, Spacing, Texts } from "@/constants/Styles";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

interface FocusAreaProps {
  focusArea: string;
  imageUrl?: string | null;
  isSelected: boolean;
  onPress: (area: string) => void;
}

export default function FocusArea({ focusArea, imageUrl, isSelected, onPress }: FocusAreaProps) {
  return (
    <Pressable
      style={[styles.container, isSelected ? styles.borderOn : styles.borderOff]}
      onPress={() => onPress(focusArea)}
    >
      <View style={styles.content}>
        <Text style={Texts.bodyBold}>{focusArea}</Text>
        <View style={styles.imgContainer}>
          {imageUrl ? (
            <Image 
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={{ fontSize: 10, color: Colors.bg, fontWeight: 'bold' }}>IMG</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.bgLight,
    //flex: 1, // Removido flex:1 para não esticar demais se houver poucos itens na linha
    borderRadius: 10,
    minWidth: '100%', // Ocupa aprox metade da largura no modal
    marginBottom: 8
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  borderOn: {
    borderWidth: 2, // Ajustei para 2px para ficar mais elegante
    borderColor: Colors.accent,
  },
  borderOff: {
    borderWidth: 2,
    borderColor: Colors.bgLight, // Borda transparente ou igual ao fundo
  },
});