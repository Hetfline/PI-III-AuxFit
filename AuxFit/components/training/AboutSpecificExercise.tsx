import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AboutSpecificExerciseProps {
  description: string;
}

const AboutSpecificExercise: React.FC<AboutSpecificExerciseProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => setExpanded(!expanded);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [expanded]);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight + 18],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpand}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sobre o exercício</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={24} color="hsl(0, 0%, 95%)" />
        </Animated.View>
      </View>

      {/* Texto invisível apenas para medir altura */}
      <Text
        style={[styles.description, { position: 'absolute', opacity: 0 }]}
        onLayout={(event) => setContentHeight(event.nativeEvent.layout.height)}
      >
        {description}
      </Text>

      {/* Texto animado */}
      <Animated.View style={{ height, opacity, overflow: 'hidden' }}>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'hsl(207, 90%, 54%)',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'hsl(220, 15%, 18%)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: 'hsl(207, 90%, 54%)',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    marginBottom: 2,
    color: 'hsl(0, 0%, 95%)',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'justify',
  },
});

export default AboutSpecificExercise;
