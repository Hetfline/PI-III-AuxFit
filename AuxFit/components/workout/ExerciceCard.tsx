import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { useState } from "react";

interface ExerciceSetsProps {
  name: string;
  focusArea: string;
  imageUrl?: string | null; // Nova prop opcional
  totalSets?: number;
  totalReps?: number;
  pressable?: boolean;
  onPress?: () => void;
}

export default function ExerciseCard({
  name,
  totalSets,
  totalReps,
  focusArea,
  imageUrl,
  pressable,
  onPress,
}: ExerciceSetsProps) {
  const [isFocus, setIsFocus] = useState(false);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    // Se for apenas para navegação, talvez não precise do setIsFocus,
    // mas mantive para preservar sua lógica original.
    if (pressable) {
      setIsFocus((prev) => !prev);
    }
  };

  return (
    <Pressable
      style={[
        styles.container,
        (pressable && isFocus) ? { borderColor: Colors.accent } : null,
      ]}
      hitSlop={15}
      onPress={handlePress}
    >
      <View style={styles.imgContainer}>
        {imageUrl ? (
          <Image 
            source={{ uri: imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.placeholderText}>IMG</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.infoContainer}>
          <View>
            <Text style={Texts.bodyBold} numberOfLines={2}>{name}</Text>
            <Text style={[Texts.subtext, { color: Colors.accent }]}>
              {focusArea}
            </Text>
            {totalSets && totalReps && (
              <Text style={[Texts.subtext, { color: Colors.secondary }]}>
                {`${totalSets} Séries x ${totalReps} Repetições`}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
    flexDirection: "row",
    alignItems: 'center'
  },
  infoContainer: {
    alignItems: "flex-start",
    flex: 1,
  },
  imgContainer: {
    width: 50,
    height: 50,
    backgroundColor: Colors.text, // Cor de fundo se não houver imagem
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    overflow: 'hidden', // Importante para a imagem respeitar a borda
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    color: Colors.bg,
    fontWeight: 'bold',
    fontSize: 10
  }
});