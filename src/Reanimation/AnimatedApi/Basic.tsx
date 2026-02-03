import {View, StyleSheet, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

const Basic = () => {
  // VCF (Variable define karo, component assign kro, function se animate kro)
  // for avoiding unnecessary re-rendering using useRef.
  // Animated.createAnimatedComponent is used for custom animated component.

  const position = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(position, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false // Run on js thread
    }).start(() => {
      Animated.timing(position, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false // Run on js thread
      }).start();
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View>
      <Animated.View style={[styles.box, {marginLeft: position}]} />
    </View>
  );
};

export default Basic;

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
  },
});
