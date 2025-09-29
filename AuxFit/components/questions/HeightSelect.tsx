import { useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const DATA = Array.from({ length: 100 }, (_, i) => i + 1);

export default function HeightSelect() {
  const flatListRef = useRef<FlatList<number>>(null);
  
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={DATA}
        keyExtractor={(item) => item.toString()}
        snapToInterval={68}
        snapToAlignment="center"
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        style={styles.flatListContainer}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer}>
            <Text style={styles.itemText}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContainer: {
    height: 256, // Altura fixa de 256px
  },
  contentContainer: {
    paddingHorizontal: 100,
  },
  itemContainer: {
    width: 60,
    height: 68, // Altura fixa de 68px para cada elemento
    marginVertical: 0, // Removido margin para manter altura exata
    borderRadius: 30,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
});