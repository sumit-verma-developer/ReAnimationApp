import {View, StyleSheet, Animated, useAnimatedValue} from 'react-native';
import React, {useEffect, useRef} from 'react';

const Value = () => {
  // VCF (Variable define karo, component assign kro, function se animate kro)

  // for avoiding unless rerendring using  useRef.
  // Animated.createAnimatedComponent   using for custom animated component.

  //useRef(new Animated.Value(0)).current; older
  // const postion = useRef(new Animated.Value(0)).current;    older way

  const postion = useAnimatedValue(0);

  // for using multiple  animated  values
  const postion1 = useAnimatedValue(10);
  const postion2 = useAnimatedValue(20);
  const basePostion = useAnimatedValue(50);
  const oscillation = useAnimatedValue(0);
  const combinedPosition = Animated.add(basePostion, oscillation);

  // const postion3 = Animated.add(postion1, postion2);
  // const postion4 = Animated.multiply(postion1, postion2);
  // const postion5 = Animated.divide(postion1, postion2);
  // const postion6 = Animated.subtract(postion1, postion2);
  // const postion7 = Animated.modulo(postion1, 50);

  const StartAnimation = () => {
    Animated.timing(postion1, {
      toValue: 200,
      duration: 1000,
      useNativeDriver: false, // Run on js thread
    }).start(() => {
      Animated.timing(postion2, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false, // Run on js thread
      }).start();
    });
  };

  // assign in 2D  like drage whatsapp video call.
  const xyValue = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  

  const StartXYAnimation = () => {
    Animated.timing(xyValue, {
      toValue: {x: 160, y: 160},
      duration: 5000,
      useNativeDriver: true, // Run on js thread
    }).start();
  };




  const startOscillation=()=>{
    Animated.loop(
      Animated.sequence([
        // composing the animation 
        Animated.timing(oscillation,{
          toValue:50,
          duration:1000,
          useNativeDriver:true,

        }),
        Animated.timing(oscillation,{
          toValue:-50,
          duration:1000,
          useNativeDriver:true,
          
        })
      ]),{iterations:5} // if passing infinity then go infinity loop
    ).start()
  }

  useEffect(() => {
    // StartAnimation();
    // StartXYAnimation();
    startOscillation()
  }, []);

  return (
    <View>
      <Animated.View style={[styles.box, {marginLeft: postion1}]} />;
      {/* <Animated.View style={[styles.box2, xyValue.getLayout()]} />; this is not work in native  */}
      <Animated.View
        style={[styles.box2, {transform: xyValue.getTranslateTransform()}]}
      />
      <Animated.View
        style={[styles.circle, {transform: [{translateX: combinedPosition}]}]}
      />
    </View>
  );
};

export default Value;

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'yellow',
  },
  box2: {
    width: 150,
    height: 150,
    marginTop: 10,
    backgroundColor: 'orange',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 400,
    marginTop: 10,
    backgroundColor: 'green',
  },
});
