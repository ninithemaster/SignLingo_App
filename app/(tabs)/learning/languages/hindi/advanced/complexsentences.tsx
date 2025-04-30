import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function ComplexSentences() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const sentences = [
    { 
      title: 'Compound Sentence', 
      content: 'Teach how to combine multiple simple sentences using conjunctions (e.g., और - and, लेकिन - but, क्योंकि - because).\n',
      example: '"मैं पढ़ता हूँ और तुम खेलते हो।" (I read and you play.)\n',
      example2: '"मैं स्कूल जाता हूँ, और मेरी बहन घर पर रहती है।"(I go to school, and my sister stays at home.)\n',
      example3: '"वह खाना खाता है, लेकिन मुझे भूख नहीं है।" (He eats food, but I am not hungry.)\n'
    },
    { 
      title: 'Complex Sentences', 
      content: 'Teach sentence construction with subordinate clauses.',
      example: '"जब मैं स्कूल जाता हूँ, तब मैं पैदल चलता हूँ।" (When I go to school, I walk.)',
      example2: '"जब मैं घर लौटूंगा, तब मैं तुम्हें फोन करूंगा।" (When I return home, I will call you.)',
      example3: '"अगर तुम अच्छा काम करते हो, तो तुम्हें इनाम मिलेगा।" (If you work well, you will get a reward.)'
    },
    { 
      title: 'Relative Clauses', 
      content: 'Sentences that describe or add information to a noun.',
      example:  '"वह लड़का जो स्कूल जाता है, मेरे दोस्त है।" (The boy who goes to school is my friend.)',
      example2: '"यह किताब, जो बहुत पुरानी है, मेरे दादाजी की है।" (This book, which is very old, belongs to my grandfather.)',
      example3: '"वह लड़की जो गाना गा रही है मेरी बहन है।" (The girl who is singing is my sister.)'
    },
    { 
      title: 'Active and Passive Voice', 
      content: 'Teach how to convert sentences from active to passive and vice versa.' ,
      example: '"राम ने किताब पढ़ी।" (Ram read the book) → "किताब राम द्वारा पढ़ी गई।" (The book was read by Ram).',
      example2: '"बच्चे ने गेंद फेंकी।" (The child threw the ball.) → "गेंद बच्चे द्वारा फेंकी गई।" (The ball was thrown by the child.)',
      example3: '"पिता ने खाना पकाया।"(Father cooked the food.) → "खाना पिता द्वारा पकाया चलता है।"(The food was cooked by the father.)'
    },
    { 
      title: 'Indirect Speech', 
      content: 'Converting direct speech to reported or indirect speech.' ,
      example:'"वह कहता है कि वह अच्छा है।" (He says that he is good.)→"वह कहता है कि वह खेल रहा है।"(He says that he is playing.)',
      example2:'"माया ने पूछा, "क्या तुम मेरे साथ चलोगे?"(Maya asked, "Will you walk with me?") → "माया ने पूछा कि क्या मैं उसके साथ चलूँगा।" (Maya asked if I would walk with her.)',
      example3:'"वह बोला, "मैं दिल्ली जा रहा हूँ।"" (He said, "I am going to Delhi.") → " वह बोला कि वह दिल्ली जा रहा है।" (He said that he was going to Delhi.)'
    },
    { 
        title: 'Word Formation and Derivational Morphology', 
        content: 'How new words are created using prefixes, suffixes, and roots.' ,
        example:' "सुंदर" (beautiful), "सुंदरता" (beauty).',
        example2:' "संगठित (Organized) → संगठन (Organization).',
        example3:' "रचनात्मक (Creative) → रचना (Creation)'
      },
      { 
        title: 'Direct and Indirect Objects', 
        content: 'Teaching how sentences with direct and indirect objects differ and their proper usage in Hindi.' ,
        example:'"मैंने उसे किताब दी।" (I gave him the book.)',
        example2:'"तुमने पत्र लिखा।" ( You wrote the letter.)',
        example3:'"मैंने उसे दिन दी।" (I gave him the day.)'
      },
    // Add more complex sentences as needed
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
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Complex Sentences</Text>
      {sentences.map((sentence, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleTextPress(
            sentence.title || '',
            sentence.content || '',
            [sentence.example, sentence.example2, sentence.example3].filter(Boolean) // Filter out undefined examples
          )}
        >
          <View style={styles.cardContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>{sentence.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2, // Add border width
    borderColor: '#FFD700', // Change border color to yellow
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
});
