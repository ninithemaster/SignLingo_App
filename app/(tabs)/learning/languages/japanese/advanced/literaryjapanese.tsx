import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function LiteraryJapaneseScreen() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLiterary, setSelectedLiterary] = useState<{ title: string; description: string; example: string } | null>(null);

  const literaryList = [
    { 
      title: '古典文学 (Classical Literature)', 
      description: 'Explore classical Japanese literature, including works like "The Tale of Genji" and "The Pillow Book."', 
      example: 'Example: 『源氏物語』(The Tale of Genji) is often regarded as the greatest work of classical Japanese literature.' 
    },
    { 
      title: '和歌 (Waka)', 
      description: 'Traditional Japanese poetry, consisting of 5-7-5-7-7 syllables, expressing deep emotions or observations of nature.', 
      example: 'Example: "春の夜 夢のごとし さくら花" ("A spring night, like a dream, the cherry blossoms bloom.")' 
    },
    { 
      title: '俳句 (Haiku)', 
      description: 'Short form poetry with a 5-7-5 syllable pattern, often focused on nature, seasons, and moments of insight.', 
      example: 'Example: "古池や 蛙飛びこむ 水の音" ("An old pond, a frog jumps in, the sound of water.") - Matsuo Basho' 
    },
    { 
      title: '物語 (Monogatari)', 
      description: 'Narrative tales and stories, often filled with themes of love, loss, and the human condition. Examples include "Genji Monogatari" (The Tale of Genji) and "The Tale of the Heike."', 
      example: 'Example: "竹取物語" ("The Tale of the Bamboo Cutter") is one of Japan’s oldest narrative works.' 
    },
    { 
      title: '随筆 (Zuihitsu)', 
      description: 'Essays and miscellaneous writings, often reflective and personal, such as those written in the Heian period.', 
      example: 'Example: "枕草子" ("The Pillow Book") by Sei Shonagon is a famous example of zuihitsu, offering insights into court life.' 
    },
    { 
      title: '浮世絵 (Ukiyo-e)', 
      description: 'Woodblock prints and paintings, often illustrating the pleasures of the "floating world" (ukiyo), including beautiful women, kabuki actors, and landscapes.', 
      example: 'Example: "神奈川沖浪裏" ("The Great Wave off Kanagawa") by Katsushika Hokusai is one of the most famous ukiyo-e prints.' 
    },
    { 
      title: '連歌 (Renga)', 
      description: 'Collaborative linked verse poetry, where multiple poets work together to create a series of stanzas, alternating between 5-7-5 and 7-7 syllables.', 
      example: 'Example: In "renga" poetry, one poet might start with a 5-7-5 stanza and another poet adds a 7-7 stanza, weaving together a collective story.' 
    },
    { 
      title: '俳諧 (Haikai)', 
      description: 'A form of comedic or light-hearted poetry, often characterized by playful language and puns. It is the predecessor to modern haiku.', 
      example: 'Example: "俳諧" poems often include humor and satire, offering a playful commentary on society.' 
    },
    { 
      title: '漢詩 (Kan-shi)', 
      description: 'Chinese-style poetry written in classical Chinese, often used by Japanese poets to express philosophical or scholarly thoughts.', 
      example: 'Example: Many Japanese poets in the Edo period wrote kan-shi, influenced by the classical Chinese poets.' 
    },
    { 
      title: '詩 (Shi)', 
      description: 'Poetry, including works in both classical and modern styles, often conveying emotions, ideals, or philosophies.', 
      example: 'Example: "詩" is the broader term for poetry, and it encompasses both waka and haiku as well as more modern forms.' 
    },
    { 
      title: '仮名草子 (Kana-zōshi)', 
      description: 'Prose works written in kana (syllabary), often for a mass audience during the early Edo period.', 
      example: 'Example: "浮世草子" ("Ukiyo-zōshi") was a popular genre of kana-zōshi that depicted the lives of common people.' 
    },
    { 
      title: '歌舞伎 (Kabuki)', 
      description: 'A traditional Japanese theater form featuring song, dance, and drama. It became a major form of entertainment in the Edo period.', 
      example: 'Example: Kabuki plays, such as "忠臣蔵" ("Chūshingura"), dramatize historical events or legends with lavish performances.' 
    },
    { 
      title: '能 (Noh)', 
      description: 'A classical Japanese dance-drama combining music, dance, and acting, known for its solemn and minimalist style.', 
      example: 'Example: Noh performances often depict tragic stories, such as the play "道成寺" ("Dōjōji") about a vengeful woman.' 
    },
    { 
      title: '説話 (Setsuwa)', 
      description: 'A genre of oral tales, including folk tales, moral stories, and supernatural events. These stories often had a didactic purpose.', 
      example: 'Example: "竹取物語" ("The Tale of the Bamboo Cutter") is an early example of setsuwa, blending folklore and fantasy.' 
    }
];
  const handleOpenModal = (item: { title: string; description: string; example: string }) => {
    setSelectedLiterary(item);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedLiterary(null);
  };

  const speakLiterary = (item: { title: string; description: string; example: string }) => {
    Speech.speak(`${item.title}. ${item.description}. ${item.example}`, { language: 'ja' });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {literaryList.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.card, { backgroundColor: theme.cardBackground }]} 
            onPress={() => handleOpenModal(item)}
          >
            <Text style={[{ fontSize: 20, fontWeight: 'bold' }, { color: theme.text }]}>{item.title}</Text> {/* Show title only */}
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
            {selectedLiterary && (
              <>
                <Text style={[styles.modalText, { color: theme.text }]}>{selectedLiterary.title}</Text>
                <Text style={[styles.descriptionText, { color: theme.text }]}>{selectedLiterary.description}</Text>
                <Text style={[{ fontSize: 16, marginVertical: 10, fontStyle: 'italic' }, { color: theme.text }]}>{selectedLiterary.example}</Text>
                <TouchableOpacity onPress={() => speakLiterary(selectedLiterary)}>
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
    borderColor: 'violet', // Updated border color
    width: '90%',
  },
  descriptionText: {
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