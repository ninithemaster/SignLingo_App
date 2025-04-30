import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function AdvancedTenses() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const tenses = [
    { 
      title: 'Past Perfect Tense', 
      content: 'Used for actions that have been completed.',
      example: '"मैंने खाना खा लिया था जब वह आया।" (I had eaten when he arrived.)\n',
      example2: '"मैंने अपनी किताब पढ़ ली है।"(I have finished reading my book.)\n',
      example3: '"उन्होंने फिल्म देख ली है।"(They have watched the movie.)\n',
      example4: '"हमने खाना खा लिया है।"(We have eaten the food.)'
    },
    { 
        title: 'Continuous Past Tense', 
        content: 'Used for actions that were happening over time in the past.',
        example: '"वह स्कूल जा रहा था।" (He was going to school.)\n',
        example2: '"मैं रात को पढ़ाई कर रही थी।"(I was studying at night.)\n',
        example3: '"बच्चे पार्क में खेल रहे थे।"(The children were playing in the park.)\n',
        example4: '"तुम फिल्म देख रहे थे।"(You were watching a movie.)'
      },
    { 
      title: ' Simple Future Tense', 
      content: 'Used to talk about actions that will happen.',
      example: '"मैं कल इस समय पढ़ रहा होऊंगा।" (I will be studying at this time tomorrow.)',
      example2:'"वह परीक्षा देगा।"(He will give the exam.)',
      example3: '"हम जल्दी लौटेंगे।"(We will return soon.)',
      example4:'"वे अगले सप्ताह छुट्टी पर जाएँगे।"(They will go on vacation next week.)'
    },
    { 
        title: 'Future Continuous', 
        content: 'Used to talk about ongoing actions that will happen in the future.',
        example: '"मैं शाम को पढ़ाई कर रहा होऊँगा।" (I will be studying in the evening.)',
        example2:'"वह अगले साल दिल्ली में रह रहा होगा।"(He will be living in Delhi next year.)',
        example3: '"हम अगले हफ्ते यात्रा कर रहे होंगे।"(We will be traveling next week.)',
        example4:'"तुम इस समय काम कर रहे होगे।"(You will be working at this time.)'
      },
      { 
        title: 'Future Perfect', 
        content: 'Used for actions that will be completed by a certain point in the future.',
        example: '"मैं अगले महीने तक अपनी किताब पूरी कर चुका होऊँगा।" (I will have finished my book by next month.)',
        example2:'"वह छह बजे तक घर पहुँच चुका होगा।"(He will have reached home by 6 oclock.)',
        example3: '"हम साल के अंत तक प्रोजेक्ट पूरा कर चुके होंगे।"(We will have completed the project by the end of the year.)',
        example4:'"वे अगले सप्ताह तक यात्रा कर चुके होंगे।"(They will have traveled by next week.)'
      },
      { 
        title: 'Subjunctive Mood', 
        content: 'Used for hypothetical, wishful, or uncertain situations.',
        example: '"काश मैं वहाँ जा पाता।" (I wish I could go there.)',
        example2:'"अगर वह मदद करता तो अच्छा होता।"(It would have been good if he had helped.)'
      },
      { 
        title: 'Conditional Sentences', 
        content: 'If-Then structure to express conditions.',
        example: '"अगर बारिश होगी, तो हम बाहर नहीं जाएँगे।" (If it rains, we will not go outside.)',
        example2:'"अगर वह मेहनत करेगा, तो सफल होगा।"(If he works hard, he will succeed.)',
        example3:'"अगर मुझे समय मिला, तो मैं तुम्हें कॉल करूँगा।"(If I get time, I will call you.)'
      },
      { 
        title: 'Complex Adjective Usage', 
        content: 'Comparative and Superlative Forms',
        content2: 'Adjectives with Multiple Meanings Depending on Context',
        example: '"यह किताब उस किताब से बेहतर है।" (This book is better than that book.)',
        example2:'"वह सबसे तेज धावक है।"(He is the fastest runner.)',
        example3:'"आज का मौसम कल से अच्छा है।"(Todays weather is better than yesterdays.)',
        example4:'"लंबा (long/tall)":वह लड़का लंबा है। (He is tall.),यह सड़क बहुत लंबी है। (This road is very long.)',
        example5: '"अच्छा (good/nice)":वह अच्छा इंसान है।,यह बहुत अच्छा विचार है।'
      },
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
      <Text style={[styles.title, { color: theme.text }]}>Advanced Tenses</Text>
      {tenses.map((tense, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleTextPress(
            tense.title || '',
            tense.content || '',
            [tense.example, tense.example2, tense.example3, tense.example4, tense.example5]
              .filter((example): example is string => typeof example === 'string') // Type guard to ensure string array
          )}
        >
          <View style={styles.cardContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>{tense.title}</Text>
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
    padding: 20,
    backgroundColor: '#f0f8ff', // Light blue background for the entire page
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#4682b4', // Steel blue color for the title
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    borderRadius: 20, // More rounded corners for curvy effect
    padding: 5, // Increased padding for better spacing
    marginBottom: 20, // Increased margin for better separation
    elevation: 6, // Increased elevation for more pronounced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjusted shadow offset
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 8, // Increased shadow radius
    borderWidth: 2, // Border width for definition
    borderColor: '#32CD32', // Green border color
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
    color: '#4682b4', // Steel blue color for the card title
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
    backgroundColor: '#ffffff', // White background for modal
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4682b4', // Steel blue color for modal title
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color: '#4682b4', // Steel blue color for modal text
  },
  closeButton: {
    marginTop: 15,
  },
});