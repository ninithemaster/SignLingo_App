import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function Shabdkosh() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const words = [
    { 
        title: 'Numbers (1-50)', 
        content: 'Numbers in Hindi are: १, २, ३, ४, ५, ६, ७, ८, ९, १०, ११, १२, १३, १४, १५, १६, १७, १८, १९, २०,२१, २२, २३, २४, २५, २६, २७, २८, २९, ३०,३१, ३२, ३३, ३४, ३५, ३६, ३७, ३८, ३९, ४०,४१, ४२, ४३, ४४, ४५, ४६, ४७, ४८, ४९, ५०.'
      },
      { 
        title: 'Numbers (51-100)', 
        content: 'Numbers in Hindi are: ५१, ५२, ५३, ५४, ५५, ५६, ५७, ५८, ५९, ६०,६१, ६२, ६३, ६४, ६५, ६६, ६७, ६८, ६९, ७०,७१, ७२, ७३, ७४, ७५, ७६, ७७, ७८, ७९, ८०,८१, ८२, ८३, ८४, ८५, ८६, ८७, ८८, ८९, ९०,९१, ९२, ९३, ९४, ९५, ९६, ९७, ९८, ९९, १००.'
      },
    {
      title: 'Days of the Week',
      content: 'The days of the week in Hindi are: सोमवार(Monday) , मंगलवार (Tuesday) , बुधवार (Wednesday), गुरुवार (Thursday) , शुक्रवार (Friday), शनिवार (Saturday) , रविवार (Sunday).'
    },
    {
      title: 'Colors',
      content: 'Colors in Hindi: लाल (Red), नीला (Blue), हरा (Green), पीला (Yellow), काला (Black), सफेद ( White).'
    },
    {
      title: 'Shapes',
      content: 'Shapes in Hindi: वृत्त (Circle), त्रिकोण (Triangle), वर्ग (Square), आयत (Rectangle).'
    },
    {
      title: 'Body Parts',
      content: 'Body parts in Hindi: सिर (Head), हाथ (Hand), पैर (Leg), आंख (Eye), नाक (Nose), मुंह (Mouth).'
    },
    {
        title: 'Pronouns and Simple Questions',
        content: 'Basic pronouns and common questions in Hindi: \n\nPronouns: मैं (I)\n तुम (You)\n वह (He/She)\n हम (We)\n आप (You - formal)\n वे (They)\n\nQuestions: \n"तुम कैसे हो?" (How are you?)\n"क्या तुम ठीक हो?" (Are you fine?)\n"तुम कहां जा रहे हो?" (Where are you going?)\n"क्या तुम स्कूल जा रहे हो?" (Are you going to school?)'
      },
      {
        title: 'Family Members',
        content: 'Family terms in Hindi: \n\nमाँ (Mother), पिता (Father), भाई (Brother), बहन (Sister), दादा (Grandfather), दादी (Grandmother), चाचा (Uncle), चाची (Aunt), बेटे (Son), बेटी (Daughter).'
      }      
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
      <Text style={[styles.title, { color: theme.text }]}>Shabdkosh</Text>
      {words.map((word, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handleTextPress(word.title, word.content)}>
          <View style={styles.cardContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>{word.title}</Text>
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
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
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
