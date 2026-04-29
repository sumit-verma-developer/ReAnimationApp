import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
  withRepeat,
  withDelay,
  withClamp,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const Method = () => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleReset = () => {
    translateX.value = withSpring(0, { damping: 12, stiffness: 90 });
  };

  const methods = [
    {
      title: 'withTiming',
      subtitle: 'Smooth duration-based animation',
      icon: 'timer-outline',
      color: '#3B82F6',
      action: () => {
        translateX.value = 0; 
        translateX.value = withTiming(width / 2 - 60, { duration: 1000 });
      }
    },
    {
      title: 'withSpring',
      subtitle: 'Physics-based spring animation',
      icon: 'axis-z-rotate-clockwise',
      color: '#8B5CF6',
      action: () => {
        translateX.value = withSpring(width / 2 - 60, { damping: 10, stiffness: 100 });
      }
    },
    {
      title: 'withDecay',
      subtitle: 'Momentum-based deceleration',
      icon: 'chart-bell-curve',
      color: '#10B981',
      action: () => {
        // Needs some initial velocity
        translateX.value = 0;
        translateX.value = withDecay({ velocity: 500, deceleration: 0.98 });
      }
    },
    {
      title: 'withRepeat',
      subtitle: 'Looping animations automatically',
      icon: 'repeat',
      color: '#F59E0B',
      action: () => {
        translateX.value = 0;
        translateX.value = withRepeat(
          withTiming(width / 2 - 60, { duration: 500 }),
          3,
          true,
        );
      }
    },
    {
      title: 'withDelay',
      subtitle: 'Starts animation after a pause',
      icon: 'alarm',
      color: '#EC4899',
      action: () => {
        translateX.value = 0;
        translateX.value = withDelay(1000, withTiming(width / 2 - 60, { duration: 500 }));
      }
    },
    {
      title: 'withClamp',
      subtitle: 'Restricts animation boundaries',
      icon: 'lock-outline',
      color: '#EF4444',
      action: () => {
        translateX.value = 0;
        translateX.value = withClamp(
          {
            min: -80,
            max: 80,
          },
          withSpring(400, { damping: 5, stiffness: 50 }),
        );
      }
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Animation Methods</Text>
        <TouchableOpacity style={styles.resetButtonIcon} onPress={handleReset}>
          <MaterialCommunityIcons name="refresh" color="#6366F1" size={24} />
        </TouchableOpacity>
      </View>

      {/* Stage */}
      <View style={styles.stageContainer}>
         <View style={styles.track}>
            <Animated.View style={[styles.animatedBox, animatedStyle]}>
               <MaterialCommunityIcons name="rocket-launch" size={32} color="#FFFFFF" />
            </Animated.View>
         </View>
         <Text style={styles.stageLabel}>Animation Stage</Text>
      </View>

      {/* Controls */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Methods</Text>
        {methods.map((method, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.methodCard}
            activeOpacity={0.8}
            onPress={method.action}
          >
            <View style={[styles.iconContainer, { backgroundColor: method.color + '15' }]}>
              <MaterialCommunityIcons name={method.icon} size={28} color={method.color} />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodTitle}>{method.title}</Text>
              <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Method;

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
  resetButtonIcon: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  stageContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.02,
    shadowRadius: 16,
    elevation: 2,
    zIndex: 5,
  },
  track: {
    width: '100%',
    alignItems: 'center',
  },
  animatedBox: {
    width: 64,
    height: 64,
    backgroundColor: '#6366F1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  stageLabel: {
    marginTop: 32,
    fontSize: 14,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
    marginLeft: 4,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  methodSubtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
});
