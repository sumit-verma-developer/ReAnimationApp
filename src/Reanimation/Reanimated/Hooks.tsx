import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useAnimatedRef,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
  measure,
  useAnimatedReaction,
  runOnJS,
  runOnUI,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedView = Animated.createAnimatedComponent(View);

const Hooks = () => {
  const navigation = useNavigation<any>();

  // derive Value (jab koi dependency value chage hoti hain tab ye compute krte hain )
  // useDerivedValue
  //useAnimatedRef
  //useAnimatedStyle
  //animatedProps // for svg
  //createAnimatedComponent


  // 1. useSharedValue: Keeps the animation state
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  // 2. useAnimatedRef: Get a reference to a view to measure it or pass to other UI thread hooks
  const containerRef = useAnimatedRef<View>();

  // 3. useDerivedValue: Derive new values based on shared values
  const rotationOuter = useDerivedValue(() => {
    return `${progress.value * 2 * Math.PI}rad`;
  });

  const rotationInner = useDerivedValue(() => {
    return `-${progress.value * 2 * Math.PI}rad`;
  });

  const borderRadiusOuter = useDerivedValue(() => {
    return 100 - (progress.value * 50);
  });

  // 4. useAnimatedStyle: Apply animated styles to components
  const animatedRingStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value + progress.value * 0.2 },
        { rotateZ: rotationOuter.value },
      ],
      borderWidth: 2 + progress.value * 4,
      borderColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#ff0080', '#9d4edd', '#ff0080']
      ),
      borderRadius: borderRadiusOuter.value,
    };
  });

  const animatedRingStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value + (1 - progress.value) * 0.3 },
        { rotateZ: rotationInner.value },
      ],
      borderColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#00dfd8', '#007cf0', '#00dfd8']
      ),
      borderRadius: 100 - borderRadiusOuter.value + 30,
    };
  });

  const centerDotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ['#38bdf8', '#818cf8', '#38bdf8']
      ),
    };
  });

  // 5. useAnimatedProps: Animate native component properties (like TextInput text)
  const animatedProps = useAnimatedProps(() => {
    return {
      text: `Energy Level: ${Math.round(progress.value * 100)}%`, // for some platforms
      value: `Energy Level: ${Math.round(progress.value * 100)}%`, // standard prop
    } as any;
  });

  // 6. useAnimatedReaction: Trigger side effects when a shared value changes
  const onProgressHitMax = () => {
    console.log('Animation reached maximum intensity!');
  };

  useAnimatedReaction(
    () => progress.value > 0.95,
    (isMax, wasMax) => {
      if (isMax && !wasMax) {
        runOnJS(onProgressHitMax)();
      }
    }
  );

  useEffect(() => {
    // Start continuous loop animation
    progress.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1, // infinite
      true // reverse
    );

    // Start a secondary pulsing layout
    scale.value = withRepeat(
      withTiming(1.15, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Reading layout using measure and runOnUI
    setTimeout(() => {
      runOnUI(() => {
        const layout = measure(containerRef);
        console.log('Container Layout measured on UI thread:', layout);
      })();
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle='light-content' backgroundColor="#09090b" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#FFFFFF" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reanimation Basic</Text>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Hooks use</Text>

        <AnimatedView ref={containerRef} style={styles.animationContainer}>
          {/* Outer Ring */}
          <AnimatedView style={[styles.ring, styles.ring1, animatedRingStyle1]} />

          {/* Inner Ring */}
          <AnimatedView style={[styles.ring, styles.ring2, animatedRingStyle2]} />

          {/* Center Dot */}
          <AnimatedView style={[styles.centerBox, centerDotStyle]}>
            <Text style={styles.centerText}>✦</Text>
          </AnimatedView>
        </AnimatedView>

        <AnimatedTextInput
          animatedProps={animatedProps}
          editable={false}
          style={styles.input}
        />

        <View style={styles.footer}>
          <Text style={styles.subtitle}>
            Showcasing hooks: <Text style={styles.highlight}>useSharedValue, useDerivedValue, useAnimatedStyle, useAnimatedRef, useAnimatedProps, useAnimatedReaction</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Hooks;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#09090b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
    zIndex: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#09090b',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    backgroundColor: '#09090b', // Deep zinc background
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 60,
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(255,255,255,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  animationContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 4,
    backgroundColor: 'transparent',
  },
  ring1: {
    width: 240,
    height: 240,
    shadowColor: '#9d4edd',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
  },
  ring2: {
    width: 160,
    height: 160,
    shadowColor: '#00dfd8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 15,
  },
  centerBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#38bdf8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
    elevation: 20,
  },
  centerText: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 40,
  },
  input: {
    marginTop: 70,
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 30,
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    paddingVertical: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  highlight: {
    color: '#38bdf8',
    fontWeight: '600',
  },
});
