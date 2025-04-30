import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

type Section = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: "/learning/signs/asl/basics" | "/learning/signs/asl/everyday" | "/learning/signs/asl/express" | "/learning/signs/asl/intro";
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
    },
    {
      title: 'Express & Connect',
      description: 'Practice with camera and quiz',
      icon: 'camera',
      route: '/learning/signs/asl/express',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>ASL</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, index) => (
          <Animated.View
            key={index}
            entering={FadeIn.delay(index * 100)}
          >
            <Link href={section.route} asChild>
              <TouchableOpacity
                style={[styles.sectionCard, { backgroundColor: theme.cardBackground }]}
              >
                <View style={styles.sectionContent}>
                  <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
                    <Ionicons name={section.icon} size={24} color="white" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                      {section.title}
                    </Text>
                    <Text style={[styles.sectionDescription, { color: theme.subtitle }]}>
                      {section.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={theme.text} />
                </View>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 12,
    paddingTop: 40,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionCard: {
    borderRadius: 15,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
  },
}); 