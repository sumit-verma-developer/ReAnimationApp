import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React from 'react';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const CustomAnimatedComponent = () => {

  const scaleValue = useAnimatedValue(1);

  const HandlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      friction: 5,
      tension: 60,
      useNativeDriver: true,
    }).start();
  };

  const HandlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1E" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Custom Animated Component</Text>
          <Text style={styles.subtitle}>
            An interactive bounding button using{' '}
            <Text style={styles.codeText}>Animated.createAnimatedComponent()</Text>
          </Text>
        </View>

        <View style={styles.demoContainer}>
          <View style={styles.buttonGlow} />
          <AnimatedTouchableOpacity
            activeOpacity={1}
            style={[
              styles.btn,
              { transform: [{ scale: scaleValue }] }
            ]}
            onPressIn={HandlePressIn}
            onPressOut={HandlePressOut}>
            <Text style={styles.btnText}>Press Me</Text>
          </AnimatedTouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomAnimatedComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A1E',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 24,
  },
  codeText: {
    color: '#E879F9',
    fontWeight: '600',
    fontFamily: 'System',
  },
  demoContainer: {
    width: '100%',
    paddingVertical: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  buttonGlow: {
    position: 'absolute',
    width: 140,
    height: 56,
    backgroundColor: '#C026D3',
    borderRadius: 28,
    opacity: 0.4,
    transform: [{ translateY: 6 }],
    shadowColor: '#C026D3',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    height: 60,
    backgroundColor: '#D946EF',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
