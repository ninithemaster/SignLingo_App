import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Language = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  description: string;
};

export default function SignsScreen() {
  const { theme } = useAppTheme();

  const languages: Language[] = [
    {
      title: "American Sign Language",
      icon: "american-football-outline",
      route: "/(tabs)/learning/signs/asl",
      description: "Learn ASL, the primary sign language of the United States"
    },
    {
      title: "Indian Sign Language",
      icon: "flower-outline",
      route: "/(tabs)/learning/signs/isl",
      description: "Learn ISL, the primary sign language of India"
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => router.push(language.route as any)}
        >
          <View style={styles.cardContent}>
            <Ionicons name={language.icon} size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              {language.title}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.text} />
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
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
}); 