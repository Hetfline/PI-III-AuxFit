import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '../../../components/universal/Button';
import AddBtn from '../../../components/universal/AddBtn';
import CheckBtn from '../../../components/universal/CheckBtn';
import Favorite from '../../../components/universal/FavoriteBtn';
import FilterBtn from '../../../components/universal/FilterBtn';

export default function HomeScreen() {
  
  const handleStartWorkout = () => {
    Alert.alert('Treino', 'Iniciando treino!');
  };

  const handleAddNew = () => {
    console.log('Adicionar novo item');
  };

  const handleFilter = () => {
    console.log('Abrir filtro');
    // Aqui você vai abrir o modal de filtro no futuro
  };

  return (
    <View style={styles.container}>
      
      <Button 
        title="Iniciar Treino"
        onPress={handleStartWorkout}
      />
      
      <AddBtn onPress={handleAddNew} />

      <CheckBtn />
      
      <Favorite />

      <FilterBtn onPress={handleFilter} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    gap: 16,
  },
});