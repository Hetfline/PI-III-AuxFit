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
      
      {/* Foto + Nome + Data + Streak */}
      <View style={styles.topRow}>
        <Image
          source={userPhoto ? { uri: userPhoto } : require('../../assets/icons/logo/logoOnboarding.png')}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <View style={styles.streakContainer}>
              <MaterialIcons name="local-fire-department" size={16} color="#FF6B35" />
              <Text style={styles.streakText}>{streak}</Text>
            </View>
          </View>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      {/* Barras de Progresso*/}
      <View style={styles.progressBars}>
        
        {/* Calorias */}
        <View style={styles.progressRow}>
          <MaterialIcons name="local-fire-department" size={14} color="#FF6B35" />
          <Text style={styles.progressValue}>{caloriesConsumed}</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${Math.min(caloriesPercent, 100)}%`, backgroundColor: '#FF6B35' }
              ]} 
            />
          </View>
          <Text style={styles.progressGoal}>{caloriesGoal} kcal / d</Text>
        </View>

        {/* Água */}
        <View style={styles.progressRow}>
          <MaterialIcons name="water-drop" size={14} color="#42A5F5" />
          <Text style={styles.progressValue}>{waterConsumed}</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${Math.min(waterPercent, 100)}%`, backgroundColor: '#42A5F5' }
              ]} 
            />
          </View>
          <Text style={styles.progressGoal}>{waterGoal} ml / d</Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.bgLight,
  },
  userInfo: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  userName: {
    ...Texts.bodyBold,
    fontSize: 18,
  },
  date: {
    ...Texts.subtext,
    fontSize: 13,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  streakText: {
    ...Texts.bodyBold,
    fontSize: 14,
    color: '#FF6B35',
  },
  progressBars: {
    gap: Spacing.xs,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  progressValue: {
    ...Texts.bodyBold,
    fontSize: 12,
    minWidth: 40,
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.bgLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressGoal: {
    ...Texts.subtext,
    fontSize: 11,
    minWidth: 80,
    textAlign: 'right',
  },
});