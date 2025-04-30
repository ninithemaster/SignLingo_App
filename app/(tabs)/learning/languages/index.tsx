import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LanguagesScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();

  const languages = [
    {
      name: 'English',
      icon: 'flag-outline',
      description: "The global bridge of communication, rich in diversity and nuance.",
    },
    {
      name: 'Hindi',
      icon: 'flower-outline',
      description: "A poetic and soulful language that echoes the heart of India.",
    },
    {
      name: 'Marathi',
      icon: 'leaf-outline',
      description: "The proud tongue of Maharashtra, steeped in heritage and power.",
    },
    {
      name: 'Japanese',
      icon: 'rose-outline',
      description: "A graceful blend of tradition and precision, rooted in centuries of culture.",
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Select Language</Text>
      <View style={styles.grid}>
        {languages.map((language, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => {
              if (language.name === 'English') {
                router.push('/(tabs)/learning/languages/english' as any);
              } else if (language.name === 'Hindi') {
                router.push('/(tabs)/learning/languages/hindi' as any);
              } else if (language.name === 'Marathi') {
                router.push('/(tabs)/learning/languages/marathi' as any);
              } else if (language.name === 'Japanese') {
                router.push('/(tabs)/learning/languages/japanese' as any); // Add navigation for Japanese
              }
            }}
          >
            <Ionicons name={language.icon as keyof typeof Ionicons.glyphMap} size={32} color={theme.text} />
            <Text style={[styles.languageName, { color: theme.text }]}>
              {language.name}
            </Text>
            <Text style={[styles.description, { color: theme.subtitle }]}>
              {language.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

function LanguagesIndex() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Languages</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/learning/languages/japanese')}
      >
        <Text style={styles.languageName}>Japanese</Text>
      </TouchableOpacity>
      {/* Add more buttons for other languages if needed */}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});