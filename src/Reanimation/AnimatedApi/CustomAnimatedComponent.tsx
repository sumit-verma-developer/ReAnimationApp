import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
} from 'react-native';
import React from 'react';

const CustomAnimatedComponent = () => {
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

  const scaleValue = useAnimatedValue(1);

  const HandlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const HandlePressout = () => {
    Animated.spring(scaleValue, {
      toValue: 2,
      useNativeDriver: true,
    }).start();
  };

  return (
    <AnimatedTouchableOpacity style={[styles.btn,{transform:[{scale:scaleValue}]}]}
    onPressIn={HandlePressIn}
    onPressOut={HandlePressout}>
      <Text>Press me </Text>
    </AnimatedTouchableOpacity>
  );
};

export default CustomAnimatedComponent;

const styles = StyleSheet.create({
  btn:{
justifyContent:'center',
padding:20,
alignItems:'center',
width:120,
backgroundColor:'yellow',
borderRadius:12,
alignSelf:'center'



  },
  text:{
fontSize:16,
fontWeight:'300',
color:'black',

  }
});
