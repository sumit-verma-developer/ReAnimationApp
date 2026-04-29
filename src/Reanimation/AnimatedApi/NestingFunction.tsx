import { Animated, StyleSheet, Text, useAnimatedValue, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const NestingFunction = () => {
  // animation nesting ke liye 
  //method - loop , paralell, stager(ek sath run krne ke liye) delay, sequence
  // VCF rule

  const navigation = useNavigation();
  const animatedValue1 = useAnimatedValue(0);
  const animatedValue2 = useAnimatedValue(0);

  useEffect(() => {
    // const sequenceAnimation = Animated.sequence([
    //   Animated.timing(animatedValue1, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(animatedValue2, {
    //     toValue: 0.4,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),

    // ]).start();

    // parelell Animation
    // const ParelellAnimation = Animated.parallel([
    //     Animated.timing(animatedValue1, {
    //       toValue: 1,
    //       duration: 1000,
    //       useNativeDriver: true,
    //     }),
    //     Animated.timing(animatedValue2, {
    //       toValue: .5,
    //       duration: 2000,
    //       useNativeDriver: true,
    //     }),

    //   ])
    // ParelellAnimation.start()

    // stagger Animation (for delay)
    // const staggerAnimation = Animated.stagger(1000, [
    //   Animated.timing(animatedValue1, {
    //     toValue: 1,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(animatedValue2, {
    //     toValue: 0.5,
    //     duration: 2000,
    //     useNativeDriver: true,
    //   }),
    // ]);
    // staggerAnimation.start();

    const loopAnimation = Animated.loop(
      Animated.timing(animatedValue1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      { iterations: 5 }, // five time blink
    );
    loopAnimation.start();

    const delayAnimation = Animated.sequence([
      Animated.delay(3000),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]);
    delayAnimation.start();

    //  parelell.start();
    //sequenceAnimation.start()
    //staggerAnimation.start()
    // loopAnimation.start()
    // delayAnimation.start()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animation Nesting</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.animationBlock}>
          <Text style={styles.label}>Loop Animation</Text>
          <Text style={styles.subLabel}>Fades in and out 5 times</Text>
          <Animated.View style={[styles.box, styles.box1, { opacity: animatedValue1 }]} />
        </View>

        <View style={styles.animationBlock}>
          <Text style={styles.label}>Sequence & Delay</Text>
          <Text style={styles.subLabel}>Waits 3000ms, then fades in</Text>
          <Animated.View
            style={[styles.box, styles.box2, { opacity: animatedValue2 }]}
          />
        </View>
      </View>
    </View>
  );
};

export default NestingFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 10,
    // Removed border radius for the header as requested
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
    paddingTop: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  animationBlock: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
    textAlign: 'center',
  },
  subLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
    marginBottom: 30,
    textAlign: 'center',
  },
  box: {
    width: 120,
    height: 120,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  box1: {
    backgroundColor: '#6366F1', // Indigo
  },
  box2: {
    backgroundColor: '#EC4899', // Pink
  },
});
