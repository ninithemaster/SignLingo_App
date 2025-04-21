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

export default function ASLIntroScreen() {
  const { theme } = useAppTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.contentContainer}
    >
      {/* What is ASL Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          ✨ What is ASL?
        </Text>
        <Image
          source={require('@/assets/images/asl/intro/Asl Invite GIF.gif')}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.content, { color: theme.subtitle }]}>
          ASL (American Sign Language) is a complete, natural language used by the Deaf and Hard of Hearing community in the United States and parts of Canada.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          It uses hand shapes, facial expressions, body movements, and gestures instead of spoken words.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          ASL is not universal – other countries have their own sign languages (e.g., BSL for British Sign Language, ISL for Indian Sign Language).
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          It's a visual language with its own grammar and syntax, separate from English.
        </Text>
        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8, fontStyle: 'italic' }]}>
          💡 Fun Fact: ASL is the 3rd most commonly used language in the U.S. after English and Spanish!
        </Text>
      </View>

      {/* Basic ASL Grammar Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🧠 Basic ASL Grammar and Structure
        </Text>
        <Text style={[styles.content, { color: theme.subtitle }]}>
          ASL doesn't follow English grammar rules. Here's how it's different and structured:
        </Text>
        <Image
          source={require('@/assets/images/asl/intro/hello.png')}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Hello Example */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Basic Greeting - "Hello"
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            In ASL, wave your hand near your head with your palm facing outward.
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontStyle: 'italic', marginTop: 8 }]}>
            Note: Eye contact and a friendly expression are important parts of the greeting!
          </Text>
        </View>

        {/* Word Order Example */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Word Order - "Topic-Comment"
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>I am going to the store.</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ASL: <Text style={{ color: theme.text }}>STORE I GO.</Text>
          </Text>
        </View>

        {/* Facial Expressions Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Facial Expressions = Grammar
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Raising your eyebrows can indicate a <Text style={{ color: theme.text }}>yes/no question</Text>.
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Lowering your eyebrows can indicate a <Text style={{ color: theme.text }}>WH-question</Text> (what, where, when, etc.).
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            Facial expressions also show <Text style={{ color: theme.text }}>emotion</Text>, <Text style={{ color: theme.text }}>tone</Text>, and <Text style={{ color: theme.text }}>emphasis</Text>.
          </Text>
        </View>

        {/* No Linking Words Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ No Linking Words
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            ASL doesn't use small linking words like <Text style={{ color: theme.text }}>"am"</Text>, <Text style={{ color: theme.text }}>"is"</Text>, <Text style={{ color: theme.text }}>"are"</Text>.
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            English: <Text style={{ color: theme.text }}>She is happy.</Text>
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, fontWeight: 'bold', marginTop: 8 }]}>
            ASL: <Text style={{ color: theme.text }}>SHE HAPPY.</Text>
          </Text>
        </View>

        {/* Use of Space Section */}
        <View style={styles.exampleBox}>
          <Text style={[styles.content, { color: theme.subtitle }]}>
            ✅ Use of Space
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            ASL uses space in front of the signer to represent <Text style={{ color: theme.text }}>people</Text>, <Text style={{ color: theme.text }}>objects</Text>, or <Text style={{ color: theme.text }}>locations</Text>.
          </Text>
          <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
            You might "set up" people to your left and right and refer to them using <Text style={{ color: theme.text }}>pointing</Text> (called <Text style={{ color: theme.text }}>indexing</Text>).
          </Text>
        </View>

        <Text style={[styles.content, { color: theme.subtitle, marginTop: 8 }]}>
          Today, ASL is recognized as a distinct language with its own grammar, syntax, and cultural context, used by millions of people across North America.
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
