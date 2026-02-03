import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  withDelay,
  withClamp,
} from 'react-native-reanimated';

const Method = () => {
  const translateX = useSharedValue(0); // v rule (VCF)

  const AnimetedStyle = useAnimatedStyle(() => {
    // c
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={[
          {width: 100, height: 100, backgroundColor: 'red'},
          AnimetedStyle,
        ]}
      />
      <Button
        title="width Timming"
        onPress={() => {
          translateX.value = withTiming(200, {duration: 1000});
        }}
      />
      <Button
        title="with Spring"
        onPress={() => {
          translateX.value = withSpring(200, {damping: 10, stiffness: 100});
        }}
      />
      <Button
        title="with Decay"
        onPress={() => {
          translateX.value = withDecay({velocity: 2, deceleration: 0.98});
        }}
      />
      <Button
        title="with Repeat"
        onPress={() => {
          translateX.value = withRepeat(
            withTiming(200, {duration: 500}),
            3,
            true,
          );
        }}
      />
      <Button
        title="with Delay"
        onPress={() => {
          translateX.value = withDelay(1000, withTiming(200, {duration: 500}));
        }}
      />
      <Button
        title="with Clamp"
        onPress={() => {
          translateX.value = withClamp(
            {
              min: -60,
              max: 60,
            },
            withTiming(500, {duration: 400}),
          );
        }}
      />
    </View>
  );
};

export default Method;

const styles = StyleSheet.create({
    
});
