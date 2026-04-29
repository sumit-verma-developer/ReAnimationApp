import {
  View,
  Text,
  useAnimatedValue,
  Animated,
  StyleSheet,
  Easing,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EasingAnimation = () => {
  const animatedValue = useAnimatedValue(0);
  const navigation = useNavigation();

  const startAnimation = (easingFunction: (value: number) => number) => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing: easingFunction,
      useNativeDriver: true, // kyo ki yaha koi translate use nhi kr rhe hain x and y mein toh useNativeDriver true krna hai
    }).start();
  };

  const easings = [
    { name: 'Step 0', func: Easing.step0 },
    { name: 'Step 1', func: Easing.step1 },
    { name: 'Linear', func: Easing.linear },
    { name: 'Elastic', func: Easing.elastic(1) },
    { name: 'Bounce', func: Easing.bounce },
    { name: 'Bezier', func: Easing.bezier(0.25, 0.1, 0.25, 1.0) },
    { name: 'Backwards', func: Easing.back(1) },
    { name: 'Quad', func: Easing.quad },
    { name: 'Cubic', func: Easing.cubic },
    { name: 'Sin', func: Easing.sin },
    { name: 'Exp', func: Easing.exp },
    { name: 'Circle', func: Easing.circle },
    { name: 'In (Quad)', func: Easing.in(Easing.quad) },
    { name: 'Out (Quad)', func: Easing.out(Easing.quad) },
    { name: 'InOut (Quad)', func: Easing.inOut(Easing.quad) },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Easing Functions</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Animation Area */}
      <View style={styles.animationContainer}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [
                {
                  translateX: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 250],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      {/* Buttons List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.buttonsContainer}>
        {easings.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.easingButton}
            onPress={() => startAnimation(item.func)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>{item.name}</Text>
            <MaterialCommunityIcons name="play-circle-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

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
  animationContainer: {
    height: 180,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#EEF2F6',
  },
  box: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#6366F1', // Indigo
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  scrollView: {
    flex: 1,
  },
  buttonsContainer: {
    padding: 20,
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  easingButton: {
    width: '48%',
    backgroundColor: '#3B82F6', // Blue
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default EasingAnimation;
