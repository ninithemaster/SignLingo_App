import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function ComplexSentences() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    title: string;
    content: string;
    examples: string[];
  } | null>(null);

  const sections = [
    {
      title: 'What is a Complex Sentence?',
      content: 'A complex sentence connects an independent clause with a dependent clause using a connector (subordinating conjunction). It shows a relationship between two ideas.',
      examples: [
        'Because he was late, he missed the bus.',
        'Although it was raining, we went for a walk.',
      ]
    },
    {
      title: 'Independent Clauses',
      content: 'An independent clause is a complete sentence that can stand alone.',
      examples: [
        'I went to the market.',
        'She loves reading books.',
        'They finished their homework.'
      ]
    },
    {
      title: 'Dependent Clauses',
      content: 'A dependent clause is a sentence that needs more information to be complete.',
      examples: [
        'Because I was hungry',
        'When the rain stops',
        'If you study hard'
      ]
    },
    {
      title: 'Subordinating Conjunctions',
      content: 'Words that connect the two clauses to show different relationships between ideas.',
      examples: [
        'Because, since, as (Cause and Effect)',
        'Although, even though, whereas (Contrast)',
        'If, unless, in case (Condition)',
        'When, while, after, before (Time)'
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
            {section.content}
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
                {selectedSection?.content}
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
