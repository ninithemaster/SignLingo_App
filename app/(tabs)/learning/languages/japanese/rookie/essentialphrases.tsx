import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function EssentialPhrases() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');

  const phrases = [
    // Greetings
    { text: 'ありがとう', translation: 'Thank you', category: 'Polite Expressions' },
    { text: 'ありがとうございます', translation: 'Thank you very much', category: 'Polite Expressions' },
  { text: 'すみません', translation: 'Excuse me / Sorry', category: 'Polite Expressions' },
  { text: 'ごめんなさい', translation: 'I\'m sorry', category: 'Polite Expressions' },
  { text: 'はい', translation: 'Yes', category: 'Polite Expressions' },
  { text: 'いいえ', translation: 'No', category: 'Polite Expressions' },
  { text: 'どういたしまして', translation: 'You\'re welcome', category: 'Polite Expressions' },
  { text: 'おねがいします', translation: 'Please', category: 'Polite Expressions' },
  { text: 'おつかれさまです', translation: 'Thank you for your hard work', category: 'Polite Expressions' },
  { text: 'しつれいします', translation: 'Excuse me (entering/leaving)', category: 'Polite Expressions' },

  // Self-Introduction
  { text: 'はじめまして', translation: 'Nice to meet you', category: 'Self-Introduction' },
  { text: 'わたしは [Name] です', translation: 'I am [Name]', category: 'Self-Introduction' },
  { text: 'よろしくおねがいします', translation: 'Please treat me well', category: 'Self-Introduction' },
  { text: '[Place] からきました', translation: 'I am from [Place]', category: 'Self-Introduction' },
  { text: '[Age] さいです', translation: 'I am [Age] years old', category: 'Self-Introduction' },
  { text: '[Occupation] です', translation: 'I am a [Occupation]', category: 'Self-Introduction' },
  { text: 'がくせいです', translation: 'I am a student', category: 'Self-Introduction' },
  { text: 'にほんごをべんきょうしています', translation: 'I am studying Japanese', category: 'Self-Introduction' },
  { text: 'すこしだけにほんごがはなせます', translation: 'I can speak a little Japanese', category: 'Self-Introduction' },
  { text: 'どうぞよろしく', translation: 'Nice to meet you (casual)', category: 'Self-Introduction' },

  // Basic Questions
  { text: 'おなまえは？', translation: 'What is your name?', category: 'Basic Questions' },
  { text: 'どこですか？', translation: 'Where is it?', category: 'Basic Questions' },
  { text: 'いくらですか？', translation: 'How much is it?', category: 'Basic Questions' },
  { text: 'なんですか？', translation: 'What is it?', category: 'Basic Questions' },
  { text: 'なにをしていますか？', translation: 'What are you doing?', category: 'Basic Questions' },
  { text: 'なんじですか？', translation: 'What time is it?', category: 'Basic Questions' },
  { text: 'なにがすきですか？', translation: 'What do you like?', category: 'Basic Questions' },
  { text: 'これはなんですか？', translation: 'What is this?', category: 'Basic Questions' },
  { text: 'どこにいきますか？', translation: 'Where are you going?', category: 'Basic Questions' },
  { text: 'だれですか？', translation: 'Who is it?', category: 'Basic Questions' },

  // Travel and Daily Use
  { text: 'トイレはどこですか？', translation: 'Where is the restroom?', category: 'Travel and Daily Use' },
  { text: 'たすけて！', translation: 'Help!', category: 'Travel and Daily Use' },
  { text: 'これをください', translation: 'I’ll take this / Please give me this', category: 'Travel and Daily Use' },
  { text: 'わかりません', translation: 'I don’t understand', category: 'Travel and Daily Use' },
  { text: 'えいごがはなせますか？', translation: 'Can you speak English?', category: 'Travel and Daily Use' },
  { text: 'でんわをつかってもいいですか？', translation: 'May I use the phone?', category: 'Travel and Daily Use' },
  { text: 'ちずをみせてください', translation: 'Please show me a map', category: 'Travel and Daily Use' },
  { text: 'じかんがありますか？', translation: 'Do you have time?', category: 'Travel and Daily Use' },
  { text: 'チケットをください', translation: 'Please give me a ticket', category: 'Travel and Daily Use' },
  { text: 'どうやっていきますか？', translation: 'How do I get there?', category: 'Travel and Daily Use' }
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
        {phrases.map((item, index) => (
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
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 50,
    alignItems: 'center',
  },
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 2, // Updated border width
    borderColor: 'purple', // Updated border color
    width: '90%',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});