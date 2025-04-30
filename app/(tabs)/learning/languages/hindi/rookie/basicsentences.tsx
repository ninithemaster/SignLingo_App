import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

export default function BasicSentences() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const sentences = [
    { title: 'मेरा नाम ___ है।', content: 'मेरा नाम ___ है का अर्थ होता है "My name is ___"।' },
    { title: 'मैं ठीक हूँ।', content: 'मैं ठीक हूँ का अर्थ होता है "I am fine"।' },
    { title: 'आप कैसे हैं?', content: 'आप कैसे हैं? का अर्थ होता है "How are you?"।' },
    // Add more sentences as needed
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
      <Text style={[styles.title, { color: theme.text }]}>Basic Sentences</Text>

      {/* Introduction to Sentence Structure */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Introduction to Sentence Structure', 'Hindi follows a simple SVO (Subject-Verb-Object) structure, similar to English. For example, "I eat an apple" (SVO) → "मैं सेब खाता हूँ" (Subject: मैं - "I", Verb: खाता हूँ - "eat", Object: सेब - "apple"). In some cases, Hindi follows SOV (Subject-Object-Verb) order, but for simplicity, we begin with SVO.')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Introduction to Sentence Structure</Text>
        </View>
      </TouchableOpacity>

      {/* Parts of a Sentence */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Parts of a Sentence', 'A sentence in Hindi typically consists of three parts: - Subject (विषय): The person or thing the sentence is about (e.g., मैं, तुम, वह) - Verb (क्रिया): The action being performed (e.g., खाता, पढ़ता, जाता) - Object (कर्म): The thing affected by the action (e.g., सेब, किताब, पानी)')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Parts of a Sentence</Text>
        </View>
      </TouchableOpacity>

      {/* Examples of Simple Sentences */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Examples of Simple Sentences', 'Subject + Verb + Object (SVO): - मैं पढ़ता हूँ (I read) - वह खाता है (He eats) - तुम खेलते हो (You play)')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Examples of Simple Sentences</Text>
        </View>
      </TouchableOpacity>

      {/* Verb Conjugation */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Verb Conjugation in Present Tense', '- For "मैं" (I), use "हूँ" (am). Example: मैं खाता हूँ (I eat). - For "तुम" (you), use "हो" (are). Example: तुम खा रहे हो (You are eating). - For "वह" (he/she), use "है" (is). Example: वह खा रहा है (He is eating).')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Verb Conjugation in Present Tense</Text>
        </View>
      </TouchableOpacity>

      {/* Adding Adjectives */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Adding Adjectives', 'You can also introduce adjectives to describe nouns. For example: - यह किताब बड़ी है (This book is big).')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Adding Adjectives</Text>
        </View>
      </TouchableOpacity>

      {/* Simple Questions */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Simple Questions', '- Yes/No Questions: Add "क्या" at the beginning to form a question. Example: क्या तुम स्कूल जा रहे हो? (Are you going to school?) - Wh- Questions: Use question words like क्या (what), कहाँ (where), कौन (who), कब (when), क्यों (why). Example: तुम कहाँ जा रहे हो? (Where are you going?)')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Simple Questions</Text>
        </View>
      </TouchableOpacity>

      {/* Interactive Examples */}
      <TouchableOpacity style={styles.card} onPress={() => handleTextPress('Interactive Examples', 'Complete the following sentences: - "____ खा रहा है" (He/She is eating). - "____ पढ़ती है" (She reads).')}>
        <View style={styles.cardContent}>
          <Ionicons name="information-circle-outline" size={24} color={theme.text} />
          <Text style={[styles.cardTitle, { color: theme.text }]}>Interactive Examples</Text>
        </View>
      </TouchableOpacity>

      {/* Sentences List */}
      {sentences.map((sentence, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handleTextPress(sentence.title, sentence.content)}>
          <View style={styles.cardContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>{sentence.title}</Text>
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
