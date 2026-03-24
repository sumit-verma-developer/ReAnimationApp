import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { SearchBarProps } from './types';
import { typography } from '@utils/typography';

const SearchBar = ({ containerStyle }: SearchBarProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <AntDesign name={'search1'} size={20} style={styles.search} />
      <Text style={styles.label}>Search</Text>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 100,
  },
  search: {
    marginRight: 10,
  },
  label: {
    fontFamily: typography.medium,
    fontSize: 16,
    color: '#a1a1a1',
  },
});
