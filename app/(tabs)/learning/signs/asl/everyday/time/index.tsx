import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function TimeScreen() {
  const { theme } = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          Learn to sign the days of the week
        </Text>

        <Animated.View entering={FadeIn}>
          <TouchableOpacity
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            activeOpacity={0.7}
            onPress={() => setIsModalVisible(true)}
          >
            <View style={styles.cardContent}>
              <Image
                source={require('@/assets/images/asl/time/days-of-week.png')}
                style={styles.daysImage}
                resizeMode="contain"
              />
              <View style={styles.daysLabels}>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Mon</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Tue</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Wed</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Thu</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Fri</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Sat</Text>
                <Text style={[styles.dayLabel, { color: theme.text }]}>Sun</Text>
              </View>
              <Text style={[styles.tapHint, { color: theme.subtitle }]}>
                Tap to enlarge
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            How to Sign Days
          </Text>
          <Text style={[styles.infoText, { color: theme.subtitle }]}>
            Most days are signed by making the first letter of the day and moving it downward. 
            For example, Monday uses 'M', Tuesday uses 'T', etc. Sunday is unique - it uses 
            an 'S' handshape in a circular motion.
          </Text>
        </View>
      </ScrollView>

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
                Days of the Week
              </Text>
              <Image
                source={require('@/assets/images/asl/time/days-of-week.png')}
                style={styles.modalImage}
                resizeMode="contain"
              />
              <View style={styles.modalLabels}>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Monday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Tuesday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Wednesday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Thursday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Friday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Saturday</Text>
                <Text style={[styles.modalDayLabel, { color: theme.text }]}>Sunday</Text>
              </View>
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
  daysImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  daysLabels: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 12,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tapHint: {
    fontSize: 12,
    opacity: 0.7,
  },
  infoSection: {
    padding: 16,
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
  modalLabels: {
    width: '100%',
  },
  modalDayLabel: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
}); 