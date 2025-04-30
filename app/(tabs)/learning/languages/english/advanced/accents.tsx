import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';

export default function EnglishAccents() {
  const { theme } = useAppTheme();

  const sections = [
    {
      title: 'British English',
      videos: [
        { title: 'British Accent Basics', url: 'https://youtu.be/0BU_u8_blss?si=Bmge35yJNPst-iPY' },
        { title: 'RP English Pronunciation', url: 'https://youtu.be/PcIX-U5w5Ws?si=CKjg8S7qR6k-Hiio' }
      ]
    },
    {
      title: 'American English',
      videos: [
        { title: 'General American Accent', url: 'https://youtu.be/FMWnR5ubIb4?si=IvNU5enGkU-46EXB' },
        { title: 'American Pronunciation', url: 'https://youtu.be/lA5fMN0tCs8?si=rCh3ZTLCtZJFzrjx' }
      ]
    },
    {
      title: 'Australian English',
      videos: [
        { title: 'Australian Accent Guide', url: 'https://youtu.be/rggpfagZgmQ?si=PByidFZTBWpktEFo' },
        { title: 'Aussie Pronunciation', url: 'https://youtu.be/0U8s17H58w4?si=AC3W9GeSO93fU8El' }
      ]
    }
  ];

  const openVideo = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.pageTitle, { color: theme.text }]}>English Accents</Text>
      
      {sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>{section.title}</Text>
          {section.videos.map((video, videoIndex) => (
            <TouchableOpacity
              key={videoIndex}
              style={[styles.videoCard, { backgroundColor: theme.cardBackground }]}
              onPress={() => openVideo(video.url)}
            >
              <Ionicons name="logo-youtube" size={24} color="red" />
              <Text style={[styles.videoText, { color: theme.text }]}>
                {video.title}
              </Text>
              <Ionicons name="open-outline" size={20} color={theme.text} />
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  videoText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
    marginRight: 8,
  }
});