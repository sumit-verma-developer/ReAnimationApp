import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Enable LayoutAnimation on Android for ios also
if (Platform.OS === 'android' || Platform.OS === 'ios') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const LayoutAnimationComponent = () => {
  // layout pe work krne ke liye
  //resize,adding , removing views

  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    // using spring also 
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" color="#1A1A1A" size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Layout Animation</Text>
        <View style={{ width: 44 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity
            style={[styles.button, expanded && styles.buttonExpanded]}
            onPress={toggleExpand}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{expanded ? 'Collapse' : 'Expand'}</Text>
          </TouchableOpacity>
          {expanded && (
            <View style={styles.expandedView}>
              <Text style={styles.expandedText}>
                Hi there! I am expanded using LayoutAnimation. Notice the smooth spring effect when opening and closing.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LayoutAnimationComponent;

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
    paddingTop: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 5,
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#6366F1', // Indigo color
    borderRadius: 16,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonExpanded: {
    backgroundColor: '#4F46E5', // Darker indigo when expanded
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  expandedView: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#EEF2FF', // Light Indigo background
    borderRadius: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  expandedText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4338CA', // Dark Indigo text
    lineHeight: 24,
    textAlign: 'center',
  },
});
