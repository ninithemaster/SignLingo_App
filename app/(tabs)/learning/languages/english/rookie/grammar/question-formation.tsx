import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function QuestionFormationScreen() {
  const { theme } = useAppTheme();

  const renderCard = (title: string, content: string) => (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.cardTitle, { color: theme.text }]}>{title}</Text>
      <Text style={[styles.cardContent, { color: theme.text }]}>{content}</Text>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Question Formation</Text>
      <Text style={[styles.content, { color: theme.text }]}>
        Learn about question formation: How, What, Why, When, etc.
      </Text>

      {renderCard(
        'What',
        'Used to ask about things, objects, ideas, or actions.\n\nExample: "What is your name?"\n\nStructure: What + verb + subject\nExample: "What is she doing?"'
      )}

      {renderCard(
        'How',
        'Used to ask about the manner, condition, or process of something.\n\nExample: "How are you?"\n\nStructure: How + verb + subject\nExample: "How do you make coffee?"'
      )}

      {renderCard(
        'Why',
        'Used to ask about reasons or causes behind actions, situations, or phenomena.\n\nExample: "Why is the sky blue?"\n\nStructure: Why + verb + subject\nExample: "Why did you leave early?"'
      )}

      {renderCard(
        'When',
        'Used to ask about time. Asks for information about when something happened or will happen.\n\nExample: "When is your birthday?"\n\nStructure: When + verb + subject\nExample: "When did you arrive?"'
      )}

      {renderCard(
        'Where',
        'Used to ask about places or locations.\n\nExample: "Where do you live?"\n\nStructure: Where + verb + subject\nExample: "Where did you go last night?"'
      )}

      {renderCard(
        'Who',
        'Used to ask about people or individuals.\n\nExample: "Who is that man?"\n\nStructure: Who + verb + subject\nExample: "Who helped you with your homework?"'
      )}

      {renderCard(
        'Which',
        'Used to ask about a specific choice or selection from a limited set of options.\n\nExample: "Which color do you prefer?"\n\nStructure: Which + noun + verb + subject\nExample: "Which restaurant do you want to eat at?"'
      )}

      {renderCard(
        'How Many / How Much',
        'Used to ask about quantity. "How many" is for countable nouns, while "How much" is for uncountable nouns.\n\nExample (countable): "How many apples are in the basket?"\n\nExample (uncountable): "How much water do you drink daily?"\n\nStructure: How many/much + noun + verb + subject\nExample (countable): "How many students are in the class?"'
      )}
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
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 16,
  },
});
