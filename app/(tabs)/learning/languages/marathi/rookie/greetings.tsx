import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function GreetingsScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [selectedMeaning, setSelectedMeaning] = useState('');

  const greetings = [
    {
      title: 'नमस्कार',
      content: 'To greet someone politely, like "Hello!" or "Greetings!"',
      example: 'नमस्कार! तुम्ही कसे आहात? (Hello! How are you?)',
      exaample2:'शाळेत सर्वांना नमस्कार करा. (Greet everyone at school.)',
    },
    {
      title: 'कसे आहात?',
      content: 'To ask someone how they are doing',
      example: 'मित्राला भेटल्यावर विचारले - कसे आहात? (When meeting a friend: How are you?)',
      example2:'नवीन शिक्षकाला विचारले - आपण कसे आहात? (Asked a new teacher: How are you?)',

    },
    {
      title: 'मी ठीक आहे.',
      content: 'To tell someone you are fine',
      example: ' मी ठीक आहे, धन्यवाद! (I am fine, thank you!)',
      example2:'डॉक्टरांनी विचारले आणि मी म्हणालो - मी ठीक आहे. (Doctor asked and I said – I am fine.)',
    },
    {
      title: 'तुमचे नाव काय आहे?',
      content: 'To ask someones name politely',
      example: 'पहिल्या भेटीत विचारले - तुमचे नाव काय आहे? (First meeting: What is your name?)',
      example2:'नवीन मित्राला विचारले - तुमचे नाव काय आहे? (Asked a new friend: Whats your name?)',
    },
    {
      title: 'माझे नाव _____ आहे.',
      content: 'To tell someone your name',
      example: 'माझे नाव आर्यन आहे. (My name is Aryan.)',
      example2:'माझे नाव पूजा आहे. (My name is Pooja.)',
    },
    {
      title: 'धन्यवाद!',
      content: 'To thank someone politely',
      example: ' मदतीसाठी धन्यवाद! (Thanks for the help!)',
      example2:'सुंदर भेटवस्तूसाठी धन्यवाद. (Thanks for the beautiful gift.)',
    },
    {
      title: 'कृपया',
      content: 'To politely say "Please" when requesting something',
      example: ' कृपया मला पाणी द्या. (Please give me some water.)',
      example2:' कृपया येथे थांबा. (Please wait here.) ',
    },
    {
      title: 'माफ करा',
      content: 'To apologize politely, like "Sorry"',
      example:'उशिरासाठी माफ करा. (Sorry for being late.)',
      example2:'चुकीसाठी माफ करा. (Sorry for the mistake.)',
    },
    {
        title: 'चाल भेटू',
        content: 'To say "See you later"',
        example:'शाळेनंतर चाल भेटू! (See you after school!)',
        example2:'उद्या चाल भेटू. (See you tomorrow.)',
      },
      {
        title: 'शुभ दिवस',
        content: 'To wish someone a good day',
        example:'शुभ दिवस असो! (Have a good day!)',
        example2:'तुम्हाला शुभ दिवसाच्या शुभेच्छा! (Wishing you a good day!)',
      },
      {
        title: 'शुभ सकाळ',
        content: 'To wish "Good Morning"',
        example:'शुभ सकाळ, आज छान दिवस आहे! (Good morning, its a beautiful day!)',
        example2:'प्रत्येकाला शुभ सकाळ म्हणा. (Say good morning to everyone.)',
      },
      {
        title: 'शुभ संध्या',
        content: 'To wish "Good Evening"',
        example:'शुभ संध्या, तुम्हाला भेटून आनंद झाला. (Good evening, nice to meet you.)',
        example2:'घरी आल्यावर शुभ संध्या म्हणा. (Say good evening after reaching home.)',
      },
      {
        title: 'शुभ रात्री',
        content: 'To wish "Good Night"',
        example:' शुभ रात्री, गोड स्वप्ने पाहा! (Good night, sweet dreams!)',
        example2:'शुभ रात्री म्हणत झोपा. (Say good night before sleeping.)',
      },
      {
        title: 'स्वागत आहे',
        content: 'To say "You’re Welcome"',
        example:'धन्यवाद दिल्यावर - स्वागत आहे! (After thanks - You’re welcome!)',
        example2:'आमच्या घरी तुमचे स्वागत आहे. (You are welcome at our home.)',
      },
      {
        title: 'अभिनंदन!',
        content: 'To say "Congratulations!"',
        example:'तुझ्या यशासाठी अभिनंदन! (Congratulations on your success!)',
        example2:'नोकरीसाठी अभिनंदन! (Congrats for the job!)',
      },
      {
        title: 'निघतो/निघते',
        content: 'To say "Goodbye" (when leaving)',
        example:'मी निघतो, लवकर भेटू! (Im leaving, see you soon!)',
        example2:'आता मी निघते. (Im leaving now.)',
      },
      {
        title: 'लक्ष ठेवा',
        content: 'To say "Take Care"',
        example:' प्रवासात लक्ष ठेवा. (Take care during travel.)',
        example2:'आजारी असताना लक्ष ठेवा. (Take care when sick.)',
      },
      {
        title: 'पुढे भेटू',
        content: 'To say "See You Soon"',
        example:' पुढे भेटू, मित्रा! (See you soon, friend!)',
        example2:'पुढच्या आठवड्यात पुढे भेटू. (See you next week.)',
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
        {greetings.map((greeting, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(
              greeting.title ?? '',
              greeting.content ?? '',
              greeting.example ?? '',
              greeting.example2 ?? ''
            )}
          >
            <Text style={[styles.wordText, { color: theme.text }]}>{greeting.title}</Text>
            <Text style={[styles.englishText, { color: theme.subtitle }]}>{greeting.content}</Text>
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
            <Text style={[styles.modalWord, { color: theme.text }]}>{selectedWord}</Text>
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedMeaning}</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={[styles.closeButton, { backgroundColor: theme.cardBackground }]}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>Close</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardsContainer: {
    paddingBottom: 80,  // Increased padding at bottom
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  card: {
    width: '48%',
    padding: 12,  // Slightly reduced padding
    borderRadius: 15,
    marginBottom: 20,  // Increased margin between cards
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 2,  // Added border width
    borderColor: 'orange',  // Added orange border color
  },
  wordText: {
    fontSize: 18,  // Slightly reduced font size
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },
  englishText: {
    fontSize: 13,  // Slightly reduced font size
    textAlign: 'center',
    opacity: 0.8,
    paddingHorizontal: 2,  // Added horizontal padding
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  modalWord: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 24,
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});