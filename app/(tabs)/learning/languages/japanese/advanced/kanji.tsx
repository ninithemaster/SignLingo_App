import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function KanjiScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKanji, setSelectedKanji] = useState<string>('');

  const kanjiList = [
    { text: '漢字 (Kanji)', description: 'Complex characters used in Japanese writing.' },
    { text: '熟語 (Jukugo)', description: 'Compound words formed with Kanji.' },
    { text: '部首 (Radicals)', description: 'Radicals are components of Kanji characters.' },
    { text: '経済 (Keizai)', description: 'Economy; often seen in business and news contexts.' },
    { text: '政治 (Seiji)', description: 'Politics; used in government and law.' },
    { text: '医療 (Iryō)', description: 'Medical care; common in healthcare and hospitals.' },
    { text: '環境 (Kankyō)', description: 'Environment; often used in science and ecology.' },
    { text: '情報 (Jōhō)', description: 'Information; seen in IT, media, and education.' },
    { text: '技術 (Gijutsu)', description: 'Technology or technique; common in engineering fields.' },
    { text: '文化 (Bunka)', description: 'Culture; used in social sciences and art.' },
    { text: '教育 (Kyōiku)', description: 'Education; appears in academic and school settings.' },
    { text: '法律 (Hōritsu)', description: 'Law; used in legal contexts and government documents.' },
    { text: '科学 (Kagaku)', description: 'Science; seen in research and academic texts.' },
    { text: '統計 (Tōkei)', description: 'Statistics; important in data analysis and reports.' },
    { text: '歴史 (Rekishi)', description: 'History; used in education and historical studies.' },
    { text: '産業 (Sangyō)', description: 'Industry; common in economics and business contexts.' },
    { text: '国際 (Kokusai)', description: 'International; often used in foreign relations or global events.' },
    { text: '企業 (Kigyō)', description: 'Enterprise or company; seen in corporate language.' },
    { text: '開発 (Kaihatsu)', description: 'Development; often in software, technology, and business.' },
    { text: '報告 (Hōkoku)', description: 'Report; formal word used in business or school.' }
  ];
  

  const handleOpenModal = (text: string) => {
    setSelectedKanji(text);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakKanji = (text: string) => {
    Speech.speak(text, { language: 'ja' }); // Implement speech functionality
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {kanjiList.map((item, index) => (
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
    borderColor: 'skyblue', // Updated border color
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
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#007BFF',
  },
});