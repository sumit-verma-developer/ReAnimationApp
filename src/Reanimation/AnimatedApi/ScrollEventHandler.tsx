import {Animated, StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useRef} from 'react';

const Header_Height = 80;
const DATA = Array.from({length: 30}, (_, i) => `Item${i + 1}`);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ScrollEventHandler = () => {
  const scrollY = useRef(new Animated.Value(0));
  const HeaderHeight = scrollY.current.interpolate({
    inputRange: [0, Header_Height],
    outputRange: [Header_Height, 40],
    extrapolate: 'clamp',
  });

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.ItemText}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, {height: HeaderHeight}]}>
        <Text style={styles.headerText}>collapsible Header</Text>
      </Animated.View>
      <AnimatedFlatList
        data={DATA}
        keyExtractor={(data, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
          {useNativeDriver: false},
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  flatList: {
    backgroundColor: 'transparent',
  },
  listContent: {
    paddingTop: Header_Height + 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#444',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  ItemText: {
    fontSize: 16,
    color: '#ccc',
  },
});
