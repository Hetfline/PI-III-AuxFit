import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors, Texts, Spacing } from "@/constants/Styles";
import BackgroundLines from '../../assets/icons/backgroundLines/background-lines.svg';

const { width, height } = Dimensions.get('window');

export default function Background() {
  return (
    <View style={styles.container} pointerEvents="none">
      <BackgroundLines 
        width={width} 
        height={height}
        preserveAspectRatio="xMidYMid slice"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bg,
  },
});