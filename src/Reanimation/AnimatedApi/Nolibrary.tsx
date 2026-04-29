import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

const Nolibrary = () => {
  // VCF (value component function)
  const [position, setPosition] = useState(0);
  const navigation = useNavigation()
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);



  const runAnimation = () => {
    setPosition((prev) => {
      const nextPos = prev < 200 ? prev + 3 : 0;
      return nextPos;
    })

    // recursively call the next   frame
    animationRef.current = requestAnimationFrame(runAnimation)
  };

  const handleStart = () => {
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(runAnimation);
    }
  };

  const handleStop = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  // CLEANUP: Prevent memory leaks if component unmounts while animating
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <MaterialCommunityIcons name='chevron-left' color={'black'} size={40} style={{ marginTop: 30 }} onPress={() => { navigation.goBack() }} />
      </View>
      <View style={[styles.box, { marginLeft: position }]} >
        <Text style={styles.text}>No library text</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>StartAnimation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#f5906eff' }]} onPress={handleStop}>
          <Text style={styles.buttonText}>StopAnimation</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default Nolibrary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    height: 70,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#c7c9c8ff',
  },
  box: {
    width: 200,
    height: 100,
    backgroundColor: '#33c4ecff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  text: {
    color: '#0000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center'

  },
  button: {
    backgroundColor: '#348f4cff',
    padding: 10,
    borderRadius: 10,
    width: 160,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }

});
