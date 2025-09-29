import React from 'react';
import { Tabs } from 'expo-router';
import BottomTabBar from '../../components/BottomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => (
        <BottomTabBar
          activeTab={props.state.routeNames[props.state.index]}
          onTabPress={(tabId) => {
            const index = props.state.routeNames.indexOf(tabId);
            if (index !== -1) {
              props.navigation.navigate(props.state.routeNames[index]);
            }
          }}
        />
      )}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home',
        }} 
      />
      <Tabs.Screen 
        name="workout" 
        options={{ 
          title: 'Workout',
        }} 
      />
      <Tabs.Screen 
        name="chat" 
        options={{ 
          title: 'Chat',
        }} 
      />
      <Tabs.Screen 
        name="diet" 
        options={{ 
          title: 'Diet',
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Profile',
        }} 
      />
    </Tabs>
  );
}