import { View, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-svg';

const Basic = () => {
  // VCF (Variable define karo, component assign kro, function se animate kro)
  // for avoiding unnecessary re-rendering using useRef.
  // Animated.createAnimatedComponent is used for custom animated component.

  const navigation = useNavigation()
  const position = useRef(new Animated.Value(0)).current


  const startAnimation = () => {

    Animated.timing(position, {
      toValue: 300,
      useNativeDriver: false,
      duration: 1000,

    }).start(() =>
      Animated.timing(position, {
        toValue: 10,
        useNativeDriver: false,
        duration: 1000,
      }).start(() =>
        Animated.sequence([
          Animated.delay(500),
          Animated.timing(position, {
            toValue: 200,
            useNativeDriver: false,
            duration: 1000,
          }),
          Animated.timing(position, {
            toValue: 30,
            useNativeDriver: false,
            duration: 1000,
          }),
        ]).start()
      )
    )
  }



  useEffect(() => {
    startAnimation()
  }, [])


  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='chevron-left' color={'black'} size={40} style={{ marginTop: 30 }} onPress={() => { navigation.goBack() }} />
      <Animated.View style={[styles.box, { marginLeft: position }]} >
        <Text>
          Basic Animation
        </Text>
      </Animated.View>
    </View>
  );
};

export default Basic;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c9c8ff',
  },
  box: {
    width: 150,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#ff0000ff',
    marginTop: 50,


  },
});
