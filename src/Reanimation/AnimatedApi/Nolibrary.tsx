import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

const Nolibrary = () => {
  // VCF (value component function)
  const [position, setPosition] = useState(0);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
  //   interval = setInterval(() => {
  //     setPosition(prev => (prev < 200 ? prev + 5 : 0));
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.box, { marginLeft: position }]} />;
    </View>
  )
};

export default Nolibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // lightGrey
    backgroundColor: '#5E5E5E'
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
});
