import React from 'react';
import { View, Text, StyleSheet, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  exampleBox: ViewStyle;
};

export default function GrammarScreen() {
  const { theme } = useAppTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Overview Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          📚 ISL Grammar Overview
        </Text>
        <Text style={[styles.content, { color: theme.subtitle }]}>
          Indian Sign Language has its own unique grammatical structure that differs from spoken languages. Understanding these rules is crucial for effective communication.
        </Text>
      </View>

      {/* Basic Sentence Structure */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🔤 Basic Sentence Structure
        </Text>
        
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Word Order (OSV)
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            ISL typically follows Object-Subject-Verb order:
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>I drink water</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ISL: <Text style={{ color: theme.text }}>WATER I DRINK</Text>
          </Text>
        </View>

        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Time Indicators
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Time is usually mentioned at the beginning of sentences:
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>I went to school yesterday</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ISL: <Text style={{ color: theme.text }}>YESTERDAY SCHOOL I GO</Text>
          </Text>
        </View>
      </View>

      {/* Non-Manual Markers */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          😊 Non-Manual Markers
        </Text>
        
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Questions
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Yes/No Questions: Raise eyebrows, tilt head forward
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • WH Questions: Furrowed brows, head tilted
          </Text>
        </View>

        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Negation
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Shake head side to side while signing:
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            Example: <Text style={{ color: theme.text }}>I LIKE NOT (with head shake)</Text>
          </Text>
        </View>
      </View>

      {/* Classifiers Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          👐 Classifiers
        </Text>
        
        <Text style={[styles.content, { color: theme.subtitle }]}>
          Classifiers are handshapes that represent objects and their movement:
        </Text>

        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Common Classifiers
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Vehicle classifier: Flat hand represents cars
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Person classifier: Index finger represents walking person
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Animal classifier: Bent V-hand represents four-legged animals
          </Text>
        </View>
      </View>

      {/* Space and Direction */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🎯 Space and Direction
        </Text>
        
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Using Space
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Establish locations for people/objects in space
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Use these points to refer back to them
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            • Show relationships between objects/people
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 64,
  },
  section: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  exampleBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
});
 