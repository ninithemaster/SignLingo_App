import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function AdvancedGrammar() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  // Update the type definition
  const [selectedSection, setSelectedSection] = useState<{
    title: string;
    content: string | string[];
    examples: string[];
  } | null>(null);

  const sections = [
    {
      title: 'Conditional Sentences (If-Clauses)',
      content: [
        'Conditional sentences express hypothetical situations or actions dependent on other events.\n',
        'Zero Conditional: General truths or facts.\n',
        'Structure: If + present simple, + present simple.\n',
        'First Conditional: Real possibility in the present/future.\n',
        'Structure: If + present simple, + will + verb.\n',
        'Second Conditional: Hypothetical or unlikely present/future situations.\n',
        'Structure: If + past simple, + would + verb.\n',
        'Third Conditional: Hypothetical situations in the past (regrets, things that didn’t happen).\n',
        'Structure: If + past perfect, + would have + past participle.\n',
        'Mixed Conditionals: Combining different time frames.\n',
      ],
      examples: [
        'Zero Conditional: If you heat water to 100°C, it boils.',
        'First Conditional: If it rains, I will stay home.',
        'Second Conditional: If I had a million dollars, I would travel the world.',
        'Third Conditional: If I had studied harder, I would have passed the exam.',
        'Mixed Conditional: If I had known about the party, I would be attending now.'
      ]
    },
    {
      title: 'Reported Speech (Indirect Speech)',
      content:[ 'Reported speech is used to report what someone else has said.\n',
        'Statements:-\n',
        'Structure: Reporting verb + that + subject + verb (in the past tense)\n',
        'Questions:-\n',
        'Structure: Reporting verb + if/whether + subject + verb.\n',
        'Commands/Requests:-\n',
        'Structure: Reporting verb + to + verb (base form).\n',
      ],
      examples: [
        'Statements: He said that he was going to the market.',
        'Questions: She asked if I had completed the assignment.',
        'Commands: He told me to bring the document.'
      ]
    },
    {
      title: 'Modal Verbs for Speculation',
      content: 'Modal verbs express certainty or uncertainty about the present or past.',
      examples: [
        'Present: She must be at work; her car is parked outside.',
        'Past: He might have forgotten.',
        'Past: She can’t have gone to the party.'
      ]
    },
    {
      title: 'Passive Voice',
      content: 'Passive voice focuses on the action or the object of the sentence, rather than the subject performing the action.',
      examples: [
        'Present Simple Passive: The book is read by many people.',
        'Past Simple Passive: The letter was written by her.',
        'Future Passive: The package will be delivered tomorrow.',
        'Present Perfect Passive: The project has been completed.', 
        'Past Perfect Passive: The project had been completed.',
        'Future Perfect Passive: The project will have been completed.',
      ]
    },
    {
      title: 'Inversion for Emphasis',
      content: 'Inversion is used to emphasize parts of a sentence, often for dramatic effect.',
      examples: [
        'Negative Adverb: Never have I seen such a beautiful sunset.',
        'Conditionals with Inversion: Had I known about the meeting, I would have attended.'
      ]
    },
    {
      title: 'Relative Clauses (Defining & Non-defining)',
      content: ['Relative clauses provide more information about a noun.',
        'Defining Relative Clauses: Essential to the sentence\'s meaning.',
        'Non-defining Relative Clauses: Additional information, not necessary for the sentence to make sense (comma usage).',
      ],
      examples: [
        'Defining: The book that I read yesterday was amazing.',
        'Non-defining: My friend, who lives in London, is visiting next week.'
      ]
    },
    {
      title: 'Noun Phrases and Determiners',
      content: 'Noun phrases are complex and often include determiners.',
      examples: [
        'The big brown dog (adjective + noun)',
        'A book with a blue cover (noun + prepositional phrase)',
        'The cake is delicious (Definite article).',
        'Using Determiners:',
        'The (definite article) – The cake is delicious.',
        'A/An (indefinite article) – I bought a book.',
        'Some/Any (quantifiers) – I need some help.',
        'Much/Many (quantity) – How much money do you have?',
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
      <Text style={[styles.pageTitle, { color: theme.text }]}>Advanced Grammar</Text>
      
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
                {Array.isArray(selectedSection?.content) 
                  ? selectedSection.content.map((line, index) => (
                      <Text key={index}>{line}</Text>
                    ))
                  : selectedSection?.content}
              </Text>

              <Text style={[styles.examplesTitle, { color: theme.text }]}>
                Common Examples:
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
