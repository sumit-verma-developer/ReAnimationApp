import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  scrollTo,
  SharedValue,
} from 'react-native-reanimated';
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';



const ITEM_COUNT = 30; // Increased to showcase FlatList performance
const ITEM_HEIGHT = 160;
const ITEM_MARGIN = 16;
const FULL_ITEM_SIZE = ITEM_HEIGHT + 2 * ITEM_MARGIN;

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FDCB6E', '#6C5CE7',
  '#FF8A65', '#00B894', '#0984E3', '#E84393', '#00CEC9'
];

interface AnimatedCardProps {
  index: number;
  scrollOffset: SharedValue<number>;
}

const AnimatedCard = ({ index, scrollOffset }: AnimatedCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    // Determine the top Y position of the item 
    const itemPosition = index * FULL_ITEM_SIZE;

    // Smoothly scale down as the item moves up past the top edge
    const scale = interpolate(
      scrollOffset.value,
      [-1, 0, itemPosition, itemPosition + FULL_ITEM_SIZE],
      [1, 1, 1, 0.8],
      Extrapolation.CLAMP
    );

    // Fade out as the item moves up beyond the top edge
    const opacity = interpolate(
      scrollOffset.value,
      [-1, 0, itemPosition, itemPosition + FULL_ITEM_SIZE],
      [1, 1, 1, 0],
      Extrapolation.CLAMP
    );

    // Parallax push effect to make it feel like cards stick behind
    const translateY = interpolate(
      scrollOffset.value,
      [-1, 0, itemPosition, itemPosition + FULL_ITEM_SIZE],
      [0, 0, 0, FULL_ITEM_SIZE * 0.4],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        { scale },
        { translateY }
      ],
    };
  });

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      <View style={[styles.card, { backgroundColor: COLORS[index % COLORS.length] }]}>
        <View style={styles.cardContent}>
          <Text style={styles.cardNumber}>{String(index + 1).padStart(2, '0')}</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>Animated Card</Text>
            <Text style={styles.cardSubtitle}>Scroll to see the magic</Text>
          </View>
        </View>
        <View style={styles.cardImageContainer}>
          <View style={styles.cardCircle} />
        </View>
      </View>
    </Animated.View>
  );
};

const ScrollTo = () => {
  const animatedRef = useAnimatedRef<Animated.FlatList<number>>();
  const scrollIndex = useSharedValue<number>(0);
  const scrollOffset = useSharedValue<number>(0);

  const navigation = useNavigation()

  const items = Array.from({ length: ITEM_COUNT }).map((_, i) => i);

  // Drive scroll smoothly to specific index
  useDerivedValue(() => {
    scrollTo(
      animatedRef,
      0,
      scrollIndex.value * FULL_ITEM_SIZE,
      true,
    );
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <MaterialComunityIcon name="arrow-left" size={30} color="#fff" onPress={() => {
            navigation.goBack()
          }} />
          <Text style={styles.headerTitle}>Explore</Text>
        </View>

        <Text style={styles.headerSubtitle}>Discover smooth FlatList animations</Text>
      </View>

      <View style={styles.scrollContainer}>
        <Animated.FlatList
          ref={animatedRef}
          data={items}
          keyExtractor={(item) => item.toString()}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          getItemLayout={(_, index) => ({
            length: FULL_ITEM_SIZE,
            offset: FULL_ITEM_SIZE * index,
            index,
          })}
          renderItem={({ index }) => (
            <AnimatedCard index={index} scrollOffset={scrollOffset} />
          )}
        />
      </View>

      <View style={styles.bottomBar}>
        <Incrementor increment={-1} scrollIndex={scrollIndex} icon="↑" label="Prev" />
        <Incrementor increment={1} scrollIndex={scrollIndex} icon="↓" label="Next" />
      </View>
    </View>
  );
};

const Incrementor = ({
  increment,
  scrollIndex,
  icon,
  label
}: {
  increment: number;
  scrollIndex: SharedValue<number>;
  icon: string;
  label: string;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.button}
      onPress={() => {
        let nextIndex = scrollIndex.value + increment;
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex >= ITEM_COUNT) nextIndex = ITEM_COUNT - 1;
        scrollIndex.value = nextIndex;
      }}
    >
      <View style={styles.buttonIconContainer}>
        <Text style={styles.buttonIcon}>{icon}</Text>
      </View>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#0F172A',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 6,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  cardContainer: {
    marginVertical: ITEM_MARGIN,
    height: ITEM_HEIGHT,
  },
  card: {
    flex: 1,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  cardContent: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 8,
  },
  cardTextContainer: {
    marginTop: 'auto',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  cardImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 32,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#334155',
  },
  buttonIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#38BDF8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonIcon: {
    fontSize: 18,
    color: '#0F172A',
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
});

export default ScrollTo;
