import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const japaneseSections = [
    {
      title: 'Japanese Alphabet Basics',
      icon: 'sparkles-outline',
      description: 'Learn the basics of Hiragana, Katakana, and Romaji.',
      route: '/learning/languages/japanese/rookie/alphabetbasics',
      color: '#FF7043',
    },
    {
      title: 'Basic Vocabulary',
      icon: 'chatbubbles-outline',
      description: 'Master essential Japanese greetings and terms.',
      route: '/learning/languages/japanese/rookie/basicvocabulary',
      color: '#4CAF50',
    },
    {
      title: 'Basic Grammar',
      icon: 'book-outline',
      description: 'Learn basic sentence structure and particles.',
      route: '/learning/languages/japanese/rookie/basicgrammar',
      color: '#2196F3',
    },
    {
      title: 'Essential Phrases',
      icon: 'pencil-outline',
      description: 'Practice essential phrases for daily conversations.',
      route: '/learning/languages/japanese/rookie/essentialphrases',
      color: '#9C27B0',
    },
    {
      title: 'Basic Kanji',
      icon: 'language-outline',
      description: 'Introduce basic Kanji characters.',
      route: '/learning/languages/japanese/rookie/kanji',
      color: '#FF5722',
    },
    {
      title: 'Pronunciation and Intonation',
      icon: 'mic-outline',
      description: 'Understand pronunciation rules and intonation.',
      route: '/learning/languages/japanese/rookie/pronunciation',
      color: '#8BC34A',
    }
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5, color: theme.text, textAlign: 'center' }}>
        Rookie Level
      </Text>
      <View style={styles.grid}>
        {japaneseSections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: section.color }]}
            onPress={() => router.push(section.route as any)}
          >
            <View style={styles.cardContent}>
              <Ionicons name={section.icon as keyof typeof Ionicons.glyphMap} size={32} color="white" />
              <Text style={styles.cardTitle}>{section.title}</Text>
              <Text style={styles.cardDescription}>{section.description}</Text>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/24' }} style={styles.avatar} />
                <Text style={styles.moreText}>3+</Text>
              </View>
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
    paddingBottom: 60, // Increased padding at the bottom to ensure last item visibility
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
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  moreText: {
    color: 'white',
    fontSize: 14,
  },
});
