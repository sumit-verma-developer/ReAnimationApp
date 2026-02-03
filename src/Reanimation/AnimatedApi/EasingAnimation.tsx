import {
  View,
  Text,
  useAnimatedValue,
  Animated,
  StyleSheet,
  Button,
  Easing,
  ScrollView,
} from 'react-native';
import React from 'react';

const EasingAnimation = () => {
  const animatedValue = useAnimatedValue(0);

  const startAnimation = (easingFunction: (value: number) => number) => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: easingFunction,
      useNativeDriver: true, // kyo ki yaha koi translate use nhi kr rhe hain x and y mein toh useNativeDriver true krna hai
    }).start();
  };

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
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        <Button
          title="step0 Animation"
          onPress={() => startAnimation(Easing.step0)}
        />
        <Button
          title="step1 Animation"
          onPress={() => startAnimation(Easing.step1)}
        />
        <Button
          title="linear Animation"
          onPress={() => startAnimation(Easing.linear)}
        />
        <Button
          title="elastic Animation"
          onPress={() => startAnimation(Easing.elastic(1))}
        />
        <Button
          title="bounce Animation"
          onPress={() => startAnimation(Easing.bounce)}
        />
        <Button
          title="bezier Animation"
          onPress={() => startAnimation(Easing.bezier(0.25, 0.1, 0.25, 1.0))}
        />
        <Button
          title="backwards Animation"
          onPress={() => startAnimation(Easing.back(1))}
        />
        <Button
          title="quad Animation"
          onPress={() => startAnimation(Easing.quad)}
        />
        <Button
          title="cubic Animation"
          onPress={() => startAnimation(Easing.cubic)}
        />
        <Button
          title="sin Animation"
          onPress={() => startAnimation(Easing.sin)}
        />
        <Button
          title="exp Animation"
          onPress={() => startAnimation(Easing.exp)}
        />
        <Button
          title="circl Animation   "
          onPress={() => startAnimation(Easing.circle)}
        />
        <Button
          title="sin Animation"
          onPress={() => startAnimation(Easing.sin)}
        />
        <Button
          title="exp Animation"
          onPress={() => startAnimation(Easing.exp)}
        />
        <Button
          title="cubic Animation"
          onPress={() => startAnimation(Easing.cubic)}
        />
        <Button
          title="in Animation"
          onPress={() => startAnimation(Easing.in(Easing.quad))}
        />
        <Button
          title="out Animation"
          onPress={() => startAnimation(Easing.out(Easing.quad))}
        />
        <Button
          title="inout Animation"
          onPress={() => startAnimation(Easing.inOut(Easing.quad))}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#222'
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
  scrollView: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
});

export default EasingAnimation;
