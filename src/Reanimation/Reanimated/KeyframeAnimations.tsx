import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Animated, { Keyframe } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const customEntering = new Keyframe({
  0: {
    transform: [
      { translateY: -height / 2 },
      { scale: 0.3 },
      { rotate: '180deg' },
    ],
    opacity: 0,
  },
  60: {
    transform: [
      { translateY: 20 },
      { scale: 1.1 },
      { rotate: '-10deg' },
    ],
    opacity: 1,
  },
  80: {
    transform: [
      { translateY: -10 },
      { scale: 0.95 },
      { rotate: '5deg' },
    ],
  },
  100: {
    transform: [
      { translateY: 0 },
      { scale: 1 },
      { rotate: '0deg' },
    ],
    opacity: 1,
  },
}).duration(1000);

const customExiting = new Keyframe({
  0: {
    transform: [
      { translateY: 0 },
      { scale: 1 },
      { rotate: '0deg' },
    ],
    opacity: 1,
  },
  30: {
    transform: [
      { translateY: -30 },
      { scale: 1.1 },
      { rotate: '-10deg' },
    ],
    opacity: 1,
  },
  100: {
    transform: [
      { translateY: height / 2 },
      { scale: 0.2 },
      { rotate: '90deg' },
    ],
    opacity: 0,
  },
}).duration(800);

const KeyframeAnimations = () => {
  const [showCard, setShowCard] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Keyframe Animations</Text>
          <Text style={styles.subtitle}>
            Demonstrating complex multi-step layout transitions gracefully with Reanimated Keyframes.
          </Text>
        </View>

        {/* Animation Display Area */}
        <View style={styles.displayArea}>
          {showCard && (
            <Animated.View
              entering={customEntering}
              exiting={customExiting}
              style={styles.cardContainer}
            >
              <LinearGradient
                colors={['#8B5CF6', '#3B82F6', '#06B6D4']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.cardInner}>
                  <View style={styles.chip} />
                  <Text style={styles.cardBrand}>REANIMATED</Text>
                </View>
                <Text style={styles.cardNumber}>**** **** **** 1234</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.cardInfo}>VALID THRU 12/28</Text>
                  <Text style={styles.cardInfo}>KEYFRAME</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </View>

        {/* Controls Area */}
        <View style={styles.controlsArea}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => setShowCard((prev) => !prev)}
          >
            <LinearGradient
              colors={showCard ? ['#EF4444', '#DC2626'] : ['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {showCard ? 'Unmount Object' : 'Mount Object'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default KeyframeAnimations;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0F172A',
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  displayArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  },
  card: {
    width: width * 0.85,
    height: width * 0.5,
    borderRadius: 24,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    width: 45,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 8,
    opacity: 0.8,
  },
  cardBrand: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    opacity: 0.9,
  },
  cardNumber: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
    letterSpacing: 4,
    marginTop: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  cardInfo: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    opacity: 0.8,
  },
  controlsArea: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
});