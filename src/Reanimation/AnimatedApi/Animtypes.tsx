import { View, Text, StyleSheet, Animated, useAnimatedValue, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Animtypes = () => {
  //VCF

  //decay ko animate kr skte hain with the help of interpolation.
  // Decay Spring Timing- dhere dhere chhay hona.

  const navigation = useNavigation();
  const springValue = useAnimatedValue(0);
  const decayValue = useAnimatedValue(0);
  const TimingValue = useAnimatedValue(0);

  const startDecay = () => {
    // controll speed 
    Animated.decay(decayValue, {
      velocity: 8,
      deceleration: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const startSpring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 20,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  const startTiming = () => {
    Animated.timing(TimingValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    startDecay();
    startSpring();
    startTiming()
  }, []);

  const animatedX = decayValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 300],
  });

  const animatedSpringX = {
    transform: [
      {
        translateX: springValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  const animatedTimingX = {
    transform: [
      {
        translateX: TimingValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 200],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animation Types</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.animationBlock}>
          <Text style={styles.label}>Decay</Text>
          <Text style={styles.subLabel}>Decelerates to a stop based on velocity</Text>
          <Animated.View
            style={[styles.box, styles.box1, { transform: [{ translateX: animatedX }] }]}
          />
        </View>

        <View style={styles.animationBlock}>
          <Text style={styles.label}>Spring</Text>
          <Text style={styles.subLabel}>Spring physics using friction and tension</Text>
          <Animated.View style={[styles.box, styles.box2, animatedSpringX]} />
        </View>

        <View style={styles.animationBlock}>
          <Text style={styles.label}>Timing</Text>
          <Text style={styles.subLabel}>Animated over a given duration</Text>
          <Animated.View style={[styles.box, styles.box3, animatedTimingX]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Sleek light background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    // borderBottomLeftRadius: 24,
    // borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 10,
  },
  backButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  animationBlock: {
    marginBottom: 44,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 20,
  },
  box: {
    width: 64,
    height: 64,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  box1: {
    backgroundColor: '#EF4444', // Vibrant Red
  },
  box2: {
    backgroundColor: '#F59E0B', // Vibrant Orange
  },
  box3: {
    backgroundColor: '#10B981', // Vibrant Green
  },
});

export default Animtypes;
