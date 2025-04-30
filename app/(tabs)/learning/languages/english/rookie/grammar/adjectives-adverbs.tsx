import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function AdjectivesAdverbsScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'Adjectives',
      content: 'Adjectives are words that describe or modify nouns. They give us more information about a person, place, thing, or idea.',
      examples: [
        'Examples of adjectives include: beautiful, tall, small, interesting, etc.',
        'Adjectives are typically placed:',
        '1. Before the noun they modify: "She has a beautiful dress."',
        '2. After a linking verb (e.g., be, seem, feel): "The sky is blue."',
        'Types of adjectives:',
        '- Descriptive Adjectives: "She wore a red dress."',
        '- Quantitative Adjectives: "I have three cats."',
        '- Demonstrative Adjectives: "I want this cake."',
        '- Possessive Adjectives: "That is my book."',
        '- Interrogative Adjectives: "Which book do you like?"',
      ],
    },
    {
      title: 'Adverbs',
      content: 'Adverbs are words that describe or modify verbs, adjectives, or other adverbs. They provide more information about how, when, where, or to what extent something happens.',
      examples: [
        'Examples of adverbs include: quickly, very, often, quite, etc.',
        'Adverbs are placed:',
        '1. After the verb they modify: "She sings beautifully."',
        '2. Before the adjective they modify: "The movie was extremely interesting."',
        '3. Before the adverb they modify: "She ran very quickly."',
        'Types of adverbs:',
        '- Adverbs of Manner: "She speaks softly."',
        '- Adverbs of Time: "I will see you tomorrow."',
        '- Adverbs of Place: "The children are playing outside."',
        '- Adverbs of Frequency: "He often goes to the gym."',
        '- Adverbs of Degree: "She is very tall."',
      ],
    },
    {
      title: 'Key Differences',
      content: 'Key Differences Between Adjectives and Adverbs:',
      examples: [
        '1. What they describe:',
        '- Adjectives describe nouns (people, places, things, or ideas).',
        '- Adverbs describe verbs (actions), adjectives (qualities), or other adverbs (intensifying).',
        '2. Where they appear:',
        '- Adjectives usually appear before the noun or after a linking verb.',
        '- Adverbs are flexible in placement and can modify verbs, adjectives, or other adverbs.',
        '3. Form:',
        '- Many adverbs are formed by adding -ly to an adjective (e.g., quick → quickly), but there are exceptions (e.g., well, fast, hard).',
      ],
    },
    {
      title: 'Activities to Practice',
      content: 'Activities to Practice:',
      examples: [
        '1. Identify Adjectives and Adverbs: Read a passage or sentence and underline the adjectives and adverbs.',
        'Example: "She speaks fluently and is always happy."',
        '- Adverb: fluently, always',
        '- Adjective: happy',
        '2. Fill in the Blanks: Complete sentences by inserting the correct adjective or adverb.',
        'Example: "She ran _______ (quick)."',
        'Answer: "She ran quickly."',
        '3. Sentence Expansion: Take a simple sentence and expand it using adjectives and adverbs.',
        'Example: "He runs." → "He runs very quickly."',
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Adjectives and Adverbs</Text>
      {sections.map((section, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
          <Text style={[styles.content, { color: theme.text }]}>{section.content}</Text>
          {section.examples.map((example, exIdx) => (
            <Text key={exIdx} style={[styles.example, { color: theme.text }]}>{example}</Text>
          ))}
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 4,
  },
});
