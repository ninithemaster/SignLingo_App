import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech'; // Import Speech module

export default function Introduction() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalImage, setModalImage] = useState<any>(null);


  const topics = [
    { 
      title: 'हिंदी क्या है?', 
      content: 'हिंदी भारत और दुनिया में सबसे अधिक बोली जाने वाली भाषाओं में से एक है, जिसमें ५०० मिलियन से अधिक लोग हिंदी बोलते हैं!\n\nयह भारत की आधिकारिक भाषा है और नेपाल तथा मॉरीशस के कुछ हिस्सों में भी उपयोग होती है।\n\nहिंदी एक ध्वन्यात्मक भाषा है, यानी जैसे लिखा जाता है वैसे ही पढ़ा और बोला जाता है। इससे उच्चारण सीखना अंग्रेज़ी जैसी भाषाओं की तुलना में आसान होता है।',
      image: require('@/assets/images/hindi/hindimap.jpeg')
    },
    { 
      title: 'देवनागरी लिपि', 
      content: [
        'हिंदी देवनागरी लिपि (देवनागरी लिपि) में लिखी जाती है।',
        'देवनागरी में स्वर (अक्षर) और व्यंजन (अक्षर) होते हैं।',
        'इस लिपि की एक खासियत है — अक्षरों के ऊपर एक सीधी क्षैतिज रेखा होती है।',
        'देवनागरी एक वर्णमाला है जहाँ प्रत्येक अक्षर एक पूरा उच्चारण (सिलेबल) दर्शाता है, न कि किवल एक ध्वनि।',
      ],
      example: [
        'अ (A): "अमेरिका" शब्द के "अ" जैसा उच्चारण।',
        'क (Ka): "काइट" शब्द के "क" जैसा उच्चारण।',
        'म (Ma): "मदर" शब्द के "म" जैसा उच्चारण।',
        'प (Pa): "पेपर" शब्द के "प" जैसा उच्चारण।',
        'र (Ra): "रेन" शब्द के "र" जैसा उच्चारण।',
      ],
      image: require('@/assets/images/hindi/devanagariscript.jpeg')
    },
    { 
      title: 'ध्वनियाँ', 
      content: [
        'हिंदी में हर अक्षर का एक निश्चित उच्चारण होता है। उदाहरण के लिए, क हमेशा "क" ही बोला जाता है और कभी नहीं बदलता।',
        'स्वर शब्द की शुरुआत, मध्य या अंत में आने पर अपना रूप बदल सकते हैं।',
        'व्यंजन स्वर के साथ जुड़ने पर नरम (soft) या कठोर (hard) हो सकते हैं।',
      ],
      example: [
        'को (Ko): शब्द के अंत में "ओ" ध्वनि जोड़ने के लिए।',
        'की (Kī): किसी के स्वामित्व या स्थान को दर्शाने के लिए "ई" ध्वनि।',
        'अ (a): "अमेरिका" के "अ" जैसा उच्चारण।',
        'आ (aa): "फादर" के "आह" जैसा उच्चारण।',
        'इ (i): "आई" शब्द के "ई" जैसा उच्चारण।',
        'उ (u): "यू" शब्द के "ऊ" जैसा उच्चारण।',
      ],
      image: require('@/assets/images/hindi/sounds.jpeg')
    },
    { 
      title: 'अभिवादन (Greetings)', 
      content: 'नमस्ते हिंदी में सबसे सामान्य और पारंपरिक अभिवादन है।\n\n"नमस्ते" शब्द संस्कृत के "नमः" (नमन) और "ते" (आपको) से बना है, जिसका शाब्दिक अर्थ होता है "मैं आपको नमन करता हूँ।"\n\nयह न केवल एक शब्द है, बल्कि भारतीय संस्कृति में सम्मान, विनम्रता और सकारात्मक ऊर्जा का प्रतीक भी है।\n\nहाथ जोड़कर (प्रणाम मुद्रा में) "नमस्ते" करना विनम्रता, एकता और शांति का संदेश देता है।\n\nयह अभिवादन प्रायः मिलने पर, विदाई लेते समय और यहाँ तक कि किसी औपचारिक या आध्यात्मिक सभा में भी किया जाता है।',
      example: [
        'नमस्ते (Namaste): एक औपचारिक और अनौपचारिक अभिवादन दोनों के लिए उपयुक्त।',
        'नमस्कार (Namaskār): थोड़ा अधिक औपचारिक अभिवादन।',
        'प्रणाम (Pranām): बड़ों या गुरुओं को सम्मान देने के लिए उपयोग किया जाता है।',
        'नमस्ते का इशारा हाथों को छाती के सामने जोड़कर और हल्के से सिर झुकाकर किया जाता है।',
        'यह शारीरिक संपर्क के बिना सम्मान व्यक्त करने का एक आदर्श तरीका है।',
      ],
      image: require('@/assets/images/hindi/namaste.jpeg')
    }
    
  ];

  const handleTextPress = (title: string, content: string | string[], image: any, example?: string[]) => {
    const contentString = Array.isArray(content) ? content.join('\n') : content;
    setModalTitle(title);
    setModalContent(contentString);
    setModalImage(image);
    setModalVisible(true);
    Speech.speak(contentString, {
      language: 'hi-IN', // Set language to Hindi
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Introduction to Hindi</Text>
      {topics.map((topic, index) => (
        <TouchableOpacity key={index} style={styles.card} onPress={() => handleTextPress(topic.title, topic.content, topic.image, topic.example)}>
          <View style={styles.cardContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} />
            <Text style={[styles.cardTitle, { color: theme.text }]}>{topic.title}</Text>
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
            {modalImage && <Image source={modalImage} style={styles.modalImage} />}
            <Text style={[styles.modalText, { color: theme.text }]}>{modalContent}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Ionicons name="close-circle-outline" size={30} color={theme.text} />
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2, // Add border width
    borderColor: '#FFA500', // Add orange border color
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '85%',
    padding: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
});