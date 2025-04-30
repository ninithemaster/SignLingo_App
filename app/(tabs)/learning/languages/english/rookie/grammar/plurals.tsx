import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function PersonalPronounsScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'Types of Personal Pronouns',
      content: [
        {
          description: '**I** - Used for the person speaking.',
          example: 'Example: "I am happy."',
        },
        {
          description: '**You** - Used when talking to the person or people you are addressing. This can refer to one person or more than one person. It is the same for singular and plural.',
          example: 'Example: "You are reading a book."',
        },
        {
          description: '**He** - Used for a male person or animal.',
          example: 'Example: "He is running."',
        },
        {
          description: '**She** - Used for a female person or animal.',
          example: 'Example: "She is studying."',
        },
        {
          description: '**It** - Used for objects, animals, or things that are not male or female.',
          example: 'Example: "It is raining."',
        },
        {
          description: '**We** - Used for the speaker and others.',
          example: 'Example: "We are going to the park."',
        },
        {
          description: '**They** - Used for more than one person or thing.',
          example: 'Example: "They are my friends."',
        },
      ],
    },
    {
      title: 'Why Are Personal Pronouns Important?',
      content: [
        {
          description: 'Pronouns help make sentences simpler by eliminating the need to repeat nouns. For example:',
          examples: [
            'Without pronouns: "John went to John\'s house. John met John\'s friend there."',
            'With pronouns: "John went to his house. He met his friend there."',
          ],
        },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Personal Pronouns</Text>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
          {section.content.map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.content, { color: theme.text }]}>{item.description}</Text>
              {'example' in item && <Text style={[styles.example, { color: theme.text }]}>{item.example}</Text>}
              {'examples' in item && item.examples.map((example, exIdx) => (
                <Text key={exIdx} style={[styles.example, { color: theme.text }]}>{example}</Text>
              ))}
            </TouchableOpacity>
          ))}
        </View>
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
