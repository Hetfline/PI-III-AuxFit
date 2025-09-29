import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabId: string) => void;
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => {
  
  const tabs = [
    {
      id: 'home',
      activeIcon: require('../assets/icons/bottomTabBar/iconsEnabled/homeEnabled.png'),
      inactiveIcon: require('../assets/icons/bottomTabBar/iconsDisabled/home.png'),
    },
    {
      id: 'workout',
      activeIcon: require('../assets/icons/bottomTabBar/iconsEnabled/workoutEnabled.png'),
      inactiveIcon: require('../assets/icons/bottomTabBar/iconsDisabled/workout.png'),
    },
    {
      id: 'chat',
      activeIcon: require('../assets/icons/bottomTabBar/iconsEnabled/chatEnabled.png'),
      inactiveIcon: require('../assets/icons/bottomTabBar/iconsDisabled/chat.png'),
    },
    {
      id: 'diet',
      activeIcon: require('../assets/icons/bottomTabBar/iconsEnabled/dietEnabled.png'),
      inactiveIcon: require('../assets/icons/bottomTabBar/iconsDisabled/diet.png'),
    },
    {
      id: 'profile',
      activeIcon: require('../assets/icons/bottomTabBar/iconsEnabled/profileEnabled.png'),
      inactiveIcon: require('../assets/icons/bottomTabBar/iconsDisabled/profile.png'),
    }
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
              <Image
                source={isActive ? tab.activeIcon : tab.inactiveIcon}
                style={styles.tabIcon}
                resizeMode="contain"
              />
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