import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function QuestionsScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedMeaning, setSelectedMeaning] = useState('');

  const questions = [
    {
      title: 'तुमचे वय किती आहे?',
      content: 'To ask "What is your age?" politely.',
      example: 'नवीन मित्राला विचारले - तुमचे वय किती आहे? (Asked a new friend: What is your age?)',
      example2: 'शाळेत शिक्षकाने विचारले - तुमचे वय किती आहे? (Teacher asked in school: What is your age?)',
    },
    {
      title: 'तुम्ही काय करता?',
      content: 'To ask "What do you do?" about someone’s work or studies.',
      example: 'ओळख झाल्यावर विचारले - तुम्ही काय करता? (After introduction: What do you do?)',
      example2: 'नवीन शेजाऱ्याला विचारले - तुम्ही काय करता? (Asked a new neighbor: What do you do?)',
    },
    {
      title: 'तुमचं आवडतं रंग कोणता?',
      content: 'To ask "What is your favorite color?"',
      example: 'मित्राला विचारले - तुमचं आवडतं रंग कोणता? (Asked a friend: What is your favorite color?)',
      example2: 'बच्चाला विचारले - तुझा आवडता रंग कोणता? (Asked a child: What is your favorite color?)',
    },
    {
      title: 'तुम्हाला खेळ आवडतो का?',
      content: 'To ask "Do you like playing games?"',
      example: 'मुलाला विचारले - तुम्हाला खेळ आवडतो का? (Asked a boy: Do you like playing?)',
      example2: 'मित्राला विचारले - क्रिकेट खेळायला आवडते का? (Asked a friend: Do you like to play cricket?)',
    },
    {
      title: 'आपण भेटू शकतो का?',
      content: 'To ask "Can we meet?" politely.',
      example: 'मित्राला विचारले - आपण भेटू शकतो का? (Asked a friend: Can we meet?)',
      example2: 'शिक्षकाला विचारले - आपण उद्या भेटू शकतो का? (Asked a teacher: Can we meet tomorrow?)',
    },
    {
      title: 'आज कोणता दिवस आहे?',
      content: 'To ask "What day is it today?"',
      example: 'शाळेत विचारले - आज कोणता दिवस आहे? (Asked in school: What day is today?)',
      example2: 'घरात विचारले - आज रविवार आहे का? (At home: Is it Sunday today?)',
    },
    {
      title: 'तुम्ही कुठे राहता?',
      content: 'To ask "Where do you live?"',
      example: 'ओळख झाल्यावर विचारले - तुम्ही कुठे राहता? (After meeting: Where do you live?)',
      example2: 'शाळेतील नवीन विद्यार्थ्याला विचारले - तुम्ही कुठे राहता? (Asked a new student: Where do you live?)',
    },
    {
      title: 'तुमचं आवडतं अन्न कोणतं?',
      content: 'To ask "What is your favorite food?"',
      example: 'मित्राला विचारले - तुमचं आवडतं अन्न कोणतं? (Asked a friend: What is your favorite food?)',
      example2: 'नवीन पाहुण्याला विचारले - आपल्याला कोणते अन्न आवडते? (Asked a guest: What food do you like?)',
    },
    {
      title: 'तुम्ही मराठी बोलता का?',
      content: 'To ask "Do you speak Marathi?"',
      example: 'नवीन व्यक्तीला विचारले - तुम्ही मराठी बोलता का? (Asked a new person: Do you speak Marathi?)',
      example2: 'पर्यटकाला विचारले - तुम्ही मराठी बोलता का? (Asked a tourist: Do you speak Marathi?)',
    },
    {
      title: 'माझी मदत करू शकता का?',
      content: 'To ask "Can you help me?" politely.',
      example: 'रस्त्यावर विचारले - माझी मदत करू शकता का? (Asked on the road: Can you help me?)',
      example2: 'शाळेतील मित्राला विचारले - होमवर्कसाठी माझी मदत करू शकता का? (Asked a friend for homework help: Can you help me?)',
    },
    {
        title: 'आज हवामान कसं आहे?',
        content: 'To ask "How is the weather today?"',
        example: 'सकाळी विचारले - आज हवामान कसं आहे? (Asked in the morning: How is the weather today?)',
        example2: 'भाऊला विचारले - बाहेर पाऊस आहे का? (Asked brother: Is it raining outside?)',
      },
      {
        title: 'तुम्हाला वाचन आवडते का?',
        content: 'To ask "Do you like reading?"',
        example: 'मित्राला विचारले - तुम्हाला वाचन आवडते का? (Asked a friend: Do you like reading?)',
        example2: 'विद्यार्थ्याला विचारले - पुस्तक वाचायला आवडते का? (Asked a student: Do you like reading books?)',
      },
      {
        title: 'आपण एकत्र जेवण करू का?',
        content: 'To ask "Shall we eat together?"',
        example: 'मित्राला विचारले - आपण एकत्र जेवण करू का? (Asked a friend: Shall we eat together?)',
        example2: 'कुटुंबाला विचारले - आज आपण एकत्र जेवण करू का? (Asked family: Shall we have lunch together?)',
      },
      {
        title: 'तुम्ही कोणत्या शाळेत शिकता?',
        content: 'To ask "Which school do you study in?"',
        example: 'नवीन मित्राला विचारले - तुम्ही कोणत्या शाळेत शिकता? (Asked a new friend: Which school do you study in?)',
        example2: 'शाळेत नवीन विद्यार्थ्याला विचारले - कोणत्या शाळेत शिकता? (Asked a new student: Which school?)',
      },
      {
        title: 'तुम्हाला चित्र काढायला आवडते का?',
        content: 'To ask "Do you like drawing?"',
        example: 'मुलाला विचारले - तुम्हाला चित्र काढायला आवडते का? (Asked a child: Do you like drawing?)',
        example2: 'मैत्रिणीला विचारले - चित्रकलेत आवड आहे का? (Asked a friend: Do you like art?)',
      },
  ];
  
  const handlePress = (word: string, content: string, example: string, example2: string) => {
    setSelectedWord(word);
    setSelectedMeaning(`${content}\n\nExample 1:\n${example}\n\nExample 2:\n${example2}`);
    setModalVisible(true);
    
    // Create a pause between sections
    const pause = ', ';
    
    // Combine all text to be read
    const textToRead = `${word}${pause}${content}${pause}उदाहरण एक${pause}${example}${pause}उदाहरण दोन${pause}${example2}`;
    
    // Speak the entire content
    Speech.speak(textToRead, { 
      language: 'mr', 
      rate: 0.8 
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {questions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(
              question.title,
              question.content,
              question.example,
              question.example2
            )}
          >
            <View style={styles.cardContent}>
              <Text style={[styles.wordText, { color: theme.text }]}>{question.title}</Text>
              <Text style={[styles.englishText, { color: theme.subtitle }]}>{question.content}</Text>
              <View style={styles.iconContainer}>
                <Text style={[styles.tapHint, { color: theme.subtitle }]}>Tap to learn more</Text>
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
    paddingHorizontal: 5,
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
    borderColor: '#4CAF50', // Nice green color
  },
  cardContent: {
    padding: 20,
  },
  wordText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'left',
  },
  englishText: {
    fontSize: 15,
    textAlign: 'left',
    opacity: 0.8,
    marginBottom: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tapHint: {
    fontSize: 12,
    fontStyle: 'italic',
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
    width: '100%',
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
    maxHeight: '60%',
    padding: 20,
  },
  modalText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'left',
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
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
}); // Don't forget the closing bracket