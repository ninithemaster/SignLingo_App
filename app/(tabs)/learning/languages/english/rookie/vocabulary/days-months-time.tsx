import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function DaysMonthsTimeScreen() {
  const { theme } = useAppTheme();

  const items = [
    // Days
    { name: 'Monday', example: 'Monday is the start of the week.' },
    { name: 'Tuesday', example: 'Tuesday comes after Monday.' },
    { name: 'Wednesday', example: 'Wednesday is the middle of the week.' },
    { name: 'Thursday', example: 'Thursday is almost the weekend.' },
    { name: 'Friday', example: 'Friday is the end of the workweek.' },
    { name: 'Saturday', example: 'Saturday is a day for relaxation.' },
    { name: 'Sunday', example: 'Sunday is a day of rest.' },

    // Months
    { name: 'January', example: 'January is the first month of the year.' },
    { name: 'February', example: 'February is the shortest month.' },
    { name: 'March', example: 'March marks the start of spring.' },
    { name: 'April', example: 'April is known for showers.' },
    { name: 'May', example: 'May brings flowers.' },
    { name: 'June', example: 'June is the start of summer.' },
    { name: 'July', example: 'July is a hot month.' },
    { name: 'August', example: 'August is the last month of summer.' },
    { name: 'September', example: 'September marks the start of fall.' },
    { name: 'October', example: 'October is known for Halloween.' },
    { name: 'November', example: 'November is a month of thanksgiving.' },
    { name: 'December', example: 'December is the holiday season.' },

    // Time
    { name: 'Morning', example: 'Morning is the start of the day.' },
    { name: 'Afternoon', example: 'Afternoon is after lunch.' },
    { name: 'Evening', example: 'Evening is when the sun sets.' },
    { name: 'Night', example: 'Night is when it is dark.' },
    { name: 'Hour', example: 'An hour has sixty minutes.' },
    { name: 'Minute', example: 'A minute has sixty seconds.' },
    { name: 'Second', example: 'A second is a brief moment.' },
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
      <Text style={[styles.title, { color: theme.text }]}>Days, Months, Time</Text>
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