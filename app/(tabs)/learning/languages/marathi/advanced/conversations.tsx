import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function ConversationsScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const conversations = [
    
        {
          "title": "At a Market (बाजारात)",
          "content": "Learn common phrases used while shopping at the market in Marathi.",
          "example": `
            1. हे कितीला आहे? (How much is this?)
            2. मला थोडं कमी पाहिजे. (I want a little less.)
            3. तुमच्याकडे ताजं भाज्याचं आहे का? (Do you have fresh vegetables?)
            4. मला एका किलो टमाटर हवेत. (I want one kilogram of tomatoes.)
          `
        },
        {
          "title": "Visiting Someone’s Home (गाठीभेट)",
          "content": "Learn phrases to use when visiting someone’s home in Marathi.",
          "example": `
            1. नमस्कार! (Hello!)
            2. तुमचं घर खूप सुंदर आहे. (Your house is very beautiful.)
            3. कसा काय? (How are you?)
            4. काही मदतीची आवश्यकता आहे का? (Do you need any help?)
          `
        },
        {
          "title": "Asking for Directions (दिशा विचारणे)",
          "content": "Learn how to ask for directions in Marathi.",
          "example": `
            1. रस्त्याच्या पलीकडे किती दूर आहे? (How far is it on the other side of the road?)
            2. पुस्तकालय कधी आहे? (Where is the library?)
            3. हॉटेल कसं जाईल? (How do I get to the hotel?)
            4. मला स्टेशन जाण्याचा मार्ग सांगू शकाल का? (Can you tell me the way to the station?)
          `
        },
        {
          "title": "Doctor Visit (डॉक्टरकडे भेट)",
          "content": "Learn common phrases to use during a doctor’s visit in Marathi.",
          "example": `
            1. मला तोंडावर दुखत आहे. (I have pain on my face.)
            2. माझं ताप वाढलं आहे. (I have a fever.)
            3. कृपया मला काही औषधे द्या. (Please give me some medicine.)
            4. डॉक्टर, मला आरामाची आवश्यकता आहे. (Doctor, I need rest.)
          `
        },
        {
            "title": "At the Restaurant (हॉटेलमध्ये)",
            "content": "Learn phrases to use when dining out or ordering food at a restaurant in Marathi.",
            "example": `
              1. मेनू दाखवा. (Show me the menu.)
              2. मला एक पाणी आणि भाजी पराठा हवा. (I want water and vegetable paratha.)
              3. कृपया त्यात मसाला कमी ठेवा. (Please make it less spicy.)
              4. हां, हा बिल किती आहे? (Yes, how much is the bill?)
            `
          },
          {
            "title": "Making a Phone Call (फोन कॉल करणे)",
            "content": "Learn how to make a phone call and leave messages in Marathi.",
            "example": `
              1. हॅलो, मी [तुमचं नाव] बोलत आहे. (Hello, this is [your name].)
              2. कृपया मी तुमच्याशी नंतर बोलू शकतो का? (Can I talk to you later?)
              3. मी तुमच्याकडून कॉल घेईल. (I will call you.)
              4. कृपया एक संदेश सोडा. (Please leave a message.)
            `
          },
          {
            "title": "At the Post Office (पोस्ट ऑफिसमध्ये)",
            "content": "Learn phrases to use when dealing with postal services in Marathi.",
            "example": `
              1. मला एक पत्र पाठवायचं आहे. (I want to send a letter.)
              2. किती किमतीचा पोस्टेज आहे? (How much is the postage?)
              3. पॅकेज जतन करा. (Please hold my package.)
              4. मला एक एअरो पोस्ट सेंड करायचं आहे. (I want to send an air mail.)
            `
          },
          {
            "title": "At the Bank (बँकेत)",
            "content": "Learn common phrases to use when dealing with banking activities in Marathi.",
            "example": `
              1. मला खातं उघडायचं आहे. (I want to open an account.)
              2. कृपया माझ्या खात्याचे बॅलन्स तपासा. (Please check my account balance.)
              3. माझ्या कार्डचा PIN विसरला आहे. (I forgot my card's PIN.)
              4. मी पैसे जमा करू इच्छितो. (I want to deposit money.)
            `
          },
          {
            "title": "At the Train Station (रेल्वे स्थानकावर)",
            "content": "Learn phrases used at the train station when buying tickets or asking for train schedules in Marathi.",
            "example": `
              1. मुंबईला जाणारी ट्रेन कधी आहे? (When is the train to Mumbai?)
              2. मला दोन तिकीटे हवीत. (I want two tickets.)
              3. ट्रेन कोणत्या प्लेटफॉर्मवर येईल? (Which platform will the train arrive at?)
              4. तिकीट आरक्षित करणे आवश्यक आहे का? (Is it necessary to reserve tickets?)
            `
          },
          {
            "title": "At the Airport (हवाई अड्ड्यावर)",
            "content": "Learn phrases to use when traveling at the airport in Marathi.",
            "example": `
              1. माझं विमान कधी आहे? (When is my flight?)
              2. मी कॅबिन बॅग दाखवू शकतो का? (Can I show my cabin bag?)
              3. माझा पासपोर्ट गहाळ झाला आहे. (I have lost my passport.)
              4. मी सुरक्षा तपासणी कधी करू शकतो? (When can I go for security check?)
            `
          },
          {
            "title": "At the Hotel (हॉटेलमध्ये)",
            "content": "Learn phrases related to hotel bookings, check-ins, and room service in Marathi.",
            "example": `
              1. मला एक रूम बुक करायची आहे. (I want to book a room.)
              2. चेक-इन कधी सुरू होईल? (When does check-in start?)
              3. कृपया रूम सर्विस पाठवा. (Please send room service.)
              4. माझ्या रूममध्ये पाणी नाही. (There is no water in my room.)
            `
          },
      ];
      
    // Add more conversations as needed


  const handlePress = (content: string, example: string) => {
    setSelectedText(`${content}\n\nExamples:\n${example}`);
    setModalVisible(true);
    Speech.speak(content, { language: 'mr' });
    Speech.speak(example, { language: 'mr' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Marathi Conversations</Text>
      <ScrollView contentContainerStyle={styles.conversationsContainer}>
        {conversations.map((conversation, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(conversation.content, conversation.example)}
          >
            <Text style={[styles.conversationTitle, { color: theme.text }]}>{conversation.title}</Text>
            <Text style={[styles.learnMore, { color: theme.subtitle }]}>Learn More</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.modalScrollContent}>
              <Text style={[styles.modalText, { color: theme.text }]}>{selectedText}</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  conversationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: '48%',
    padding: 10,
    borderRadius: 12,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#87CEEB', // Sky blue border
  },
  conversationTitle: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  scrollView: {
    width: '100%',
    maxHeight: '70%',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalScrollContent: {
    paddingBottom: 25, // Adjust padding to ensure content is scrollable
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  learnMore: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
});