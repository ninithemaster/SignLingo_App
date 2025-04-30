import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function AnimalsNatureScreen() {
  const { theme } = useAppTheme();

  const animalsAndNature = [
    { 
      name: 'Dog', 
      example: 'The dog is barking.', 
      image: require('@/assets/images/english/animals/dog.jpeg') 
    },
    { 
      name: 'Cat', 
      example: 'The cat is sleeping.', 
      image: require('@/assets/images/english/animals/cat.jpeg') 
    },
    { 
      name: 'Bird', 
      example: 'The bird is singing.', 
      image: require('@/assets/images/english/animals/bird.jpeg') 
    },
    { 
      name: 'Fish', 
      example: 'The fish is swimming.', 
      image: require('@/assets/images/english/animals/fish.jpeg') 
    },
    { 
      name: 'Elephant', 
      example: 'The elephant is big.', 
      image: require('@/assets/images/english/animals/elephant.jpeg') 
    },
    { 
      name: 'Tree', 
      example: 'The tree is tall.', 
      image: require('@/assets/images/english/animals/tree.jpeg') 
    },
    { 
      name: 'Flower', 
      example: 'The flower is blooming.', 
      image: require('@/assets/images/english/animals/flower.jpeg') 
    },
    { 
      name: 'River', 
      example: 'The river flows gently.', 
      image: require('@/assets/images/english/animals/river.jpeg') 
    },
    { 
      name: 'Mountain', 
      example: 'The mountain is high.', 
      image: require('@/assets/images/english/animals/mountain.jpeg') 
    },
    { 
      name: 'Sun', 
      example: 'The sun is shining.', 
      image: require('@/assets/images/english/animals/sun.jpeg') 
    },
    { 
      name: 'Moon', 
      example: 'The moon is bright.', 
      image: require('@/assets/images/english/animals/moon.jpg') 
    },
    { 
      name: 'Cloud', 
      example: 'The cloud is fluffy.', 
      image: require('@/assets/images/english/animals/cloud.jpg') 
    },
    { 
      name: 'Star', 
      example: 'The stars are shining in the night sky.', 
      image: require('@/assets/images/english/animals/star.png') 
    },
    { 
      name: 'Rain', 
      example: 'The rain is falling softly.', 
      image: require('@/assets/images/english/animals/rain.png') 
    },
    { 
      name: 'Grass', 
      example: 'The grass is green.', 
      image: require('@/assets/images/english/animals/grass.jpeg') 
    },
    { 
      name: 'River', 
      example: 'The river flows gently.', 
      image: require('@/assets/images/english/animals/river.jpeg') 
    },
    { 
      name: 'Sky', 
      example: 'The sky is clear today.', 
      image: require('@/assets/images/english/animals/sky.jpeg') 
    },
    // Add more animals and nature-related items as needed
  ];
  const items = animalsAndNature;

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
      <Text style={[styles.title, { color: theme.text }]}>Animals & Nature</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.text, borderWidth: 1 }]}
            onPress={() => speakText(item.name)}
          >
            <Image source={item.image} style={styles.image} />
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
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
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