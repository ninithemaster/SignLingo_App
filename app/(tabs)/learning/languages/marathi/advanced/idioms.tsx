import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function IdiomsScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const idioms = [
    {
        title: 'उंटाच्या तोंडात जीरं',
        content: 'This proverb is used when something is too small or insufficient to fulfill a large need or task.',
        example: `
      1. त्याच्या तोंडात जीरं आहे. त्याला सध्याच्या कामासाठी जेवढं लागलं आहे, त्यापेक्षा त्याचं सामान खूप कमी आहे. (He has a mustard seed in his mouth. He has very little compared to the task at hand.)
      2. आम्ही इतर कामांची तयारी केली, पण आमच्याकडे साधनांची कमी आहे. (We prepared for the other tasks, but we have very little resources.)
        `,
      },
      {
        title: 'दुधाने जळालेले तोंड ताक प्यायलाही फुंकर घालते',
        content: 'This proverb means that a person who has been hurt or burned once becomes cautious and avoids similar situations in the future.',
        example: `
      1. एकदाच फसलेला असतो, त्यामुळे तो आता प्रत्येक गोष्टीला खूप काळजीपूर्वक पाहतो. (He was once burnt, so now he carefully examines everything.)
      2. तुम्ही पहिल्यांदाच कष्ट केले होते, त्यामुळे पुढे जाऊन त्याला फुंकर घालायला वाटतं. (You were burned the first time, so now you feel the need to be extra cautious.)
        `,
      },
      {
        title: 'आगाऊ माणूस',
        content: 'An eager person who always rushes ahead without considering the consequences or situation carefully.',
        example: `
      1. तो एक आगाऊ माणूस आहे. त्याला कोणत्याही गोष्टीसाठी धावायला आवडते, पण कधीच त्याच्यावर विचार करत नाही. (He is an eager person. He likes to rush into things but never thinks them through.)
      2. आगाऊ माणूस नेहमीच पुढे जाण्याची धडपड करत असतो. (An eager person is always striving to move forward.)
        `,
      },
      {
        title: 'नशिबाच्या जोरावर',
        content: 'This idiom refers to relying on luck or fate rather than effort or planning to achieve something.',
        example: `
      1. त्याला नशिबाच्या जोरावरच चांगले परिणाम मिळाले. (He got good results relying on luck.)
      2. त्याच्या कामावर त्याच्या प्रयत्नांपेक्षा नशिबाचा प्रभाव होता. (His success was more due to luck than his efforts.)
        `,
      },
      {
        title: 'नळी तोडली तरी तिखट राहते',
        content: 'This proverb means that once something is spoiled or ruined, it can never be restored to its original state, even if you try to fix it.',
        example: `
      1. आपल्या वर्तनामुळे त्याचं इमेज खराब झालं आहे. नळी तोडली तरी तिखट राहते. (His image is ruined due to his behavior. Even if you try, it will never be the same.)
      2. एकदाच चुकलेल्या गोष्टीवर जितकेही कष्ट करा, त्यातल्या उणीवा भरता येत नाहीत. (No matter how much effort you put in to correct it, the flaws remain.)
        `,
      },
      {
        title: 'वाऱ्याच्या वेगाने काम करणे',
        content: 'This idiom is used to describe doing things in a hurry or at a very fast pace without thinking of the consequences.',
        example: `
      1. तो वाऱ्याच्या वेगाने काम करत आहे. त्याला कधीच थांबायला वेळ मिळत नाही. (He is working at the speed of the wind. He never gets time to pause.)
      2. तुमचं काम वाऱ्याच्या वेगाने करण्यात चूक होऊ शकते. (Hurrying through your work can lead to mistakes.)
        `,
      },
      {
        title: 'जंगलात वाघ असतो तरी, तो तिथे असतो असं समजून धोका घेत नाही',
        content: 'This proverb teaches that even when there is danger or risk, one should not assume it’s safe and take unnecessary chances.',
        example: `
      1. जंगलात वाघ असतो तरी, तो तिथे असतो असं समजून धोका घेणं चुकीचं आहे. (Even though the tiger is in the jungle, it's wrong to assume it's safe and take risks.)
      2. आयुष्यात खूप धोके असू शकतात, आणि प्रत्येक ठिकाणी सावधगिरी ठेवायला हवी. (There may be risks in life, and one should always exercise caution.)
        `,
      },
      {
        title: 'उडी घेताना सावध राहा, नाहीतर पाणी लागेल',
        content: 'This proverb means that you should be careful before making any decision or taking any step in life, as haste can lead to problems.',
        example: `
      1. कामात उडी घेताना सावध राहा, नाहीतर तुमचं फसलेलं काम होईल. (Be cautious when jumping into work; otherwise, your effort will go in vain.)
      2. उडी घेताना सावध राहा, नाहीतर तुमचं अपयश होईल. (Be careful before making any leap, or you may fail.)
        `,
      },
      {
        title: 'सागरात वांदी मारणे',
        content: 'This idiom means doing something that is completely futile or pointless, similar to "a drop in the ocean."',
        example: `
      1. हे सागरात वांदी मारणं आहे. त्याचं ते छोटं प्रयत्न मोठ्या समस्येला निराकरण करणार नाही. (It's like throwing a pebble in the ocean. His small effort won’t solve the big problem.)
      2. जेव्हा तुमच्याकडे संसाधने कमी असतात, तेव्हा सागरात वांदी मारण्याची चुक करू नका. (When you have limited resources, don’t make pointless attempts.)
        `,
      },
            
    // Add more idioms as needed
  ];

  const handlePress = (content: string, example: string) => {
      setSelectedText(`${content}\n\nExamples:\n${example}`);
      setModalVisible(true);
      Speech.speak(content, { language: 'mr' });
      Speech.speak(example, { language: 'mr' });
    };
  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Marathi Idioms</Text>
      <ScrollView contentContainerStyle={styles.idiomsContainer}>
        {idioms.map((idiom, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(idiom.content, idiom.example)}
          >
            <Text style={[styles.idiomTitle, { color: theme.text }]}>{idiom.title}</Text>
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
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  idiomsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  card: {
    width: '48%',
    padding: 16,
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
  idiomTitle: {
    fontSize: 18,
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
      maxHeight: '80%',
    },
    modalContent: {
      width: '90%',
      maxHeight: '80%',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
  modalScrollContent: {
    paddingBottom: 50,
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