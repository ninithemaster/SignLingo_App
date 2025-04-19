import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity, // Keep for Modal items
  Alert,
  Modal,
  Pressable,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

// --- Placeholder Data ---
const CULTURAL_NEWS = {
  imageUrl: 'https://i.pinimg.com/736x/01/ce/b3/01ceb328e555e791cf5866dd2466fe1b.jpg',
  title: 'Indigenous Languages Matter!',
  snippet: 'Over 40% of the world’s languages are endangered. Indigenous communities use sign and spoken languages to pass down traditions and wisdom. Language is identity. Let’s keep it alive.',
};
// --- ---

// --- Color Palette (Sky Blue & Beige) ---
const COLOR_BEIGE = '#F5EFEB'; // Light Beige
const COLOR_SKY_BLUE = '#C8D9E6'; // Sky Blue Header Background (Original - Not used for header bg anymore)
const COLOR_DARK_TEXT_ON_BLUE = '#34495E'; // Dark Gray/Blue text for contrast on Sky Blue Header (Original)
const COLOR_SUBTLE_TEXT_ON_BLUE = '#5D7A8D'; // Slightly lighter dark blue/gray for Header Subtitle (Original)
const COLOR_ICON_ON_BLUE = '#343A40'; // Dark Icon for Header (Original)
const COLOR_DARK_TEXT_ON_BEIGE = '#4E4644'; // Darker text derived from beige/brown tones for general text
const COLOR_SUBTLE_BORDER_ON_BEIGE = '#EDE7E4'; // Border derived from beige background
const COLOR_PLACEHOLDER_ON_BEIGE = '#EAE4E1'; // Placeholder derived from beige
const COLOR_FEATURE_BLUE = '#87A6BB'; // A medium blue for feature cards
const COLOR_TEXT_ON_FEATURE_BLUE = '#FFFFFF'; // White text for feature cards
const COLOR_ICON_ON_FEATURE_BLUE = '#2C3E50'; // Dark icon for contrast on the feature blue
const COLOR_HEADER_BACKGROUND = '#FFFFFF'; // White header background
const COLOR_HEADER_TEXT = '#333333'; // Dark text for white header
const COLOR_HEADER_SUBTEXT = '#555555'; // Slightly lighter text for white header
const COLOR_HEADER_ICON = '#333333'; // Dark icon for white header
const COLOR_NEWS_BACKGROUND = '#87A6BB';
const COLOR_NEWS_TEXT = COLOR_TEXT_ON_FEATURE_BLUE;

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('There');
  const [signedIn, setSignedIn] = useState(false);
  const [timeSpent, setTimeSpent] = useState('7m 10s');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const name = await SecureStore.getItemAsync('userName');
        if (token && name) {
          setSignedIn(true);
          setUserName(name);
        } else {
          setSignedIn(false);
          setUserName('There');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSignedIn(false);
        setUserName('There');
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      setModalVisible(false);
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userName');
      setSignedIn(false);
      setUserName('There');
      router.replace('/sign-in');
    } catch (error) {
      console.error("Failed to sign out:", error);
      Alert.alert("Error", "Could not sign out. Please try again.");
    }
  };

  const handleModalNavigation = (route) => {
    setModalVisible(false);
    if (route) {
      router.push(route);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLOR_BEIGE} translucent={false} />

      {/* Header */}
      <View style={styles.headerWrapper}>
        {/* headerInnerContainer style is updated below */}
        <View style={styles.headerInnerContainer}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerGreeting}>Hey there, {userName}!</Text>
            <Text style={styles.headerSubtitle}>
              One sign, one word, one step closer to connection.
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileIcon}>
            <Feather name="user" size={28} color={COLOR_HEADER_ICON} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
           <Pressable style={styles.modalContent} onPress={() => {}}>
             <TouchableOpacity style={styles.profileRow} onPress={() => handleModalNavigation('/profile')}>
               <Feather name="user" size={20} color="#555"/>
               <Text style={styles.optionText}>View Profile</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.profileRow} onPress={() => handleModalNavigation('/settings')}>
               <Feather name="settings" size={20} color="#555"/>
               <Text style={styles.optionText}>Settings</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.profileRow} onPress={() => handleModalNavigation('/my-progress')}>
               <Feather name="trending-up" size={20} color="#555"/>
               <Text style={styles.optionText}>My Progress</Text>
             </TouchableOpacity>
             <View style={styles.menuDivider} />
             <TouchableOpacity style={styles.profileRow} onPress={handleSignOut}>
               <Feather name="log-out" size={20} color="#e74c3c"/>
               <Text style={[styles.optionText, styles.signOutText]}>Sign Out</Text>
             </TouchableOpacity>
           </Pressable>
         </Pressable>
      </Modal>

      {/* Main Content ScrollView */}
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Features Section - Horizontal Layout */}
        <Text style={styles.sectionTitle}>Our Features</Text>
        <View style={styles.featuresHorizontalContainer}>
          {/* Feature 1: Learn */}
          <View style={styles.featureHorizontalItem}>
            <Feather name="book-open" size={30} color={COLOR_ICON_ON_FEATURE_BLUE} />
            <View style={styles.featureHorizontalText}>
                <Text style={styles.featureTitle}>Learn </Text>
                <Text style={styles.featureSubtitle}>LearnIt</Text>
            </View>
          </View>
          {/* Feature 2: Detect */}
          <View style={styles.featureHorizontalItem}>
            <Feather name="camera" size={30} color={COLOR_ICON_ON_FEATURE_BLUE} />
            <View style={styles.featureHorizontalText}>
                <Text style={styles.featureTitle}>Detection</Text>
                <Text style={styles.featureSubtitle}>Visionn</Text>
            </View>
          </View>
          {/* Feature 3: Recognize */}
          <View style={styles.featureHorizontalItem}>
            <Feather name="zap" size={30} color={COLOR_ICON_ON_FEATURE_BLUE} />
            <View style={styles.featureHorizontalText}>
                <Text style={styles.featureTitle}>Recognize</Text>
                <Text style={styles.featureSubtitle}>Gesture Go</Text>
            </View>
          </View>
        </View>

        {/* Time Tracker Card */}
         {signedIn && (
            <View style={styles.trackerCard}>
                <Feather name="clock" size={20} color="#5D7A8D" style={styles.trackerIcon} />
                <Text style={styles.trackerText}>Time Spent Today: </Text>
                <Text style={styles.trackerTime}>{timeSpent}</Text>
            </View>
         )}

        {/* Cultural News Section */}
        <Text style={styles.sectionTitle}>Cultural Spotlight</Text>
        <View style={styles.newsCard}>
          <Image
            source={{ uri: CULTURAL_NEWS.imageUrl }}
            style={styles.newsImage}
            resizeMode="cover"
          />
          <View style={styles.newsTextContainer}>
             <Text style={styles.newsTitle}>{CULTURAL_NEWS.title}</Text>
             <Text style={styles.newsSnippet}>{CULTURAL_NEWS.snippet}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLOR_BEIGE,
  },
  // --- Header ---
  headerWrapper: {
    paddingTop: 10,
    paddingHorizontal: 15, // Add padding here to contain the inner box margin
    backgroundColor: COLOR_BEIGE,
    paddingBottom: 10, // Add padding bottom
  },
  headerInnerContainer: {
    backgroundColor: COLOR_HEADER_BACKGROUND, // White background
    paddingHorizontal: 20, // Inner padding
    paddingVertical: 20,   // Inner padding vertical
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', // Align items vertically center
    borderRadius: 15, // Apply rounding to all corners << CHANGED
    // Remove specific bottom radii
    // borderBottomLeftRadius: 30, << REMOVED
    // borderBottomRightRadius: 30, << REMOVED
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    // Remove marginHorizontal and marginTop if wrapper has padding
    // marginHorizontal: 5, << REMOVED
    // marginTop: 0, << REMOVED
  },
  headerTextContainer: {
    flex: 1, // Take available space
    marginRight: 15, // Space between text and icon
  },
  headerGreeting: {
    fontSize: 30,
    fontWeight: '600',
    color: COLOR_HEADER_TEXT,
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLOR_HEADER_SUBTEXT,
    lineHeight: 20,
  },
  profileIcon: {
    // Removed marginTop as alignItems: 'center' handles vertical position
    padding: 5, // Keep touchable area reasonable
  },

  // --- Modal Styles --- (Keep as is)
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#E0D8D6',
    marginVertical: 10,
  },
  signOutText: {
    color: '#e74c3c',
    fontWeight: '500',
  },

  // --- ScrollView Content --- (Keep as is)
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: COLOR_BEIGE,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLOR_DARK_TEXT_ON_BEIGE,
    marginBottom: 15,
    marginTop: 5,
  },
  // --- Features Section - Horizontal Style --- (Keep as is)
  featuresHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginHorizontal: -5,
  },
  featureHorizontalItem: {
    flex: 1,
    backgroundColor: COLOR_FEATURE_BLUE,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    flexDirection: 'column',
  },
  featureHorizontalText: {
    marginTop: 10,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLOR_TEXT_ON_FEATURE_BLUE, // White text
    textAlign: 'center',
    marginBottom: 3,
  },
  featureSubtitle: {
    fontSize: 11,
    color: COLOR_TEXT_ON_FEATURE_BLUE, // White text
    textAlign: 'center',
  },

  // --- Tracker Card --- (Keep as is)
  trackerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR_SUBTLE_BORDER_ON_BEIGE,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  trackerIcon: {
      marginRight: 12,
      color: '#5D7A8D',
  },
  trackerText: {
      fontSize: 15,
      fontWeight: '500',
      color: COLOR_DARK_TEXT_ON_BEIGE,
  },
  trackerTime: {
      fontSize: 15,
      fontWeight: 'bold',
      color: COLOR_DARK_TEXT_ON_BEIGE,
  },

  // --- Cultural News Section --- (Keep as is)
  newsCard: {
    backgroundColor: COLOR_NEWS_BACKGROUND,
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 160,
  },
  newsTextContainer: {
      padding: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR_NEWS_TEXT,
    marginBottom: 8,
  },
  newsSnippet: {
    fontSize: 14,
    color: COLOR_NEWS_TEXT,
    lineHeight: 20,
    opacity: 0.9,
  },
});