import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LearningScreen() {
  const { theme } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <TouchableOpacity 
        style={[styles.card, { backgroundColor: theme.cardBackground }]}
        onPress={() => router.push('/learning/signs')}
      >
        <Ionicons name="hand-left" size={24} color={theme.text} />
        <Text style={[styles.cardTitle, { color: theme.text }]}>Sign Languages</Text>
        <Text style={[styles.cardDescription, { color: theme.subtitle }]}>
          Learn ASL and ISL signs
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, { backgroundColor: theme.cardBackground }]}
        onPress={() => router.push('/learning/languages')}
      >
        <Ionicons name="language" size={24} color={theme.text} />
        <Text style={[styles.cardTitle, { color: theme.text }]}>Languages</Text>
        <Text style={[styles.cardDescription, { color: theme.subtitle }]}>
          Explore different languages
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 4,
  },
}); 