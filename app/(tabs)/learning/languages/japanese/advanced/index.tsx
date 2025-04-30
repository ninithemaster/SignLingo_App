import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useRouter } from 'expo-router';

export default function AdvancedScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const advancedSections = [
    {
      title: 'Advanced Grammar',
      description: 'Explore complex sentence structures and nuances.',
      route: '/learning/languages/japanese/advanced/grammar',
      color: '#FF7043',
    },
    {
      title: 'Advanced Vocabulary',
      description: 'Expand your vocabulary with advanced terms.',
      route: '/learning/languages/japanese/advanced/vocabulary',
      color: '#4CAF50',
    },
    {
      title: 'Kanji Mastery',
      description: 'Master complex Kanji characters.',
      route: '/learning/languages/japanese/advanced/kanji',
      color: '#2196F3',
    },
    {
      title: 'Keigo (Honorific Language)',
      description: 'Learn the nuances of formal and honorific language used in different contexts.',
      route: '/learning/languages/japanese/advanced/keigo',
      color: '#FFEB3B',
    },
    {
      title: 'Causative and Causative Passive Forms',
      description: 'Dive into causative and causative passive forms to express making someone do something.',
      route: '/learning/languages/japanese/advanced/causative',
      color: '#FFC107',
    },
    {
      title: 'Literary and Classical Japanese',
      description: 'Understand the differences in writing and grammar between modern and classical Japanese.',
      route: '/learning/languages/japanese/advanced/literaryjapanese',
      color: '#673AB7',
    },
    {
      title: 'Slang and Modern Expressions',
      description: 'Learn contemporary Japanese slang and expressions used in casual settings.',
      route: '/learning/languages/japanese/advanced/slang',
      color: '#03A9F4',
    },
    {
      title: 'Advanced Listening and Speaking',
      description: 'Practice complex listening and speaking techniques used in debates, formal speeches, and professional environments.',
      route: '/learning/languages/japanese/advanced/listeningspeaking',
      color: '#E91E63',
    },
  ];
  

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5, color: theme.text, textAlign: 'center' }}>
        Advanced Level
      </Text>
      <View style={styles.grid}>
        {advancedSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: section.color }]}
            onPress={() => router.push(section.route as any)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardDescription}>{section.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 60,
  },
  card: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardDescription: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
});