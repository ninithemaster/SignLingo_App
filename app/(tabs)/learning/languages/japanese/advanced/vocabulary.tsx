import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function VocabularyScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVocabulary, setSelectedVocabulary] = useState<string>('');

  const vocabularyList = [
    { text: '経済 (けいざい)', description: 'Economy' },
    { text: '政治 (せいじ)', description: 'Politics' },
    { text: '文化 (ぶんか)', description: 'Culture' },
    { text: '法律 (ほうりつ)', description: 'Law' },
    { text: '環境 (かんきょう)', description: 'Environment' },
    { text: '技術 (ぎじゅつ)', description: 'Technology / Technique' },
    { text: '国際 (こくさい)', description: 'International' },
    { text: '企業 (きぎょう)', description: 'Enterprise / Corporation' },
    { text: '情報 (じょうほう)', description: 'Information' },
    { text: '教育 (きょういく)', description: 'Education' },
    { text: '科学 (かがく)', description: 'Science' },
    { text: '報告 (ほうこく)', description: 'Report' },
    { text: '統計 (とうけい)', description: 'Statistics' },
    { text: '提案 (ていあん)', description: 'Proposal / Suggestion' },
    { text: '分析 (ぶんせき)', description: 'Analysis' },
    { text: '開発 (かいはつ)', description: 'Development' },
    { text: '支援 (しえん)', description: 'Support / Assistance' },
    { text: '目標 (もくひょう)', description: 'Goal / Objective' },
    { text: '責任 (せきにん)', description: 'Responsibility' },
    { text: '経験 (けいけん)', description: 'Experience' },
    { text: '戦略 (せんりゃく)', description: 'Strategy' },
    { text: '影響 (えいきょう)', description: 'Influence / Impact' },
    { text: '改善 (かいぜん)', description: 'Improvement (often used in business)' },
    { text: '課題 (かだい)', description: 'Issue / Task / Challenge' },
    { text: '知識 (ちしき)', description: 'Knowledge' },
    { text: '実施 (じっし)', description: 'Implementation / Execution' },
    { text: '評価 (ひょうか)', description: 'Evaluation / Assessment' },
    { text: '効率 (こうりつ)', description: 'Efficiency' },
    { text: '展開 (てんかい)', description: 'Development / Deployment' },
    { text: '供給 (きょうきゅう)', description: 'Supply / Provision' }
  ];
  

  const handleOpenModal = (text: string) => {
    setSelectedVocabulary(text);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakVocabulary = (text: string) => {
    Speech.speak(text, { language: 'ja' }); // Implement speech functionality
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {vocabularyList.map((item, index) => (
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
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedVocabulary}</Text>
            <TouchableOpacity onPress={() => speakVocabulary(selectedVocabulary)}>
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
    borderColor: 'green', // Updated border color
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
    color: '#007BFF',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});