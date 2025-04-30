import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native'; // Import Image component
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech'; // Import Expo Speech

export default function AlphabetBasics() {
  const { theme } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAlphabets, setSelectedAlphabets] = useState<{ text: string; example: string }[]>([]);

  const handleOpenModal = (alphabetType: string) => {
    if (alphabetType.toLowerCase() in japaneseAlphabets) {
      const alphabets = japaneseAlphabets[alphabetType.toLowerCase() as keyof typeof japaneseAlphabets];
      setSelectedAlphabets(alphabets);
      setModalVisible(true);
    } else {
      console.error(`Alphabet type "${alphabetType}" not found.`);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const speakExample = (example: string) => {
    Speech.speak(example, { language: 'ja' }); // Use Expo Speech to speak the example in Japanese
  };

  const japaneseAlphabets = {
    hiragana: [
      { text: 'あ', example: 'あさ (Asa - Morning)' },
      { text: 'い', example: 'いぬ (Inu - Dog)' },
      { text: 'う', example: 'うみ (Umi - Sea)' },
      { text: 'え', example: 'えき (Eki - Station)' },
      { text: 'お', example: 'おかね (Okane - Money)' },
      { text: 'か', example: 'かさ (Kasa - Umbrella)' },
      { text: 'き', example: 'きれい (Kirei - Beautiful)' },
      { text: 'く', example: 'くるま (Kuruma - Car)' },
      { text: 'け', example: 'けむり (Kemuri - Smoke)' },
      { text: 'こ', example: 'こども (Kodomo - Child)' },
      { text: 'さ', example: 'さくら (Sakura - Cherry Blossom)' },
      { text: 'し', example: 'しろ (Shiro - White)' },
      { text: 'す', example: 'すし (Sushi)' },
      { text: 'せ', example: 'せんせい (Sensei - Teacher)' },
      { text: 'そ', example: 'そら (Sora - Sky)' },
      { text: 'た', example: 'たまご (Tamago - Egg)' },
      { text: 'ち', example: 'ちず (Chizu - Map)' },
      { text: 'つ', example: 'つき (Tsuki - Moon)' },
      { text: 'て', example: 'てんき (Tenki - Weather)' },
      { text: 'と', example: 'とり (Tori - Bird)' },
      { text: 'な', example: 'なつ (Natsu - Summer)' },
      { text: 'に', example: 'にんぎょう (Ningyou - Doll)' },
      { text: 'ぬ', example: 'ぬの (Nuno - Cloth)' },
      { text: 'ね', example: 'ねこ (Neko - Cat)' },
      { text: 'の', example: 'のり (Nori - Seaweed)' },
      { text: 'は', example: 'はな (Hana - Flower)' },
      { text: 'ひ', example: 'ひまわり (Himawari - Sunflower)' },
      { text: 'ふ', example: 'ふく (Fuku - Clothes)' },
      { text: 'へ', example: 'へや (Heya - Room)' },
      { text: 'ほ', example: 'ほし (Hoshi - Star)' },
      { text: 'ま', example: 'まど (Mado - Window)' },
      { text: 'み', example: 'みず (Mizu - Water)' },
      { text: 'む', example: 'むし (Mushi - Insect)' },
      { text: 'め', example: 'めがね (Megane - Glasses)' },
      { text: 'も', example: 'もも (Momo - Peach)' },
      { text: 'や', example: 'やま (Yama - Mountain)' },
      { text: 'ゆ', example: 'ゆき (Yuki - Snow)' },
      { text: 'よ', example: 'よる (Yoru - Night)' },
      { text: 'ら', example: 'らいおん (Raion - Lion)' },
      { text: 'り', example: 'りんご (Ringo - Apple)' },
      { text: 'る', example: 'るす (Rusu - Absence)' },
      { text: 'れ', example: 'れい (Rei - Example)' },
      { text: 'ろ', example: 'ろうか (Rōka - Corridor)' },
      { text: 'わ', example: 'わたし (Watashi - I)' },
      { text: 'を', example: 'をしえる (Oshieru - To teach)' },
      { text: 'ん', example: 'さん (San - Three)' }
    ],
    katakana: [
      { text: 'ア', example: 'アメリカ (Amerika - America)' },
      { text: 'イ', example: 'イギリス (Igirisu - UK)' },
      { text: 'ウ', example: 'ウイルス (Uirusu - Virus)' },
      { text: 'エ', example: 'エレベーター (Erebētā - Elevator)' },
      { text: 'オ', example: 'オレンジ (Orenji - Orange)' },
      { text: 'カ', example: 'カメラ (Kamera - Camera)' },
      { text: 'キ', example: 'キス (Kisu - Kiss)' },
      { text: 'ク', example: 'クラス (Kurasu - Class)' },
      { text: 'ケ', example: 'ケーキ (Kēki - Cake)' },
      { text: 'コ', example: 'コーヒー (Kōhī - Coffee)' },
      { text: 'サ', example: 'サラダ (Sarada - Salad)' },
      { text: 'シ', example: 'シャワー (Shawā - Shower)' },
      { text: 'ス', example: 'スカート (Sukāto - Skirt)' },
      { text: 'セ', example: 'セーター (Sētā - Sweater)' },
      { text: 'ソ', example: 'ソファ (Sofa)' },
      { text: 'タ', example: 'タクシー (Takushī - Taxi)' },
      { text: 'チ', example: 'チーズ (Chīzu - Cheese)' },
      { text: 'ツ', example: 'ツアー (Tsūā - Tour)' },
      { text: 'テ', example: 'テーブル (Tēburu - Table)' },
      { text: 'ト', example: 'トマト (Tomato - Tomato)' },
      { text: 'ナ', example: 'ナイフ (Naifu - Knife)' },
      { text: 'ニ', example: 'ニンジン (Ninjin - Carrot)' },
      { text: 'ヌ', example: 'ヌードル (Nūdoru - Noodles)' },
      { text: 'ネ', example: 'ネコ (Neko - Cat)' },
      { text: 'ノ', example: 'ノート (Nōto - Notebook)' },
      { text: 'ハ', example: 'ハンバーガー (Hanbāgā - Hamburger)' },
      { text: 'ヒ', example: 'ヒョウ (Hyō - Leopard)' },
      { text: 'フ', example: 'フルーツ (Furūtsu - Fruits)' },
      { text: 'ヘ', example: 'ヘリコプター (Herikoputā - Helicopter)' },
      { text: 'ホ', example: 'ホテル (Hoteru - Hotel)' },
      { text: 'マ', example: 'マスク (Masuku - Mask)' },
      { text: 'ミ', example: 'ミルク (Miruku - Milk)' },
      { text: 'ム', example: 'ムービー (Mūbī - Movie)' },
      { text: 'メ', example: 'メモ (Memo - Memo)' },
      { text: 'モ', example: 'モンスター (Monsutā - Monster)' },
      { text: 'ヤ', example: 'ヤク (Yaku - Role)' },
      { text: 'ユ', example: 'ユニフォーム (Yunifōmu - Uniform)' },
      { text: 'ヨ', example: 'ヨガ (Yoga)' },
      { text: 'ラ', example: 'ラーメン (Rāmen - Ramen)' },
      { text: 'リ', example: 'リボン (Ribon - Ribbon)' },
      { text: 'ル', example: 'ルビー (Rubī - Ruby)' },
      { text: 'レ', example: 'レモン (Remon - Lemon)' },
      { text: 'ロ', example: 'ロボット (Robotto - Robot)' },
      { text: 'ワ', example: 'ワイン (Wain - Wine)' },
      { text: 'ヲ', example: 'ヲタク (Otaku - Geek)' },
      { text: 'ン', example: 'サン (San - Three)' }
    ],
    romaji: [
      { text: 'a', example: 'ありがとう (Arigatou - Thank you)' },
      { text: 'i', example: 'いぬ (Inu - Dog)' },
      { text: 'u', example: 'うみ (Umi - Sea)' },
      { text: 'e', example: 'えき (Eki - Station)' },
      { text: 'o', example: 'おかね (Okane - Money)' },
      { text: 'ka', example: 'かさ (Kasa - Umbrella)' },
      { text: 'ki', example: 'きれい (Kirei - Beautiful)' },
      { text: 'ku', example: 'くるま (Kuruma - Car)' },
      { text: 'ke', example: 'けむり (Kemuri - Smoke)' },
      { text: 'ko', example: 'こども (Kodomo - Child)' },
      { text: 'sa', example: 'さくら (Sakura - Cherry Blossom)' },
      { text: 'shi', example: 'しろ (Shiro - White)' },
      { text: 'su', example: 'すし (Sushi)' },
      { text: 'se', example: 'せんせい (Sensei - Teacher)' },
      { text: 'so', example: 'そら (Sora - Sky)' },
      { text: 'ta', example: 'たまご (Tamago - Egg)' },
      { text: 'chi', example: 'ちず (Chizu - Map)' },
      { text: 'tsu', example: 'つき (Tsuki - Moon)' },
      { text: 'te', example: 'てんき (Tenki - Weather)' },
      { text: 'to', example: 'とり (Tori - Bird)' },
      { text: 'na', example: 'なつ (Natsu - Summer)' },
      { text: 'ni', example: 'にんぎょう (Ningyou - Doll)' },
      { text: 'nu', example: 'ぬの (Nuno - Cloth)' },
      { text: 'ne', example: 'ねこ (Neko - Cat)' },
      { text: 'no', example: 'のり (Nori - Seaweed)' },
      { text: 'ha', example: 'はな (Hana - Flower)' },
      { text: 'hi', example: 'ひまわり (Himawari - Sunflower)' },
      { text: 'fu', example: 'ふく (Fuku - Clothes)' },
      { text: 'he', example: 'へや (Heya - Room)' },
      { text: 'ho', example: 'ほし (Hoshi - Star)' },
      { text: 'ma', example: 'まど (Mado - Window)' },
      { text: 'mi', example: 'みず (Mizu - Water)' },
      { text: 'mu', example: 'むし (Mushi - Insect)' },
      { text: 'me', example: 'めがね (Megane - Glasses)' },
      { text: 'mo', example: 'もも (Momo - Peach)' },
      { text: 'ya', example: 'やま (Yama - Mountain)' },
      { text: 'yu', example: 'ゆき (Yuki - Snow)' },
      { text: 'yo', example: 'よる (Yoru - Night)' },
      { text: 'ra', example: 'らいおん (Raion - Lion)' },
      { text: 'ri', example: 'りんご (Ringo - Apple)' },
      { text: 'る', example: 'るす (Rusu - Absence)' },
      { text: 'れ', example: 'れい (Rei - Example)' },
      { text: 'ro', example: 'ろうか (Rōka - Corridor)' },
      { text: 'wa', example: 'わたし (Watashi - I)' },
      { text: 'wo', example: 'をしえる (Oshieru - To teach)' },
      { text: 'n', example: 'さん (San - Three)' }
    ]
  };
  

  
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={require('@/assets/images/japanese/japanesealpha.jpeg')} style={styles.headerImage} />
      <Text style={[styles.title, { color: theme.text }]}>Japanese Alphabet Basics</Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>Select an Alphabet to Learn More</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleOpenModal('Hiragana')}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Hiragana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOpenModal('Katakana')}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Katakana</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleOpenModal('Romaji')}>
          <Text style={[styles.buttonText, { color: theme.text }]}>Romaji</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              {selectedAlphabets.map((alphabet, index) => (
                <View key={index} style={styles.alphabetContainer}>
                  <Text style={[styles.modalText, { color: theme.text }]}>{alphabet.text}</Text>
                  <Text style={[styles.modalExample, { color: theme.subtitle }]}>{alphabet.example}</Text>
                  <TouchableOpacity onPress={() => speakExample(alphabet.example)}>
                    <Text style={[styles.speakButton, { color: theme.text }]}>Speak</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerImage: {
    width: '100%', // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain', // Ensure the image fits within the space
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 15, // Increased padding for better spacing
    borderRadius: 10, // Rounded corners for a softer look
    shadowColor: '#000', // Added shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Elevation for Android shadow
    borderWidth: 1, // Added border
    borderColor: '#ccc', // Light border color
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold', // Bold text for emphasis
    textAlign: 'center', // Centered text
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    maxHeight: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scrollContainer: {
    paddingVertical: 10,
    paddingBottom: 60,
  },
  alphabetContainer: {
    marginBottom: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 5,
  },
  modalExample: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  speakButton: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
});