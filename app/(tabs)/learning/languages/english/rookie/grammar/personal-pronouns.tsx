import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function VerbTensesScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'Verb Tenses',
      content: [
        {
          subTitle: 'Present Simple',
          description: 'Describes actions that happen regularly, facts, or general truths.',
          example: 'Example: "I play football."',
        },
        // Add other tenses here...
      ],
    },
    {
      title: 'Personal Pronouns',
      content: [
        {
          subTitle: 'Personal Pronouns',
          description: 'Personal pronouns are used to replace nouns in a sentence. They help to avoid repetition and make sentences simpler.',
          examples: [
            '1. **I** - Used for the speaker (first person, singular). Example: "I am happy."',
            '2. **You** - Used for the person being spoken to (second person, singular or plural). Example: "You are reading."',
            '3. **He** - Used for a male person or animal (third person, singular). Example: "He is playing football."',
            '4. **She** - Used for a female person or animal (third person, singular). Example: "She is reading a book."',
            '5. **It** - Used for objects, animals, or things that are not male or female (third person, singular). Example: "It is raining."',
            '6. **We** - Used for the speaker and others (first person, plural). Example: "We are going to the park."',
            '7. **They** - Used for more than one person or thing (third person, plural). Example: "They are my friends."',
          ],
        },
        {
          subTitle: 'Why Use Pronouns?',
          description: 'Pronouns help avoid repeating the same nouns over and over. They make sentences clearer and more natural.',
        },
      ],
    },
    {
      title: 'Activity',
      content: [
        {
          description: 'Replace the names in the sentences with the correct personal pronouns.',
          examples: [
            '1. "John is going to the store." → "He is going to the store."',
            '2. "Maria is studying." → "She is studying."',
            '3. "The dog is barking." → "It is barking."',
            '4. "Tom and I are friends." → "We are friends."',
            '5. "You and I are going to the movie." → "We are going to the movie."',
          ],
        },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Verb Tenses & Personal Pronouns</Text>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
          {section.content.map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              {'subTitle' in item && <Text style={[styles.subTitle, { color: theme.text }]}>{item.subTitle}</Text>}
              <Text style={[styles.content, { color: theme.text }]}>{item.description}</Text>
              {('examples' in item) && item.examples?.map((example, exIdx) => (
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
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
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
