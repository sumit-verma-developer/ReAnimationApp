import {View, Text, StyleSheet, Animated, useAnimatedValue} from 'react-native';
import React, {useEffect} from 'react';

const Animtypes = () => {
  //VCF

  //decay ko animate kr skte hain with the help of interpolation.
  // Decay Spring Timing- dhere dhere chhay hona.

  const springValue = useAnimatedValue(0);
  const decayValue = useAnimatedValue(0);
  const TimingValue = useAnimatedValue(0);

  const startDecay = () => {
    // controll speed 
    Animated.decay(decayValue, {
      velocity: 8,
      deceleration: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const startSpring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 20,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  const startTiming= () => {
    Animated.timing(TimingValue, {
      toValue: 1,
      duration:1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startDecay();
    startSpring();
    startTiming()
  }, []);

  const animatedX = decayValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 300],
  });

  const animatedSpringX = {
    transform: [
      {
        translateX: springValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  const animatedTimingX = {
    transform: [
      {
        translateX: TimingValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  return (
    <View>
      <Animated.View
        style={[styles.box1, {transform: [{translateX: animatedX}]}]}
      />
      <Animated.View style={[styles.box2, animatedSpringX]} />
      <Animated.View style={[styles.box3,animatedTimingX]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: 'orange',
    marginTop: 10,
  },
  box3: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
    marginTop: 10,
  },
});
export default Animtypes;
