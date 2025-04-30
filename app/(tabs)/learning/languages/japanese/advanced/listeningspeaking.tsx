import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function ListeningSpeakingScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{ title: string; description: string; example: string } | null>(null);

  const listeningSpeakingList = [
    {
      title: 'ディベート (Debate)',
      description: 'Debating in Japanese involves using formal language, argumentation techniques, and the ability to express complex opinions. Listening practice can include listening to debates and analyzing argumentative structures.',
      example: 'Example: "経済についてのディベートでは、企業の利益が個人の福祉にどう影響するかを議論します。" (In a debate about the economy, the discussion focuses on how corporate profits affect individual welfare.)',
    },
    {
      title: 'フォーマルスピーチ (Formal Speech)',
      description: 'Formal speech delivery in Japanese includes mastering polite language, structure, and tone. Listening to speeches from leaders or professionals can provide a sense of how to structure formal arguments.',
      example: 'Example: "皆様、本日はお忙しい中お集まりいただき、誠にありがとうございます。" (Ladies and gentlemen, thank you very much for gathering today despite your busy schedules.)',
    },
    {
      title: 'プレゼンテーション (Presentation)',
      description: 'Presentations in Japanese require clarity, visual aid use, and the appropriate level of formality. You will need to practice speaking clearly while using formal language when necessary.',
      example: 'Example: "こちらのグラフをご覧ください。売上は昨年に比べて15%増加しました。" (Please look at this graph. Sales have increased by 15% compared to last year.)',
    },
    {
      title: 'インタビュー (Interview)',
      description: 'In interviews, both listening and speaking are essential for answering questions clearly and responding appropriately. The ability to listen to detailed questions and give well-structured answers is crucial.',
      example: 'Example: "この仕事に応募した理由を教えてください。" (Please tell us why you applied for this job.)',
    },
    {
      title: 'ディスカッション (Discussion)',
      description: 'Engaging in discussions requires active listening, quick thinking, and responding appropriately. Practice discussing various topics, such as technology, culture, or current events, in Japanese.',
      example: 'Example: "今後のエネルギー問題についてどう思いますか？" (What do you think about future energy issues?)',
    },
    {
      title: 'ニュース分析 (News Analysis)',
      description: 'Listening to news broadcasts in Japanese is an excellent way to practice formal listening and improve vocabulary on current events. News analysis can help you understand how professionals speak about complex issues.',
      example: 'Example: "最近の経済動向に関するニュースでは、政府の政策が取り上げられています。" (In the latest news about economic trends, government policies are being discussed.)',
    },
    {
      title: 'ラジオ番組 (Radio Shows)',
      description: 'Listening to Japanese radio shows helps you improve your ability to understand different speech styles, including informal speech and local dialects. Many radio programs also feature guest interviews or debates.',
      example: 'Example: "今日は特別ゲストとして、著名な作家が登場します。" (Today, a famous author will appear as a special guest.)',
    },
    {
      title: '映画のセリフ (Movie Dialogues)',
      description: 'Listening to movie dialogues can help you improve informal speech patterns and cultural nuances. Analyzing how characters interact gives insight into natural conversation in Japanese.',
      example: 'Example: "なんでそんなことをしたんだよ！" (Why did you do something like that?)',
    },
    {
      title: '日常会話 (Daily Conversation)',
      description: 'Everyday conversations in Japanese are essential for fluency. This includes asking for directions, ordering food, and making small talk. Practice casual speech with native speakers or language partners.',
      example: 'Example: "今日はどこかに行きますか？" (Are you going anywhere today?)',
    },
    {
      title: 'ビジネス会話 (Business Conversation)',
      description: 'In a business setting, learning proper etiquette and speech patterns is key. Practice polite phrases, scheduling meetings, or discussing products in a professional context.',
      example: 'Example: "会議の日時を再確認させていただけますか？" (May I confirm the date and time of the meeting?)',
    },
  ];
  

  const handleOpenModal = (item: { title: string; description: string; example: string }) => {
    setSelectedTopic(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTopic(null);
  };

  const speakExample = (example: string) => {
    Speech.speak(example, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {listeningSpeakingList.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: theme.cardBackground }]} 
            onPress={() => handleOpenModal(item)}
          >
            <Text style={[styles.cardText, { color: theme.text }]}>{item.title}</Text> {/* Ensure title is wrapped */}
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
            {selectedTopic && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedTopic.title}</Text>
                <Text style={[styles.descriptionText, { color: theme.text }]}>{selectedTopic.description}</Text>
                <Text style={[styles.exampleText, { color: theme.text }]}>{selectedTopic.example}</Text>
                <TouchableOpacity onPress={() => speakExample(selectedTopic.example)}>
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
    borderWidth: 1,
    borderColor: 'pink', // Updated border color to pink
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