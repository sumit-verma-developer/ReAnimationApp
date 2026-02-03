import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const HEADER_HEIGHT = 100;

const ScrollHandler = () => {
  const offsetY = useSharedValue(0);
  const opacity = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      offsetY.value = event.contentOffset.y;
      
    },
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            offsetY.value > HEADER_HEIGHT ? -HEADER_HEIGHT : 0,
          ),
        },
      ],
      opacity: interpolate(
        offsetY.value,
        [0, HEADER_HEIGHT / 2],
        [1, 0],
        'clamp',
      ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <Text style={styles.headerText}>Collapsible Header</Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {Array.from({length: 30}).map((_, index) => (
            <Text key={index} style={styles.text}>
              Item{index + 1}
            </Text>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default ScrollHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#6a1b9a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 10,
  },
  content: {
    alignSelf: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3c3c3c',
  },
});
