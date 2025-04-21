import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';

type Section = {
  title: string;
  items: string[];
  icon: keyof typeof Ionicons.glyphMap;
};

export default function BasicsScreen() {
  const { theme } = useAppTheme();

  const sections: Section[] = [
    {
      title: "Alphabet",
      icon: "text-outline",
      items: ["Letters A through Z"]
    },
    {
      title: "Numbers",
      icon: "calculator-outline",
      items: ["Numbers 0-20", "Age and time expressions"]
    },
    {
      title: "Basic Greetings & Phrases",
      icon: "hand-left-outline",
      items: ["Hello", "Thank you", "Sorry", "Please", "How are you?"]
    },
    {
      title: "Pronouns",
      icon: "people-outline",
      items: ["I", "You", "He/She", "We", "They"]
    },
    {
      title: "Simple Questions",
      icon: "help-circle-outline",
      items: ["What", "Where", "Who", "When", "Why", "How"]
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
              >
                <Text style={[styles.itemText, { color: theme.subtitle }]}>
                  {item}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={theme.text} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
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
}); 