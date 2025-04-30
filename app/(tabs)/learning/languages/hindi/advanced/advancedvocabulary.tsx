import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function AdvancedVocabulary() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const vocabularyItems = [
    { title: 'Idiomatic Expressions (मुहावरे और कहावतें)', 
        content: 'Idioms and proverbs add color to language and convey deeper meanings indirectly. Understanding them helps you sound more natural and native.',
        examples: 'नौ दो ग्यारह होना – भाग जाना या जल्दी से निकल जाना। (To run away quickly.)',
        example2: 'आसमान से गिरे, खजूर में अटके – एक मुश्किल से निकलकर दूसरी में फँस जाना। (Out of the frying pan into the fire.)',
        example3: 'नाक कटवाना – अपमानित होना। (To suffer humiliation.)', 
        example4: 'दाँतों तले उँगली दबाना – बहुत चौंक जाना। (To be extremely surprised.)'
    },
    { title: 'Synonyms and Antonyms (समानार्थी शब्द और विलोम शब्द)', 
        content: 'Learning synonyms (similar meanings) and antonyms (opposite meanings) expands vocabulary, improves comprehension, and enhances expressive skills.',
        examples: 'सुंदर – आकर्षक (beautiful – attractive)',
        example2: 'जल्दी – शीघ्र (quickly – swiftly)',
        example3: 'दिन – रात (day – night)', 
        example4: 'सच्चाई – झूठ (truth – lie)'
    },
    { title: 'Phrasal Verbs (क्रिया वाक्यांश)', 
        content: 'Phrasal verbs combine verbs with other words to create specific meanings, important for conversational fluency.',
        examples: 'तलाशी लेना – किसी चीज को ढूँढने के लिए जाँच करना। (To search.)',
        example2: 'समझाना – स्पष्ट करना या समझने योग्य बनाना। (To explain.)',
        example3: 'ध्यान देना – ध्यान केंद्रित करना। (To pay attention.)', 
        example4: 'माफ करना – क्षमा करना। (To forgive.)'
    },
    { title: 'Honorifics and Formal/Informal Speech', 
        content: 'Hindi uses different pronouns and verb forms for formal, informal, and highly informal speech based on respect, age, or familiarity.',
        examples: 'आप कैसे हैं? (Formal: How are you?)',
        example2: 'तुम कैसे हो? (Informal: How are you?)',
        example3: 'तू कैसा है? (Highly informal: How are you?)', 
        example4: 'श्री शर्मा जी आने वाले हैं। (Mr. Sharma is coming.)'
    },
    { title: 'Cultural Expressions, Slang, Humor and Sarcasm', 
        content: 'Cultural expressions and slang add liveliness, humor, and regional flavor to daily conversations.',
        examples: 'क्या मस्त है! (How cool!)',
        example2: 'दिमाग की दही हो गई। (My brain is fried.)',
        example3: 'तू तो बड़ा तेज निकला। (You turned out to be very clever – sarcastic.)', 
        example4: 'जुगाड़ कर लेंगे। (We’ll find a workaround.)'
    },
    // Add more vocabulary items as needed
  ];
  const handleTextPress = (title: string, content: string, examples: string[]) => {
    const allExamples = examples.join('\n');
    const fullContent = `${content}\n\nExamples:\n${allExamples}`;
    setModalTitle(title);
    setModalContent(fullContent);
    setModalVisible(true);
    Speech.speak(fullContent, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={[styles.title, { color: theme.text }]}>Advanced Vocabulary</Text>
        {vocabularyItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleTextPress(
              item.title, 
              item.content, 
              [item.examples, item.example2, item.example3, item.example4].filter(Boolean) // Filter out undefined examples
            )}
          >
            <View style={styles.cardContent}>
              <Ionicons name="information-circle-outline" size={24} color={theme.text} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>{modalTitle}</Text>
            <Text style={[styles.modalText, { color: theme.text }]}>{modalContent}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={30} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f8f8ff', // Light purple background
    borderRadius: 15, // More rounded corners
    padding: 10, // Increased padding for better spacing
    marginBottom: 15, // Increased margin for better separation
    elevation: 5, // Increased elevation for more pronounced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjusted shadow offset
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    borderWidth: 3, // Increased border width
    borderColor: '#800080', // Purple border color
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between icon and title
  },
  cardTitle: {
    fontSize: 20, // Increased font size for title
    fontWeight: 'bold',
    marginLeft: 16,
    flex: 1, // Allow title to take up remaining space
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 15,
  },
});