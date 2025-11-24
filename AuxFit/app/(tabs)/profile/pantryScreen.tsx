import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Background from '@/components/universal/Background';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';
import Header from '@/components/universal/Header';
import InputField from '@/components/universal/InputField';
import { api } from '@/services/api';

export default function PantryScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadPantry = async () => {
    try {
      setLoading(true);
      const data = await api.getPantry(); // Busca da API atualizada
      setItems(data || []);
    } catch (error) {
      console.log("Erro ao carregar despensa", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPantry();
  }, []);

  const handleRemove = async (id: number) => {
    try {
        await api.removeFromPantry(id);
        // Atualiza lista localmente para ser rápido
        setItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
        Alert.alert("Erro", "Não foi possível remover o item.");
    }
  };

  // Filtragem local
  const filteredItems = items.filter(item => 
    item.alimentos?.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Background />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Header title='Despensa' backArrow/>
          <View style={{gap: Spacing.md, marginHorizontal: Spacing.sm}}>
            <InputField 
                icon='search' 
                placeholder='Pesquisar'
                value={search}
                onChangeText={setSearch}
            />
            
            <View style={{gap: Spacing.sm}}>
              {loading ? (
                 <ActivityIndicator color={Colors.primary} />
              ) : filteredItems.length === 0 ? (
                 <Text style={[Texts.subtext, {textAlign: 'center'}]}>
                    Sua despensa está vazia. Adicione itens através das refeições!
                 </Text>
              ) : (
                filteredItems.map((item) => (
                  <Pressable key={item.id} style={styles.pantryItem}>
                    <View>
                        <Text style={Texts.body}>{item.alimentos?.nome}</Text>
                        
                    </View>
                    <Pressable onPress={() => handleRemove(item.id)} hitSlop={10}>
                        <MaterialIcons name="close" size={24} color={Colors.incorrect} />
                    </Pressable>
                  </Pressable>
                ))
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: Spacing.sm,
    marginTop: Spacing.lg,
    gap: Spacing.lg
  },
  pantryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.subtext + '40', // Transparência
  },
});