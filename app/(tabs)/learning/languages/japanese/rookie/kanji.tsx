import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function KanjiScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKanji, setSelectedKanji] = useState<string>('');

  const kanjiList = [
    { text: '日', meaning: 'Sun/Day' },
    { text: '月', meaning: 'Moon/Month' },
    { text: '火', meaning: 'Fire' },
    { text: '水', meaning: 'Water' },
    { text: '木', meaning: 'Tree' },
    { text: '金', meaning: 'Gold/Money' },
    { text: '土', meaning: 'Earth' },
    { text: '山', meaning: 'Mountain' },
    { text: '川', meaning: 'River' },
    { text: '田', meaning: 'Field' },
  
    // Additional basic Kanji
    { text: '人', meaning: 'Person' },
    { text: '口', meaning: 'Mouth' },
    { text: '目', meaning: 'Eye' },
    { text: '耳', meaning: 'Ear' },
    { text: '手', meaning: 'Hand' },
    { text: '足', meaning: 'Foot/Leg' },
    { text: '力', meaning: 'Power' },
    { text: '男', meaning: 'Man' },
    { text: '女', meaning: 'Woman' },
    { text: '子', meaning: 'Child' },
    { text: '学', meaning: 'Study' },
    { text: '校', meaning: 'School' },
    { text: '生', meaning: 'Life/Student' },
    { text: '先', meaning: 'Before/Previous' },
    { text: '大', meaning: 'Big' },
    { text: '小', meaning: 'Small' },
    { text: '中', meaning: 'Middle' },
    { text: '上', meaning: 'Up' },
    { text: '下', meaning: 'Down' },
    { text: '左', meaning: 'Left' },
    { text: '右', meaning: 'Right' },
    { text: '今', meaning: 'Now' },
    { text: '年', meaning: 'Year' },
    { text: '時', meaning: 'Time/Hour' },
    { text: '何', meaning: 'What' },
    { text: '円', meaning: 'Yen/Circle' },
    { text: '名', meaning: 'Name' },
  { text: '天', meaning: 'Heaven/Sky' },
  { text: '空', meaning: 'Sky/Empty' },
  { text: '雨', meaning: 'Rain' },
  { text: '車', meaning: 'Car/Vehicle' }
  ];


  const handleOpenModal = (kanji: string) => {
    setSelectedKanji(kanji);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakKanji = (kanji: string) => {
    Speech.speak(kanji, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {kanjiList.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleOpenModal(item.text)}>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.meaning}</Text>
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
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedKanji}</Text>
            <TouchableOpacity onPress={() => speakKanji(selectedKanji)}>
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
    borderColor: 'orange', // Changed border color to orange
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
    borderWidth: 2, // Added border width
    borderColor: 'black', // Added border color
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});