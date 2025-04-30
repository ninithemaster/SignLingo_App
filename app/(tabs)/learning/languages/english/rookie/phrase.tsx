import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function Phrases() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<{ title: string; info: string } | null>(null);

  const phrases = [
    { title: 'Saying Hello & Goodbye', info: 'Common greetings and farewells used in daily conversations.' },
    { title: 'Introducing Yourself', info: 'Phrases to introduce yourself to others.' },
    { title: 'Asking for Directions', info: 'How to ask for directions to various places.' },
    { title: 'Ordering Food', info: 'Useful phrases for ordering food at a restaurant.' },
    { title: 'Asking for time and date', info: 'Phrases to inquire about the current time and date.' },
    { title: 'Expressing Needs and Emotions', info: 'How to express your needs and emotions.' },
    { title: 'Making Small Talk', info: 'Phrases for casual conversations and small talk.' },
    { title: 'Shopping and Bartering', info: 'Useful phrases for shopping and negotiating prices.' },
    { title: 'Talking about Weather', info: 'How to discuss the weather conditions.' },
  ];

  const openModal = (phrase: { title: string; info: string }) => {
    setSelectedPhrase(phrase);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {phrases.map((phrase, index) => (
        <TouchableOpacity key={index} onPress={() => openModal(phrase)}>
          <Text style={[styles.phraseText, { color: theme.text }]}>{phrase.title}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            {selectedPhrase && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedPhrase.title}</Text>
                <Text style={[styles.modalInfo, { color: theme.subtitle }]}>{selectedPhrase.info}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
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
    padding: 16,
  },
  phraseText: {
    fontSize: 18,
    marginBottom: 10,
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
    fontSize: 20,
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
  },
});