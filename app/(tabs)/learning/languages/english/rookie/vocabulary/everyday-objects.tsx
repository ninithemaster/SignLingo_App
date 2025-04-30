import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function EverydayObjectsScreen() {
  const { theme } = useAppTheme();

  const items = [
    { name: 'Pen', example: 'I write with a pen.', image: require('@/assets/images/english/objects/pen.jpeg') },
    { name: 'Phone', example: 'I use my phone to text.', image: require('@/assets/images/english/objects/phone.jpeg') },
    { name: 'Laptop', example: 'I work on my laptop.', image: require('@/assets/images/english/objects/laptop.jpeg') },
    { name: 'Chair', example: 'I sit on a chair.', image: require('@/assets/images/english/objects/chair.jpeg') },
    { name: 'Table', example: 'The table is made of wood.', image: require('@/assets/images/english/objects/table.jpeg') },
    { name: 'Cup', example: 'I drink coffee from a cup.', image: require('@/assets/images/english/objects/cup.jpeg') },
    { name: 'Book', example: 'I read a book every day.', image: require('@/assets/images/english/objects/book.jpeg') },
    { name: 'Glass', example: 'Please give me a glass of water.', image: require('@/assets/images/english/objects/glass.jpeg') },
    { name: 'Bag', example: 'I carry my books in a bag.', image: require('@/assets/images/english/objects/bag.jpeg') },
    { name: 'Shoes', example: 'She is wearing shoes.', image: require('@/assets/images/english/objects/shoes.jpeg') },
    { name: 'Clock', example: 'The clock is on the wall.', image: require('@/assets/images/english/objects/clock.jpeg') },
    { name: 'Fan', example: 'Turn on the fan.', image: require('@/assets/images/english/objects/fan.jpeg') },
    { name: 'Door', example: 'The door is open.', image: require('@/assets/images/english/objects/door.jpeg') },
    { name: 'Window', example: 'Close the window.', image: require('@/assets/images/english/objects/window.jpeg') },
    { name: 'Light', example: 'Turn off the light.', image: require('@/assets/images/english/objects/light.jpeg') },
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
      <Text style={[styles.title, { color: theme.text }]}>Everyday Objects</Text>
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
