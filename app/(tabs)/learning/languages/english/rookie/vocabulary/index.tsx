import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image} from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RookieScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const sections = [
    {
      title: 'Greetings & Introductions',
      route: '/learning/languages/english/rookie/vocabulary/greetings-introductions',
      image: require('@/assets/images/english/vocabulary/greetings-introductions.jpeg'), // Added image
    },
    {
      title: 'Numbers (1–100)',
      route: '/learning/languages/english/rookie/vocabulary/numbers',
      image: require('@/assets/images/english/vocabulary/numbers.jpeg'), // Added image
    },
    {
      title: 'Colors & Shapes',
      route: '/learning/languages/english/rookie/vocabulary/colors-shapes',
      image: require('@/assets/images/english/vocabulary/colors-shapes.jpeg'), // Added image
    },
    {
      title: 'Food & Drinks',
      route: '/learning/languages/english/rookie/vocabulary/food-drinks',
      image: require('@/assets/images/english/vocabulary/food-drinks.jpeg'), // Added image
    },
    {
      title: 'Family & People',
      route: '/learning/languages/english/rookie/vocabulary/family-people',
      image: require('@/assets/images/english/vocabulary/family-people.jpeg'), // Added image
    },
    {
      title: 'Days, Months, Time',
      route: '/learning/languages/english/rookie/vocabulary/days-months-time',
      image: require('@/assets/images/english/vocabulary/days-months-time.jpeg'), // Added image
    },
    {
      title: 'Everyday Objects',
      route: '/learning/languages/english/rookie/vocabulary/everyday-objects',
      image: require('@/assets/images/english/vocabulary/everyday-objects.jpeg'), // Added image
    },
    {
      title: 'Animals & Nature',
      route: '/learning/languages/english/rookie/vocabulary/animals-nature',
      image: require('@/assets/images/english/vocabulary/animals-nature.jpeg'), // Added image
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]} contentContainerStyle={styles.scrollContent}>
      <Text style={[styles.title, { color: theme.text }]}>Rookie Level</Text>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(section.route as any)}
        >
          <View style={[styles.headerContainer, { backgroundColor: theme.cardBackground }]}>
            <Ionicons name="book-outline" size={24} color="white" />
            <Image source={section.image} style={styles.image} />
            <Text style={styles.headerTitle}>{section.title}</Text>
          </View>
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
    marginBottom: 10,
  },
  scrollContent: {
    paddingBottom: 85, // Ensure space for scrolling
  },
  card: {
    borderRadius: 10,
    marginBottom: 12, // Adjusted margin for better spacing
    overflow: 'hidden',
    elevation: 1, // Reduced elevation for smaller cards
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12, // Reduced padding for smaller cards
  },
  image: {
    width: 40, // Smaller image size
    height: 40,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  contentContainer: {
    padding: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  cardImage: {
    width:50,
    height:50
  }
});
