import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useScrollOffset,
} from 'react-native-reanimated';

const ScrollOffset = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollOffset(animatedRef);
  const text = useDerivedValue(
    () => `Scroll offset ${offset.value.toFixed(1)}`,
  );

  const [isScrollHorizontal,setIsScrollHorizontal]=useState<boolean>(false)

  return <View style={styles.container}>
    <Animated.ScrollView ref={animatedRef} contentContainerStyle={styles.scrollContent}
    style={styles.scroll}
    horizontal={isScrollHorizontal}>


    </Animated.ScrollView>
  </View>;
};

export default ScrollOffset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  scroll: {
    borderWidth: 1,
    width: 250,
    height: 250,
    margin: 20,
  },
  scrollContent: {
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    margin: 15,
    borderRadius: 12,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
