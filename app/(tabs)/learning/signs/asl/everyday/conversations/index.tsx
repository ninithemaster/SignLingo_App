import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function ConversationsScreen() {
  const { theme } = useAppTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    {
      title: 'Greetings & Introductions',
      videos: [
        {
          title: 'First 25 signs',
          description: 'Learn common greetings in ASL',
          url: 'https://youtu.be/0FcwzMq4iWg?si=S2dDjseJM7XQdJm6',
          thumbnail: require('@/assets/images/asl/conversations/first.jpg')
        },
        {
          title: 'Basic ASL Greetings',
          description: 'Learn common greetings in ASL',
          url: 'https://youtu.be/uKKvNqA9N20?si=JkAn4S6m3MhPyVrG',
          thumbnail: require('@/assets/images/asl/conversations/Greetings.png')
        },
        {
            title: 'Basic ASL Greetings',
            description: 'Learn common greetings in ASL',
            url: 'https://youtu.be/f_nVhrOgpYw?si=w3cz8obWNY-ZJ-WP',
            thumbnail: require('@/assets/images/asl/conversations/Move.png')
          },
          {
            title: 'Introducing Yourself',
            description: 'How to introduce yourself in ASL',
            url: 'https://youtu.be/GN8LRLFBxNg?si=700b7vlpafRRO_Bs',
            thumbnail: require('@/assets/images/asl/conversations/Greeting2.png')
          },
          {
            title: 'Phrases',
            description: 'Learn common greetings in ASL',
            url: 'https://youtu.be/v1desDduz5M?si=Z99jL4sGH7ERgPfH',
            thumbnail: require('@/assets/images/asl/conversations/phrase.jpg')
          },
      ]
    }
  ];

  const openYouTubeVideo = (url: string) => {
    Linking.openURL(url);
  };

  const openImageModal = (image: any) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {categories.map((category, categoryIndex) => (
          <Animated.View 
            key={categoryIndex} 
            entering={FadeIn.delay(categoryIndex * 100)}
          >
            <View style={[styles.categoryCard, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.categoryTitle, { color: theme.text }]}>
                {category.title}
              </Text>
              
              {category.videos.map((video, videoIndex) => (
                <View key={videoIndex} style={styles.videoContainer}>
                  <TouchableOpacity
                    style={[styles.videoCard, { borderColor: theme.border }]}
                    onPress={() => openImageModal(video.thumbnail)}
                  >
                    <Image 
                      source={video.thumbnail} 
                      style={styles.videoThumbnail}
                      resizeMode="cover"
                    />
                    <View style={styles.videoInfo}>
                      <Text style={[styles.videoTitle, { color: theme.text }]}>
                        {video.title}
                      </Text>
                      <Text style={[styles.videoDescription, { color: theme.subtitle }]}>
                        {video.description}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color={theme.text} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.youtubeButton, { backgroundColor: theme.primary }]}
                    onPress={() => openYouTubeVideo(video.url)}
                  >
                    <Ionicons name="logo-youtube" size={24} color="white" />
                    <Text style={styles.youtubeButtonText}>Watch Video</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {selectedImage && (
              <Image 
                source={selectedImage} 
                style={styles.modalImage}
                resizeMode="contain"
              />
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  categoryCard: {
    borderRadius: 15,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  videoContainer: {
    marginBottom: 16,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 8,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  videoInfo: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
  },
  youtubeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  youtubeButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
}); 