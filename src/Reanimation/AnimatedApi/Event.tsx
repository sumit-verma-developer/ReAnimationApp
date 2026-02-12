import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
} from 'react-native';
import React, { useRef } from 'react';

const Event = () => {
  // pan Responder , Animated.event(get Dimension value)
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useAnimatedValue(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 2,
          useNativeDriver: true,
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false },
      ),
      // 2d dimension support nhi krte hain native event es liye useNativeDriver:false

      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.box,
          { transform: [...pan.getTranslateTransform(), { scale }] },
        ]}
      />
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: 'green',
  },
});
