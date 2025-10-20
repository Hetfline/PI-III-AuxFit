import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Texts } from '@/constants/Styles';

interface ProfileHeaderProps {
  userName: string;
  userPhoto?: string;
  date: string;
  streak: number;
  caloriesConsumed: number;
  caloriesGoal: number;
  waterConsumed: number;
  waterGoal: number;
}

export default function ProfileHeader({
  userName,
  userPhoto,
  date,
  streak,
  caloriesConsumed,
  caloriesGoal,
  waterConsumed,
  waterGoal,
}: ProfileHeaderProps) {
  
  const caloriesPercent = (caloriesConsumed / caloriesGoal) * 100;
  const waterPercent = (waterConsumed / waterGoal) * 100;

  return (
    <View style={styles.container}>
      
      {/* Header com foto e informações */}
      <View style={styles.header}>
        {/* Foto do usuário */}
        <Image
          source={require('../../assets/icons/logo/image.png')}
          style={styles.avatar}
        />
        
        {/* Informações do usuário */}
        <View style={styles.userInfo}>
          {/* Nome + Streak */}
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.streakContainer}>
              <MaterialIcons name="local-fire-department" size={18} color="#FF6B35" />
              <Text style={styles.streakText}>{streak}</Text>
            </View>
          </View>
          
          {/* Data */}
          <Text style={styles.date}>{date}</Text>
          
          {/* Barras de Progresso */}
          <View style={styles.barsContainer}>
            
            {/* Barra de Calorias */}
            <View style={styles.progressRow}>
              <View style={styles.barBackground}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      width: `${Math.min(caloriesPercent, 100)}%`, 
                      backgroundColor: '#FF6B35' 
                    }
                  ]} 
                />
                <View style={styles.barContent}>
                  <MaterialIcons name="local-fire-department" size={12} color="#000" />
                  <Text style={styles.barValue}>{caloriesConsumed}</Text>
                </View>
              </View>
              <Text style={styles.barGoal}>{caloriesGoal} kcal / d</Text>
            </View>

            {/* Barra de Água */}
            <View style={styles.progressRow}>
              <View style={styles.barBackground}>
                <View 
                  style={[
                    styles.barFill, 
                    { 
                      width: `${Math.min(waterPercent, 100)}%`, 
                      backgroundColor: '#42A5F5' 
                    }
                  ]} 
                />
                <View style={styles.barContent}>
                  <MaterialIcons name="water-drop" size={12} color="#000" />
                  <Text style={styles.barValue}>{waterConsumed}</Text>
                </View>
              </View>
              <Text style={styles.barGoalWater}>{waterGoal} ml / d</Text>
            </View>

          </View>
        </View>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  userInfo: {
    flex: 1,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userName: {
    ...Texts.title,
    fontSize: 22,
    color: Colors.text,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  streakText: {
    ...Texts.title,
    fontSize: 16,
    color: '#FF6B35',
  },
  date: {
    ...Texts.subtext,
    fontSize: 14,
    color: '#FFF',
  },
  barsContainer: {
    top: Spacing.sm,
    gap: 8,
    marginTop: 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  barBackground: {
    width: 120,
    height: 14,
    backgroundColor: '#4D4D4D',
    borderRadius: 20,
    overflow: 'hidden',
  },
  barFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 20,
  },
  barContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 4,
    zIndex: 1,
    height: '100%',
  },
  barValue: {
    ...Texts.bodyBold,
    fontSize: 10,
    color: '#000',
  },
  barGoal: {
    ...Texts.subtext,
    fontSize: 11,
    color: '#FF6933',
  },
    barGoalWater: {
    ...Texts.subtext,
    fontSize: 11,
    color: '#2196F3',
  },
});