import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Linking, Image} from 'react-native'; // Ensure Linking is imported
import { useAppTheme } from '@/hooks/useAppTheme';

export default function FolkLifeScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalLink, setModalLink] = useState('');
  const [modalImage, setModalImage] = useState(''); // Add state for image

  const items = [
    {
      title: 'Folk Music and Dance',
      content: 'Explore the vibrant folk music and dance traditions of Maharashtra.',
      link: 'https://youtu.be/KpO0aeHo-EQ?si=qWXpbm7wlycrmMfS',
      image: 'https://i.pinimg.com/736x/2a/ea/4c/2aea4cc7d642dff21027ad14c393114e.jpg' // Add image URL
    },
    {
      title: 'Festivals and Celebrations',
      content: 'Learn about the colorful festivals celebrated across Maharashtra.',
      link: 'https://youtu.be/HvOFrwCKi9U?si=8BET6Ny4OPN8GM4V',
      image: 'https://i.pinimg.com/736x/f4/15/65/f41565a51c36b06fa4ab1350753342f2.jpg' // Add image URL
    },
    {
      title: "Traditional Occupations",
      content: "Folk life in Maharashtra is closely tied to traditional occupations like agriculture, handicrafts, and fishing.",
      link: "https://youtu.be/iiP3S_Pnzpw?si=9rWAZb3ER42TAUxf",
      image: 'https://i.pinimg.com/736x/ed/ee/06/edee06770d344ba942be1e94e0c5ac6e.jpg' // Add image URL
    },
    {
      title: "Folk Art and Crafts",
      content: "Traditional folk art and crafts of Maharashtra showcase the creativity of rural artisans.",
      link: "https://youtu.be/aIK3QwB4TOc?si=2n656E-PpRC0QYAd",
      image: 'https://i.pinimg.com/736x/d0/b5/52/d0b5526f58b8f569b21187749f78d621.jpg' // Add image URL
    },
    {
      title: "Traditional Food and Cuisine",
      content: "The food of Maharashtra is as diverse as its culture, with a wide range of savory and sweet dishes.",
      link: "https://youtu.be/Kh4MU4EonkI?si=ylC7A6b3npxvlbK7",
      image: 'https://i.pinimg.com/736x/02/7c/e2/027ce27883a67e963109ca27e3231cb3.jpg' // Add image URL
    }
    // Add more items as needed
  ];

  const handleItemPress = (title: string, content: string, link: string, image: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalLink(link);
    setModalImage(image); // Set image URL
    setModalVisible(true);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Folk Life</Text>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card} 
          onPress={() => handleItemPress(item.title, item.content, item.link, item.image)} // Pass image URL
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
              <TouchableOpacity onPress={() => Linking.openURL(modalLink)}>
                <Text style={{ color: theme.link }}>Watch Video</Text>
              </TouchableOpacity>
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
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 25,
    textAlign: 'center',
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