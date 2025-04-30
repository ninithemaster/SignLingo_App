import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function FamilyPeopleScreen() {
  const { theme } = useAppTheme();

  const items = [
    { name: 'Father', example: 'My father works in an office.' }, // A man in formal clothes or playing with kids
    { name: 'Mother', example: 'Her mother is very kind.' }, // A woman cooking, reading to child, or smiling
    { name: 'Brother', example: 'I have an elder brother.' }, // A boy playing or with a sibling
    { name: 'Sister', example: 'She plays with her sister.' }, // Two girls or one girl smiling
    { name: 'Grandfather', example: 'My grandfather tells stories.' }, // Elder man with glasses or reading to kids
    { name: 'Grandmother', example: 'Her grandmother knits sweaters.' }, // Elder woman knitting or smiling warmly
    { name: 'Uncle', example: 'My uncle lives abroad.' }, // Adult man waving or casual photo
    { name: 'Aunt', example: 'His aunt bakes cookies.' }, // Woman baking or hugging children
    { name: 'Cousin', example: 'I play with my cousins.' }, // Group of kids playing
    { name: 'Baby', example: 'The baby is sleeping.' }, // Sleeping baby or baby in a crib
    { name: 'Boy', example: 'The boy is running.' }, // Boy running in a field or playing
    { name: 'Girl', example: 'The girl is reading a book.' }, // Girl reading or holding a book
    { name: 'Man', example: 'The man is tall.' }, // Grown man standing or walking
    { name: 'Woman', example: 'The woman is smiling.' }, // Smiling woman
    { name: 'Friend', example: 'She is my best friend.' }, // Two people laughing or taking a selfie
    { name: 'Teacher', example: 'The teacher explains well.' }, // Teacher at blackboard or in a classroom
    { name: 'Student', example: 'The student is writing notes.' }, // Student studying or writing
    { name: 'Neighbor', example: 'Our neighbor has a dog.' } // Person waving from a yard or holding a dog
  ];

  const speakText = async (text: string) => {
    try {
      await Speech.speak(text, {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.8,
      });
    } catch (error) {
      console.error('Error speaking:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Family & People</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.text, borderWidth: 1 }]}
            onPress={() => speakText(item.name)}
          >
            <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
            <Text style={[styles.example, { color: theme.subtitle }]}>{item.example}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '45%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  example: {
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});