import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Vocabulary Builder',
      icon: 'bulb-outline',
      description: 'Master basic vocabulary through word lists, images, and examples',
      route: '/learning/languages/english/rookie/vocabulary',
      color: '#FFA726',
    },
    {
      title: 'Grammar Essentials',
      icon: 'book-outline',
      description: 'Learn grammar rules, simple sentence structures, and tenses',
      route: '/learning/languages/english/rookie/grammar',
      color: '#66BB6A',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Rookie Level</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(section.route as any)}
        >
          <View style={[styles.headerContainer, { backgroundColor: section.color }]}>
            <Ionicons name={section.icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
            <Text style={styles.headerTitle}>{section.title}</Text>
          </View>
          <View style={styles.contentContainer}>
            <Text style={[styles.description, { color: theme.subtitle }]}>
              {section.description}
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
    width: 100, // Set width
    height: 100, // Set height
    marginBottom: 8,
  },
});
