import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Section = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  description: string;
};

export default function ASLScreen() {
  const { theme } = useAppTheme();

  const sections: Section[] = [
    {
      title: "Introduction",
      icon: "book-outline",
      route: "/learning/signs/asl/intro",
      description: "Learn about ASL history and basics"
    },
    {
      title: "Level 1: Basics",
      icon: "star-outline",
      route: "/learning/signs/asl/basics",
      description: "Start with fundamental ASL signs and concepts"
    },
    {
      title: "Level 2: Everyday Signs",
      icon: "star-half-outline",
      route: "/learning/signs/asl/everyday",
      description: "Learn everyday vocabulary and conversations"
    }
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.sectionsContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => router.push(section.route as any)}
          >
            <View style={styles.iconContainer}>
              <Ionicons name={section.icon} size={28} color={theme.text} />
            </View>
            <View style={styles.cardContent}>
              <View style={styles.textContainer}>
                <Text style={[styles.cardTitle, { color: theme.text }]}>
                  {section.title}
                </Text>
                <Text style={[styles.description, { color: theme.subtitle }]}>
                  {section.description}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={theme.text} style={styles.chevron} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  sectionsContainer: {
    gap: 12,
  },
  card: {
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 72,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
  chevron: {
    opacity: 0.7,
  },
}); 