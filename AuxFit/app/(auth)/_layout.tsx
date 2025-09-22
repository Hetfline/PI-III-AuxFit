import { Stack } from 'expo-router';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Colors, Spacing, Texts } from '@/constants/Styles';

export default function AuthLayout() {
  return (
    <ImageBackground
      style={styles.backgroundImage}
      resizeMode="cover"
      src='@/assets/images/backgroundLines.png'
    >
      <View style={styles.overlay}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    // backgroundColor: Colors.bg
  },
});