import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { Link, Href } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';

type Section = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: Href;
};

export default function ISLScreen() {
  const { theme } = useAppTheme();

  const sections: Section[] = [
    {
      title: 'Introduction',
      description: 'Learn about ISL history and basics',
      icon: 'book-outline',
      route: '/(tabs)/learning/signs/isl/introduction' as Href,
    },
    {
      title: 'Level 1: Basics',
      description: 'Start with fundamental ISL signs and concepts',
      icon: 'star-outline',
      route: '/(tabs)/learning/signs/isl/basic' as Href,
    },
    {
      title: 'Level 2: Grammar',
      description: 'Learn advanced ISL grammar concepts and classifiers',
      icon: 'school-outline',
      route: '/(tabs)/learning/signs/isl/level2' as Href,
    },
    {
      title: 'Video Lessons',
      description: 'Learn ISL through interactive video tutorials',
      icon: 'videocam-outline',
      route: '/(tabs)/learning/signs/isl/conversations' as Href,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section, index) => (
          <Animated.View
            key={index}
            entering={FadeIn.delay(index * 100)}
          >
            <Link href={section.route} asChild>
              <TouchableOpacity
                style={[styles.sectionCard, { backgroundColor: theme.cardBackground }]}
              >
                <View style={styles.sectionContent}>
                  <View style={[styles.iconContainer, { backgroundColor: theme.primary }]}>
                    <Ionicons name={section.icon} size={24} color="white" />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>
                      {section.title}
                    </Text>
                    <Text style={[styles.sectionDescription, { color: theme.subtitle }]}>
                      {section.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color={theme.text} />
                </View>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionCard: {
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
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
  },
}); 