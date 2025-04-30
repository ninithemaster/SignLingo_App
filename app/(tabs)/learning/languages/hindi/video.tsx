import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Linking, Image } from 'react-native'; // Ensure Image is imported
import { useAppTheme } from '@/hooks/useAppTheme';

export default function Video() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalLink, setModalLink] = useState('');
  const [modalImage, setModalImage] = useState(''); // Declare modalImage state

  const videoItems = [
    { 
      title: 'Introduction to Hindi Culture', 
      content: 'Watch an introductory video on the rich cultural heritage of Hindi-speaking regions.',
      link: 'https://youtu.be/_YzG4FRn7GA?si=veSUYJvoBsJcPf8Z',
      image: 'https://i.pinimg.com/736x/89/57/be/8957be894a9a5272429532a71805ab63.jpg' // Add image URL
    },
    { 
      title: 'Hindi Music and Dance', 
      content: 'Explore the vibrant music and dance traditions through engaging video lectures.',
      link: 'https://youtu.be/Mk0s-5A9ZqA?si=eBlr88_CjWR144sx',
      image: 'https://i.pinimg.com/736x/ab/8f/30/ab8f3002e6a3a8db960efc5e3f44333c.jpg' // Add image URL
    },
    { 
      title: 'Historical Events', 
      content: 'Learn about significant historical events that shaped Hindi culture.',
      link: 'https://youtu.be/Cq5tmXfTgjg?si=RkIIvvP9v1RDiEHk',
      image: 'https://i.pinimg.com/736x/4b/10/a7/4b10a7d6d032e829d62b43d02afe3d3a.jpg' // Add image URL
    },
    { 
      title: 'Festivals of Hindi Culture', 
      content: 'Watch a video on major Hindi festivals like Diwali, Holi, and Durga Puja, exploring their cultural significance and celebrations.',
      link: 'https://youtu.be/dC40ZmccQGo?si=4BHVoa62atTrGaZD',
      image: 'https://i.pinimg.com/736x/21/b4/df/21b4dfdee86df78b710d4b00ba5fca0b.jpg' // Add image URL
    },
    { 
      title: 'Famous Hindi Authors and Poets', 
      content: 'Discover the works of legendary Hindi writers and poets, such as Premchand, Mirza Ghalib, and Harivansh Rai Bachchan, and their contributions to Hindi literature.',
      link: [
        'https://youtu.be/pCRkOG1LH-I?si=jo1UwkRnOCyJ-Jnr',
        'https://youtu.be/VRyb93k1lRc?si=9MZ2MGrT05c7xOWM',
        'https://youtu.be/-tZmtZfnM9g?si=aOiftlpAFLU9Wqzt'
      ],
      image: 'https://i.pinimg.com/736x/04/e9/45/04e945b819157d98fff7b36646b48fb7.jpg' // Add image URL
    },
    { 
      title: 'The Influence of Hindi on Other Languages', 
      content: 'Explore how Hindi has influenced other languages in India and around the world, especially in terms of vocabulary and culture.',
      link: 'https://youtu.be/U4Bb7RNjN8w?si=sSrIFrYToeF1lGIA',
      image: 'https://i.pinimg.com/736x/84/59/36/84593629c70417b1bd32a0580ccdddb4.jpg' // Add image URL
    },
    { 
      title: 'Hindi Dialects and Regional Variations', 
      content: 'Understand the different dialects and regional variations of Hindi spoken in various parts of India, such as Bhojpuri, Awadhi, and Haryanvi.',
      link: 'https://youtu.be/ldvCVBPQkPk?si=DnJYASdHpyYlhdcI',
      image: 'https://i.pinimg.com/736x/c1/37/3c/c1373c0e1c55a3f95fa445a304ca8eca.jpg' // Add image URL
    },
    // Add more video items as needed
  ];

  const handleTextPress = (title: string, content: string, link: string, image: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalLink(link);
    setModalImage(image); // Set image URL for modal
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Video Lectures</Text>
      {videoItems.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleTextPress(
            item.title, 
            item.content, 
            Array.isArray(item.link) ? item.link[0] : item.link, 
            item.image // Pass image URL
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
            {modalImage && (
              <Image source={{ uri: modalImage }} style={styles.modalImage} /> // Display image in modal
            )}
            {modalLink && (
              <Text style={[styles.modalLink, { color: theme.link }]}>
                <Text onPress={() => Linking.openURL(modalLink)}>Watch Video</Text>
              </Text>
            )}
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
    padding: 10, // Increased padding for better spacing
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
    padding: 25,
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
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
    color: '#004d40', // Dark green color for modal text
  },
  modalLink: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#1E90FF', // Blue color for the link
  },
  closeButton: {
    marginTop: 15,
  },
  modalImage: {
    width: '100%',  // Adjust width as needed
    height: 200,    // Adjust height as needed
    borderRadius: 10,
    marginBottom: 10,
  },
});