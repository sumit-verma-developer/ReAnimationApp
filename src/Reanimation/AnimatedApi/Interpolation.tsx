import {
  View,
  Text,
  StyleSheet,
  Animated,
  useAnimatedValue,
  Easing,
  PanResponder,
} from 'react-native';
import React, {useEffect, useRef} from 'react';

const Interpolation = () => {
  const animatedValue = useAnimatedValue(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const diffClampY = useRef(Animated.diffClamp(pan.y, -100, 100)).current;
  const diffClampX = useRef(Animated.diffClamp(pan.x, -100, 100)).current;
  
  const startInterpolation = () => {
    Animated.timing(animatedValue, {
      toValue: 4,
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // next differencial clamping
  // move krne ke liye panResponder use krte hain
  // native driver support krta hain certain property translate x and y event mein support nhi krta hain.

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      // give x axis and y axis 
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
      }).start();
    },
  });

  useEffect(() => {
    startInterpolation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-200, 200],
                  //   extrapolate:'extend'
                  extrapolateRight: 'extend',
                  extrapolateLeft: 'clamp',
                }),
              },
            ],
          },
        ]}
      />

      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box2,
          {
            transform: [
              {
                translateY: diffClampY,
              },
              {
                translateX: diffClampX,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 120,
    backgroundColor: 'green',
  },
  box2: {
    width: 100,
    height: 100,
    borderRadius: 120,
    backgroundColor: 'blue',
    marginTop: 20,
  },
});

export default Interpolation;
