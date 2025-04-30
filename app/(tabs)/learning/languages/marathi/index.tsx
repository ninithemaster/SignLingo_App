import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function MarathiScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const levels = [
    {
      title: 'Rookie',
      icon: 'sparkles', // ✨ Fresh and exciting for beginners
      description: 'Start your journey with basic Marathi signs, alphabets, numbers, and simple phrases, ideal for beginners.',
      route: '/learning/languages/marathi/rookie',
      color: '#FF9800', // 
    },
    {
      title: 'Advanced',
      icon: 'medal', // 🎖️ Mastery and achievement
      description: 'Dive deep into complex Marathi grammar, advanced vocabulary, and rich expressions used in everyday and literary contexts.',
      route: '/learning/languages/marathi/advanced',
      color: '#3F51B5', //
    },
    {
      title: 'Folk Life',
      icon: 'earth-outline', // 
      description: 'Experience the heart of Maharashtra through its rural traditions, vibrant festivals, folk arts, and everyday life stories.',
      route: '/learning/languages/marathi/folklife',
      color: '#4CAF50', //
    },
    
    
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Marathi Language</Text>
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