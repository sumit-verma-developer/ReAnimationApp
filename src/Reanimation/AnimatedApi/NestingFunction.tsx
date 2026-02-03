import {Animated, StyleSheet, Text, useAnimatedValue, View} from 'react-native';
import React, {useEffect} from 'react';

const NestingFunction = () => {
  //method - loop , paralell, stager(ek sath run krne ke liye) delay, sequence
  // VCF rule

  const animatedValue1 = useAnimatedValue(0);
  const animatedValue2 = useAnimatedValue(0);

  useEffect(() => {
    // const sequenceAnimation = Animated.sequence([
    //   Animated.timing(animatedValue1, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(animatedValue2, {
    //     toValue: 0.4,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),

    // ]).start();

    // parelell Animation
    // const ParelellAnimation = Animated.parallel([
    //     Animated.timing(animatedValue1, {
    //       toValue: 1,
    //       duration: 1000,
    //       useNativeDriver: true,
    //     }),
    //     Animated.timing(animatedValue2, {
    //       toValue: .5,
    //       duration: 2000,
    //       useNativeDriver: true,
    //     }),

    //   ])
    // ParelellAnimation.start()

    // stagger Animation (for delay)
    // const staggerAnimation = Animated.stagger(1000, [
    //   Animated.timing(animatedValue1, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(animatedValue2, {
    //     toValue: 0.5,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),
    // ]);
    // staggerAnimation.start();

    const loopAnimation = Animated.loop(
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      {iterations: 5}, // five time blink
    );
    loopAnimation.start();

    const delayAnimation = Animated.sequence([
      Animated.delay(3000),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
    delayAnimation.start();

    //  parelell.start();
    //sequenceAnimation.start()
    // loop
    // delay Animation
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, {opacity: animatedValue1}]} />

      <Animated.View
        style={[styles.box, {backgroundColor: 'red', opacity: animatedValue2}]}
      />
    </View>
  );
};

export default NestingFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 90,
    backgroundColor: 'green',
  },
});
