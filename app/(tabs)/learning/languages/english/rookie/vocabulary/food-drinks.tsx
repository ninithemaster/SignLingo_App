import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function FoodDrinksScreen() {
  const { theme } = useAppTheme();

  const items = [
    // Food
    { name: 'Apple', example: 'She eats an apple every day.' },
    { name: 'Banana', example: 'Monkeys love bananas.' },
    { name: 'Rice', example: 'I had rice for lunch.' },
    { name: 'Bread', example: 'He toasted the bread.' },
    { name: 'Egg', example: 'She boiled an egg.' },
    { name: 'Cheese', example: 'The sandwich has cheese.' },
    { name: 'Pizza', example: 'They ordered a pizza.' },
    { name: 'Chicken', example: 'He cooked chicken curry.' },
    { name: 'Fish', example: 'Fish is rich in protein.' },
    { name: 'Vegetables', example: 'Eat more vegetables daily.' },
    { name: 'Salad', example: 'She made a green salad.' },
    { name: 'Soup', example: 'The soup is hot.' },
    { name: 'Pasta', example: 'He likes pasta with sauce.' },
    { name: 'Cake', example: 'We had chocolate cake.' },
    { name: 'Ice Cream', example: 'She ate vanilla ice cream.' },
  
    // Drinks
    { name: 'Water', example: 'Drink water regularly.' },
    { name: 'Milk', example: 'Children drink milk daily.' },
    { name: 'Juice', example: 'He drank orange juice.' },
    { name: 'Tea', example: 'She made a cup of tea.' },
    { name: 'Coffee', example: 'He drinks coffee in the morning.' },
    { name: 'Soda', example: 'They ordered soda with fries.' },
    { name: 'Smoothie', example: 'She made a fruit smoothie.' },
    { name: 'Coconut Water', example: 'Coconut water is refreshing.' }
  ]
  

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
      <Text style={[styles.title, { color: theme.text }]}>Food & Drinks</Text>
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