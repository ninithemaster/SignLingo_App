import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';

export default function BasicGrammar() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGrammar, setSelectedGrammar] = useState<any>(null);

  const grammarConcepts = [
    {
      title: 'Sentence Structure (SOV)',
      content: 'Basic Japanese sentences follow Subject-Object-Verb order.',
      examples: [
        'わたしはりんごをたべます。 (Watashi wa ringo o tabemasu – I eat an apple)',
        'たなかさんはみずをのみます。 (Tanaka-san wa mizu o nomimasu – Mr. Tanaka drinks water)',
        'かれはにほんごをべんきょうします。 (Kare wa Nihongo o benkyou shimasu – He studies Japanese)'
      ]
    },
    {
      title: ' Particles',
      content: 'Particles define the grammatical function of words (は, を, に, で, へ, が).',
      examples: [
        'わたしはせんせいです。 (Watashi wa sensei desu – I am a teacher)',
        'がっこうにいきます。 (Gakkou ni ikimasu – I go to school)',
        'バスでいきます。 (Basu de ikimasu – I go by bus)'
      ]
    },
    {
      title: 'Desu and Masu Forms',
      content: 'Desu (です) and Masu (～ます) are used for polite speech.',
      example: 'これはほんです。 (Kore wa hon desu – This is a book)',
      example2: 'ごはんをたべます。 (Gohan o tabemasu – I eat rice)',
      example3: 'おちゃをのみます。 (Ocha o nomimasu – I drink tea)'
    },
    {
      title: 'Negative Forms',
      content: 'Basic present negative forms of verbs and nouns using ～ません and じゃありません.',
      example: 'たべません。 (Tabemasen – I do not eat)',
      example2: 'これはえんぴつじゃありません。 (Kore wa enpitsu ja arimasen – This is not a pencil)',
      example3: 'のみません。 (Nomimasen – I do not drink)'
    },
    {
      title: 'JQuestions with か',
      content: 'Use か at the end to form a question.',
      example: 'これはなんですか？ (Kore wa nan desu ka? – What is this?)',
      example2: 'あなたはがくせいですか？ (Anata wa gakusei desu ka? – Are you a student?)',
      example3: 'でんしゃでいきますか？ (Densha de ikimasu ka? – Will you go by train?)'
    },
    {
      title: 'Demonstratives (これ, それ, あれ, どれ)',
      content: 'Use これ, それ, あれ, どれ to indicate things based on proximity.',
      example: 'これはわたしのです。 (Kore wa watashi no desu – This is mine)',
      example2: 'それはなんですか？ (Sore wa nan desu ka? – What is that?)',
      example3: 'あれはがっこうです。 (Are wa gakkou desu – That (over there) is a school)'
    },
    {
      title: 'Adjectives (い and な)',
      content: 'Basic use of い-adjectives and な-adjectives.',
      example: 'このりんごはおいしいです。 (Kono ringo wa oishii desu – This apple is delicious)',
      example2: 'しずかなへやです。 (Shizuka na heya desu – It is a quiet room)',
      example3: 'きれいなはなです。 (Kirei na hana desu – It is a beautiful flower)'
    },
    {
      title: 'Counters and Numbers',
      content: 'Introduce basic counters like つ (general counter).',
      example: 'りんごをひとつください。 (Ringo o hitotsu kudasai – Please give me one apple)',
      example2: 'みっつあります。 (Mittsu arimasu – There are three)',
      example3: 'ふたつたのみました。 (Futatsu tanomimashita – I ordered two)'
    },
    {
      title: 'Time Expressions',
      content: 'Introduce telling time and days.',
      example: 'いまは９じです。 (Ima wa ku-ji desu – It is 9 o’clock now)',
      example2: 'きょうはげつようびです。 (Kyou wa getsuyoubi desu – Today is Monday)',
      example3: 'あしたはやすみです。 (Ashita wa yasumi desu – Tomorrow is a holiday)'
    },
  ];
  

  const handleOpenModal = (item: any) => {
    setSelectedGrammar(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakText = (text: string) => {
    Speech.speak(text, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}> Grammar</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {grammarConcepts.map((item, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: theme.cardBackground }]} onPress={() => handleOpenModal(item)}>
            <Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text>
            <Text style={[styles.cardContent, { color: theme.text }]}>{item.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedGrammar && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>{selectedGrammar.title}</Text>
              <Text style={[styles.modalText, { color: theme.text }]}>{selectedGrammar.content}</Text>
              <Text style={[styles.modalExamplesTitle, { color: theme.text }]}>Examples:</Text>
              {selectedGrammar.examples.map((example: string, index: number) => (
                <Text key={index} style={[styles.modalExample, { color: theme.text }]}>{example}</Text>
              ))}
              <TouchableOpacity onPress={() => speakText(selectedGrammar.content)}>
                <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCloseModal}>
                <Text style={[styles.closeButton, { color: theme.text }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 50,
  },
  card: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContent: {
    fontSize: 16,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalExamplesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalExample: {
    fontSize: 16,
    marginTop: 5,
  },
  speakButton: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
});