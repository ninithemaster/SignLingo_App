import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';

export default function CulturalInsights() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const topics = [
    {
        title: 'Politeness and Formality in Language',
        content: 'Politeness in English varies between cultures. British English tends to be more formal than American English. Using words like “please” and “thank you” is important to express politeness. Honorifics like Mr., Mrs., Doctor, and Sir are used to show respect.',
        examples: [
          'Would you mind helping me with this? (More polite)',
          'Can you help me? (Less polite)',
        ]
      },
      {
        title: 'English-Speaking Countries & Regional Differences',
        content: 'English varies between the UK, the US, and Australia in vocabulary, spelling, pronunciation, and slang. Knowing these differences helps in better understanding and communication.',
        examples: [
          'Vocabulary: "lorry" (UK) vs "truck" (US)',
          'Spelling: "colour" (UK) vs "color" (US)',
          'Slang: "G\'day" (Australia - Hello)',
        ]
      },      
      {
        title: 'Geography and Environment',
        content: 'English-speaking countries have diverse landscapes and climates. The UK experiences a temperate, rainy climate. The US has a wide range of environments, from deserts to snowy mountains. Australia is known for its beaches, tropical areas, and vast deserts like the Outback.',
        examples: [
          'UK: Rainy and cool weather across most regions.',
          'US: Deserts in Arizona, snow in Alaska, beaches in Florida.',
          'Australia: Famous for the Outback and coastal beaches.',
        ]
      },
      {
        title: 'Urban vs Rural Lifestyle',
        content: 'Urban and rural lifestyles differ greatly across English-speaking countries. In the UK, both city life and countryside village traditions are important. In the US, urban life can be fast-paced, while rural areas can be very different culturally. Australia has major cities but large rural regions too.',
        examples: [
          'UK: London city life vs peaceful villages in the Cotswolds.',
          'US: Busy New York City vs quiet farming towns in Texas.',
          'Australia: Sydney’s urban life vs remote Outback stations.',
        ]
      },
      {
        title: 'Nature and Outdoor Culture',
        content: 'Outdoor activities are a big part of life in many English-speaking countries. Australians enjoy surfing, hiking, and outdoor BBQs. Americans love visiting national parks and going on road trips. British people often enjoy countryside walks, picnics, and seaside holidays.',
        examples: [
          'Australia: Surfing at Bondi Beach.',
          'US: Exploring Yellowstone National Park.',
          'UK: Taking a countryside walk and visiting a pub garden.',
        ]
      }      
  ];

  const openModal = (topic: typeof topics[0]) => {
    setSelectedTopic(topic);
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.pageTitle, { color: theme.text }]}>Cultural Insights</Text>
      
      {topics.map((topic, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: theme.cardBackground }]}
          onPress={() => openModal(topic)}
        >
          <Text style={[styles.cardTitle, { color: theme.text }]}>{topic.title}</Text>
          <Ionicons name="chevron-forward" size={24} color={theme.text} />
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
                {selectedTopic?.title}
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
                {selectedTopic?.content}
              </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
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
    height: '50%',
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
  },
});