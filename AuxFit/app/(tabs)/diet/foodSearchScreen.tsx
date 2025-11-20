import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  ActivityIndicator,
  Alert,
  Text
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import Background from "@/components/universal/Background";
import Header from "@/components/universal/Header";
import InputField from "@/components/universal/InputField";
import FoodCard from "@/components/diet/FoodCard";
import AddFoodModal from "@/components/diet/AddFoodModal";
import { api } from "@/services/api";
import getFormattedDate from "@/utils/getFormattedDate";

interface Food {
  id: number;
  nome: string;
  calorias: number;
  unidade_base: string;
}

export default function FoodSearchScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mealId = params.mealId ? Number(params.mealId) : null;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [allFoods, setAllFoods] = useState<Food[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados do Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const date = getFormattedDate();

  useEffect(() => {
    fetchFoods();
  }, []);

  // Filtro local
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFoods(allFoods);
    } else {
      const lowerTerm = searchTerm.toLowerCase();
      const filtered = allFoods.filter(food => 
        food.nome.toLowerCase().includes(lowerTerm)
      );
      setFilteredFoods(filtered);
    }
  }, [searchTerm, allFoods]);

  const fetchFoods = async () => {
    try {
      const data = await api.getFoods();
      setAllFoods(data);
      setFilteredFoods(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível carregar os alimentos.");
    } finally {
      setLoading(false);
    }
  };

  const handleFoodPress = (food: Food) => {
    setSelectedFood(food);
    setIsModalVisible(true);
  };

  const handleAddFood = async (quantity: number) => {
    if (!selectedFood || !mealId) return;

    try {
      await api.addFoodToMeal({
        refeicao_fk: mealId,
        alimento_fk: selectedFood.id,
        quantidade: quantity,
        unidade_medida: selectedFood.unidade_base // Usa a unidade base do alimento ou 'g'
      });
      
      Alert.alert("Sucesso", "Alimento adicionado!");
      router.back(); // Volta para a tela de dieta
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao adicionar alimento.");
    }
  };

  const renderItem = ({ item }: { item: Food }) => (
    <FoodCard
      name={item.nome}
      calories={item.calorias}
      baseUnit={item.unidade_base}
      onPress={() => handleFoodPress(item)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg, paddingHorizontal: Spacing.md }}>
      <Background />
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            
            {/* Header Fixo */}
            <View style={styles.headerContainer}>
                <Header
                    title={"Adicionar Alimento"}
                    subtitle={date}
                    backArrow
                    subtitleColor={Colors.text}
                />
                <View style={{ marginTop: Spacing.md }}>
                    <InputField 
                        placeholder="Pesquisar alimento..." 
                        icon="search"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>
            </View>

            {/* Lista com Scroll */}
            {loading ? (
                <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 40 }} />
            ) : (
                <FlatList
                    data={filteredFoods}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', color: Colors.subtext, marginTop: 20 }}>
                            Nenhum alimento encontrado.
                        </Text>
                    )}
                />
            )}
        </View>
      </KeyboardAvoidingView>

      {/* Modal de Quantidade */}
      {selectedFood && (
        <AddFoodModal
          visible={isModalVisible}
          foodName={selectedFood.nome}
          baseUnit={selectedFood.unidade_base}
          onClose={() => setIsModalVisible(false)}
          onSave={handleAddFood}
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  listContent: {
    paddingBottom: 24,
  },
});