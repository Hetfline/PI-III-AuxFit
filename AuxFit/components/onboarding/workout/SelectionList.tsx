import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

// Define o formato de uma opção
export interface OptionItem {
  id: string;
  label: string;
  description?: string;
  icon?: string; // Nome do ícone do MaterialCommunityIcons
  color?: string; // Cor do ícone
}

interface SelectionListProps {
  options: OptionItem[];
  selectedIds: string | string[]; // Pode ser uma string (único) ou array (múltiplo)
  onSelect: (id: string) => void;
  variant?: 'card' | 'tag'; // 'card' = estilo antigo (grande), 'tag' = estilo novo (pequeno)
  multiSelect?: boolean; // Permite selecionar vários?
}

export default function SelectionList({
  options,
  selectedIds,
  onSelect,
  variant = 'card',
  multiSelect = false,
}: SelectionListProps) {

  const isSelected = (id: string) => {
    if (multiSelect && Array.isArray(selectedIds)) {
      return selectedIds.includes(id);
    }
    return selectedIds === id;
  };

  return (
    <View style={[styles.container, variant === 'tag' && styles.containerTags]}>
      {options.map((item) => {
        const selected = isSelected(item.id);

        // --- RENDERIZAÇÃO TIPO TAG (Pequeno, lado a lado) ---
        if (variant === 'tag') {
          return (
            <Pressable
              key={item.id}
              style={[
                styles.tagOption,
                selected && styles.optionSelected
              ]}
              onPress={() => onSelect(item.id)}
            >
              {/* Se tiver ícone na tag, mostra pequeno */}
              {item.icon && (
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={18}
                  color={selected ? Colors.primary : Colors.subtext}
                  style={{ marginRight: 6 }}
                />
              )}
              <Text style={[
                styles.tagTitle, 
                selected && { color: Colors.text }
              ]}>
                {item.label}
              </Text>
            </Pressable>
          );
        }

        // --- RENDERIZAÇÃO TIPO CARD (Grande, com descrição) ---
        return (
          <Pressable
            key={item.id}
            style={[
              styles.cardOption,
              selected && styles.optionSelected
            ]}
            onPress={() => onSelect(item.id)}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={(item.icon || 'circle-outline') as any}
                size={32}
                color={item.color || (selected ? Colors.primary : '#FFF')}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>{item.label}</Text>
              {item.description && (
                <Text style={styles.cardDescription}>{item.description}</Text>
              )}
            </View>
            {selected && (
               <View style={styles.checkIcon}>
                  <MaterialCommunityIcons name="check-circle" size={24} color={Colors.primary} />
               </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    width: '100%',
    marginTop: 20,
  },
  containerTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // ou 'flex-start'
    gap: 10,
  },
  
  // --- Estilos Card ---
  cardOption: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 85,
    backgroundColor: '#17181C',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4D4D4D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
  textContainer: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    ...Texts.bodyBold,
    fontSize: 16,
    color: Colors.text,
  },
  cardDescription: {
    ...Texts.subtext,
    fontSize: 13,
    lineHeight: 18,
  },
  checkIcon: {
    marginLeft: 4,
  },

  // --- Estilos Tag ---
  tagOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17181C',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#4D4D4D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // Tamanho mínimo para toque fácil
    minHeight: 44, 
  },
  tagTitle: {
    ...Texts.body, // Fonte normal
    fontSize: 14,
    color: Colors.subtext,
  },

  // --- Estado Selecionado (Comum) ---
  optionSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(24, 200, 100, 0.05)', // Leve fundo verde opcional
  },
});