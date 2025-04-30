import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function ArticlesGenderScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'Articles',
      content: "Articles are used to define nouns. In English, there are three articles: 'a', 'an', and 'the'.\n\n1. 'a' is used before words that begin with a consonant sound (e.g., a cat, a dog).\n2. 'an' is used before words that begin with a vowel sound (e.g., an apple, an elephant).\n3. 'the' is used when referring to something specific or known to both the speaker and listener (e.g., the sun, the dog).",
    },
    {
      title: 'Gender',
      content: "Gender affects pronouns like he, she, and it. Gender also affects some nouns in English.\n\nIn English, we use gendered pronouns:\n- He: For males (e.g., 'He is my brother.')\n- She: For females (e.g., 'She is my sister.')\n- It: For things or animals (e.g., 'It is a dog.')\n\nSome nouns have specific gender forms (e.g., 'man' for male, 'woman' for female).",
    },
    {
      title: 'Examples',
      content: "Examples: I saw a dog. He is an engineer. The moon is full tonight.\n\n- 'I saw a dog outside.'\n- 'He is an engineer.'\n- 'The moon is full tonight.'\n- 'This is the chair I was talking about.'",
    },
  ];

  const speakText = (text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1,
      rate: 1,
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Articles & Gender</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => speakText(section.content)}
        >
          <Text style={[styles.subtitle, { color: theme.text }]}>{section.title}</Text>
          <Text style={[styles.content, { color: theme.text }]}>{section.content}</Text>
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
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
