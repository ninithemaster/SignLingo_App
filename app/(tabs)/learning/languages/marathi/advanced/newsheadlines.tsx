import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function NewsHeadlinesScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  const newsHeadlines = [
    {
      title: "राज्यात पावसाचा जोरदार हल्ला",
      content: "राज्यभरात पावसामुळे अनेक भागांमध्ये पूर परिस्थिती निर्माण झाली आहे.",
      example: "राज्यात पावसाचा जोरदार हल्ला झाला आणि अनेक शहरांमध्ये जलसंचय व वाहतूक यंत्रणा विस्कळीत झाली आहे."
    },
    {
      title: "शालेतील विद्यार्थ्यांसाठी शालेय सुट्ट्या वाढविण्यात आल्या",
      content: "शालेय सुट्ट्या विद्यार्थ्यांच्या कल्याणासाठी सरकारने दोन आठवड्यांनी वाढविल्या.",
      example: "शालेय सुट्ट्या विद्यार्थ्यांच्या परीक्षांच्या तयारीसाठी दोन आठवड्यांनी वाढविण्यात आल्या."
    },
    {
        "title": "कोरोना लसीकरण अभियान जोरात सुरु",
        "content": "कोरोना लसीकरण अभियानाची गती वाढवण्याचे आदेश राज्य सरकारने दिले आहेत.",
        "example": "राज्य सरकारने कोरोना लसीकरण अभियानाची गती वाढवण्यासाठी अनेक ठिकाणी लसीकरण केंद्र उघडली."
      },
      {
        "title": "राजधानीत गॅस दुर्घटना, अनेक लोक जखमी",
        "content": "राजधानीत एका गॅस गळतीच्या दुर्घटनेत अनेक लोक जखमी झाले आहेत.",
        "example": "राजधानीतील एका गॅस गळतीच्या दुर्घटनेत अनेक लोक जखमी झाले असून त्यांना उपचारासाठी हॉस्पिटलमध्ये दाखल करण्यात आले आहे."
      },
      {
        "title": "वाढत्या तापमानामुळे शेतकऱ्यांना अडचणी",
        "content": "गंभीर उन्हाळ्यामुळे शेतकऱ्यांना पिकांची हानी होण्याची शक्यता आहे.",
        "example": "वाढत्या तापमानामुळे शेतकऱ्यांना पिकांची हानी होण्याची शक्यता आहे, आणि शेतमालासाठी नुकसान होईल."
      },
      {
        "title": "राष्ट्रध्वजाची लाज - राज्यपालांनी दिले कडक आदेश",
        "content": "राष्ट्रध्वजाच्या अनादराबद्दल राज्यपालांनी कडक आदेश दिले आहेत.",
        "example": "राष्ट्रध्वजाच्या अनादराबद्दल राज्यपालांनी संबंधित शासकीय अधिकाऱ्यांना कडक आदेश दिले आहेत."
      },
      {
        "title": "समुद्र किनाऱ्यावर पर्यटकांची गर्दी",
        "content": "ताज्या पर्यटनाच्या सीझनमुळे समुद्र किनाऱ्यावर पर्यटकांची मोठी गर्दी आहे.",
        "example": "समुद्र किनाऱ्यावर पर्यटकांची मोठी गर्दी पाहायला मिळाली, ज्यामुळे स्थानिक व्यवसायांना फायदा झाला."
      },
      {
        "title": "परीक्षांचे वेळापत्रक जाहीर, विद्यार्थ्यांची तयारी जोरात",
        "content": "परीक्षांचे वेळापत्रक जाहीर करण्यात आले असून, विद्यार्थ्यांनी तयारीला गती दिली आहे.",
        "example": "परीक्षांचे वेळापत्रक जाहीर झाल्यानंतर, विद्यार्थ्यांनी परीक्षेसाठी तयारीला गती दिली आहे."
      },
      {
        "title": "आंतरराष्ट्रीय चित्रपट महोत्सवाला सुरुवात",
        "content": "आंतरराष्ट्रीय चित्रपट महोत्सवाच्या उद्घाटन सोहळ्याला मोठ्या प्रमाणावर लोकांची उपस्थिती.",
        "example": "आंतरराष्ट्रीय चित्रपट महोत्सवाला सुरुवात झाली असून उद्घाटन सोहळ्याला मोठ्या प्रमाणावर लोकांची उपस्थिती होती."
      },
      {
        "title": "शहरात मोठ्या प्रमाणावर वाहतूक कोंडी",
        "content": "शहरात रस्त्यांच्या दुरुस्तीमुळे मोठ्या प्रमाणावर वाहतूक कोंडी झाली आहे.",
        "example": "शहरात रस्त्यांच्या दुरुस्तीमुळे वाहतूक कोंडी झाली असून, नागरिकांना अडचणींचा सामना करावा लागला."
      }
    // Add more news headlines as needed
  ];

  const handlePress = (content: string, example: string) => {
    setSelectedText(`${content}\n\nExamples:\n${example}`);
    setModalVisible(true);
    Speech.speak(content, { language: 'mr' });
    Speech.speak(example, { language: 'mr' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Removed the title Text component */}
      <ScrollView contentContainerStyle={styles.headlinesContainer}>
        {newsHeadlines.map((headline, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(headline.content, headline.example)}
          >
            <Text style={[styles.headlineTitle, { color: theme.text }]}>{headline.title}</Text>
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
  headlinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 10,
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
    borderWidth: 1,
    borderColor: '#D3D3D3', // Light grey border
  },
  headlineTitle: {
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
    paddingBottom: 50,
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