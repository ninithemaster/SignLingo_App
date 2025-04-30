import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function GrammarScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);

  const grammarTopics = [
    {
        title: 'Present Tense',
        content: 'Learn how to express actions happening right now in Marathi using present tense structures and helping verbs like आहे.',
        example: [
          'मी जेवत आहे. (I am eating.)',
          'तो खेळतो आहे. (He is playing.)',
          'ती शाळेत जाते आहे. (She is going to school.)',
          'आपण मराठी शिकत आहोत. (We are learning Marathi.)',
        ],
      },
      {
        title: 'Past Tense',
        content: 'Learn how to describe actions that happened in the past using past tense structures in Marathi.',
        example: [
          'मी शाळेत गेलो. (I went to school.)',
          'ती जेवली. (She ate.)',
          'आम्ही चित्रपट पाहिला. (We watched a movie.)',
          'तो घरी आला. (He came home.)',
        ],
      },
      {
        title: 'Future Tense',
        content: 'Learn how to talk about actions that will happen in the future using future tense structures in Marathi.',
        example: [
          'मी उद्या बाजारात जाईन. (I will go to the market tomorrow.)',
          'ती अभ्यास करेल. (She will study.)',
          'आपण सहलीला जाऊ. (We will go on a trip.)',
          'तो खेळ खेळेल. (He will play a game.)',
        ],
      },
      {
        title: 'Polite and Formal Speech',
        content: 'Marathi language uses respectful forms when speaking to elders, strangers, or in formal settings. Learn how to use polite words, respectful pronouns, and formal sentences.',
        example: `
      1. आपण कसे आहात? (How are you? - respectful)
      2. कृपया थांबा. (Please wait.)
      3. तुम्ही कुठे राहता? (Where do you live? - respectful)
      4. आपले स्वागत आहे. (You are welcome.)
        `,
      },
      {
        title: 'Negation in Marathi',
        content: 'Learn how to form negative sentences in Marathi using words like नाही (not) and other negation rules.',
        example: `
      1. मी बाजारात जात नाही. (I do not go to the market.)
      2. तो पुस्तक वाचत नाही. (He is not reading the book.)
      3. आम्ही घरी नव्हतो. (We were not at home.)
      4. ती उद्या येणार नाही. (She will not come tomorrow.)
        `,
      },
      {
        title: 'Plural Forms',
        content: 'Learn how to form plurals in Marathi and how verbs and adjectives agree with plural subjects.',
        example: `
      1. मुलगा -> मुले (Boy -> Boys)
      2. पुस्तक -> पुस्तके (Book -> Books)
      3. ते खेळतात. (They play.)
      4. आम्ही गाणी गातो. (We sing songs.)
        `,
      },
      {
        title: 'Gender Forms',
        content: 'Understand how nouns, pronouns, and adjectives in Marathi change depending on masculine or feminine gender.',
        example: `
      1. मोठा मुलगा. (Big boy - masculine)
      2. मोठी मुलगी. (Big girl - feminine)
      3. सुंदर फुलं. (Beautiful flower - neuter)
      4. शिक्षक शिकवतो. / शिक्षिका शिकवते. (Teacher teaches - male/female form)
        `,
      },
      {
        title: 'Sentence Structure',
        content: 'Learn how Marathi sentences are generally structured in Subject-Object-Verb (SOV) order for correct and natural speaking.',
        example: `
      1. मी पुस्तक वाचतो. (I read a book.)
      2. ती जेवण बनवते. (She cooks food.)
      3. आम्ही खेळ खेळतो. (We play a game.)
      4. मुलं शाळेत जातात. (Children go to school.)
        `,
      },
                        

                    
  ];

  const handlePress = (content: string, examples: string[]) => {
    setSelectedText(content);
    setSelectedExamples(examples);
    setModalVisible(true);
    Speech.speak(content, { language: 'mr' });
    examples.forEach(example => Speech.speak(example, { language: 'mr' }));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Grammar Topics</Text>
      <View style={styles.topicsContainer}>
        {grammarTopics.map((topic, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => {
              if (topic.content && Array.isArray(topic.example)) {
                handlePress(topic.content, topic.example);
              }
            }}
          >
            <Text style={[styles.topicTitle, { color: theme.text }]}>{topic.title}</Text>
            <Text style={[styles.learnMore, { color: theme.subtitle }]}>Learn More</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedText}</Text>
            {selectedExamples.map((example, index) => (
              <Text key={index} style={[styles.exampleText, { color: theme.text }]}>
                {example}
              </Text>
            ))}
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#87CEEB', // Sky blue border
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  exampleText: {
    fontSize: 14,
    marginVertical: 4,
    textAlign: 'center',
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});