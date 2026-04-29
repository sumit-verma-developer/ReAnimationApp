import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  useAnimatedValue,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedEvent = () => {
  const navigation = useNavigation();
  // pan Responder , Animated.event(get Dimension value)

  // animated.event(get value from event) like drage mein dx dy ko get krna or kis postion mein find krna 

  // fork Event - event ko attack krne ke liye  gesture ke saath. older removed in newer version 
  //unforkEvent- event ko clerup krne ke liye . older removed in newer version 

  // panResponder - gesture detect krne ke liye 
  // 2D dimension support nhi krte hain native event es liye useNativeDriver:false


  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scale = useAnimatedValue(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1.2, // Slightly scaled up for better UI feedback
          useNativeDriver: true,
        }).start(); // Added .start() so this animation actually runs!
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false },
      ),
      // 2d dimension support nhi krte hain native event es liye useNativeDriver:false

      onPanResponderRelease: (evt, gestureState) => {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }),
          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      {/* Header Implementation */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animated Event</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        {/* Instruction Card for Context */}
        <View style={styles.instructionCard}>
          <MaterialCommunityIcons name="gesture-swipe-horizontal" size={32} color="#6366F1" style={styles.icon} />
          <Text style={styles.instructionTitle}>Pan Responder</Text>
          <Text style={styles.instructionText}>
            Drag the box around the screen. Notice the scale effect when grabbed and the spring effect on release.
          </Text>
        </View>

        {/* Draggable Area */}
        <View style={styles.draggableArea}>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.box,
              {
                transform: [
                  {
                    translateX: pan.x.interpolate({
                      inputRange: [-120, 120],  // Limit left and right
                      outputRange: [-120, 120],
                      extrapolate: 'clamp',     // Prevents going beyond limits
                    }),
                  },
                  {
                    translateY: pan.y.interpolate({
                      inputRange: [-180, 180],  // Limit top and bottom
                      outputRange: [-180, 180],
                      extrapolate: 'clamp',     // Prevents going beyond limits
                    }),
                  },
                  { scale }
                ]
              },
            ]}
          >
            <MaterialCommunityIcons name="drag" size={36} color="#FFFFFF" />
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default AnimatedEvent;

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
  content: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  instructionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 12,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  draggableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: 32,
    marginBottom: 40,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100, // Make sure it floats above container edges
  },
});
