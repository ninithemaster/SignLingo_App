import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NumbersScreen() {
  const { theme } = useAppTheme();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectedNumber, setSelectedNumber] = useState('');

  const numbers = [
        { text: '१', example: '(One)' },
        { text: '२', example: '(Two)' },
        { text: '३', example: '(Three)' },
        { text: '४', example: '(Four)' },
        { text: '५', example: '(Five)' },
        { text: '६', example: '(Six)' },
        { text: '७', example: '(Seven)' },
        { text: '८', example: '(Eight)' },
        { text: '९', example: '(Nine)' },
        { text: '१०', example: '(Ten)' },
        { text: '११', example: '(Eleven)' },
        { text: '१२', example: '(Twelve)' },
        { text: '१३', example: '(Thirteen)' },
        { text: '१४', example: '(Fourteen)' },
        { text: '१५', example: '(Fifteen)' },
        { text: '१६', example: '(Sixteen)' },
        { text: '१७', example: '(Seventeen)' },
        { text: '१८', example: '(Eighteen)' },
        { text: '१९', example: '(Nineteen)' },
        { text: '२०', example: '(Twenty)' },
        { text: '२१', example: '(Twenty-One)' },
        { text: '२२', example: '(Twenty-Two)' },
        { text: '२३', example: '(Twenty-Three)' },
        { text: '२४', example: '(Twenty-Four)' },
        { text: '२५', example: '(Twenty-Five)' },
        { text: '२६', example: '(Twenty-Six)' },
        { text: '२७', example: '(Twenty-Seven)' },
        { text: '२८', example: '(Twenty-Eight)' },
        { text: '२९', example: '(Twenty-Nine)' },
        { text: '३०', example: '(Thirty)' },
        { text: '३१', example: '(Thirty-One)' },
        { text: '३२', example: '(Thirty-Two)' },
        { text: '३३', example: '(Thirty-Three)' },
        { text: '३४', example: '(Thirty-Four)' },
        { text: '३५', example: '(Thirty-Five)' },
        { text: '३६', example: '(Thirty-Six)' },
        { text: '३७', example: '(Thirty-Seven)' },
        { text: '३८', example: '(Thirty-Eight)' },
        { text: '३९', example: '(Thirty-Nine)' },
        { text: '४०', example: '(Forty)' },
        { text: '४१', example: '(Forty-One)' },
        { text: '४२', example: '(Forty-Two)' },
        { text: '४३', example: '(Forty-Three)' },
        { text: '४४', example: '(Forty-Four)' },
        { text: '४५', example: '(Forty-Five)' },
        { text: '४६', example: '(Forty-Six)' },
        { text: '४७', example: '(Forty-Seven)' },
        { text: '४८', example: '(Forty-Eight)' },
        { text: '४९', example: '(Forty-Nine)' },
        { text: '५०', example: '(Fifty)' },
        { text: '५१', example: '(Fifty-One)' },
        { text: '५२', example: '(Fifty-Two)' },
        { text: '५३', example: '(Fifty-Three)' },
        { text: '५४', example: '(Fifty-Four)' },
        { text: '५५', example: '(Fifty-Five)' },
        { text: '५६', example: '(Fifty-Six)' },
        { text: '५७', example: '(Fifty-Seven)' },
        { text: '५८', example: '(Fifty-Eight)' },
        { text: '५९', example: '(Fifty-Nine)' },
        { text: '६०', example: '(Sixty)' },
        { text: '६१', example: '(Sixty-One)' },
        { text: '६२', example: '(Sixty-Two)' },
        { text: '६३', example: '(Sixty-Three)' },
        { text: '६४', example: '(Sixty-Four)' },
        { text: '६५', example: '(Sixty-Five)' },
        { text: '६६', example: '(Sixty-Six)' },
        { text: '६७', example: '(Sixty-Seven)' },
        { text: '६८', example: '(Sixty-Eight)' },
        { text: '६९', example: '(Sixty-Nine)' },
        { text: '७०', example: '(Seventy)' },
        { text: '७१', example: '(Seventy-One)' },
        { text: '७२', example: '(Seventy-Two)' },
        { text: '७३', example: '(Seventy-Three)' },
        { text: '७४', example: '(Seventy-Four)' },
        { text: '७५', example: '(Seventy-Five)' },
        { text: '७६', example: '(Seventy-Six)' },
        { text: '७७', example: '(Seventy-Seven)' },
        { text: '७८', example: '(Seventy-Eight)' },
        { text: '७९', example: '(Seventy-Nine)' },
        { text: '८०', example: '(Eighty)' },
        { text: '८१', example: '(Eighty-One)' },
        { text: '८२', example: '(Eighty-Two)' },
        { text: '८३', example: '(Eighty-Three)' },
        { text: '८४', example: '(Eighty-Four)' },
        { text: '८५', example: '(Eighty-Five)' },
        { text: '८६', example: '(Eighty-Six)' },
        { text: '८७', example: '(Eighty-Seven)' },
        { text: '८८', example: '(Eighty-Eight)' },
        { text: '८९', example: '(Eighty-Nine)' },
        { text: '९०', example: '(Ninety)' },
        { text: '९१', example: '(Ninety-One)' },
        { text: '९२', example: '(Ninety-Two)' },
        { text: '९३', example: '(Ninety-Three)' },
        { text: '९४', example: '(Ninety-Four)' },
        { text: '९५', example: '(Ninety-Five)' },
        { text: '९६', example: '(Ninety-Six)' },
        { text: '९७', example: '(Ninety-Seven)' },
        { text: '९८', example: '(Ninety-Eight)' },
        { text: '९९', example: '(Ninety-Nine)' },
        { text: '१००', example: '(Hundred)' },      
  ];

  const handlePress = (text: string, example: string) => {
    setSelectedNumber(text);
    setSelectedText(example);
    setModalVisible(true);
    Speech.speak(`${text} - ${example}`, { language: 'mr' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {numbers.map((number, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: theme.cardBackground }]}
            onPress={() => handlePress(number.text, number.example)}
          >
            <Text style={[styles.numberText, { color: theme.text }]}>{number.text}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalNumber, { color: theme.text }]}>{selectedNumber}</Text>
            <Text style={[styles.modalText, { color: theme.text }]}>{selectedText}</Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(false)} 
              style={[styles.closeButton, { backgroundColor: theme.cardBackground }]}
            >
              <Text style={[styles.closeButtonText, { color: theme.text }]}>Close</Text>
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
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  card: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '85%',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
  },
  modalNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});