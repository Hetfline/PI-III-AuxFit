import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MacroDonutChart from '@/components/diet/MacroDonutChart';
import { Colors, Spacing, Texts } from '@/constants/Styles';

// Mock data - depois vem do backend
const mockItems = [
  { id: '1', name: 'Ovos', category: 'Proteína' },
  { id: '2', name: 'Farinha', category: 'Carboidrato' },
  { id: '3', name: 'Presunto', category: 'Proteína' },
];

export default function DietTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(mockItems);

  // Dados de macros mockados
  const macros = {
    protein: 20,
    carbs: 50,
    fats: 30,
  };

  const handleAddItem = () => {
    console.log('Adicionar item');
    // TODO: Abrir modal para adicionar item
  };

  const handleItemAction = (itemId: string, action: 'edit' | 'delete') => {
    console.log(`${action} item ${itemId}`);
    if (action === 'delete') {
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Despensa Card */}
      <TouchableOpacity style={styles.despensaCard}>
        <View style={styles.despensaLeft}>
          <View style={styles.iconContainer}>
            <Ionicons name="fast-food-outline" size={24} color={Colors.accent} />
          </View>
          <Text style={styles.despensaTitle}>Despensa</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.primary} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.subtext} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar"
            placeholderTextColor={Colors.subtext}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Items List */}
      <View style={styles.itemsList}>
        {filteredItems.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.itemActions}>
              <TouchableOpacity
                onPress={() => handleItemAction(item.id, 'edit')}
                style={styles.actionButton}
              >
                <Ionicons name="shuffle-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleItemAction(item.id, 'delete')}
                style={styles.actionButton}
              >
                <Ionicons name="close" size={20} color={Colors.incorrect} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Macros Section */}
      <View style={styles.macrosSection}>
        <Text style={styles.macrosTitle}>Divisão total de macronutrientes</Text>
        
        <View style={styles.macrosContent}>
          <View style={styles.macrosLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.correct }]} />
              <Text style={styles.legendText}>Proteínas: {macros.protein}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.secondary }]} />
              <Text style={styles.legendText}>Carboidratos: {macros.carbs}%</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: Colors.warning }]} />
              <Text style={styles.legendText}>Gorduras: {macros.fats}%</Text>
            </View>
          </View>

          <MacroDonutChart
            protein={macros.protein}
            carbs={macros.carbs}
            fats={macros.fats}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 15,
    flex: 1,
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  
  // Despensa Card
  despensaCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgMedium,
    padding: Spacing.md,
    borderRadius: 12,
  },
  despensaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.bg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  despensaTitle: {
    fontSize: 18,
    fontFamily: 'MontserratSemiBold',
    color: Colors.text,
  },

  // Search
  searchContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgMedium,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'MontserratRegular',
    color: Colors.text,
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.bgMedium,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Items List
  itemsList: {
    gap: Spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bgMedium,
  },
  itemName: {
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    color: Colors.text,
  },
  itemActions: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    padding: 4,
  },

  // Macros Section
  macrosSection: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
  },
  macrosTitle: {
    fontSize: 16,
    fontFamily: 'MontserratBold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  macrosContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
  },
  macrosLegend: {
    flex: 1,
    gap: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    color: Colors.text,
  },
});