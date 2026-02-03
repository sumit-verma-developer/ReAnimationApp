import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  measure,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

const Hooks = () => {
  // derive Value (jab koi dependency value chage hoti hain tab ye compute krte hain )
  // useDerivedValue
  //useAnimatedRef
  //useAnimatedStyle
  //animatedProps // for svg
  //createAnimatedComponent

  const progress = useSharedValue(0);
  const animatedRef = useAnimatedRef();
  const borderRadius = useDerivedValue(() => {
    return 10 + progress?.value * 200;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadius.value,
    };
  });

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.linear}),
      -1, //-1 infine and 1 for (reverse )
      true,
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const layout = measure(animatedRef);
      console.log('layout', layout);
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
      <AnimatedView
        ref={animatedRef}
        style={[styles.box, animatedStyle]}
        // animatedProps={animatedProps}
      />
      <Text style={{alignSelf: 'center', paddingTop: 30}}>Hooks</Text>
    </View>
  );
};

export default Hooks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
});
