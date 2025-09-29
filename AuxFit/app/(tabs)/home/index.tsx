import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Button from '../../../components/universal/Button';
import AddBtn from '../../../components/universal/AddBtn';
import CheckBtn from '../../../components/universal/CheckBtn';
import Favorite from '../../../components/universal/FavoriteBtn';
import FilterBtn from '../../../components/universal/FilterBtn';
import GenericModal from '../../../components/universal/GenericModal';
import Header from '../../../components/universal/Header';
import InputField from '../../../components/universal/InputField';
import WeeklyStreak from '../../../components/universal/WeeklyStreak';
import WeightIn from '../../../components/universal/WeightIn';
import ProgressBar from '../../../components/questions/ProgressBar';

export default function HomeScreen() {
  
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleStartWorkout = () => {
    Alert.alert('Treino', 'Iniciando treino!');
  };

  const handleAddNew = () => {
    console.log('Adicionar novo item');
  };

  const handleFilter = () => {
    console.log('Abrir filtro');
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleHeaderIcon = () => {
    Alert.alert('Opções', 'Menu de opções');
  };

  const handleTestOnboarding = () => {
    router.push('/onboarding');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <Header 
          title="Home"
          subtitle="Bem-vindo ao seu treino"
          icon="more-vert"
          onIconPress={handleHeaderIcon}
        />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Botão de teste do Onboarding - REMOVER depois */}
          <Button 
            title="🧪 Testar Onboarding"
            onPress={handleTestOnboarding}
            bgColor="#FF6B35"
          />

          <View style={{ height: 40 }}>
            <ProgressBar />
          </View>

          <WeeklyStreak />

          <WeightIn />

          <InputField
            icon="person"
            placeholder="Digite seu nome"
            value={nameValue}
            onChangeText={setNameValue}
          />

          <InputField
            icon="lock"
            placeholder="Digite sua senha"
            password={true}
            value={passwordValue}
            onChangeText={setPasswordValue}
          />

          <InputField
            placeholder="Email"
            keyboardType="email-address"
          />

          <Button 
            title="Iniciar Treino"
            onPress={handleStartWorkout}
          />
          
          <View style={styles.smallButtonsRow}>
            <AddBtn onPress={handleAddNew} />
            <CheckBtn />
            <Favorite />
            <FilterBtn onPress={handleFilter} />
          </View>

          <Button 
            title="Abrir Modal Genérico"
            onPress={handleOpenModal}
          />
        </ScrollView>

        <GenericModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        >
          <Text style={{ color: '#fff', fontSize: 18, marginBottom: 16 }}>
            Modal Genérico
          </Text>
          <Text style={{ color: '#fff' }}>
            Este é um modal personalizável.
          </Text>
        </GenericModal>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 24,
    paddingBottom: 100,
    gap: 20,
  },
  smallButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 8,
  },
});