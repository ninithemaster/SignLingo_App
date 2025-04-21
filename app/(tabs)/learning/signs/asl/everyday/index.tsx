import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

type Category = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
  description: string;
};

export default function EverydayScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)

  const categories: Category[] = [
    {
      title: "Colors",
      icon: "color-palette-outline",
      route: "./colors",
      color: "#FF9B9B",
      description: "Learn how to sign common colors"
    },
    {
      title: "Family",
      icon: "people-outline",
      route: "family",
      color: "#A8D1D1",
      description: "Talk about your loved ones"
    },
    {
      title: "Food & Drink",
      icon: "restaurant-outline",
      route: "food",
      color: "#FFB562",
      description: "Essential food and drink signs"
    },
    {
      title: "Days & Time",
      icon: "time-outline",
      route: "time",
      color: "#9CB4CC",
      description: "Express time and schedules"
    },
    {
      title: "Emotions",
      icon: "happy-outline",
      route: "emotions",
      color: "#FFD93D",
      description: "Share how you feel"
    },
    {
      title: "Conversations",
      icon: "chatbubbles-outline",
      route: "conversations",
      color: "#98DDCA",
      description: "Practice simple dialogues"
    }
  ];

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      bounces={true}
      overScrollMode="always"
    >
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              { 
                backgroundColor: theme.cardBackground,
                width: cardWidth
              }
            ]}
            onPress={() => router.push(`/(tabs)/learning/signs/asl/everyday/${category.route}` as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
              <Ionicons name={category.icon} size={32} color="white" />
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, { color: theme.text }]}>
                {category.title}
              </Text>
              <Text style={[styles.cardDescription, { color: theme.subtitle }]}>
                {category.description}
              </Text>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 0,
  },
  iconContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12,
    opacity: 0.8,
    lineHeight: 16,
  },
}); 