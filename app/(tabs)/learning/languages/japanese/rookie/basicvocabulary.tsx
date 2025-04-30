import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function BasicVocabulary() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');

  const vocabulary = [
    // Greetings
    { text: 'こんにちは', translation: 'Hello', category: 'Greetings' },
    { text: 'さようなら', translation: 'Goodbye', category: 'Greetings' },
    { text: 'ありがとう', translation: 'Thank you', category: 'Greetings' },
    { text: 'すみません', translation: 'Excuse me / Sorry', category: 'Greetings' },
    { text: 'おはようございます', translation: 'Good morning', category: 'Greetings' },
    { text: 'こんばんは', translation: 'Good evening', category: 'Greetings' },
    { text: 'おやすみなさい', translation: 'Good night', category: 'Greetings' },
    { text: 'はじめまして', translation: 'Nice to meet you', category: 'Greetings' },
    { text: 'おげんきですか？', translation: 'How are you?', category: 'Greetings' },
    { text: 'はい', translation: 'Yes', category: 'Greetings' },
    { text: 'いいえ', translation: 'No', category: 'Greetings' },
  
    // Numbers (1–10)
    { text: 'いち', translation: 'One', category: 'Numbers (1-10)' },
    { text: 'に', translation: 'Two', category: 'Numbers (1-10)' },
    { text: 'さん', translation: 'Three', category: 'Numbers (1-10)' },
    { text: 'よん / し', translation: 'Four', category: 'Numbers (1-10)' },
    { text: 'ご', translation: 'Five', category: 'Numbers (1-10)' },
    { text: 'ろく', translation: 'Six', category: 'Numbers (1-10)' },
    { text: 'なな / しち', translation: 'Seven', category: 'Numbers (1-10)' },
    { text: 'はち', translation: 'Eight', category: 'Numbers (1-10)' },
    { text: 'きゅう / く', translation: 'Nine', category: 'Numbers (1-10)' },
    { text: 'じゅう', translation: 'Ten', category: 'Numbers (1-10)' },
  
    // Days of the Week
    { text: 'げつようび', translation: 'Monday', category: 'Days of the Week' },
    { text: 'かようび', translation: 'Tuesday', category: 'Days of the Week' },
    { text: 'すいようび', translation: 'Wednesday', category: 'Days of the Week' },
    { text: 'もくようび', translation: 'Thursday', category: 'Days of the Week' },
    { text: 'きんようび', translation: 'Friday', category: 'Days of the Week' },
    { text: 'どようび', translation: 'Saturday', category: 'Days of the Week' },
    { text: 'にちようび', translation: 'Sunday', category: 'Days of the Week' },
  
    // Months
    { text: 'いちがつ', translation: 'January', category: 'Months' },
    { text: 'にがつ', translation: 'February', category: 'Months' },
    { text: 'さんがつ', translation: 'March', category: 'Months' },
    { text: 'しがつ', translation: 'April', category: 'Months' },
    { text: 'ごがつ', translation: 'May', category: 'Months' },
    { text: 'ろくがつ', translation: 'June', category: 'Months' },
    { text: 'しちがつ', translation: 'July', category: 'Months' },
    { text: 'はちがつ', translation: 'August', category: 'Months' },
    { text: 'くがつ', translation: 'September', category: 'Months' },
    { text: 'じゅうがつ', translation: 'October', category: 'Months' },
    { text: 'じゅういちがつ', translation: 'November', category: 'Months' },
    { text: 'じゅうにがつ', translation: 'December', category: 'Months' },
  
    // Colors
    { text: 'あか', translation: 'Red', category: 'Colors' },
    { text: 'あお', translation: 'Blue', category: 'Colors' },
    { text: 'きいろ', translation: 'Yellow', category: 'Colors' },
    { text: 'みどり', translation: 'Green', category: 'Colors' },
    { text: 'くろ', translation: 'Black', category: 'Colors' },
    { text: 'しろ', translation: 'White', category: 'Colors' },
    { text: 'ちゃいろ', translation: 'Brown', category: 'Colors' },
    { text: 'むらさき', translation: 'Purple', category: 'Colors' },
    { text: 'ぴんく', translation: 'Pink', category: 'Colors' },
    { text: 'グレー', translation: 'Gray', category: 'Colors' },
  
    // Family Terms
    { text: 'おとうさん', translation: 'Father', category: 'Family Terms' },
    { text: 'おかあさん', translation: 'Mother', category: 'Family Terms' },
    { text: 'おにいさん', translation: 'Older brother', category: 'Family Terms' },
    { text: 'おねえさん', translation: 'Older sister', category: 'Family Terms' },
    { text: 'おとうと', translation: 'Younger brother', category: 'Family Terms' },
    { text: 'いもうと', translation: 'Younger sister', category: 'Family Terms' },
    { text: 'そふ', translation: 'Grandfather', category: 'Family Terms' },
    { text: 'そぼ', translation: 'Grandmother', category: 'Family Terms' },
    { text: 'かぞく', translation: 'Family', category: 'Family Terms' },
  
    // Pronouns
    { text: 'わたし', translation: 'I / Me (polite)', category: 'Pronouns' },
    { text: 'ぼく', translation: 'I / Me (casual, male)', category: 'Pronouns' },
    { text: 'あたし', translation: 'I / Me (casual, female)', category: 'Pronouns' },
    { text: 'あなた', translation: 'You', category: 'Pronouns' },
    { text: 'かれ', translation: 'He / Him', category: 'Pronouns' },
    { text: 'かのじょ', translation: 'She / Her', category: 'Pronouns' },
    { text: 'わたしたち', translation: 'We / Us', category: 'Pronouns' },
    { text: 'かれら', translation: 'They (male or mixed group)', category: 'Pronouns' },
    { text: 'かのじょたち', translation: 'They (female)', category: 'Pronouns' }
  ];
  

  const handleOpenModal = (text: string) => {
    setSelectedText(text);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakText = (text: string) => {
    Speech.speak(text, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {vocabulary.map((item, index) => (
          <View key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity onPress={() => handleOpenModal(item.text)}>
              <Text style={[styles.cardText, { color: theme.text }]}>{item.translation}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedText}</Text>
            <TouchableOpacity onPress={() => speakText(selectedText)}>
              <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={[styles.closeButton, { color: theme.text }]}>Close</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 50,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20, // Increased padding for better spacing
    borderRadius: 15, // More rounded corners for a softer look
    borderWidth: 2, // Dark green border width
    borderColor: 'darkgreen', // Dark green border color
    shadowColor: '#000', // Added shadow for depth
    shadowOffset: { width: 0, height: 4 }, // Increased shadow offset
    shadowOpacity: 0.4, // Increased shadow opacity
    shadowRadius: 5, // Increased shadow radius
    elevation: 6, // Elevation for Android shadow
    marginBottom: 20, // Increased margin between cards
    width: '90%',
    alignItems: 'center',
  },
  word: {
    fontSize: 24, // Larger font size for emphasis
    fontWeight: 'bold',
    marginBottom: 8, // Increased margin for spacing
  },
  meaning: {
    fontSize: 20, // Larger font size for better readability
    fontStyle: 'italic',
  },
  cardText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 20,
  },
  speakButton: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
  },
});