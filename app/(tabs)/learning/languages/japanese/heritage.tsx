import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

export default function HeritageScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ title: string; description: string; image: string; youtubeLink: string } | null>(null);

  const heritageList = [
    {
      title: 'Japanese Castle',
      description: 'A beautiful historic castle in Japan, representing Japans rich history and architectural beauty.',
      image: 'https://i.pinimg.com/736x/e0/b8/17/e0b81761d30a7f6e7593417527b1316d.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/-Gm3THzHWd0?si=0o8QeHb0n8k15gPy', // Replace with actual YouTube link
    },
    {
      title: 'Traditional Tea Ceremony',
      description: 'Experience the traditional Japanese tea ceremony, a spiritual and aesthetic practice of preparing and drinking tea.',
      image: 'https://i.pinimg.com/736x/0e/a7/db/0ea7dba0df0a84da9f8fa50ec13693dd.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/xD7qUfSOGOE?si=jMYROSoNCJQPpEzh', // Replace with actual YouTube link
    },
    {
      title: 'Mount Fuji',
      description: 'An iconic symbol of Japan and a UNESCO World Heritage site, Mount Fuji is a beautiful active stratovolcano and a source of inspiration in Japanese art.',
      image: 'https://i.pinimg.com/736x/96/19/e6/9619e65daedadc265018d1075ed2c252.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/n_PxJ2PyecI?si=t4Jq2ci_041THnmw', // Replace with actual YouTube link
    },
    {
      title: 'Kimonos',
      description: 'The traditional Japanese garment, known for its elegance, style, and cultural significance in Japanese ceremonies and festivals.',
      image: 'https://i.pinimg.com/736x/f3/02/54/f30254acbda9466633837276b8e23405.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/G8Gp17xX2Bc?si=Zzu5bAm85moYSq9Q', // Replace with actual YouTube link
    },
    {
      title: 'Sumo Wrestling',
      description: 'A traditional Japanese sport that dates back to ancient times, sumo wrestling is an important cultural activity with deep roots in Shinto rituals.',
      image: 'https://i.pinimg.com/736x/cd/94/4b/cd944b70e18e2d25ad56eff92ac2a5b3.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/E0Xl1f-fXLo?si=KBEIXoiRILT3-iCi', // Replace with actual YouTube link
    },
    {
      title: 'Shinto Shrines',
      description: 'Shinto shrines are places of worship and ritual, central to Japan’s indigenous religion. They reflect Japan’s spiritual heritage.',
      image: 'https://i.pinimg.com/736x/2e/82/48/2e8248e9541861288718f2c7d0c681b5.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/S_OQ6yyLIv0?si=aXmSzlOXoLZFnX-9', // Replace with actual YouTube link
    },
    {
      title: 'Cherry Blossom (Sakura)',
      description: 'Cherry blossoms are a symbol of Japan, representing the fleeting beauty of life. The annual cherry blossom viewing is an important cultural event.',
      image: 'https://i.pinimg.com/736x/10/60/57/10605789202c3b97e0baf3311cd9d436.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/kZN2yTa1HcY?si=iLZ4Ms765-UQAyt_', // Replace with actual YouTube link
    },
    {
      title: 'Japanese Calligraphy (Shodo)',
      description: 'Shodo is the art of Japanese calligraphy, using brush and ink to create beautiful characters. It is an expressive and meditative art form.',
      image: 'https://i.pinimg.com/736x/68/06/db/6806db8571b9af4e52c2478a8a56f83a.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/swEUKk5doew?si=Osx6ev9szVnG20HD', // Replace with actual YouTube link
    },
    {
      title: 'Noh Theatre',
      description: 'Noh is a traditional form of Japanese theatre that combines drama, music, and dance to tell stories based on historical events and classical literature.',
      image: 'https://i.pinimg.com/736x/f7/78/ef/f778ef59326a8eccb9693fcdf884bc0f.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/YVARAMARvk8?si=gn5LX1iDmLTkOQx3', // Replace with actual YouTube link
    },
    {
      title: 'Japanese Gardens',
      description: 'Japanese gardens are designed to reflect natural landscapes and are deeply connected with Zen Buddhism, offering peace and tranquility.',
      image: 'https://i.pinimg.com/736x/5c/1f/29/5c1f29b4c64f24b0cce8c535cfcc4455.jpg', // Replace with actual image URL
      youtubeLink: 'https://youtu.be/hWd-XfbnEss?si=9OvBVxMHCew9Cgss', // Replace with actual YouTube link
    },
  ];
  
  const handleOpenModal = (item: { title: string; description: string; image: string; youtubeLink: string }) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {heritageList.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: theme.cardBackground }]} 
            onPress={() => handleOpenModal(item)}
          >
            <Text style={[styles.cardText, { color: theme.text }]}>{item.title}</Text>
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
            {selectedItem && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedItem.title}</Text>
                <Text style={[styles.descriptionText, { color: theme.text }]}>{selectedItem.description}</Text>
                <Image source={{ uri: selectedItem.image }} style={styles.image} />
                <TouchableOpacity onPress={() => Linking.openURL(selectedItem.youtubeLink)}>
                  <Text style={[styles.linkText, { color: '#007BFF' }]}>Watch on YouTube</Text>
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
    borderWidth: 1,
    borderColor: 'pink',
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
  image: {
    width: '120%',
    height: 300,
    marginVertical: 10,
  },
  linkText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});