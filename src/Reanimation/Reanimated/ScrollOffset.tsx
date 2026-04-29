import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Animated, {
  DerivedValue,
  useAnimatedRef,
  useDerivedValue,
  useScrollOffset,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  useAnimatedProps,
  SharedValue,
} from 'react-native-reanimated';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ITEM_COUNT = 30;
const ITEM_SIZE = 140;
const ITEM_MARGIN = 20;
const FULL_ITEM_SIZE = ITEM_SIZE + 2 * ITEM_MARGIN;

// Bright neon colors for individual cards
const COLORS = [
  '#FF5F6D', '#FFC371', // Orange to pink
  '#36D1DC', '#5B86E5', // Cyan to blue
  '#834D9B', '#D04ED6', // Purple
  '#11998e', '#38ef7d', // Green
  '#F00000', '#DC281E', // Red
];

interface AnimatedCardProps {
  index: number;
  offset: SharedValue<number>;
  isHorizontal: boolean;
}

const AnimatedCard = ({ index, offset, isHorizontal }: AnimatedCardProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    // The position of THIS specific card in the scroll list
    const position = index * FULL_ITEM_SIZE;

    // Interpolation distance config
    const inputRange = [
      position - FULL_ITEM_SIZE * 2,
      position - FULL_ITEM_SIZE,
      position,
      position + FULL_ITEM_SIZE,
      position + FULL_ITEM_SIZE * 2,
    ];

    // Scale down when leaving the focus window
    const scale = interpolate(
      offset.value,
      inputRange,
      [0.6, 0.85, 1, 0.85, 0.6],
      Extrapolation.CLAMP
    );

    // Fade slightly
    const opacity = interpolate(
      offset.value,
      inputRange,
      [0.2, 0.6, 1, 0.6, 0.2],
      Extrapolation.CLAMP
    );

    // Subtle rotation or translation
    const rotateZ = interpolate(
      offset.value,
      [position - FULL_ITEM_SIZE, position, position + FULL_ITEM_SIZE],
      [isHorizontal ? 15 : -15, 0, isHorizontal ? -15 : 15],
      Extrapolation.CLAMP
    );

    // Parabolic arc translation
    const popTranslation = interpolate(
      offset.value,
      [position - FULL_ITEM_SIZE * 1.5, position, position + FULL_ITEM_SIZE * 1.5],
      [100, 0, 100],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [
        { scale },
        { rotateZ: isHorizontal ? `${rotateZ}deg` : '0deg' },
        { translateY: isHorizontal ? popTranslation * 0.8 : 0 }
      ],
    };
  });

  const cardColor = COLORS[index % COLORS.length];

  return (
    <Animated.View style={[styles.boxContainer, animatedStyle]}>
      <View style={[styles.box, { backgroundColor: cardColor, shadowColor: cardColor }]}>
        <Text style={styles.boxText}>{String(index + 1).padStart(2, '0')}</Text>
      </View>
    </Animated.View>
  );
};

// Properly implement Animated Text using TextInput so it naturally updates without React re-renders!
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({ text: true });

function AnimatedText({ text, style, ...props }: { text: DerivedValue<string>, style?: any }) {
  const animatedProps = useAnimatedProps(() => {
    return {
      text: text.value,
      defaultValue: text.value,
    } as any;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={style}
      {...props}
      animatedProps={animatedProps}
    />
  );
}

const ScrollOffset = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const offset = useScrollOffset(animatedRef);

  const navigation = useNavigation()

  const text = useDerivedValue(
    () => `OFFSET  ${offset.value.toFixed(0)}`
  );

  const [isScrollHorizontal, setIsScrollHorizontal] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      {/* Header section with toggle and offset overlay! */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <MaterialCommunityIcon name="arrow-left" size={30} color="#fff" onPress={() => {
            navigation.goBack()
          }} />
          <Text style={styles.headerTitle}>Scroll Dynamics</Text>
        </View>
        <AnimatedText text={text} style={styles.offsetText} />
      </View>

      <View style={styles.scrollWrapper}>
        <Animated.ScrollView
          ref={animatedRef}
          contentContainerStyle={[
            styles.scrollContent,
            isScrollHorizontal ? styles.scrollContentHorizontal : styles.scrollContentVertical
          ]}
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal={isScrollHorizontal}
          snapToInterval={FULL_ITEM_SIZE}
          decelerationRate="fast"
        >
          {Array.from({ length: ITEM_COUNT }).map((_, index) => (
            <AnimatedCard key={index} index={index} offset={offset} isHorizontal={isScrollHorizontal} />
          ))}
        </Animated.ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.toggleButton}
          onPress={() => setIsScrollHorizontal(!isScrollHorizontal)}
        >
          <MaterialCommunityIcon
            name={isScrollHorizontal ? 'swap-vertical' : 'swap-horizontal'}
            size={24}
            color="#0F172A"
            style={{ marginRight: 12 }}
          />
          <Text style={styles.buttonText}>
            Switch to {isScrollHorizontal ? 'Vertical' : 'Horizontal'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScrollOffset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 25,
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 8,
    letterSpacing: 1,
  },
  offsetText: {
    color: '#38BDF8',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: 2,
  },
  scrollWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
  },
  scrollContentVertical: {
    paddingVertical: height * 0.35,
    paddingHorizontal: 0,
  },
  scrollContentHorizontal: {
    paddingHorizontal: width * 0.35,
    paddingVertical: 0,
    flexDirection: 'row',
  },
  boxContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginVertical: ITEM_MARGIN,
    marginHorizontal: ITEM_MARGIN,
  },
  box: {
    flex: 1,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.6,
    shadowRadius: 18,
    elevation: 10,
  },
  boxText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  footer: {
    padding: 30,
    paddingBottom: 50,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    alignItems: 'center',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#38BDF8',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 100,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonText: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
