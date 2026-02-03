import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';

const Success = () => {
  const speedSequence = [1, 1.5, 2, 2.5, 0, 1];
  const [speedIndex, setSpeedIndex] = useState(0);
  const speed = speedSequence[speedIndex];
  console.log('speed', speed);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeedIndex(prevIndex => (prevIndex + 1) % speedSequence.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
      }}>
        <SafeAreaView/>
      <LottieView
        source={require('../assets/lottiFile/Success.json')}
        autoPlay
        loop
        style={{width: 300, height: 300}}
        onAnimationFinish={() => {
          console.log('Animation finished');
        }}
      />

      <LottieView
        source={require('../assets/lottiFile/blinkit_loader.json')}
        autoPlay
        loop
        style={{width: 300, height: 300}}
        onAnimationFinish={() => {
          console.log('Animation finished');
        }}
      />
      <LottieView
        source={require('../assets/lottiFile/Loading.json')}
        autoPlay
        loop
        style={{width: 150, height: 150}}
        onAnimationFinish={() => {
          console.log('Animation finished');
        }}
        speed={speed}
      />
    </View>
  );
};

export default Success;
