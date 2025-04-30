import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EnglishScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const levels = [
    {
        title: 'Rookie',
        icon: 'star-outline',
        description: 'Begin your journey with basic Hindi signs and fundamental concepts, perfect for beginners.',
        route: '/learning/languages/hindi/rookie',
        color: '#FF5722', // A warm color suitable for Hindi
      },
      {
        title: 'Advanced',
        icon: 'trophy-outline',
        description: 'Master complex Hindi grammar, advanced sentence structures, and nuanced vocabulary.',
        route: '/learning/languages/hindi/advanced',
        color: '#2196F3', // Consistent with the advanced level
      },
      {
        title: 'Video Lectures',
        icon: 'earth-outline',
        description: 'Discover the rich cultural heritage of Hindi-speaking regions, exploring its influence on art, music, and history through engaging video lectures.',
        route: '/learning/languages/hindi/video',
        color: '#9C27B0', // Represents a cultural and artistic vibe
      }      
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>English Language</Text>
      <View style={styles.levelsContainer}>
        {levels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.levelCard, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push(level.route as any)}
          >
            <View style={[styles.iconContainer, { backgroundColor: level.color }]}>
              <Ionicons name={level.icon as keyof typeof Ionicons.glyphMap} size={32} color="white" />
            </View>
            <View style={styles.textContainer}>
              <Text style={[styles.levelTitle, { color: theme.text }]}>
                {level.title}
              </Text>
              <Text style={[styles.levelDescription, { color: theme.subtitle }]}>
                {level.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={theme.text} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
    marginBottom: 24,
  },
  levelsContainer: {
    gap: 16,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  levelDescription: {
    fontSize: 14,
  },
});