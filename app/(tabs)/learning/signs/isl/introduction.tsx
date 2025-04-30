import { View, Text, StyleSheet, ScrollView, Image, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';

type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  image: ImageStyle;
  exampleBox: ViewStyle;
};

export default function ISLIntroScreen() {
  const { theme } = useAppTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.contentContainer}
    >
      {/* What is ISL Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🇮🇳 What is ISL?
        </Text>
        <Image
          source={require('@/assets/images/isl/isl.png')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.content, { color: theme.subtitle }]}>
          ISL (Indian Sign Language) is the visual language used by the Deaf community in India.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          It uses hand gestures, facial expressions, and body movements to convey meaning instead of spoken words.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          ISL is a distinct language with its own grammar and sentence structure – it's not a signed version of any spoken language.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          Every country has its own sign language, like ASL (USA), BSL (UK), and ISL (India).
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8, fontStyle: 'italic' }]}>
          💡 Fun Fact: India officially recognized ISL in 2020 and launched the Indian Sign Language Dictionary to promote its use!
        </Text>
      </View>

      {/* Basic ISL Grammar Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          ✏️ Basic ISL Grammar and Structure
        </Text>
        <Text style={[styles.content, { color: theme.subtitle }]}>
          ISL does not follow English grammar. It has its own natural structure:
        </Text>
        <Image
          source={require('@/assets/images/isl/intro.png')}
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* Hello Example */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Basic Greeting - "Hello"
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            In ISL, wave your hand near your head with an open palm to say "Hello".
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontStyle: 'italic', marginTop: 8 }]}>
            Expression matters! Smile and make eye contact when greeting.
          </Text>
        </View>

        {/* Word Order Example */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Word Order - "Object-Subject-Verb" (OSV)
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>I eat apple.</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ISL: <Text style={{ color: theme.text }}>Apple I eat.</Text>
          </Text>
        </View>

        {/* Facial Expressions Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Facial Expressions = Meaning
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Raising eyebrows shows a yes/no question, while frowning shows a WH-question (what, when, where, etc.).
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Expressions also help show feelings like anger, happiness, surprise, etc.
          </Text>
        </View>

        {/* No Articles Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ No Articles like "a", "an", "the"
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>The girl is dancing.</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ISL: <Text style={{ color: theme.text }}>Girl dance.</Text>
          </Text>
        </View>

        {/* Use of Space Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Use of Space
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            ISL uses physical space around the signer to refer to people or places. You can point to your left or right to refer back to someone or something.
          </Text>
        </View>

        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          ISL continues to grow in recognition and importance as a native language of the Indian Deaf community.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 64,
  },
  section: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginTop: 0,
    marginBottom: 16,
    alignSelf: 'center',
    aspectRatio: 1,
    objectFit: 'contain',
  },
  exampleBox: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
});
