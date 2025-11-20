// * Componente de dropdown. Permite que sejam passados vários props que definem o seu placeholder, os seus dados, se haverá uma barra de pesquisa ou não, a função para quando o valor for mudado e o seu valor inicial como props.

import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors, Spacing, Texts } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

// * Precisamos criar uma interface para poder passar ela como o tipo da prop "data", que será o array de dados do dropdown
interface DropdownItem {
  label: string; // O que será exibido no dropdown
  value: string | number; // O valor interno do item
}

interface DropdownSelectorProps {
  placeholder?: string;
  data: DropdownItem[];
  search?: boolean;
  onValueChange: (value: number) => void;
  initialValue?: number;
}

export default function DropdownSelector({
  placeholder,
  data,
  search,
  onValueChange,
  initialValue,
}: DropdownSelectorProps) {
  const [value, setValue] = useState(initialValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: Colors.text }]}
      placeholderStyle={[styles.placeholderStyle, Texts.body]}
      selectedTextStyle={[styles.selectedTextStyle, Texts.body]}
      inputSearchStyle={[styles.inputSearchStyle, Texts.body]}
      itemContainerStyle={styles.dropdownItem}
      containerStyle={styles.flatlistContainer}
      iconStyle={styles.iconStyle}
      itemTextStyle={[
        Texts.body,
        styles.dropdownItemText,
        isFocus && { color: Colors.text },
      ]}
      flatListProps={{ contentContainerStyle: styles.flatlist }}
      data={data}
      search={search}
      showsVerticalScrollIndicator={false}
      autoScroll={false}
      activeColor={Colors.correct}
      maxHeight={135}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder="Pesquisar..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        const selectedValue =
          typeof item.value === "string" ? parseInt(item.value) : item.value;
        setValue(item.value);
        setIsFocus(false);
        onValueChange(selectedValue);
      }}
      renderRightIcon={() => (
        <MaterialIcons
          style={[
            styles.icon,
            isFocus && { transform: [{ rotate: "270deg" }] },
          ]}
          color={Colors.primary}
          name="arrow-right"
          size={24}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    flex: 1,
    height: 48,
    maxHeight: 50,
    backgroundColor: Colors.bgLight,
    borderColor: Colors.border,
    borderWidth: 0.5,
    borderRadius: 40,
    paddingHorizontal: Spacing.sm,
  },
  dropdownItem: {
    borderRadius: 40,
    
    marginVertical: 2,
    borderWidth: 0,
    backgroundColor: Colors.border
  },
  dropdownItemText: {
    color: Colors.text,
  },
  flatlistContainer: {
    marginTop: Spacing.xs,
    backgroundColor: Colors.bgLight,
    borderRadius: 12,
    padding: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  flatlist: {
    backgroundColor: Colors.bgLight,
    borderRadius: 12,
    borderWidth: 0,
    borderColor: Colors.border,
    gap: Spacing.xs,
  },
  icon: {
    transform: [{ rotate: "90deg" }],
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
