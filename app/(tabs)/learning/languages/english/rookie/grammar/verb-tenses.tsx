import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function VerbTensesScreen() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'Present Tense',
      content: [
        {
          subTitle: 'Present Simple',
          description: 'Describes actions that happen regularly, facts, or general truths.',
          example: 'Example: "I play football."',
        },
        {
          subTitle: 'Present Continuous',
          description: 'Describes actions happening right now or temporary situations.',
          example: 'Example: "I am playing football right now."',
        },
        {
          subTitle: 'Present Perfect',
          description: 'Describes actions that happened at an unspecified time before now and have relevance to the present.',
          example: 'Example: "I have played football."',
        },
        {
          subTitle: 'Present Perfect Continuous',
          description: 'Describes actions that started in the past and are still continuing or have just finished.',
          example: 'Example: "I have been playing football for two hours."',
        },
      ],
    },
    {
      title: 'Past Tense',
      content: [
        {
          subTitle: 'Past Simple',
          description: 'Describes actions that happened at a specific time in the past.',
          example: 'Example: "I played football yesterday."',
        },
        {
          subTitle: 'Past Continuous',
          description: 'Describes actions that were in progress at a specific time in the past.',
          example: 'Example: "I was playing football when it started to rain."',
        },
        {
          subTitle: 'Past Perfect',
          description: 'Describes actions that happened before another action in the past.',
          example: 'Example: "I had played football before I went to the party."',
        },
        {
          subTitle: 'Past Perfect Continuous',
          description: 'Describes actions that were ongoing in the past and were happening before another past action.',
          example: 'Example: "I had been playing football for two hours before it started raining."',
        },
      ],
    },
    {
      title: 'Future Tense',
      content: [
        {
          subTitle: 'Future Simple',
          description: 'Describes actions that will happen in the future.',
          example: 'Example: "I will play football tomorrow."',
        },
        {
          subTitle: 'Future Continuous',
          description: 'Describes actions that will be in progress at a specific time in the future.',
          example: 'Example: "I will be playing football at 3 PM tomorrow."',
        },
        {
          subTitle: 'Future Perfect',
          description: 'Describes actions that will be completed before a certain point in the future.',
          example: 'Example: "I will have played football by the time you arrive."',
        },
        {
          subTitle: 'Future Perfect Continuous',
          description: 'Describes actions that will be ongoing in the future up until a certain point in the future.',
          example: 'Example: "By next month, I will have been playing football for five years."',
        },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Verb Tenses</Text>
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
          {section.content.map((item, idx) => (
            <TouchableOpacity key={idx} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.subTitle, { color: theme.text }]}>{item.subTitle}</Text>
              <Text style={[styles.content, { color: theme.text }]}>{item.description}</Text>
              <Text style={[styles.example, { color: theme.text }]}>{item.example}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
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
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 8,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
