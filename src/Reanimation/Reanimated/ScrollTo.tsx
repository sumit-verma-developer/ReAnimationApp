import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import Animated, {
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

const ITEM_COUNT = 10;
const ITEM_SIZE = 100;
const ITEM_MARGIN = 10;

const ScrollTo = () => {
  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scroll = useSharedValue<number>(0);
  const items = Array.from({length: ITEM_COUNT}).map((_, i) => i);

  // Its not a good thing beacuse of performance issue Faltlist scroll use krna chahiye

  useDerivedValue(() => {
    scrollTo(
      animatedRef,
      0,
      scroll.value * (ITEM_SIZE + 2 * ITEM_MARGIN),
      true,
    );
  });

  return (
    <View style={styles.container}>
      <Incrementor increment={-1} scroll={scroll} />
      <View style={styles.scrollContainer}>
        <Animated.ScrollView ref={animatedRef}>
          {items.map(i => (
            <View style={styles.box} key={i}>
              <Text style={styles.boxText}>{i}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
      <Incrementor increment={1} scroll={scroll} />
    </View>
  );
};

const Incrementor = ({
  increment,
  scroll,
}: {
  increment: number;
  scroll: SharedValue<number>;
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        onPress={() => {
          scroll.value = (scroll.value + increment + ITEM_COUNT) % ITEM_COUNT;
        }}
        title={`Scroll${Math.abs(increment)} ${increment > 0 ? 'down' : 'up'}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  scrollContainer: {
    width: '100%',
    height: 250,
    alignItems: 'center',
  },
  box: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    borderRadius: 12,
    backgroundColor: '#8eada7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    textAlign: 'center',
  },
});
export default ScrollTo;
