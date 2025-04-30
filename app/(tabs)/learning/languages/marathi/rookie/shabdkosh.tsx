import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ShabdkoshScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedMeaning, setSelectedMeaning] = useState('');

  const words = [
    {
      title: 'Days of the Week (आठवड्याचे दिवस)',
      content: 'सोमवार (Monday), मंगळवार (Tuesday), बुधवार (Wednesday), गुरुवार (Thursday), शुक्रवार (Friday), शनिवार (Saturday), रविवार (Sunday).',
      image: require('@/assets/images/marathi/days.jpeg')
    },
    {
      title: 'Colors (रंग)',
      content: 'लाल (Red), निळा (Blue), हिरवा (Green), पिवळा (Yellow), काळा (Black), पांढरा (White), नारिंगी (Orange), जांभळा (Purple).',
      image: require('@/assets/images/marathi/colors.jpeg')
    },
    {
      title: 'Common Shapes (आकार)',
      content: 'वर्तुळ (Circle), चौकट (Square), त्रिकोण (Triangle), आयत (Rectangle).',
      image: require('@/assets/images/marathi/shapes.jpeg')
    },
    {
      title: 'Pronouns (सर्वनाम)',
      content: 'मी (I), तू (You - informal), आपण (We/You - formal), तो (He), ती (She), ते (They).',
      image: require('@/assets/images/marathi/pronouns.jpeg')
    },
    {
      title: 'Family Members (कुटुंबातील सदस्य)',
      content: 'आई (Mother), वडील (Father), भाऊ (Brother), बहीण (Sister), आजी (Grandmother), आजोबा (Grandfather).',
      image: require('@/assets/images/marathi/family.jpeg')
    },
    {
      title: 'Basic Emotions (भावना)',
      content: 'आनंदी (Happy), दुःखी (Sad), रागावलेला (Angry), भुकेलेला (Hungry).',
      image: require('@/assets/images/marathi/emotions.jpeg')
    }
  ];

  const handlePress = (word: string, content: string) => {
    setSelectedWord(word);
    setSelectedMeaning(content);
    setModalVisible(true);
    Speech.speak(word + '. ' + content, { language: 'mr', rate: 0.8 });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {words.map((word, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(word.title, word.content)}
          >
            <View style={styles.cardContent}>
              <Image source={word.image} style={styles.cardImage} />
              <Text style={[styles.wordText, { color: theme.text }]}>{word.title}</Text>
              <View style={styles.iconContainer}>
                <Text style={[styles.tapHint, { color: theme.subtitle }]}>Tap to explore</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalWord, { color: theme.text }]}>{selectedWord}</Text>
            </View>
            <ScrollView style={styles.modalScrollView}>
              <Text style={[styles.modalText, { color: theme.text }]}>{selectedMeaning}</Text>
            </ScrollView>
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
    paddingBottom: 80,
    paddingHorizontal: 12,
  },
  card: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#006400', // Dark green border
  },
  cardContent: {
    padding: 20,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  wordText: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  tapHint: {
    fontSize: 14,
    fontStyle: 'italic',
    opacity: 0.7,
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
    maxHeight: '80%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalWord: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalScrollView: {
    padding: 20,
    paddingBottom: 30,
  },
  modalText: {
    fontSize: 20,
    lineHeight: 32,
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  closeButton: {
    margin: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});