import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import expo-speech

export default function LiteraryLanguage() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const literaryItems = [
    { 
      title: 'Introduction to Literary Hindi', 
      content: 'Literary Hindi uses more refined, expressive, and artistic language than everyday spoken Hindi. It draws from Sanskrit (शुद्ध हिंदी) or Persian/Urdu influences (in Hindi-Urdu blend)\n. It helps you appreciate Indian culture, heritage, poetry, and classic literature. It teaches how emotions, philosophy, and deeper meanings are conveyed beautifully.'
    },
    { 
      title: 'Poetic Expressions', 
      content: 'Teach users how poets use special expressions to add beauty and emotional depth',
      example:[
        'अलंकार (Figures of Speech):',
        'उपमा (Simile): Comparing one thing to another using "जैसे" or "की तरह"',
        'Example: "वह चाँद की तरह सुंदर है।" (She is as beautiful as the moon.)',
      ],
      example2:[
        'रूपक (Metaphor): Direct comparison without "जैसे""',
        'Example: "वह चाँद है।" (She is the moon.)',   
      ],
      example3:[
        'अनुप्रास (Alliteration): Repetition of consonant sounds at the beginning of words',
        'Example: "चंचल चाँदनी चमक रही है।" (The playful moonlight is sparkling.)',
      ],
      example4:[
        'भाव (Emotions):',
        'Poetry often expresses emotions like love, longing, patriotism, devotion, sorrow, etc.',
      ]
    },
    { 
      title: 'Common Literary Devices', 
      content: 'Understand the use of literary devices in Hindi poetry and prose, such as Simile (उपमा), Metaphor (रूपक), Alliteration (अनुप्रास), Hyperbole (अतिशयोक्ति), and Personification (मानवीकरण). These devices make the language more expressive and impactful.',
      example:[
        'Simile (उपमा):Comparison using "like" or "as"',
        'Example: "वह शेर की तरह बहादुर है।" (He is brave like a lion.)',
      ],
      example2:[
        'Metaphor (रूपक): Direct comparison',
        'Example: "वह शेर है।" (He is a lion.)',
      ],
      example3:[
        'Alliteration (अनुप्रास): Repetition of sounds',
        'Example: "नन्हीं नदियाँ नाचती हैं।" (Tiny rivers dance.)', 
      ],
      example4:[
        'Hyperbole (अतिशयोक्ति): Use of exaggerated language',
        'Example: 	"मैंने हजार बार कहा।" (I said it a thousand times.)', 
      ],
      example5:[
        'Personification (मानवीकरण): Giving human qualities to non-humans',
        'Example: ""हवा गा रही थी।" (The wind was singing.)', 
      ]
    },
    { 
      title: 'Famous Hindi Poets', 
      content: 'Learn about the contributions of famous Hindi poets like Kabir, Mirza Ghalib, Harivansh Rai Bachchan, and Mahadevi Verma. These poets have left a significant impact on Hindi literature and their works continue to inspire generations.',
      example:[
        'Kabir:"माला फेरत जुग भया" (You kept rotating the rosary but missed the hearts true devotion.\n)',
        'Mirza Ghalib:"हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले"("Thousands of desires, each so intense that each could take my life.")',
        'Harivansh Rai Bachchan:"मधुशाला" (The Tavern) — uses tavern as a metaphor for life and experiences.\n',
        'Mahadevi Verma:"नीड़ का निर्माण फिर" (Rebuilding the nest.)'
    ]
    },
    // Add more literary items as needed
  ];
  

  const handleTextPress = (title: string, content: string, examples: string[][] = []) => {
    const allExamples = examples.map(ex => ex.join('\n')).join('\n\n');
    const fullContent = `${content}${allExamples ? `\n\nExamples:\n${allExamples}` : ''}`;
    setModalTitle(title);
    setModalContent(fullContent);
    setModalVisible(true);
    Speech.speak(fullContent, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Literary Language</Text>
      {literaryItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleTextPress(
            item.title, 
            item.content, 
            [item.example, item.example2, item.example3, item.example4, item.example5]
              .filter(ex => Array.isArray(ex)) // Ensure each example is an array
          )}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
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
              <Text style={{ color: theme.text }}>Close</Text>
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
    padding: 20,
    backgroundColor: '#e0f2f1', // Light green background for the entire page
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#004d40', // Dark green color for the title
  },
  card: {
    backgroundColor: '#ffffff', // White background for cards
    borderRadius: 15, // More rounded corners for curvy effect
    padding: 20, // Increased padding for better spacing
    marginBottom: 15, // Increased margin for better separation
    elevation: 5, // Increased elevation for more pronounced shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 }, // Adjusted shadow offset
    shadowOpacity: 0.3, // Increased shadow opacity
    shadowRadius: 6, // Increased shadow radius
    borderWidth: 2, // Border width for definition
    borderColor: '#004d40', // Dark green border color
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40', // Dark green color for the card title
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background for modal
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#004d40', // Dark green color for modal title
  },
  modalText: {
    fontSize: 15,
    marginBottom: 25,
    textAlign: 'center',
    color: '#004d40', // Dark green color for modal text
  },
  closeButton: {
    marginTop: 15,
  },
});