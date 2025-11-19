import { Stack } from 'expo-router';
import { OnboardingProvider } from '@/context/OnboardingContext';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="genderScreen" />
        <Stack.Screen name="ageScreen" />
        <Stack.Screen name="heightScreen" />
        <Stack.Screen name="weightScreen" />
        <Stack.Screen name="activityScreen" />
        <Stack.Screen name="goalScreen" />
      </Stack>
    </OnboardingProvider>
  );
}