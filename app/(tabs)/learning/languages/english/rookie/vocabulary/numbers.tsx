import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function NumbersScreen() {
  const { theme } = useAppTheme();

  const numbers = [
    { number: 1, word: 'One' },
  { number: 2, word: 'Two' },
  { number: 3, word: 'Three' },
  { number: 4, word: 'Four' },
  { number: 5, word: 'Five' },
  { number: 6, word: 'Six' },
  { number: 7, word: 'Seven' },
  { number: 8, word: 'Eight' },
  { number: 9, word: 'Nine' },
  { number: 10, word: 'Ten' },
  { number: 11, word: 'Eleven' },
  { number: 12, word: 'Twelve' },
  { number: 13, word: 'Thirteen' },
  { number: 14, word: 'Fourteen' },
  { number: 15, word: 'Fifteen' },
  { number: 16, word: 'Sixteen' },
  { number: 17, word: 'Seventeen' },
  { number: 18, word: 'Eighteen' },
  { number: 19, word: 'Nineteen' },
  { number: 20, word: 'Twenty' },
  { number: 21, word: 'Twenty-one' },
  { number: 22, word: 'Twenty-two' },
  { number: 23, word: 'Twenty-three' },
  { number: 24, word: 'Twenty-four' },
  { number: 25, word: 'Twenty-five' },
  { number: 26, word: 'Twenty-six' },
  { number: 27, word: 'Twenty-seven' },
  { number: 28, word: 'Twenty-eight' },
  { number: 29, word: 'Twenty-nine' },
  { number: 30, word: 'Thirty' },
  { number: 31, word: 'Thirty-one' },
  { number: 32, word: 'Thirty-two' },
  { number: 33, word: 'Thirty-three' },
  { number: 34, word: 'Thirty-four' },
  { number: 35, word: 'Thirty-five' },
  { number: 36, word: 'Thirty-six' },
  { number: 37, word: 'Thirty-seven' },
  { number: 38, word: 'Thirty-eight' },
  { number: 39, word: 'Thirty-nine' },
  { number: 40, word: 'Forty' },
  { number: 41, word: 'Forty-one' },
  { number: 42, word: 'Forty-two' },
  { number: 43, word: 'Forty-three' },
  { number: 44, word: 'Forty-four' },
  { number: 45, word: 'Forty-five' },
  { number: 46, word: 'Forty-six' },
  { number: 47, word: 'Forty-seven' },
  { number: 48, word: 'Forty-eight' },
  { number: 49, word: 'Forty-nine' },
  { number: 50, word: 'Fifty' },
  { number: 51, word: 'Fifty-one' },
  { number: 52, word: 'Fifty-two' },
  { number: 53, word: 'Fifty-three' },
  { number: 54, word: 'Fifty-four' },
  { number: 55, word: 'Fifty-five' },
  { number: 56, word: 'Fifty-six' },
  { number: 57, word: 'Fifty-seven' },
  { number: 58, word: 'Fifty-eight' },
  { number: 59, word: 'Fifty-nine' },
  { number: 60, word: 'Sixty' },
  { number: 61, word: 'Sixty-one' },
  { number: 62, word: 'Sixty-two' },
  { number: 63, word: 'Sixty-three' },
  { number: 64, word: 'Sixty-four' },
  { number: 65, word: 'Sixty-five' },
  { number: 66, word: 'Sixty-six' },
  { number: 67, word: 'Sixty-seven' },
  { number: 68, word: 'Sixty-eight' },
  { number: 69, word: 'Sixty-nine' },
  { number: 70, word: 'Seventy' },
  { number: 71, word: 'Seventy-one' },
  { number: 72, word: 'Seventy-two' },
  { number: 73, word: 'Seventy-three' },
  { number: 74, word: 'Seventy-four' },
  { number: 75, word: 'Seventy-five' },
  { number: 76, word: 'Seventy-six' },
  { number: 77, word: 'Seventy-seven' },
  { number: 78, word: 'Seventy-eight' },
  { number: 79, word: 'Seventy-nine' },
  { number: 80, word: 'Eighty' },
  { number: 81, word: 'Eighty-one' },
  { number: 82, word: 'Eighty-two' },
  { number: 83, word: 'Eighty-three' },
  { number: 84, word: 'Eighty-four' },
  { number: 85, word: 'Eighty-five' },
  { number: 86, word: 'Eighty-six' },
  { number: 87, word: 'Eighty-seven' },
  { number: 88, word: 'Eighty-eight' },
  { number: 89, word: 'Eighty-nine' },
  { number: 90, word: 'Ninety' },
  { number: 91, word: 'Ninety-one' },
  { number: 92, word: 'Ninety-two' },
  { number: 93, word: 'Ninety-three' },
  { number: 94, word: 'Ninety-four' },
  { number: 95, word: 'Ninety-five' },
  { number: 96, word: 'Ninety-six' },
  { number: 97, word: 'Ninety-seven' },
  { number: 98, word: 'Ninety-eight' },
  { number: 99, word: 'Ninety-nine' },
  { number: 100, word: 'One hundred' },
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
    <ScrollView contentContainerStyle={styles.scrollContent} style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Numbers (1–100)</Text>
      <View style={styles.numberGrid}>
        {numbers.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.text, borderWidth: 1 }]}
            onPress={() => speakText(item.word)}
          >
            <Text style={[styles.number, { color: theme.text }]}>{item.number}</Text>
            <Text style={[styles.word, { color: theme.subtitle }]}>{item.word}</Text>
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
  scrollContent: {
    paddingBottom: 32, // Added padding to ensure last item is visible
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    borderRadius: 12,
    padding: 20, // Increased padding for higher appearance
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  number: {
    fontSize: 20, // Increased font size for numbers
    fontWeight: 'bold',
    marginBottom: 4,
  },
  word: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});