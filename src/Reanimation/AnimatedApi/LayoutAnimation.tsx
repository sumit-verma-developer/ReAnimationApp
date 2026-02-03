import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
} from 'react-native';
import React, {useState} from 'react';

const LayoutAnimationComponent = () => {
  // layout pe work krne ke liye
  //resize,adding , removing views

  const [expanded, setExpanded] = useState(false);

  const toggleExoand = () => {
    // using spring also 
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleExoand}>
        <Text>{expanded ? 'Collaps' : 'Expand'} </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={[styles.button,{marginTop:12}]}>
          <Text style={{}}>
            HI there i ma expainded 
          </Text>
        </View>
      )}
    </View>
  );
};

export default LayoutAnimationComponent;

const styles = StyleSheet.create({
  container: {
    
  },
  button: {
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
    width: 120,
    backgroundColor: 'yellow',
    borderRadius: 12,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: 'black',
  },
});
