import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function AlphabetsScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const alphabets = {
    vowels: [
      { text: 'अ', example: 'अमर (Immortal)' },
      { text: 'आ', example: 'आंबा (Mango)' },
      { text: 'इ', example: 'इमारत (Building)' },
      { text: 'ई', example: 'ईश्वर (God)' },
      { text: 'उ', example: 'उदय (Sunrise)' },
      { text: 'ऊ', example: 'ऊर्जा (Energy)' },
      { text: 'ऋ', example: 'ऋतु (Season)' },
      { text: 'ॠ', example: 'ॠतु (Season - rarely used)' },
      { text: 'ऌ', example: 'ऌक (A rare word)' },
      { text: 'ॡ', example: 'ॡक (A rare word)' },
      { text: 'ए', example: 'एक (One)' },
      { text: 'ऐ', example: 'ऐसा (Such)' },
      { text: 'ओ', example: 'ओट (Shed)' },
      { text: 'औ', example: 'औषध (Medicine)' },
      { text: 'अं', example: 'संग (Together)' },
      { text: 'अः', example: 'अः (Expression of relief)' },
    ],
    consonants: [
      { text: 'क', example: 'कथा (Story)' },
      { text: 'ख', example: 'खुश (Happy)' },
      { text: 'ग', example: 'घर (House)' },
      { text: 'घ', example: 'घंटा (Hour)' },
      { text: 'ङ', example: 'ङी (Used in specific contexts, like ङ in (ङ्ग)' },
      { text: 'च', example: 'चमच (Spoon)' },
      { text: 'छ', example: 'छोटा (Small)' },
      { text: 'ज', example: 'जल (Water)' },
      { text: 'झ', example: 'झोप (Sleep)' },
      { text: 'ञ', example: 'ञा (Used in special words like ज्ञान - Knowledge)' },
      { text: 'ट', example: 'टमाटर (Tomato)' },
      { text: 'ठ', example: 'ठाकूर (Lord)' },
      { text: 'ड', example: 'डोंगर (Mountain)' },
      { text: 'ढ', example: 'ढोल (Drum)' },
      { text: 'ण', example: 'णम (Nam - A rare word)' },
      { text: 'त', example: 'तप (Penitence)' },
      { text: 'थ', example: 'थंड (Cold)' },
      { text: 'द', example: 'दिना (Day)' },
      { text: 'ध', example: 'धन (Wealth)' },
      { text: 'न', example: 'नदी (River)' },
      { text: 'प', example: 'पाणी (Water)' },
      { text: 'फ', example: 'फूल (Flower)' },
      { text: 'ब', example: 'बाळ (Child)' },
      { text: 'भ', example: 'भार (Weight)' },
      { text: 'म', example: 'मित्र (Friend)' },
      { text: 'य', example: 'यात्रा (Journey)' },
      { text: 'र', example: 'रात्री (Night)' },
      { text: 'ल', example: 'लक्ष (Goal)' },
      { text: 'व', example: 'वर्ग (Class)' },
      { text: 'श', example: 'शाळा (School)' },
      { text: 'ष', example: 'षट्कोण (Hexagon)' },
      { text: 'स', example: 'सपाट (Flat)' },
      { text: 'ह', example: 'हास्य (Laughter)' },
      { text: 'ळ', example: 'ळया (Rare, used in words like गळय - Neck)' },
      { text: 'क्ष', example: 'क्षेत्र (Field)' },
      { text: 'ज्ञ', example: 'ज्ञान (Knowledge)' },
    ],
  };

  const handlePress = (text: string, example: string) => {
    setSelectedText(example);
    setModalVisible(true);
    Speech.speak(`${text} - ${example}`, { language: 'mr' }); // Read both text and example
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        <Text style={[{ fontSize: 24, fontWeight: 'bold', marginVertical: 16 }, { color: theme.text }]}>Vowels (स्वर)</Text>
        <View style={styles.cardsContainer}>
          {alphabets.vowels.map((alphabet, index) => (
            <TouchableOpacity
              key={`vowel-${index}`}
              style={[styles.card, { backgroundColor: theme.cardBackground }]}
              onPress={() => handlePress(alphabet.text, alphabet.example)}
            >
              <Text style={[styles.alphabetText, { color: theme.text }]}>{alphabet.text}</Text>
              <Text style={[styles.tapHint, { color: theme.subtitle }]}>Tap to learn</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[{ fontSize: 24, fontWeight: 'bold', marginVertical: 16 }, { color: theme.text }]}>Consonants (व्यंजन)</Text>
        <View style={[styles.cardsContainer]}>
          {alphabets.consonants.map((alphabet, index) => (
            <TouchableOpacity
              key={`consonant-${index}`}
              style={[styles.card, { backgroundColor: theme.cardBackground }]}
              onPress={() => handlePress(alphabet.text, alphabet.example)}
            >
              <Text style={[styles.alphabetText, { color: theme.text }]}>{alphabet.text}</Text>
              <Text style={[styles.tapHint, { color: theme.subtitle }]}>Tap to learn</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedText}</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={[styles.closeButton, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 80,
    paddingHorizontal: 8,
  },
  card: {
    width: '31%',
    aspectRatio: 1,
    margin: 4,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  alphabetText: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
  },
  tapHint: {
    fontSize: 10,
    marginTop: 8,
    opacity: 0.6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    padding: 25,
    borderRadius: 25,
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 32,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});