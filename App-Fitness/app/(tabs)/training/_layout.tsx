import { Stack } from 'expo-router';

export default function TrainingLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Training' }} />
    </Stack>
  );
}
