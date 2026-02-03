import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

const Move2D = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
        <View style={styles.boxContainer}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.box,
          {
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          },
        ]}
      />

        <Text>Move2D</Text>
      </View>
    </View>
  );
};

export default Move2D;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'black',
  },
  boxContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
   
    backgroundColor:'blue',

  },
});
