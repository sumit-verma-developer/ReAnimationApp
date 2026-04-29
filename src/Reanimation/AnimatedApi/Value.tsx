import { View, StyleSheet, Animated, useAnimatedValue, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Value = () => {

  // VCF (Variable define karo, component assign kro, function se animate kro)

  // for avoiding unless rerendring using  useRef.
  // Animated.createAnimatedComponent   using for custom animated component.

  //useRef(new Animated.Value(0)).current; older
  // const postion = useRef(new Animated.Value(0)).current;    older way

  const postion = useAnimatedValue(0);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // for using multiple  animated  values
  // const postion1 = useAnimatedValue(10);
  // const postion2 = useAnimatedValue(20);
  const basePostion = useAnimatedValue(50);
  const oscillation = useAnimatedValue(0);
  const oscillationY = useAnimatedValue(0); // Added for vertical bounce
  const combinedPosition = Animated.add(basePostion, oscillation);

  // const postion3 = Animated.add(postion1, postion2);
  // const postion4 = Animated.multiply(postion1, postion2);
  // const postion5 = Animated.divide(postion1, postion2);
  // const postion6 = Animated.subtract(postion1, postion2);
  // const postion7 = Animated.modulo(postion1, 50);

  const StartAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(postion, {
          toValue: 250,
          duration: 1000,
          useNativeDriver: false, // Run on js thread
        }),
        Animated.timing(postion, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false, // Run on js thread
        })
      ]), { iterations: 2 }
    ).start();
  };

  // assign in 2D  like drage whatsapp video call.
  const xyValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;


  const StartXYAnimation = () => {
    Animated.timing(xyValue, {
      toValue: { x: 160, y: 160 },
      duration: 5000,
      useNativeDriver: true, // Run on js thread
    }).start(() => {
      Animated.timing(xyValue, {
        toValue: { x: 10, y: 15 },
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const startOscillation = () => {
    // Move next (X axis)
    Animated.loop(
      Animated.sequence([
        Animated.timing(oscillation, {
          toValue: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(oscillation, {
          toValue: -50,
          duration: 1000,
          useNativeDriver: true,
        })
      ]), { iterations: 3 }
    ).start();

    // Tap up and down (Y axis)
    Animated.loop(
      Animated.sequence([
        Animated.timing(oscillationY, {
          toValue: -50, // Move up
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(oscillationY, {
          toValue: 0, // Move down
          duration: 250,
          useNativeDriver: true,
        })
      ]), { iterations: 12 } // 12 bounces * 500ms = 6000ms total
    ).start();
  };

  useEffect(() => {
    StartAnimation();
    StartXYAnimation();
    startOscillation()
  }, []);

  return (
    <View style={[styles.container, { top: insets.top + 5 }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#111827" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animated Values</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Margin Left (Timing)</Text>
        <Animated.View style={[styles.box, { marginLeft: postion }]} />
      </View>

      <View style={[styles.section, { zIndex: 10, elevation: 10 }]}>
        <Text style={styles.sectionTitle}>2. Translate XY (Timing)</Text>
        <Animated.View
          style={[styles.box2, { transform: xyValue.getTranslateTransform() }]}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Translate X & Y (Move Next & Tap Up/Down)</Text>
        <Animated.View
          style={[styles.circle, { transform: [{ translateX: combinedPosition }, { translateY: oscillationY }] }]}
        />
      </View>
    </View>
  );
};

export default Value;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light gray background for contrast
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
    minHeight: 120, // To accommodate translating elements
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#3B82F6', // Blue
    borderRadius: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  box2: {
    width: 100,
    height: 100,
    backgroundColor: '#F59E0B', // Orange/Yellow
    borderRadius: 16,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B981', // Green
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
