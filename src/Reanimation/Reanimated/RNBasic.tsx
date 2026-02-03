import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

const RNBasic = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withTiming(width.value + 50, {
      duration: 2000,
    });
  };

  return (
    <View>
      <Animated.View
        style={{
          width: width,
          height: 100,
          backgroundColor: 'red',
        }}
      />
      <Button title="click" onPress={handlePress} />
    </View>
  );
};

export default RNBasic;

const styles = StyleSheet.create({});
