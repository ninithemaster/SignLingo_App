import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AdvancedScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
        title: 'Complex Sentence Structures',
        icon: 'git-branch-outline',
        description: 'Connect ideas using advanced sentence patterns',
        route: '/learning/languages/english/advanced/complexsentences',
        color: '#26A69A',
      },      
    {
      title: 'Advanced Grammar',
      icon: 'school-outline',
      description: 'Learn complex grammar structures',
      route: '/learning/languages/english/advanced/grammar',
      color: '#5C6BC0',
    },
    {
      title: 'Polite & Formal Expressions',
      icon: 'briefcase-outline',
      description: 'Learn how to sound respectful and formal.',
      route: '/learning/languages/english/advanced/professional', 
      color: '#26A69A',
    },
    {
      title: 'Idioms & Phrasal Verbs',
      icon: 'language-outline',
      description: 'Master common idioms and phrasal verbs to sound more natural.',
      route: '/learning/languages/english/advanced/idioms',
      color: '#FF7043',
    },    
    {
      title: 'English Accents',
      icon: 'language-outline',
      description: 'Learn about english accents and how to use them.',
      route: '/learning/languages/english/advanced/accents',
      color: '#FF7043',
    },    
  
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(section.route as any)}
        >
          <View style={[styles.iconContainer, { backgroundColor: section.color }]}>
            <Ionicons name={section.icon as keyof typeof Ionicons.glyphMap} size={24} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.text }]}>{section.title}</Text>
            <Text style={[styles.description, { color: theme.subtitle }]}>{section.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
});