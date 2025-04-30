import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; // Import Speech module

export default function HindiAlphabets() {  // Changed component name to HindiAlphabets
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  // Updated alphabets array to Hindi Swar (vowels) and Vyanjan (consonants)
  const alphabets = [
    // स्वर (Vowels)
    { title: 'अ', content: 'अनार से अ' },
    { title: 'आ', content: 'आम से आ' },
    { title: 'इ', content: 'इमली से इ' },
    { title: 'ई', content: 'ईख से ई' },
    { title: 'उ', content: 'उल्लू से उ' },
    { title: 'ऊ', content: 'ऊन से ऊ' },
    { title: 'ऋ', content: 'ऋषि से ऋ' },
    { title: 'ए', content: 'एक से ए' },
    { title: 'ऐ', content: 'ऐनक से ऐ' },
    { title: 'ओ', content: 'ओखली से ओ' },
    { title: 'औ', content: 'औरत से औ' },
    { title: 'अं', content: 'अंगूर से अं' },
    { title: 'अः', content: 'विष्णुः से अः' },
  
    // व्यंजन (Consonants)
    { title: 'क', content: 'कबूतर से क' },
    { title: 'ख', content: 'खरगोश से ख' },
    { title: 'ग', content: 'गमला से ग' },
    { title: 'घ', content: 'घर से घ' },
    { title: 'ङ', content: 'अंग से ङ' },
  
    { title: 'च', content: 'चम्मच से च' },
    { title: 'छ', content: 'छाता से छ' },
    { title: 'ज', content: 'जहाज से ज' },
    { title: 'झ', content: 'झूला से झ' },
    { title: 'ञ', content: 'ज्ञान से ञ' },
  
    { title: 'ट', content: 'टमाटर से ट' },
    { title: 'ठ', content: 'ठेला से ठ' },
    { title: 'ड', content: 'डमरू से ड' },
    { title: 'ढ', content: 'ढोल से ढ' },
    { title: 'ण', content: 'ज्ञान से ण' },
  
    { title: 'त', content: 'तरबूज से त' },
    { title: 'थ', content: 'थैली से थ' },
    { title: 'द', content: 'दरवाज़ा से द' },
    { title: 'ध', content: 'धनुष से ध' },
    { title: 'न', content: 'नल से न' },
  
    { title: 'प', content: 'पतंग से प' },
    { title: 'फ', content: 'फूल से फ' },
    { title: 'ब', content: 'बकरी से ब' },
    { title: 'भ', content: 'भालू से भ' },
    { title: 'म', content: 'मछली से म' },
  
    { title: 'य', content: 'यात्रा से य' },
    { title: 'र', content: 'रसगुल्ला से र' },
    { title: 'ल', content: 'लट्टू से ल' },
    { title: 'व', content: 'वानर से व' },
  
    { title: 'श', content: 'शरबत से श' },
    { title: 'ष', content: 'षडयंत्र से ष' },
    { title: 'स', content: 'सपना से स' },
    { title: 'ह', content: 'हिरन से ह' },
  
    { title: 'क्ष', content: 'क्षमा से क्ष' },
    { title: 'त्र', content: 'त्रिशूल से त्र' },
    { title: 'ज्ञ', content: 'ज्ञान से ज्ञ' },
  ];
  
  
  const handleTextPress = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
    Speech.speak(content, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  const vowels = alphabets.slice(0, 13); // Extract vowels
  const consonants = alphabets.slice(13); // Extract consonants

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>हिंदी वर्णमाला</Text>
      
      <Text style={[styles.subtitle, { color: theme.text }]}>Vowels (स्वर)</Text>
      <View style={styles.horizontalContainer}>
        {vowels.map((alphabet, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleTextPress(alphabet.title, alphabet.content)}>
            <View style={styles.cardContent}>
              <Ionicons name="information-circle-outline" size={24} color={theme.text} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{alphabet.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.subtitle, { color: theme.text }]}>Consonants (व्यंजन)</Text>
      <View style={styles.horizontalContainer}>
        {consonants.map((alphabet, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleTextPress(alphabet.title, alphabet.content)}>
            <View style={styles.cardContent}>
              <Ionicons name="information-circle-outline" size={24} color={theme.text} />
              <Text style={[styles.cardTitle, { color: theme.text }]}>{alphabet.title}</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
    textAlign: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 5,
  },
  card: {
    width: 60, // Set fixed width for uniform size
    height: 60, // Set fixed height for uniform size
    borderRadius: 8,
    padding: 8,
    margin: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
