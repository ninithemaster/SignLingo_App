import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function VocabularyLayout() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Greetings & Introductions',
      route: '/learning/languages/english/rookie/vocabulary/greetings-introductions',
      image: require('@/assets/images/english/vocabulary/greetings-introductions.jpeg'),
    },
    {
      title: 'Numbers (1–100)',
      route: '/learning/languages/english/rookie/vocabulary/numbers',
      image: require('@/assets/images/english/vocabulary/numbers.jpeg'),
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Vocabulary Layout</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(section.route as any)}
        >
          <View style={[styles.headerContainer, { backgroundColor: theme.cardBackground }]}>
            <Ionicons name="book-outline" size={24} color="white" />
            <Text style={styles.headerTitle}>{section.title}</Text>
          </View>
          <Image source={section.image} style={styles.image} />
          <View style={styles.contentContainer}>
            <Text style={[styles.description, { color: theme.subtitle }]}>
              Learn essential {section.title.toLowerCase()} in sign language
            </Text>
          </View>
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
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contentContainer: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
});