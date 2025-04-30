import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal,Dimensions,ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image } from 'expo-image';
type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  image: ImageStyle;
  exampleBox: ViewStyle;
}; 
type Section = {
  title: string;
  items: Array<{
    name: string;
    image: any; // We'll add actual image imports
  }>;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function BasicsScreen() {
  const { theme } = useAppTheme();
  const [selectedItem, setSelectedItem] = useState<{ name: string; image: any } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const sections: Section[] = [
    {
      title: "Alphabet",
      icon: "text-outline",
      items: [
        { 
          name: "Letters A through Z",
          image: require('../../../../../assets/images/isl/basic/alphabets.jpg')
        }
      ]
    },
    {
      title: "Numbers",
      icon: "calculator-outline",
      items: [
        {
          name: "Numbers 0-9",
          image: require('../../../../../assets/images/isl/basic/no.jpg')
        },
        {
          name: "Age expressions",
          image: require('../../../../../assets/images/isl/basic/age.png')
        },
        {
          name: "Time expressions",
          image: require('../../../../../assets/images/isl/basic/time.png')
        }
      ]
    },
    {
      title: "Basic Greetings & Phrases",
      icon: "hand-left-outline",
      items: [
        { name: "Hello", image: require('../../../../../assets/images/isl/basic/Hello.jpg') },
        { name: "Thank you", image: require('../../../../../assets/images/isl/basic/thankyou.jpg') },
        { name: "Sorry", image: require('../../../../../assets/images/isl/basic/sorry.jpg') },
        { name: "Please", image: require('../../../../../assets/images/isl/basic/please.png') },
        { name: "How are you?", image: require('../../../../../assets/images/isl/basic/how.gif') }
      ]
    },
    {
      title: "Pronouns",
      icon: "people-outline",
      items: [
        { 
          name: "Pronouns (I, You, He/She, We, They)",
          image: require('../../../../../assets/images/isl/basic/pronoun.jpg')
        }
      ]
    },
    {
      title: "Simple Questions",
      icon: "help-circle-outline",
      items: [
        {
          name: "Question Words (What, Where, Who, When, Why, How)",
          image: require('../../../../../assets/images/isl/basic/question.jpg')
        }
      ]
    }
  ];
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={[styles.header, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.levelBadge}>
          <Ionicons name="star-outline" size={20} color={theme.text} />
          <Text style={[styles.levelText, { color: theme.text }]}>Level 1</Text>
        </View>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Basics & Everyday Use
        </Text>
      </View>

      {sections.map((section, index) => (
        <View 
          key={index}
          style={[styles.section, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.sectionHeader}>
            <Ionicons name={section.icon} size={24} color={theme.text} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>
          </View>
          <View style={styles.itemsContainer}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity 
                key={itemIndex}
                style={[styles.item, { borderBottomColor: theme.border }]}
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <Text style={[styles.itemText, { color: theme.subtitle }]}>
                  {item.name}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.text} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                {selectedItem?.name}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
            {selectedItem?.image && (
              <Image
                source={selectedItem.image}
                style={styles.modalImage}
                contentFit="contain" // Updated prop
              />
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    borderRadius: 15,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  itemsContainer: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
});