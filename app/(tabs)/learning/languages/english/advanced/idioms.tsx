import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';

export default function IdiomsAndPhrasalVerbs() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState<{
    title: string;
    content: string | string[];
    examples: string[];
  } | null>(null);

  const sections = [
    {
      title: 'Common Idioms',
      content: [
        'Popular English Idioms:\n',
        '• Break the ice - Start a conversation\n',
        '• Hit the books - Study hard\n',
        '• Piece of cake - Very easy\n',
        '• Cost an arm and a leg - Very expensive\n',
        '• Under the weather - Feeling sick\n\n',
        'Usage Tips:\n',
        '• Understand the context\n',
        '• Use appropriately in casual settings\n',
        '• Don\'t translate literally'
      ],
      examples: [
        'Let me break the ice by introducing myself.',
        'This exam is coming up, I need to hit the books.',
        'The test was a piece of cake!',
        'That new car must have cost an arm and a leg.',
        'I\'m feeling under the weather today.'
      ]
    },
    {
      title: 'Business Idioms',
      content: [
        'Business-Related Idioms:\n',
        '• Back to the drawing board - Start over\n',
        '• Get the ball rolling - Start something\n',
        '• Think outside the box - Be creative\n',
        '• Cut corners - Do something cheaply\n',
        '• Raise the bar - Set higher standards\n\n',
        'Professional Usage:\n',
        '• Common in meetings\n',
        '• Used in business emails\n',
        '• Professional presentations'
      ],
      examples: [
        'Our proposal was rejected, back to the drawing board.',
        'Let\'s get the ball rolling on this project.',
        'We need to think outside the box for solutions.',
        'We can\'t cut corners on quality control.',
        'This new policy really raises the bar.'
      ]
    },
    {
      title: 'Phrasal Verbs',
      content: [
        'Common Phrasal Verbs:\n',
        '• Look up - Search for information\n',
        '• Break down - Stop working\n',
        '• Give up - Stop trying\n',
        '• Figure out - Understand\n',
        '• Point out - Show something\n\n',
        'Usage Notes:\n',
        '• Part of everyday English\n',
        '• Can be separable/inseparable\n',
        '• Multiple meanings possible'
      ],
      examples: [
        'I\'ll look up the word in the dictionary.',
        'My car broke down on the highway.',
        'Never give up on your dreams.',
        'I can\'t figure out this problem.',
        'Let me point out the main issues.'
      ]
    },
    {
      title: 'Time & Money Idioms',
      content: [
        'Time-Related Idioms:\n',
        '• Time flies - Time passes quickly\n',
        '• Beat the clock - Finish before deadline\n',
        '• In the nick of time - Just in time\n\n',
        'Money-Related Idioms:\n',
        '• Break the bank - Very expensive\n',
        '• Make ends meet - Have enough money\n',
        '• Save for a rainy day - Save for future'
      ],
      examples: [
        'Time flies when you\'re having fun.',
        'We need to beat the clock to finish this.',
        'He arrived in the nick of time.',
        'This purchase won\'t break the bank.',
        'It\'s hard to make ends meet these days.'
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
      <Text style={[styles.pageTitle, { color: theme.text }]}>Idioms & Phrasal Verbs</Text>
      
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