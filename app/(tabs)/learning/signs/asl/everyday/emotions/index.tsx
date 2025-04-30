import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function EmotionsScreen() {
  const { theme } = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const emotions = [
    { name: 'Happy', image: require('@/assets/images/asl/emotions/Happy.png') },
    { name: 'Sad', image: require('@/assets/images/asl/emotions/Sad.png') },
    { name: 'Angry', image: require('@/assets/images/asl/emotions/Angry.png') },
    { name: 'Tired', image: require('@/assets/images/asl/emotions/Tired.png') },
    { name: 'Confused', image: require('@/assets/images/asl/emotions/Confused.png') },
    { name: 'Excited', image: require('@/assets/images/asl/emotions/Exicted.png') }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          Learn to express emotions in ASL
        </Text>

        <Animated.View entering={FadeIn}>
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.cardContent}>
              <View style={styles.emotionsGrid}>
                {emotions.map((emotion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.emotionItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedEmotion(emotion.name);
                      setIsModalVisible(true);
                    }}
                  >
                    <Image
                      source={emotion.image}
                      style={styles.emotionImage}
                      resizeMode="contain"
                    />
                    <Text style={[styles.emotionLabel, { color: theme.text }]}>
                      {emotion.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            How to Sign Emotions
          </Text>
          <Text style={[styles.infoText, { color: theme.subtitle }]}>
            Emotions in ASL are often expressed through facial expressions and specific hand movements. 
          </Text>
        </View>
      </ScrollView>

      {/* Emotions Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            
            <View style={styles.modalInner}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {selectedEmotion}
              </Text>
              <Image
                source={emotions.find(emo => emo.name === selectedEmotion)?.image}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
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
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 24,
  },
  cardContent: {
    padding: 20,
    alignItems: 'center',
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    gap: 16,
  },
  emotionItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  emotionImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  emotionLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoSection: {
    padding: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  modalInner: {
    alignItems: 'center',
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  modalImage: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
}); 