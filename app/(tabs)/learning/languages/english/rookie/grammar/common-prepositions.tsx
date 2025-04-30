import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

const prepositionsExamples = [
  { 
    preposition: 'in', 
    example: 'The book is in the bag.', 
    explanation: 'Used when something is inside or within a place, container, or space.',
    additionalExamples: [
      { example: 'She is in the room.', explanation: 'She is inside the room.' },
      { example: 'I live in Mumbai.', explanation: 'I live in a place, Mumbai.' },
      { example: 'There is milk in the bottle.', explanation: 'The milk is inside the bottle.' }
    ]
  },
  { 
    preposition: 'on', 
    example: 'The cat is on the table.', 
    explanation: 'Used when something is positioned on the surface of another thing.',
    additionalExamples: [
      { example: 'The book is on the shelf.', explanation: 'The book is placed on the surface of the shelf.' },
      { example: 'The picture is on the wall.', explanation: 'The picture is positioned on the surface of the wall.' },
      { example: 'I saw the video on my phone.', explanation: 'The video was viewed on the phone screen.' }
    ]
  },
  { 
    preposition: 'at', 
    example: 'I am at the park.', 
    explanation: 'Used to indicate a specific point or location, often referring to places, events, or times.',
    additionalExamples: [
      { example: 'She is at the bus stop.', explanation: 'She is at a specific location (the bus stop).' },
      { example: 'They are at the cinema.', explanation: 'They are at a specific location (the cinema).' },
      { example: 'I will meet you at 5 PM.', explanation: 'I will meet you at a specific time (5 PM).' }
    ]
  },
  { 
    preposition: 'to', 
    example: 'I am going to the store.', 
    explanation: 'Used to indicate movement toward a specific direction, goal, or location.'
  },
  { 
    preposition: 'from', 
    example: 'I am coming from school.', 
    explanation: 'Used to indicate the starting point or source of something, often used for the origin of movement.'
  }
];

export default function Prepositions() {
  const { theme } = useAppTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Common Prepositions</Text>
      <Text style={[styles.content, { color: theme.text }]}>
        Prepositions describe the position or movement of things. Below are some common prepositions in English:
      </Text>
      
      {prepositionsExamples.map((item, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.prepositionTitle, { color: theme.text }]}>{item.preposition}</Text>
          <Text style={[styles.content, { color: theme.text }]}><Text style={styles.bold}>Example:</Text> {item.example}</Text>
          <Text style={[styles.content, { color: theme.text }]}><Text style={styles.bold}>Explanation:</Text> {item.explanation}</Text>
          
          {item.additionalExamples && item.additionalExamples.length > 0 && (
            <View style={styles.additionalExamples}>
              <Text style={[styles.subTitle, { color: theme.text }]}>Additional Examples:</Text>
              {item.additionalExamples.map((ex, i) => (
                <View key={i} style={styles.additionalExample}>
                  <Text style={[styles.content, { color: theme.text }]}><Text style={styles.bold}>Example:</Text> {ex.example}</Text>
                  <Text style={[styles.content, { color: theme.text }]}><Text style={styles.bold}>Explanation:</Text> {ex.explanation}</Text>
                </View>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  prepositionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  additionalExamples: {
    marginTop: 10,
  },
  additionalExample: {
    marginBottom: 10,
  },
});
