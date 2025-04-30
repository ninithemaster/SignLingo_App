import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function ProfessionalCommunication() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    title: string;
    content: string | string[];
    examples: string[];
  } | null>(null);

  const sections = [
    {
        title: 'Polite Requests',
        content: [
          'How to make polite and respectful requests in English:\n',
          '• Use modal verbs like "could", "would", and "may".',
          '• Frame your request as a question, not a command.',
          '• Maintain a friendly and respectful tone.',
          '• Add words like "please" and "kindly" to sound more polite.'
        ],
        examples: [
          'Could you please help me?',
          'Would you mind opening the window?',
          'May I ask you a question?'
        ]
      },      
      {
        title: 'Offering Help Politely',
        content: [
          'Ways to Offer Help:\n',
          '• Would you like me to assist you?\n',
          '• Can I give you a hand with that?\n',
          '• Let me know if you need any help.\n\n',
          'Tip:\n',
          '• Keep offers friendly but not forceful.'
        ],
        examples: [
          'Would you like me to assist you with your luggage?',
          'Can I give you a hand carrying those boxes?',
          'Let me know if you need any help with your project.'
        ]
      },      
      {
        title: 'Apologizing Formally',
        content: [
          'Formal Apology Phrases:\n',
          '• I sincerely apologize for the inconvenience.\n',
          '• Please accept my apologies.\n',
          '• I’m sorry for any confusion caused.\n\n',
          'Tip:\n',
          '• Apologies should sound genuine and calm.'
        ],
        examples: [
          'I sincerely apologize for the delay in response.',
          'Please accept my apologies for the oversight.',
          'I’m sorry for any confusion caused by the earlier instructions.'
        ]
      },      
      {
        title: 'Thanking Someone Formally',
        content: [
          'Formal Thanking Expressions:\n',
          '• I truly appreciate your assistance.\n',
          '• Thank you very much for your time.\n',
          '• I’m grateful for your support.\n\n',
          'Key Tips:\n',
          '• Use words like "appreciate", "grateful", or "sincerely thank" to sound more formal.\n',
          '• Keep your tone polite, warm, and professional.'
        ],
        examples: [
          'I truly appreciate your quick response to my query.',
          'Thank you very much for considering my request.',
          'I’m sincerely grateful for the opportunity you have provided.',
          'I appreciate your support throughout this project.'
        ]
      }, 
      {
        title: 'Starting Formal Conversations',
        content: [
          'Formal Conversation Openings:\n',
          '• Good morning, how may I assist you?\n',
          '• It’s a pleasure to meet you.\n',
          '• I hope you’re having a wonderful day.\n\n',
          'Key Tips:\n',
          '• Start with a warm and respectful greeting.\n',
          '• Formal openings help create a positive first impression in professional and new social settings.'
        ],
        examples: [
          'Good afternoon, how can I be of service today?',
          'It’s an honor to finally meet you in person.',
          'I trust you had a pleasant journey.',
          'I hope everything is going well for you today.'
        ]
      }           
  ];

  const openModal = (section: typeof sections[0]) => {
    setSelectedSection(section);
    setModalVisible(true);
  };

  const playAudio = (text: string) => {
    Speech.speak(text, {
      language: 'en',
      pitch: 1,
      rate: 0.9,
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.pageTitle, { color: theme.text }]}>Professional Communication</Text>
      
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => openModal(section)}
        >
          <View style={styles.cardHeader}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{section.title}</Text>
            <Ionicons name="chevron-forward" size={24} color={theme.text} />
          </View>
          <Text 
            numberOfLines={2} 
            style={[styles.cardPreview, { color: theme.subtitle }]}
          >
            {Array.isArray(section.content) ? section.content[0] : section.content}
          </Text>
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
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {selectedSection?.title}
              </Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              <Text style={[styles.modalDescription, { color: theme.text }]}>
                {Array.isArray(selectedSection?.content) 
                  ? selectedSection.content.map((line, index) => (
                      <Text key={index}>{line}</Text>
                    ))
                  : selectedSection?.content}
              </Text>

              <Text style={[styles.examplesTitle, { color: theme.text }]}>
                Examples:
              </Text>
              
              {selectedSection?.examples.map((example, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.exampleCard, { backgroundColor: theme.background }]}
                  onPress={() => playAudio(example)}
                >
                  <Text style={[styles.exampleText, { color: theme.text }]}>
                    {example}
                  </Text>
                  <Ionicons name="volume-medium" size={20} color={theme.text} />
                </TouchableOpacity>
              ))}
            </ScrollView>
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
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  cardPreview: {
    fontSize: 14,
    opacity: 0.8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalScroll: {
    flex: 1,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  exampleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  exampleText: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
});