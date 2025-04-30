import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function CommonPhrases() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const phrases = [
    { title: 'नमस्ते', content: 'नमस्ते का अर्थ होता है "Hello"।' },
    { title: 'धन्यवाद', content: 'धन्यवाद का अर्थ होता है "Thank you"।' },
    { title: 'कृपया', content: 'कृपया का अर्थ होता है "Please"।' },
    { title: 'माफ़ कीजिए', content: 'माफ़ कीजिए का अर्थ होता है "Excuse me" या "Sorry"।' },
    { title: 'हाँ', content: 'हाँ का अर्थ होता है "Yes"।' },
    { title: 'नहीं', content: 'नहीं का अर्थ होता है "No"।' },
    { title: 'आप कैसे हैं?', content: 'आप कैसे हैं? का अर्थ होता है "How are you?"।' },
    { title: 'मैं ठीक हूँ', content: 'मैं ठीक हूँ का अर्थ होता है "I am fine"।' },
    { title: 'आपका नाम क्या है?', content: 'आपका नाम क्या है? का अर्थ होता है "What is your name?"।' },
    { title: 'मेरा नाम ___ है।', content: 'मेरा नाम ___ है का अर्थ होता है "My name is ___"।' },
    { title: 'आपसे मिलकर खुशी हुई', content: 'आपसे मिलकर खुशी हुई का अर्थ होता है "Nice to meet you"।' },
    { title: 'शुभ प्रभात', content: 'शुभ प्रभात का अर्थ होता है "Good Morning"।' },
    { title: 'शुभ रात्रि', content: 'शुभ रात्रि का अर्थ होता है "Good Night"।' },
    { title: 'अलविदा', content: 'अलविदा का अर्थ होता है "Goodbye"।' },
    { title: 'फिर मिलेंगे', content: 'फिर मिलेंगे का अर्थ होता है "See you soon"।' },
    { title: 'ध्यान रखना', content: 'ध्यान रखना का अर्थ होता है "Take care"।' },
    { title: 'मुझे पानी चाहिए', content: 'मुझे पानी चाहिए का अर्थ होता है "I need water"।' },
    { title: 'मुझे भूख लगी है', content: 'मुझे भूख लगी है का अर्थ होता है "I am hungry"।' },
    { title: 'बाथरूम कहाँ है?', content: 'बाथरूम कहाँ है? का अर्थ होता है "Where is the bathroom?"।' },
    { title: 'यह कितने का है?', content: 'यह कितने का है? का अर्थ होता है "How much is this?"।' },
    { title: 'मुझे समझ नहीं आया', content: 'मुझे समझ नहीं आया का अर्थ होता है "I don’t understand"।' },
    { title: 'क्या आप मेरी मदद कर सकते हैं?', content: 'क्या आप मेरी मदद कर सकते हैं? का अर्थ होता है "Can you help me?"।' },
    { title: 'मैं रास्ता भटक गया हूँ', content: 'मैं रास्ता भटक गया हूँ का अर्थ होता है "I am lost"।' },
  ];
  
  const handleTextPress = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
    Speech.speak(content, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Common Phrases</Text>
      <View style={styles.cardContainer}>
        {phrases.map((phrase, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleTextPress(phrase.title, phrase.content)}
          >
            <View style={styles.cardContent}>
              <Ionicons name="information-circle-outline" size={24} color={theme.text} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{phrase.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
    padding: 8,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',// Add blue text color
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '48%', // Adjust width to fit two cards per row
    borderWidth: 2, // Add border width
    borderColor: '#1E90FF', // Add blue border color
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 12,
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