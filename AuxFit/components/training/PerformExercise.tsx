import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PerformExerciseProps {
  description: string; // linhas separadas por \n (quebras de linha)
}

const PerformExercise: React.FC<PerformExerciseProps> = ({ description }) => {
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
    outputRange: [0, contentHeight],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const topics = description.split('\n').filter(line => line.trim() !== '');

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleExpand}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Como executar</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={24} color="hsl(0, 0%, 95%)" />
        </Animated.View>
      </View>

      {/* Conteúdo invisível apenas para medir altura */}
      <View
        style={styles.hiddenContent}
        onLayout={(event) => {
          const measuredHeight = event.nativeEvent.layout.height;
          if (contentHeight !== measuredHeight) {
            setContentHeight(measuredHeight);
          }
        }}
      >
        {topics.map((line, index) => (
          <View key={index} style={styles.topicContainer}>
            <Text style={styles.topicNumber}>{index + 1}.</Text>
            <Text style={styles.topicText}>{line.trim()}</Text>
          </View>
        ))}
      </View>

      {/* Texto animado visível */}
      <Animated.View style={{ height, opacity, overflow: 'hidden' }}>
        {topics.map((line, index) => (
          <View key={index} style={styles.topicContainer}>
            <Text style={styles.topicNumber}>{index + 1}.</Text>
            <Text style={styles.topicText}>{line.trim()}</Text>
          </View>
        ))}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'hsl(122, 39%, 53%)',
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
    color: 'hsl(122, 39%, 53%)',
    fontWeight: 'bold',
  },
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  topicNumber: {
    width: 20,
    color: 'hsl(0, 0%, 95%)',
    fontSize: 15,

  },
  topicText: {
    flex: 1,
    color: 'hsl(0, 0%, 95%)',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'justify',
  },
  hiddenContent: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
  },
});

export default PerformExercise;
