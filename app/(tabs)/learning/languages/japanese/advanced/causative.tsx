import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function CausativeScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCausative, setSelectedCausative] = useState<{ title: string; description: string; example1: string; example2: string } | null>(null);

  const causativeList = [
    {
      title: '使役形 (Causative Form)',
      description: 'Express making or letting someone do something. It is formed by changing the verb stem and adding the appropriate ending.',
      example1: 'Example 1: 母は私に掃除させました。("My mother made me clean.")',
      example2: 'Example 2: 先生は学生にレポートを書かせました。("The teacher made the students write the report.")'
    },
    {
      title: '使役受身形 (Causative-Passive Form)',
      description: 'Express being made to do something. It combines both the causative form and the passive form, and it indicates that the subject was made to do something.',
      example1: 'Example 1: 私は先生に宿題をさせられました。("I was made to do the homework by the teacher.")',
      example2: 'Example 2: 子供は親に映画に行かせられました。("The child was made to go to the movie by the parents.")'
    },
    {
        title: '使役形 (Causative Form)',
        description: 'Express making or letting someone do something. It is formed by changing the verb stem and adding the appropriate ending.',
        example1: 'Example 1: 母は私に掃除させました。("My mother made me clean.")',
        example2: 'Example 2: 先生は学生にレポートを書かせました。("The teacher made the students write the report.")'
      },
      {
        title: '使役受身形 (Causative-Passive Form)',
        description: 'Express being made to do something. It combines both the causative form and the passive form, and it indicates that the subject was made to do something.',
        example1: 'Example 1: 私は先生に宿題をさせられました。("I was made to do the homework by the teacher.")',
        example2: 'Example 2: 子供は親に映画に行かせられました。("The child was made to go to the movie by the parents.")'
      },
      {
        title: '試験を受けさせる (Make someone take an exam)',
        description: 'This is a causative sentence that implies the speaker made someone take an exam.',
        example1: 'Example 1: 先生は私に試験を受けさせました。("The teacher made me take the exam.")',
        example2: 'Example 2: 彼は部下に試験を受けさせました。("He made his subordinate take the exam.")'
      },
      {
        title: '働かせる (Make someone work)',
        description: 'Used to express making someone work or forcing someone to work.',
        example1: 'Example 1: 上司は私に夜遅く働かせました。("The boss made me work late at night.")',
        example2: 'Example 2: 彼は弟に店で働かせました。("He made his younger brother work at the shop.")'
      },
      {
        title: '食べさせる (Make someone eat)',
        description: 'This causative form is used when making someone eat or allowing them to eat.',
        example1: 'Example 1: 母は私に野菜を食べさせました。("My mother made me eat vegetables.")',
        example2: 'Example 2: 先生は生徒にお昼ご飯を食べさせました。("The teacher made the students eat lunch.")'
      },
      {
        title: '走らせる (Make someone run)',
        description: 'This is used to express forcing someone to run or making them do so.',
        example1: 'Example 1: コーチは選手に10周走らせました。("The coach made the player run 10 laps.")',
        example2: 'Example 2: 先生は私に授業の後に走らせました。("The teacher made me run after class.")'
      },
      {
        title: '読ませる (Make someone read)',
        description: 'Used when making someone read something.',
        example1: 'Example 1: 先生は生徒に本を読ませました。("The teacher made the students read a book.")',
        example2: 'Example 2: 母は私にその記事を読ませました。("My mother made me read that article.")'
      },
      {
        title: '歌わせる (Make someone sing)',
        description: 'This causative verb expresses making or forcing someone to sing.',
        example1: 'Example 1: 先生は私に歌を歌わせました。("The teacher made me sing a song.")',
        example2: 'Example 2: 彼女は彼にカラオケで歌わせました。("She made him sing at karaoke.")'
      },
      {
        title: '使わせる (Make someone use)',
        description: 'This form is used to make someone use something.',
        example1: 'Example 1: 先生は私にそのコンピュータを使わせました。("The teacher made me use that computer.")',
        example2: 'Example 2: 母は私に掃除機を使わせました。("My mother made me use the vacuum cleaner.")'
      },
      {
        title: '寝かせる (Make someone sleep)',
        description: 'This is used when making someone sleep or letting them sleep.',
        example1: 'Example 1: 母は赤ちゃんを寝かせました。("My mother made the baby sleep.")',
        example2: 'Example 2: 先生は生徒を早く寝かせました。("The teacher made the students sleep early.")'
      },
      {
        title: '行かせる (Make someone go)',
        description: 'This causative form is used when making someone go somewhere.',
        example1: 'Example 1: 先生は私に会議に行かせました。("The teacher made me go to the meeting.")',
        example2: 'Example 2: 母は私に買い物に行かせました。("My mother made me go shopping.")'
      },
      {
        title: '勉強させる (Make someone study)',
        description: 'Expresses making someone study.',
        example1: 'Example 1: 先生は私に日本語を勉強させました。("The teacher made me study Japanese.")',
        example2: 'Example 2: 親は子供に英語を勉強させました。("The parents made their children study English.")'
      },
      {
        title: '休ませる (Make someone rest)',
        description: 'Used when making or allowing someone to rest.',
        example1: 'Example 1: 先生は私に休ませました。("The teacher made me rest.")',
        example2: 'Example 2: 彼は部下に休ませました。("He made his subordinate rest.")'
      },
      {
        title: '見せる (Show something to someone)',
        description: 'Used to make someone see or show something.',
        example1: 'Example 1: 先生は私にその資料を見せました。("The teacher showed me the materials.")',
        example2: 'Example 2: 母は私に写真を見せました。("My mother showed me the photos.")'
      },
];

  

  const handleOpenModal = (item: { title: string; description: string; example1: string; example2: string }) => {
    setSelectedCausative(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedCausative(null);
  };

  const speakCausative = (item: { title: string; description: string; example1: string; example2: string }) => {
    Speech.speak(`${item.title}. ${item.description}. ${item.example1}. ${item.example2}`, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {causativeList.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleOpenModal(item)}>
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
            {selectedCausative && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedCausative.title}</Text>
                <Text style={[{ color: theme.text, fontSize: 16, marginBottom: 15 }]}>{selectedCausative.description}</Text>
                <Text style={[{ color: theme.text, marginBottom: 10, fontSize: 16 }]}>{selectedCausative.example1}</Text>
                <Text style={[{ color: theme.text, marginBottom: 10, fontSize: 16 }]}>{selectedCausative.example2}</Text>
                <TouchableOpacity onPress={() => speakCausative(selectedCausative)}>
                  <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
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
    borderWidth: 2, // Updated border width
    borderColor: 'yellow', // Updated border color
    width: '90%',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#007BFF',
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
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});