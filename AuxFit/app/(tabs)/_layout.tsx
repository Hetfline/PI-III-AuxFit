import React from 'react';
import { Tabs } from 'expo-router';
import BottomTabBar from '../../components/BottomTabBar'; // Verifique se o caminho está correto para sua estrutura

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
              const routeName = props.state.routeNames[index];
              const isFocused = props.state.index === index;

              // Se a aba já estiver focada (ativa)
              if (isFocused) {
                // Força a navegação para a tela 'index' da stack dessa aba
                // Isso reseta a pilha de navegação (pop to top)
                props.navigation.navigate(routeName, {
                  screen: 'index', 
                });
              } else {
                // Se não estiver focada, navega normalmente para a aba
                props.navigation.navigate(routeName);
              }
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