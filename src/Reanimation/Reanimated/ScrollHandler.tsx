import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View, Platform } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HEADER_MAX_HEIGHT = 250;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 120 : 130;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const ScrollHandler = () => {
  const scrollY = useSharedValue(0);
  const navigation = useNavigation()

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, SCROLL_DISTANCE],
        [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        'clamp',
      ),
      borderBottomLeftRadius: interpolate(
        scrollY.value,
        [0, SCROLL_DISTANCE],
        [32, 0],
        'clamp',
      ),
      borderBottomRightRadius: interpolate(
        scrollY.value,
        [0, SCROLL_DISTANCE],
        [32, 0],
        'clamp',
      ),
    };
  });

  const titleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [1, 0.85],
      'clamp',
    );

    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, -5],
      'clamp',
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE],
      [0, SCROLL_DISTANCE * 0.6],
      'clamp',
    );

    const scale = interpolate(
      scrollY.value,
      [-100, 0, SCROLL_DISTANCE],
      [1.3, 1, 1],
      'clamp',
    );

    const opacity = interpolate(
      scrollY.value,
      [0, SCROLL_DISTANCE * 0.7, SCROLL_DISTANCE],
      [1, 0.5, 0],
      'clamp',
    );

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {Array.from({ length: 20 }).map((_, index) => (
            <View key={index} style={styles.card}>
              <View
                style={[
                  styles.cardIndicator,
                  { backgroundColor: `hsl(${(index * 35) % 360}, 85%, 65%)` },
                ]}
              />
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Stunning Feature {index + 1}</Text>
                <Text style={styles.cardDesc}>
                  Discover the fluid, native-driven animations with custom scroll
                  handlers and interpolated styles dynamically.
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Animated.ScrollView>

      {/* Header layered correctly above ScrollView */}
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Image
          source={{
            uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
          }}
          style={[styles.headerBackground, imageStyle]}
          resizeMode="cover"
        />
        {/* <View style={styles.overlay} /> */}
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <View style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={30} color="#fff" onPress={() =>
              navigation.goBack()
            } />
            <Text style={styles.title}>Dynamic Header</Text>
          </View>

          <Text style={styles.subtitle}>Fluid interactions via Reanimated</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default ScrollHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1B4B', // Deep indigo background when image fades out
    overflow: 'hidden',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Enhances text legibility
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    alignItems: 'flex-start', // Aligns everything securely to the left
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 4,
    marginLeft: 42, // 30 (icon) + 12 (gap) = 42px offset to align with the Title text perfectly
  },
  scrollContent: {
    paddingTop: HEADER_MAX_HEIGHT + 24,
    paddingBottom: 40,
    paddingHorizontal: 16,
  },
  content: {
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  cardIndicator: {
    width: 6,
    height: '100%',
  },
  cardBody: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  }
});
