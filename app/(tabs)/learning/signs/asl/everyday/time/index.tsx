import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useState } from 'react';

export default function TimeScreen() {
  const { theme } = useAppTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
  const [selectedTimeExpression, setSelectedTimeExpression] = useState('');

  const timeExpressions = [
    { name: 'Good Morning', image: require('@/assets/images/asl/time/Good Morning.png') },
    { name: 'Night', image: require('@/assets/images/asl/time/Night.png') },
    { name: 'Today', image: require('@/assets/images/asl/time/today.png') },
    { name: 'Tomorrow', image: require('@/assets/images/asl/time/tomorrow.png') },
    { name: 'Yesterday', image: require('@/assets/images/asl/time/yesterday.png') }
  ];

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
          Each day of the week is typically signed using a combination of a handshape letter (usually the first letter of the day) and a small circular motion.
          </Text>
        </View>

        {/* Time-related signs section */}
        <Text style={[styles.subtitle, { color: theme.subtitle, marginTop: 24 }]}>
          Learn to sign time-related expressions
        </Text>

        <Animated.View entering={FadeIn}>
          <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.cardContent}>
              <View style={styles.timeExpressionsGrid}>
                {timeExpressions.map((expression, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeExpressionItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedTimeExpression(expression.name);
                      setIsTimeModalVisible(true);
                    }}
                  >
                    <Image
                      source={expression.image}
                      style={styles.timeExpressionImage}
                      resizeMode="contain"
                    />
                    <Text style={[styles.timeExpressionLabel, { color: theme.text }]}>
                      {expression.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Animated.View>

        <View style={styles.infoSection}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            How to Sign Time Expressions
          </Text>
          <Text style={[styles.infoText, { color: theme.subtitle }]}>
          Time expressions (like yesterday, tomorrow, now, week, month) are usually signed at the beginning of a sentence to set the tense. Most signs involve motion relative to the body—past moves backward, future moves forward.
          </Text>
        </View>
      </ScrollView>

      {/* Days Modal */}
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

      {/* Time Expressions Modal */}
      <Modal
        visible={isTimeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsTimeModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsTimeModalVisible(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsTimeModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            
            <View style={styles.modalInner}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {selectedTimeExpression}
              </Text>
              <Image
                source={timeExpressions.find(exp => exp.name === selectedTimeExpression)?.image}
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
  modalLabels: {
    width: '100%',
  },
  modalDayLabel: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 8,
  },
  timeExpressionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    gap: 16,
  },
  timeExpressionItem: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeExpressionImage: {
    width: '100%',
    height: 120,
    marginBottom: 8,
  },
  timeExpressionLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 