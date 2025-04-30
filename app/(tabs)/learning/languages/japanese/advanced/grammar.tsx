import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function GrammarScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState<{ title: string; example: string } | null>(null);

  const grammarTopics = [
    {
      title: '受身形 (Passive Form)',
      description: 'Learn how to form and use the passive voice in Japanese.',
      example: '先生にほめられました。("I was praised by the teacher.")'
    },
    {
      title: '使役形 (Causative Form)',
      description: 'Understand how to express making or letting someone do something.',
      example: '母は子どもに野菜を食べさせた。("The mother made the child eat vegetables.")'
    },
    {
      title: '敬語 (Honorifics)',
      description: 'Explore the use of honorific language in formal settings.',
      example: '先生がおっしゃいました。("The teacher said.") [honorific form of 言う]'
    },
    {
      title: '使役受身形 (Causative-Passive Form)',
      description: 'Combine causative and passive to express being made to do something.',
      example: '私は部長に出張へ行かされました。("I was made to go on a business trip by the manager.")'
    },
    {
      title: '条件形 (Conditional Form)',
      description: 'Learn how to use various conditional expressions like 〜ば, 〜たら, and 〜なら.',
      example: '雨が降ったら、行きません。("If it rains, I won’t go.")'
    },
    {
      title: 'のに / くせに',
      description: 'Express contradiction or unexpected outcomes.',
      example: 'たくさん勉強したのに、試験に落ちた。("Even though I studied a lot, I failed the exam.")'
    },
    {
      title: '〜わけではない',
      description: 'Clarify or deny assumptions and misunderstandings.',
      example: '嫌いなわけではない。("It’s not that I dislike it.")'
    },
    {
      title: '〜ように / 〜ために',
      description: 'Compare expressions for purpose and result.',
      example: '合格するために勉強する。("I study in order to pass.")'
    },
    {
      title: '〜ことになる / 〜ことにする',
      description: 'Learn how to express decisions and changes beyond one’s control.',
      example: '来月日本に行くことになりました。("It has been decided that I will go to Japan next month.")'
    },
    {
      title: '〜に違いない / 〜はずだ',
      description: 'Express high probability or expectation.',
      example: '彼は来るに違いない。("He must be coming.")'
    },
    {
      title: '〜つつある',
      description: 'Used to describe a continuing action or change.',
      example: '経済は回復しつつある。("The economy is gradually recovering.")'
    },
    {
      title: '〜にすぎない',
      description: 'Expresses limitation or modesty.',
      example: '私は学生にすぎません。("I am nothing more than a student.")'
    },
    {
      title: '〜かねる',
      description: 'A formal way to say something is difficult to do.',
      example: '申し訳ありませんが、それにはお答えしかねます。("I’m sorry, but I can’t answer that.")'
    },
    {
      title: '〜ざるを得ない',
      description: 'Means "cannot help but..." or "have no choice but to...".',
      example: '行かざるを得ない。("I have no choice but to go.")'
    },
    {
      title: '〜というものだ',
      description: 'Used to express a natural or expected conclusion or opinion.',
      example: '努力せずに成功を望むのは無理というものだ。("It’s unreasonable to expect success without effort.")'
    },
    {
      title: '〜わけがない',
      description: 'Used to strongly deny something.',
      example: '彼がそんなことをするわけがない。("There’s no way he would do such a thing.")'
    },
    {
      title: '〜にかかわらず',
      description: 'Means "regardless of" or "despite".',
      example: '天候にかかわらず、試合は行われます。("The match will be held regardless of the weather.")'
    },
    {
      title: '〜とは限らない',
      description: 'Used to express that something is not always true.',
      example: '高いものが必ずしも良いとは限らない。("Expensive things are not always good.")'
    },
    {
      title: '〜ないことはない',
      description: 'Used to express something is possible, though not ideal.',
      example: '食べないことはないが、あまり好きじゃない。("I can eat it, but I don’t really like it.")'
    },
    {
      title: '〜まい',
      description: 'Used to express strong negation or determination not to do something.',
      example: 'もう二度と行くまい。("I will never go again.")'
    }
  ];
  

  const handleOpenModal = (item: { title: string; example: string }) => {
    setSelectedGrammar(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedGrammar(null);
  };

  const speakGrammar = (item: { title: string; example: string }) => {
    Speech.speak(`${item.title}. ${item.example}`, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {grammarTopics.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleOpenModal(item)}>
            <Text style={[styles.cardText, { color: theme.text }]}>{item.description}</Text>
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
            {selectedGrammar && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedGrammar.title}</Text>
                <Text style={[styles.exampleText, { color: theme.text }]}>{selectedGrammar.example}</Text>
                <TouchableOpacity onPress={() => speakGrammar(selectedGrammar)}>
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
    borderColor: 'orange', // Updated border color
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
  exampleText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});