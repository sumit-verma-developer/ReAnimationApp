import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  PanResponder,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Interpolation = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();



  // Clamping for the Draggable Box
  const diffClampY = Animated.diffClamp(pan.y, -65, 65);
  const diffClampX = Animated.diffClamp(pan.x, -120, 120);

  const startInterpolation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 240,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -40,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false, // Keeping false to match event config
      }).start();
    },
  });

  useEffect(() => {
    startInterpolation();
  }, []);

  // 1. Extend (Continues infinitely at same rate) ,'extend' → Allows the output to go beyond the defined range. [0, 1] → [0, 100]
  const extendInterpolate = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 150],
    extrapolate: 'extend',
  });

  // 2. Clamp (Locks at min/max outputRange) 'clamp' → Restricts the output to stay within the given range. [0, 1] → [0, 100]
  const clampInterpolate = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 250],
    extrapolateLeft: 'extend',
    extrapolateRight: 'clamp',
  });

  // 3. Identity (Jumps to input value outside of range) ,The output matches the input value. input is 2, output is also
  const identityInterpolate = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [50, 100],
    extrapolate: 'identity',
  });

  // 4. Mixed (Clamp Left, Extend Right)
  const mixedInterpolate = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 150],
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#F4F4F5" size={32} />
        </TouchableOpacity>
        <Text style={styles.header}>Animated Extrapolations</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.section}>
          <Text style={styles.title}>1. Extend (Default)</Text>
          <Text style={styles.description}>
            Follows the output rate even when input goes out of bounds.
            'extend' → Allows the output to go beyond the defined range. [0, 1] → [0, 100]
          </Text>
          <View style={styles.track}>
            <Animated.View
              style={[
                styles.box,
                styles.extendTheme,
                { transform: [{ translateX: extendInterpolate }] },
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>2. Clamp</Text>
          <Text style={styles.description}>
            Strictly stops at the outputRange [0, 150]. Doesn't go negative or exceed 150.
            'clamp' → Restricts the output to stay within the given range. [0, 1] → [0, 100]
          </Text>
          <View style={styles.track}>
            <Animated.View
              style={[
                styles.box,
                styles.clampTheme,
                { transform: [{ translateX: clampInterpolate }] },
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>3. Identity</Text>
          <Text style={styles.description}>
            Inside range [0, 150], outputs [50, 100]. Outside, it returns the raw input value, causing jumps!
            input is 2, output is also.
          </Text>
          <View style={styles.track}>
            <Animated.View
              style={[
                styles.box,
                styles.identityTheme,
                { transform: [{ translateX: identityInterpolate }] },
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>4. Mixed Extrapolation</Text>
          <Text style={styles.description}>
            Clamps on the left (never negative) but extends on the right (exceeds 150).
          </Text>
          <View style={styles.track}>
            <Animated.View
              style={[
                styles.box,
                styles.mixedTheme,
                { transform: [{ translateX: mixedInterpolate }] },
              ]}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>5. DiffClamp & PanResponder</Text>
          <Text style={styles.description}>
            Drag the circle! It's restricted to [-60, 60] on X and Y axis using Animated.diffClamp.
          </Text>
          <View style={styles.dragArea}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.dragBox,
                {
                  transform: [
                    { translateX: diffClampX },
                    { translateY: diffClampY },
                  ],
                },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#12121A',
  },
  container: {
    padding: 24,
    paddingBottom: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F4F4F5',
    letterSpacing: 0.5,
  },
  section: {
    marginVertical: 12,
    backgroundColor: '#1E1E2A',
    padding: 22,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#2D2D3F',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E4E4E5',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#8A8A9E',
    marginBottom: 20,
    lineHeight: 18,
  },
  track: {
    height: 54,
    backgroundColor: '#13131A',
    borderRadius: 27,
    justifyContent: 'center',
    paddingHorizontal: 7,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2A3A',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  extendTheme: {
    backgroundColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
  },
  clampTheme: {
    backgroundColor: '#4ECDC4',
    shadowColor: '#4ECDC4',
  },
  identityTheme: {
    backgroundColor: '#FFE66D',
    shadowColor: '#FFE66D',
  },
  mixedTheme: {
    backgroundColor: '#FF9F1C',
    shadowColor: '#FF9F1C',
  },
  dragArea: {
    height: 200,
    backgroundColor: '#13131A',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3A3A4C',
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  dragBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#9D4EDD',
    shadowColor: '#9D4EDD',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#C77DFF',
  },
});

export default Interpolation;
