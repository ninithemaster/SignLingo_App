import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function KeigoScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKeigo, setSelectedKeigo] = useState<{ title: string; description: string; example: string } | null>(null);

  const keigoList = [
    {
      title: '尊敬語 (Sonkeigo)',
      description: 'Honorific language used to show respect toward the actions of others, typically superiors or clients.',
      example: 'Example: 先生が来られました。("The teacher has come." - using 来られる instead of 来る to honor the teacher)'
    },
    {
      title: '謙譲語 (Kenjougo)',
      description: 'Humble language used to lower oneself or one’s in-group when referring to one’s own actions, showing respect to the listener.',
      example: 'Example: 私がご案内いたします。("I will guide you." - using ご案内いたします instead of 案内する to humble oneself)'
    },
    {
      title: '丁寧語 (Teineigo)',
      description: 'Polite language that adds formality and is used in everyday respectful conversation, regardless of hierarchy.',
      example: 'Example: 水を飲みます。("I drink water." - using ます-form to be polite)'
    },
    {
      title: 'おっしゃる (Ossharu)',
      description: 'Honorific verb meaning "to say" or "to speak," used to show respect when referring to what someone else says.',
      example: 'Example: 先生が何をおっしゃいましたか？("What did the teacher say?")'
    },
    {
      title: '召し上がる (Meshiagaru)',
      description: 'Honorific verb meaning "to eat" or "to drink." Used to show respect when referring to someone else’s eating or drinking.',
      example: 'Example: どうぞ召し上がってください。("Please eat.")'
    },
    {
      title: 'なさる (Nasaru)',
      description: 'Honorific verb meaning "to do" or "to make." It is used to show respect toward someone’s actions.',
      example: 'Example: 先生がその問題をなさった。("The teacher did the problem.")'
    },
    {
      title: 'いただく (Itadaku)',
      description: 'Humble verb meaning "to receive," often used to show modesty when receiving something from others.',
      example: 'Example: ご指摘いただきありがとうございます。("Thank you for your suggestion.")'
    },
    {
      title: 'ご覧になる (Goran ni naru)',
      description: 'Honorific expression for "to see" or "to look at," used when referring to what others are looking at or watching.',
      example: 'Example: こちらをご覧ください。("Please take a look here.")'
    },
    {
      title: 'お目にかかる (O-me ni kakaru)',
      description: 'Humble expression meaning "to meet." It is used to express the act of meeting with respect.',
      example: 'Example: お目にかかれて光栄です。("It is an honor to meet you.")'
    },
    {
      title: 'お疲れ様です (Otsukaresama desu)',
      description: 'A polite expression used to acknowledge someone’s hard work, typically in the workplace.',
      example: 'Example: 今日もお疲れ様でした。("Good job today.")'
    },
    {
      title: '伺う (Ukagau)',
      description: 'Humble verb meaning "to ask" or "to visit." Used when referring to one’s own actions in a polite and humble manner.',
      example: 'Example: 先生に伺いたいことがあります。("I have something I would like to ask the teacher.")'
    },
    {
      title: 'お世話になる (Osewa ni naru)',
      description: 'A humble expression meaning "to be taken care of" or "to receive help." Used when expressing gratitude for someone’s assistance.',
      example: 'Example: いつもお世話になっております。("Thank you for always taking care of me.")'
    },
    {
      title: 'ご案内する (Go-annai suru)',
      description: 'Polite expression meaning "to guide" or "to show the way," used in formal settings to offer assistance.',
      example: 'Example: ご案内いたします。("I will guide you.")'
    },
    {
      title: 'お使いになる (Otsukai ni naru)',
      description: 'Honorific expression for "to use," typically used to show respect when referring to the usage of something by others.',
      example: 'Example: このペンをお使いになってください。("Please use this pen.")'
    },
    {
      title: 'お願いする (Osewa suru)',
      description: 'Polite expression meaning "to request" or "to ask for." Used in formal settings to request assistance or information.',
      example: 'Example: お願いいたします。("I would like you to help.")'
    },
    {
      title: 'お礼申し上げます (Ori-ni suru)',
      description: 'Polite expression used to express gratitude for someone’s assistance or support.',
      example: 'Example: お礼申し上げます。("Thank you.")'
    },
];

  

  const handleOpenModal = (item: { title: string; description: string; example: string }) => {
    setSelectedKeigo(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedKeigo(null);
  };

  const speakKeigo = (item: { title: string; description: string; example: string }) => {
    Speech.speak(`${item.title}. ${item.example}`, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {keigoList.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: theme.cardBackground }]} 
            onPress={() => handleOpenModal(item)}
          >
            <Text style={[styles.cardText, { color: theme.text }]}>{item.title}</Text> {/* Ensure title is wrapped */}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            {selectedKeigo && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedKeigo.title}</Text>
                <Text style={[styles.descriptionText, { color: theme.text }]}>{selectedKeigo.description}</Text>
                <Text style={[styles.exampleText, { color: theme.text }]}>{selectedKeigo.example}</Text>
                <TouchableOpacity onPress={() => speakKeigo(selectedKeigo)}>
                  <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={[styles.closeButton, { color: theme.text }]}>Close</Text>
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
    padding: 20,
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 50,
    alignItems: 'center',
  },
  card: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
    borderWidth: 2, // Updated border width
    borderColor: 'yellow', // Updated border color
    width: '90%',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '80%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  exampleText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});