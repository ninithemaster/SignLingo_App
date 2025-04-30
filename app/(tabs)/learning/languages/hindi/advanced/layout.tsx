import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AdvancedLayout({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Advanced Hindi Learning</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
});