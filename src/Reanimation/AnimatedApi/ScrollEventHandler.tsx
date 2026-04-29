import {
  Animated,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import React, { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight ? StatusBar.currentHeight : 24;
const HEADER_MIN_HEIGHT = STATUSBAR_HEIGHT + 56;
const HEADER_MAX_HEIGHT = HEADER_MIN_HEIGHT + 100;

const DATA = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ITEM_HEIGHT = 80;
const MARGIN_BOTTOM = 16;
const ITEM_SIZE = ITEM_HEIGHT + MARGIN_BOTTOM;

const ScrollEventHandler = () => {
  const scrollY = useRef(new Animated.Value(0));
  const navigation = useNavigation();

  // Moving to translation instead of height for native driver support
  const headerTranslateY = scrollY.current.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    extrapolate: 'clamp',
  });

  // Fade out large title when scrolling up
  const headerTitleOpacity = scrollY.current.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT - 30],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Fade in small header title when collapsed
  const headerSmallTitleOpacity = scrollY.current.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT - 30,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
    ],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const renderItem = ({ item, index }: any) => {
    // Determine the position thresholds for the item entering the header zone
    const scroll1 = ITEM_SIZE * index;
    const scroll2 = ITEM_SIZE * (index + 2);

    // Adjust scroll input values to ensure strictly increasing ranges to prevent errors
    const inputRange =
      scroll1 <= 0 ? [-1, 0, scroll2] : [-1, 0, scroll1, scroll2];

    const scaleOutput = scroll1 <= 0 ? [1, 1, 0.7] : [1, 1, 1, 0.7];
    const opacityOutput = scroll1 <= 0 ? [1, 1, 0] : [1, 1, 1, 0];

    // Scale down items as they hit the top (Zoom Out Custom Effect)
    const scale = scrollY.current.interpolate({
      inputRange,
      outputRange: scaleOutput,
      extrapolate: 'clamp',
    });

    const opacity = scrollY.current.interpolate({
      inputRange,
      outputRange: opacityOutput,
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.itemContainer, { transform: [{ scale }], opacity }]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.replace('Item', '').trim()}</Text>
        </View>
        <Text style={styles.ItemText}>{item}</Text>
        <View style={styles.actionButton}>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#CBD5E1" />
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Background that translates up for Native Driver performance */}
      <Animated.View style={[styles.headerBackground, { transform: [{ translateY: headerTranslateY }] }]}>
        <Animated.View style={[styles.headerBottom, { opacity: headerTitleOpacity }]}>
          <Text style={styles.headerTitle}>Animated Scroll</Text>
          <Text style={styles.headerSubtitle}>Items zoom & fade automatically</Text>
        </Animated.View>
      </Animated.View>

      {/* Fixed Header Top to always keep navigation visible */}
      <View style={styles.headerTopContainer}>
        <View style={[styles.headerTop, { marginTop: STATUSBAR_HEIGHT }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="chevron-left" color="#FFFFFF" size={32} />
          </TouchableOpacity>
          <Animated.Text style={[styles.collapsedHeaderTitle, { opacity: headerSmallTitleOpacity }]}>
            Scrolling List
          </Animated.Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <AnimatedFlatList
        data={DATA}
        keyExtractor={(data, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={styles.flatList}
      />
    </View>
  );
};

export default ScrollEventHandler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9', // Light Slate for premium feel
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    backgroundColor: '#4F46E5', // Deep Indigo
    zIndex: 1000,
    elevation: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  headerTopContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1001,
    elevation: 9,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 56, // Accessible touch target height
  },
  backButton: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  collapsedHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerBottom: {
    position: 'absolute',
    bottom: 24,
    left: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#E0E7FF', // Light Indigo
    marginTop: 6,
  },
  flatList: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingTop: HEADER_MAX_HEIGHT + 24, // Clear space for header
    paddingBottom: 40,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    marginBottom: MARGIN_BOTTOM,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginHorizontal: 20,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4F46E5',
  },
  ItemText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
