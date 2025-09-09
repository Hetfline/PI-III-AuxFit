import { Stack } from 'expo-router';

export default function DietLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Diet' }} />
    </Stack>
  );
}
