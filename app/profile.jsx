import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput, // Import TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';

// Font style constants
const FONT_REGULAR = Platform.select({
  ios: 'Avenir-Book',
  android: 'sans-serif',
});

const FONT_MEDIUM = Platform.select({
  ios: 'Avenir-Medium',
  android: 'sans-serif-medium',
});

const FONT_BOLD = Platform.select({
  ios: 'Avenir-Heavy',
  android: 'sans-serif-bold',
});

export default function Profile() {
  const { theme } = useAppTheme();
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    joinDate: '',
    learningStreak: 5,
    totalTimeSpent: '10.00',
    level: 'Beginner',
    progress: 15,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const name = await SecureStore.getItemAsync('userName');
      const email = await SecureStore.getItemAsync('userEmail');
      const joinDate = await SecureStore.getItemAsync('userJoinDate') || new Date().toISOString();
      
      setUserInfo(prev => ({
        ...prev,
        name: name || 'User',
        email: email || 'email@example.com',
        joinDate: new Date(joinDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
      }));
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const handleNameChange = async () => {
    try {
      await SecureStore.setItemAsync('userName', newName);
      setUserInfo(prev => ({ ...prev, name: newName }));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error updating name:', error);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const StatCard = ({ icon, title, value }) => (
    <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
      <Feather name={icon} size={24} color={theme.text} style={styles.statIcon} />
      <View>
        <Text style={[styles.statTitle, { color: theme.subtitle }]}>{title}</Text>
        <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.cardBackground }]}>
            <Feather name="user" size={40} color={theme.text} />
          </View>
          <View style={styles.nameContainer}>
            <Text style={[styles.userName, { color: theme.text }]}>{userInfo.name}</Text>
          </View>
          <Text style={[styles.userEmail, { color: theme.subtitle }]}>{userInfo.email}</Text>
          <Text style={[styles.joinDate, { color: theme.subtitle }]}>
            Joined {userInfo.joinDate}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <StatCard 
              icon="clock" 
              title="Learning Time" 
              value={userInfo.totalTimeSpent} 
            />
            <StatCard 
              icon="trending-up" 
              title="Current Streak" 
              value={`${userInfo.learningStreak} days`} 
            />
          </View>
          <View style={styles.statsRow}>
            <StatCard 
              icon="award" 
              title="Level" 
              value={userInfo.level} 
            />
            <StatCard 
              icon="bar-chart-2" 
              title="Progress" 
              value={`${userInfo.progress}%`} 
            />
          </View>
        </View>

        {/* Learning Journey */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Learning Journey</Text>
          <View style={[styles.journeyCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.journeyItem}>
              <Feather name="book-open" size={20} color={theme.text} />
              <Text style={[styles.journeyText, { color: theme.text }]}>
                ASL Basics Completed
              </Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.journeyItem}>
              <Feather name="check-circle" size={20} color={theme.text} />
              <Text style={[styles.journeyText, { color: theme.text }]}>
                Numbers & Alphabet Mastered
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 24,
    fontFamily: FONT_BOLD,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: FONT_REGULAR,
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
  },
  statsContainer: {
    marginBottom: 30,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statIcon: {
    marginRight: 12,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: FONT_REGULAR,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontFamily: FONT_BOLD,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: FONT_MEDIUM,
    marginBottom: 12,
    marginLeft: 6,
  },
  journeyCard: {
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  journeyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  journeyText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
  },
  divider: {
    height: 1,
    marginVertical: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  editIcon: {
    marginLeft: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
  },
});