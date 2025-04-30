import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function PronunciationScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState<string>('');

  const pronunciationList = [
    { text: 'あ', description: 'Pronounced as "a" in "car"' },
    { text: 'い', description: 'Pronounced as "ee" in "see"' },
    { text: 'う', description: 'Pronounced as "oo" in "food"' },
    { text: 'え', description: 'Pronounced as "e" in "bed"' },
    { text: 'お', description: 'Pronounced as "o" in "more"' },
    { text: 'か', description: 'Pronounced as "ka" in "car"' },
    { text: 'き', description: 'Pronounced as "kee" in "key"' },
    { text: 'く', description: 'Pronounced as "koo" in "cool"' },
    { text: 'け', description: 'Pronounced as "ke" in "kettle"' },
    { text: 'こ', description: 'Pronounced as "ko" in "coin"' },
    { text: 'さ', description: 'Pronounced as "sa" in "saw"' },
    { text: 'し', description: 'Pronounced as "shee" in "she"' },
    { text: 'す', description: 'Pronounced as "soo" in "soon"' },
    { text: 'せ', description: 'Pronounced as "se" in "sell"' },
    { text: 'そ', description: 'Pronounced as "so" in "so" (same as English)' },
    { text: 'た', description: 'Pronounced as "ta" in "talk"' },
    { text: 'あ', description: 'Pronounced as "a" in "car"' },
    { text: 'い', description: 'Pronounced as "ee" in "see"' },
    { text: 'う', description: 'Pronounced as "oo" in "food"' },
    { text: 'え', description: 'Pronounced as "e" in "bed"' },
    { text: 'お', description: 'Pronounced as "o" in "more"' },
    { text: 'か', description: 'Pronounced as "ka" in "car"' },
    { text: 'き', description: 'Pronounced as "kee" in "key"' },
    { text: 'く', description: 'Pronounced as "koo" in "cool"' },
    { text: 'け', description: 'Pronounced as "ke" in "kettle"' },
    { text: 'こ', description: 'Pronounced as "ko" in "coin"' },
    { text: 'さ', description: 'Pronounced as "sa" in "saw"' },
    { text: 'し', description: 'Pronounced as "shee" in "she"' },
    { text: 'す', description: 'Pronounced as "soo" in "soon"' },
    { text: 'せ', description: 'Pronounced as "se" in "sell"' },
    { text: 'そ', description: 'Pronounced as "so" in "so" (same as English)' },
    { text: 'た', description: 'Pronounced as "ta" in "talk"' },
    { text: 'ち', description: 'Pronounced as "chee" in "cheese"' },
    { text: 'つ', description: 'Pronounced as "tsu" in "tsunami"' },
    { text: 'て', description: 'Pronounced as "te" in "tennis"' },
    { text: 'と', description: 'Pronounced as "to" in "top"' },
    { text: 'な', description: 'Pronounced as "na" in "name"' },
    { text: 'に', description: 'Pronounced as "ni" in "nine"' },
    { text: 'ぬ', description: 'Pronounced as "nu" in "nurse"' },
    { text: 'ね', description: 'Pronounced as "ne" in "new"' },
    { text: 'の', description: 'Pronounced as "no" in "no"' },
    { text: 'は', description: 'Pronounced as "ha" in "happy"' },
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
        {pronunciationList.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleOpenModal(item.text)}>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.description}</Text>
          </TouchableOpacity>
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
    borderColor: 'lightgreen', // Updated border color
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
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#007BFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});