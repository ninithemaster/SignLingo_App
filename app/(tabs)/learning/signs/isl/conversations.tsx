import { View, Text, StyleSheet, ScrollView, ViewStyle, TextStyle, Linking, TouchableOpacity } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';

type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
  section: ViewStyle;
  title: TextStyle;
  content: TextStyle;
  videoBox: ViewStyle;
  linkButton: ViewStyle;
  linkText: TextStyle;
  lessonHeader: ViewStyle;
  levelText: TextStyle;
};

type VideoLesson = {
  title: string;
  url: string | string[];
  level: string;
};

export default function ConversationsScreen() {
  const { theme } = useAppTheme();

  const videoLessons: VideoLesson[] = [
    {
        title: "Alphabets in ISL",
        url: "https://youtu.be/qcdivQfA41Y?si=VTs5uJlS_L-7LNij",
        level: "Beginner"
      },
      {
        title: "Numbers",
        url: "https://youtu.be/vnH2BmcSRMA?si=J2Lj2JyBrmZrqmmo",
        level: "Beginner",
      },
    {
      title: "Basic Greetings in ISL",
      url: ["https://youtu.be/0o2sIzE87hQ?si=7S9n-_bhD6X1Z_2d",
        "https://youtu.be/lffGJ29IhZQ?si=oi2nve0t_7umz-_2"
      ],
      level: "Beginner"
    },
    {
      title: "Sentence Formation",
      url: "https://youtu.be/LpLM-8Uj1Bc?si=mJv0tfMCQMsirnNR",
      level: "Beginner"
    },
    {
      title: "Daily Conversations",
      url: ["https://youtu.be/sLqdPipf1UM?si=zl7FuyOLkfJugZfo",
        "https://youtu.be/aOL-yBRQHmM?si=VMWNTWYNIrcoNqiH",
        "https://youtu.be/vN8WzD-ggsg?si=Ny-Azmpt_w09JewY"
      ],
      level: "Beginner"
    },
    {
      title: "Question Words",
      url: "https://youtu.be/DOFPRw6Epl0?si=ECA_y6l2rLrk6g1A",
      level: "Beginner"
    },
    {
      title: "Family and Relationships",
      url: "https://youtu.be/drs0_jcKr5w?si=D7AhaVPGjqOdKjpy",
      level: "Intermediate"
    },
    {
      title: "Food and Dining",
      url: [
        "https://youtu.be/9l3_FiRtyNo?si=f5cICfbv6tS6Zbe_",
        "https://youtu.be/73AslMUUwL0?si=4ocmTjE7XhZDepBI"
      ],
      level: "Intermediate"
    },
    {
      title: "Indian States",
      url: "https://youtu.be/t_FcV6VoEAw?si=2wTodb_Ihitop3zt",
      level: "Intermediate"
    },
  ];

  const openVideo = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.background }]}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Introduction Section */}
      <View style={[styles.section, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          🗣️ ISL Conversations
        </Text>
        <Text style={[styles.content, { color: theme.subtitle }]}>
          Learn practical Indian Sign Language through these curated video lessons. Each video focuses on different aspects of daily communication.
        </Text>
      </View>

      {/* Video Lessons */}
      {videoLessons.map((lesson, index) => (
        <View 
          key={index}
          style={[styles.videoBox, { backgroundColor: theme.cardBackground }]}
        >
          <View style={styles.lessonHeader}>
            <Text style={[styles.title, { color: theme.text, fontSize: 16 }]}>
              {lesson.title}
            </Text>
            <Text style={[styles.levelText, { color: theme.primary }]}>
              {lesson.level}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.linkButton, { backgroundColor: theme.primary }]}
            onPress={() => openVideo(Array.isArray(lesson.url) ? lesson.url[0] : lesson.url)}
          >
            <Ionicons name="logo-youtube" size={18} color="white" style={{ marginRight: 6 }} />
            <Text style={styles.linkText}>Watch Video</Text>
          </TouchableOpacity>
          
          {Array.isArray(lesson.url) && lesson.url.length > 1 && (
            <TouchableOpacity
              style={[styles.linkButton, { backgroundColor: theme.primary, marginTop: 6 }]}
              onPress={() => openVideo(lesson.url[1])}
            >
              <Ionicons name="logo-youtube" size={18} color="white" style={{ marginRight: 6 }} />
              <Text style={styles.linkText}>Watch Part 2</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
    paddingBottom: 20,
  },
  section: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  videoBox: {
    padding: 10,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  linkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
}); 