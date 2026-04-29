import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import Animated, { useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ReanimationBasic = () => {
  const navigation = useNavigation();
  const width = useSharedValue(120);

  const handlePress = () => {
    width.value = withRepeat(withSpring(width.value + 80, {
      damping: 10,
      stiffness: 100,
    }), 3, true);
  };

  const handleReset = () => {
    width.value = withSpring(120, {
      damping: 12,
      stiffness: 90,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reanimation Basic</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Tap the button below to see the shared value animate with a repeated spring effect!
        </Text>

        <View style={styles.animationContainer}>
          <Animated.View
            style={[
              styles.animatedBox,
              { width: width }
            ]}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={handlePress}>
            <MaterialCommunityIcons name="animation-play" color="#FFFFFF" size={24} style={styles.btnIcon} />
            <Text style={styles.actionButtonText}>Animate Width</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} activeOpacity={0.8} onPress={handleReset}>
            <MaterialCommunityIcons name="refresh" color="#6366F1" size={24} style={styles.btnIcon} />
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReanimationBasic;

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
    padding: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  animationContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBox: {
    height: 120,
    backgroundColor: '#6366F1', // Indigo color matching other screens
    borderRadius: 24,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 40,
    gap: 16,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#6366F1',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16, // spacing for older React Native versions if gap isn't supported purely
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  resetButton: {
    flexDirection: 'row',
    backgroundColor: '#EEF2FF',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  resetButtonText: {
    color: '#6366F1',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  btnIcon: {
    marginRight: 8,
  }
});
