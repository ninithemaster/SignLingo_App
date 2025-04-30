import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import expo-speech

export default function Pronouns() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const pronounsItems = [
    { 
      title: 'Reflexive Pronouns (स्वयं, खुद)', 
      content: `Reflexive pronouns refer back to the subject itself and emphasize self-action.
  Examples:
  
  1. वह खुद अपनी गलती मान गया। (He himself admitted his mistake.)
  
  2. मैंने स्वयं यह काम पूरा किया। (I completed this work myself.)
  
  3. बच्चे खुद खेल का आयोजन कर रहे हैं। (The children themselves are organizing the game.)
  
  4. वह स्वयं डॉक्टर से मिलने गया। (He went to meet the doctor himself.)`
    },
    { 
      title: 'Possessive Pronouns (मेरा, तुम्हारा, उसका आदि)', 
      content: `Possessive pronouns show ownership or possession.
  Examples:
  
  1. यह मेरा घर है। (This is my house.)
  
  2. वह तुम्हारा दोस्त है। (He is your friend.)
  
  3. उसका बैग भारी है। (His/Her bag is heavy.)
  
  4. यह किताब हमारी है। (This book is ours.)`
    },
    { 
      title: 'Object Pronouns (Direct and Indirect Objects)', 
      content: `Object pronouns replace nouns receiving action either directly or indirectly.
  Examples:
  
  1. मैं उसे किताब दूँगा। (I will give him the book.)
  
  2. उसने मुझे कहानी सुनाई। (He told me a story.)
  
  3. क्या तुम हमें भी बुलाओगे? (Will you invite us too?)
  
  4. उन्होंने तुम्हें पुरस्कार दिया। (They gave you the award.)`
    },
    { 
      title: 'Case Usage (Nominative, Accusative, Dative, Genitive, Locative)', 
      content: `Different cases define the role of nouns/pronouns in a sentence – subject, object, possession, location, etc.
  Examples:
  
  1. मैंने किताब पढ़ी। (Accusative – I read the book.)
  
  2. मैंने उसे एक संदेश भेजा। (Dative – I sent him a message.)
  
  3. यह मेरी माँ का घर है। (Genitive – This is my mother's house.)
  
  4. वह स्कूल में पढ़ता है। (Locative – He studies in the school.)`
    },
  ];
  

  const handleTextPress = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalVisible(true);
    Speech.speak(content, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Advanced Pronouns</Text>
      {pronounsItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleTextPress(item.title, item.content)}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
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
              <Text style={{ color: theme.text }}>Close</Text>
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
    padding: 20,
    backgroundColor: '#e0f2f1', // Light green background for the entire page
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004d40', // Dark green color for the title
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    borderRadius: 15, // More rounded corners for curvy effect
    padding: 20, // Increased padding for better spacing
    marginBottom: 15, // Increased margin for better separation
    elevation: 5, // Increased elevation for more pronounced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjusted shadow offset
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    borderWidth: 2, // Border width for definition
    borderColor: '#004d40', // Dark green border color
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40', // Dark green color for the card title
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for modal
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#004d40', // Dark green color for modal title
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color: '#004d40', // Dark green color for modal text
  },
  closeButton: {
    marginTop: 15,
  },
});