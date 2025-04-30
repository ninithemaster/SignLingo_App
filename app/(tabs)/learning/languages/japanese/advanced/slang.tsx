import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function SlangScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlang, setSelectedSlang] = useState<{ title: string; description: string; examples: { sentence: string; translation: string }[] } | null>(null);

  const slangList = [
    {
      title: 'やばい (Yabai)',
      description: 'Can mean dangerous, amazing, or awful depending on context.',
      examples: [
        { sentence: 'この映画、やばかった！', translation: 'This movie was amazing!' },
        { sentence: 'あの人、やばいことしてる！', translation: 'That person is doing something dangerous!' }
      ]
    },
    { title: 'ウザい (Uzai)', description: 'Annoying or bothersome.',
      examples: [
        { sentence: '彼、ウザいんだけど。', translation: 'He’s so annoying.' },
        { sentence: 'ウザくて、もう耐えられない。', translation: 'It’s so annoying, I can’t stand it anymore.' }
      ]
    },
    { title: 'ムカつく (Mukatsuku)', description: 'To be irritated or angry.',
      examples: [
        { sentence: 'あの人の態度、ムカつく！', translation: 'That person’s attitude pisses me off!' },
        { sentence: 'それを聞いて、ムカついた。', translation: 'I got really angry after hearing that.' }
      ]
    },
    { title: 'キモい (Kimoi)', description: 'Gross or creepy.',
      examples: [
        { sentence: 'あの虫、キモい！', translation: 'That bug is gross!' },
        { sentence: 'あの人、キモいね。', translation: 'That person is creepy.' }
      ]
    },
    { title: 'ダサい (Dasai)', description: 'Uncool or unfashionable.',
      examples: [
        { sentence: 'その服、ダサいね。', translation: 'That outfit is so uncool.' },
        { sentence: 'あのデザイン、ダサくない？', translation: 'Isn’t that design out of style?' }
      ]
    },
    { title: 'バカ (Baka)', description: 'Fool, idiot (can be used playfully or offensively).',
      examples: [
        { sentence: 'お前、バカか？', translation: 'Are you an idiot?' },
        { sentence: 'バカみたいに笑わないで。', translation: 'Don’t laugh like a fool.' }
      ]
    },
    { title: 'マジ (Maji)', description: 'Seriously or really.',
      examples: [
        { sentence: 'マジで？', translation: 'Seriously?' },
        { sentence: 'あの試合、マジで面白かった！', translation: 'That match was seriously fun!' }
      ]
    },
    { title: 'イケメン (Ikemen)', description: 'A good-looking guy, a handsome man.',
      examples: [
        { sentence: 'あの人、イケメンだね！', translation: 'That guy is so handsome!' },
        { sentence: 'イケメンが歩いてる！', translation: 'A handsome guy is walking by!' }
      ]
    },
    { title: 'お疲れ様 (Otsukaresama)', description: 'Used to show appreciation for someone’s effort, typically after work or a task.',
      examples: [
        { sentence: 'お疲れ様でした！', translation: 'Thank you for your hard work!' },
        { sentence: '今日もお疲れ様！', translation: 'Good job today!' }
      ]
    },
    { title: 'だるい (Darui)', description: 'Feeling sluggish, tired, or lazy.',
      examples: [
        { sentence: '今日はだるいな。', translation: 'I feel sluggish today.' },
        { sentence: 'だるくて、何もしたくない。', translation: 'I feel lazy and don’t want to do anything.' }
      ]
    },
    { title: 'うるさい (Urusai)', description: 'Noisy, annoying (can be used for both people and sounds).',
      examples: [
        { sentence: 'うるさいな、静かにして！', translation: 'You’re so noisy, be quiet!' },
        { sentence: 'あの音、うるさいよ。', translation: 'That sound is so annoying.' }
      ]
    },
    { title: 'すごい (Sugoi)', description: 'Amazing, great.',
      examples: [
        { sentence: 'この料理、すごい！', translation: 'This food is amazing!' },
        { sentence: '彼はすごい選手だよ。', translation: 'He is an amazing player.' }
      ]
    },
    { title: 'ノリノリ (Norinori)', description: 'Excited, in a good mood, having fun.',
      examples: [
        { sentence: 'みんなノリノリだね！', translation: 'Everyone’s in a great mood!' },
        { sentence: 'ノリノリでダンスしてる！', translation: 'They’re dancing like crazy!' }
      ]
    },
    { title: 'ワンチャン (Wanchan)', description: 'Shortened version of “one chance,” meaning a slim chance or possibility.',
      examples: [
        { sentence: 'ワンチャンで成功するかもしれない。', translation: 'There’s a slim chance we might succeed.' },
        { sentence: 'ワンチャン勝てるかも。', translation: 'We might win, just maybe.' }
      ]
    },
    { title: 'チル (Chill)', description: 'To relax or take it easy, often used in casual conversation.',
      examples: [
        { sentence: '今日はチルしたい気分。', translation: 'I feel like chilling today.' },
        { sentence: 'ちょっとチルしてから行こう。', translation: 'Let’s chill for a bit before going.' }
      ]
    }
  ];
  

  const handleOpenModal = (item: { title: string; description: string; examples: { sentence: string; translation: string }[] }) => {
    setSelectedSlang(item);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {slangList.map((item, index) => (
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            {selectedSlang && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedSlang.title}</Text>
                <Text style={[styles.descriptionText, { color: theme.text }]}>{selectedSlang.description}</Text>
                {selectedSlang.examples.map((example, index) => (
                  <View key={index} style={styles.exampleContainer}>
                    <Text style={[styles.exampleText, { color: theme.text }]}>{example.sentence}</Text>
                    <Text style={[styles.translationText, { color: theme.text }]}>{example.translation}</Text>
                    <TouchableOpacity onPress={() => Speech.speak(example.sentence)}>
                      <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
    borderColor: 'blue', // Updated border color to blue
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
  exampleContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  exampleText: {
    fontSize: 18,
    textAlign: 'center',
  },
  translationText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  speakButton: {
    fontSize: 18,
    marginTop: 5,
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