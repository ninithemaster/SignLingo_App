import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'; // Import Image from expo-image
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function ColorsShapesScreen() {
  const { theme } = useAppTheme();

  const items = [
    { name: 'Red', example: 'The apple is red.', image: require('@/assets/images/english/colors/red.jpg') },
  { name: 'Blue', example: 'The sky is blue.', image: require('@/assets/images/english/colors/blue.jpg') },
  { name: 'Green', example: 'The leaves are green.', image: require('@/assets/images/english/colors/green.jpg') },
  { name: 'Yellow', example: 'The sun is yellow.', image: require('@/assets/images/english/colors/yellow.jpg') },
  { name: 'Orange', example: 'The orange is orange.', image: require('@/assets/images/english/colors/orange.jpg') },
  { name: 'Purple', example: 'The flower is purple.', image: require('@/assets/images/english/colors/purple.jpg') },
  { name: 'Pink', example: 'The balloon is pink.', image: require('@/assets/images/english/colors/pink.jpg') },
  { name: 'Brown', example: 'The bear is brown.', image: require('@/assets/images/english/colors/brown.jpg') },
  { name: 'Black', example: 'The cat is black.', image: require('@/assets/images/english/colors/black.jpg') },
  { name: 'White', example: 'The snow is white.', image: require('@/assets/images/english/colors/white.jpg') },
  { name: 'Gray', example: 'The elephant is gray.', image: require('@/assets/images/english/colors/grey.jpg') },

  { name: 'Circle', example: 'The ball is a circle.', image: require('@/assets/images/english/shapes/circle.jpeg') },
  { name: 'Square', example: 'The box is a square.', image: require('@/assets/images/english/shapes/square.jpeg') },
  { name: 'Rectangle', example: 'The door is a rectangle.', image: require('@/assets/images/english/shapes/rectangle.jpeg') },
  { name: 'Triangle', example: 'The sign is a triangle.', image: require('@/assets/images/english/shapes/triangle.jpeg') },
  { name: 'Oval', example: 'The egg is an oval.', image: require('@/assets/images/english/shapes/oval.jpeg') },
  { name: 'Diamond', example: 'The kite is a diamond shape.', image: require('@/assets/images/english/shapes/diamond.jpeg') },
  { name: 'Heart', example: 'The card has a heart.', image: require('@/assets/images/english/shapes/heart.jpeg') },
  { name: 'Star', example: 'The star shines bright.', image: require('@/assets/images/english/shapes/star.jpeg') },
  { name: 'Pentagon', example: 'The building is a pentagon.', image: require('@/assets/images/english/shapes/pentagon.jpeg') },
  { name: 'Hexagon', example: 'A beehive has hexagons.', image: require('@/assets/images/english/shapes/hexagon.jpeg') },
  { name: 'Octagon', example: 'A stop sign is an octagon.', image: require('@/assets/images/english/shapes/octagon.jpeg') },
  { name: 'Crescent', example: 'The moon is a crescent.', image: require('@/assets/images/english/shapes/crescent.jpeg') },
  { name: 'Arrow', example: 'The arrow points left.', image: require('@/assets/images/english/shapes/arrow.jpeg') },
  { name: 'Cross', example: 'The sign has a red cross.', image: require('@/assets/images/english/shapes/cross.jpeg') },
  { name: 'Spiral', example: 'The shell has a spiral.', image: require('@/assets/images/english/shapes/spiral.jpeg') }
    // Add more colors and shapes as needed
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
      <Text style={[styles.title, { color: theme.text }]}>Colors & Shapes</Text>
      <View style={styles.grid}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.text, borderWidth: 1 }]}
            onPress={() => speakText(item.name)}
          >
            {item.image && <Image source={item.image} style={styles.image} contentFit="contain" />}
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
    width: 80,
    height: 80,
    marginBottom: 8,
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