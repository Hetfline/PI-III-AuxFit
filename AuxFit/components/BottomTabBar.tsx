import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

// SVG para inativos (leves)
import Home from '../assets/icons/bottomTabBar/iconsDisabled/home.svg';
import Workout from '../assets/icons/bottomTabBar/iconsDisabled/workout.svg';
import Chat from '../assets/icons/bottomTabBar/iconsDisabled/chat.svg';
import Diet from '../assets/icons/bottomTabBar/iconsDisabled/diet.svg';
import Profile from '../assets/icons/bottomTabBar/iconsDisabled/profile.svg';

// PNG @3x para ativos (gradientes lindos)
const HomeEnabled = require('../assets/icons/bottomTabBar/iconsEnabled/homeEnabled.png');
const WorkoutEnabled = require('../assets/icons/bottomTabBar/iconsEnabled/workoutEnabled.png');
const ChatEnabled = require('../assets/icons/bottomTabBar/iconsEnabled/chatEnabled.png');
const DietEnabled = require('../assets/icons/bottomTabBar/iconsEnabled/dietEnabled.png');
const ProfileEnabled = require('../assets/icons/bottomTabBar/iconsEnabled/profileEnabled.png');

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  
  const tabs = [
    { id: 'home', activeIcon: HomeEnabled, InactiveIcon: Home },
    { id: 'workout', activeIcon: WorkoutEnabled, InactiveIcon: Workout },
    { id: 'chat', activeIcon: ChatEnabled, InactiveIcon: Chat },
    { id: 'diet', activeIcon: DietEnabled, InactiveIcon: Diet },
    { id: 'profile', activeIcon: ProfileEnabled, InactiveIcon: Profile },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.6}
          >
            <View style={styles.iconContainer}>
              {isActive ? (
                <Image
                  source={tab.activeIcon}
                  style={styles.tabIcon}
                  resizeMode="contain"
                />
              ) : (
                <tab.InactiveIcon width={24} height={24} />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#1A1D23',
    height: 70,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#404040',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  tabIcon: {
    width: 24,
    height: 24,
  },
});

export default BottomTabBar;