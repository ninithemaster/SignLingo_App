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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useAppTheme } from '@/hooks/useAppTheme';
import axios from 'axios';
const apiUrl  = process.env.EXPO_PUBLIC_API_URL;
// --- Placeholder Data ---
const CULTURAL_NEWS = {
  imageUrl: 'https://i.pinimg.com/736x/01/ce/b3/01ceb328e555e791cf5866dd2466fe1b.jpg',
  title: 'Indigenous Languages Matter!',
  snippet: `Over 40% of the world's languages are endangered. Indigenous communities use sign and spoken languages to pass down traditions and wisdom. Language is identity. Let's keep it alive.`,
};
// --- ---

export default function Home() {
  const { theme, isDarkMode } = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [signedIn, setSignedIn] = useState(false);
  const [timeSpent, setTimeSpent] = useState('0:00');
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const name = await SecureStore.getItemAsync('userName');
        if (token && name) {
          setSignedIn(true);
          setUserName(name);
          setUserId(name);
        } else {
          setSignedIn(false);
          setUserName('');
          setUserId(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setSignedIn(false);
        setUserName('There');
        setUserId(null);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    let timer;
    const initializeSession = async () => {
      if (signedIn) {
        await startTask('app_session', userId);
        timer = setInterval(updateTimeSpent, 60000);
      }
    };

    initializeSession();
    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (signedIn) {
        endTask('app_session', userId);
      }
    };
  }, [signedIn]);

  // Reset session at midnight
  useEffect(() => {
    if (signedIn) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow - now;

      const midnightReset = setTimeout(() => {
        endTask('app_session', userId);
        startTask('app_session', userId);
      }, timeUntilMidnight);

      return () => clearTimeout(midnightReset);
    }
  }, [signedIn]);

  const handleSignOut = async () => {
    try {
      setModalVisible(false);
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userName');
      await SecureStore.deleteItemAsync('userId');
      setSignedIn(false);
      setUserName('There');
      setUserId(null);
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

  const featureInfo = {
    learn: {
      title: "LearnIt",
      description: "Dive into the world of sign language and traditional language learning, enriched with cultural context, making every lesson an immersive experience.",
    },
    detect: {
      title: "Vision",
      description:"Leverage cutting-edge object detection with YOLO, enabling you to identify and analyze everyday objects, enhancing your learning experience beyond sign language.",
    },
    recognize: {
      title: "Gesture Go",
      description: "Unlock the power of sign language recognition with our advanced system, accurately detecting your gestures and helping you learn at your own pace.",
    }
  };

  const InfoModal = ({ isVisible, feature, onClose }) => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            {feature ? featureInfo[feature].title : ''}
          </Text>
          <Text style={[styles.modalDescription, { color: theme.subtitle }]}>
            {feature ? featureInfo[feature].description : ''}
          </Text>
          <TouchableOpacity
            style={[styles.modalButton, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );


  const startTask = async () => {
    if (!userId) {
      console.error("No user ID available");
      return;
    }
  
    try {
      const response = await axios.post(apiUrl + '/start-task', {
        task_name: 'app_session',
        user_id: userId
      });
  
      if (response.data) {
        setSessionStartTime(new Date());
        console.log("Task started successfully:", response.data);
      }
    } catch (error) {
      console.error("Error starting task:", error);
    }
  };
  
  const endTask = async () => {
    if (!userId) {
      console.error("No user ID available");
      return;
    }
  
    try {
      const response = await axios.post(apiUrl + '/end-task', {
        task_name: 'app_session',
        user_id: userId
      });
  
      if (response.data) {
        setSessionStartTime(null);
        console.log("Task ended successfully:", response.data);
      }
    } catch (error) {
      console.error("Error ending task:", error);
    }
  };
  
  // Update the midnight reset useEffect
  useEffect(() => {
    if (signedIn && userId) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow - now;
  
      const midnightReset = setTimeout(() => {
        endTask();
        startTask();
      }, timeUntilMidnight);
  
      return () => clearTimeout(midnightReset);
    }
  }, [signedIn, userId]);

  // Update the updateTimeSpent function
const getUserStatus = async (userId) => {
  try {
    const response = await axios.get(apiUrl + '/get-user-status', {
      params: { user_id: userId }
    });

    const { current_task, start_time, level, streak } = response.data;
    const localStartTime = new Date(start_time).toLocaleString();

    console.log(`Current Task: ${current_task}`);
    console.log(`Started at: ${localStartTime}`);
    console.log(`Streak: ${streak}, Level: ${level}`);
  } catch (error) {
    console.error('Error getting user status:', error);
  }
};
const checkUserStatus = async (userId) => {
  try {
    const response = await axios.get(`http://<your-backend-url>/get-user-status`, {
      params: { user_id: userId }
    });

    const { current_task, start_time, level, streak } = response.data;
    const localStartTime = new Date(start_time).toLocaleString();

    console.log(`Current Task: ${current_task}`);
    console.log(`Started at: ${localStartTime}`);
    console.log(`Streak: ${streak}, Level: ${level}`);
  } catch (error) {
    console.error('Error getting user status:', error);
  }
};


  const updateTimeSpent = async () => {
    if (!sessionStartTime) {
      await startTask('app_session', userId);
      return;
    }

    try {
      setIsUpdating(true);
      // Always calculate local time first
      const currentTime = new Date();
      const localDurationMinutes = Math.max(0, (currentTime - sessionStartTime) / (1000 * 60));
      setTimeSpent(formatTime(localDurationMinutes));
    } catch (error) {
      console.error('Error updating time:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatTime = (minutes) => {
    // Ensure minutes is a valid number and not negative
    if (isNaN(minutes) || minutes < 0) {
      return "0:00";
    }
    
    // Round to nearest minute
    minutes = Math.round(minutes);
    
    // Cap at 24 hours (1440 minutes)
    minutes = Math.min(minutes, 1440);
    
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return `${hours}:${mins.toString().padStart(2, '0')}`;
  };

  // Reset session at midnight
  useEffect(() => {
    if (signedIn) {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      const timeUntilMidnight = tomorrow - now;

      const midnightReset = setTimeout(() => {
        endSession();
        startSession();
      }, timeUntilMidnight);

      return () => clearTimeout(midnightReset);
    }
  }, [signedIn]);

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={theme.background} 
      />

      {/* Header */}
      <SafeAreaView style={{ backgroundColor: theme.background }}>
        <View style={[styles.headerWrapper, { backgroundColor: theme.background }]}>
          <View style={[styles.headerInnerContainer, { 
            backgroundColor: theme.headerBackground,
            borderColor: theme.border,
          }]}>
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerGreeting, { color: theme.text }]}>
                Hey there, {userName}!
              </Text>
              <Text style={[styles.headerSubtitle, { color: theme.subtitle }]}>
                One sign, one word, one step closer to connection.
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileIcon}>
              <Feather name="user" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Scrollable Content */}
      <ScrollView
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Features Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Our Features</Text>
        <View style={styles.featuresHorizontalContainer}>
          {/* Feature 1: Learn */}
          <TouchableOpacity 
            style={[styles.featureHorizontalItem, { backgroundColor: theme.cardBackground }]}
            onPress={() => setSelectedFeature('learn')}
          >
            <Feather name="book-open" size={24} color={theme.text} />
            <View style={styles.featureHorizontalText}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>Learn</Text>
              <Text style={[styles.featureSubtitle, { color: theme.subtitle }]}>LearnIt</Text>
            </View>
          </TouchableOpacity>

          {/* Feature 2: Detect */}
          <TouchableOpacity 
            style={[styles.featureHorizontalItem, { backgroundColor: theme.cardBackground }]}
            onPress={() => setSelectedFeature('detect')}
          >
            <Feather name="camera" size={24} color={theme.text} />
            <View style={styles.featureHorizontalText}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>Detection</Text>
              <Text style={[styles.featureSubtitle, { color: theme.subtitle }]}>Vision</Text>
            </View>
          </TouchableOpacity>

          {/* Feature 3: Recognize */}
          <TouchableOpacity 
            style={[styles.featureHorizontalItem, { backgroundColor: theme.cardBackground }]}
            onPress={() => setSelectedFeature('recognize')}
          >
            <Feather name="zap" size={24} color={theme.text} />
            <View style={styles.featureHorizontalText}>
              <Text style={[styles.featureTitle, { color: theme.text }]}>Recognize</Text>
              <Text style={[styles.featureSubtitle, { color: theme.subtitle }]}>Gesture Go</Text>
            </View>
          </TouchableOpacity>

          <InfoModal 
            isVisible={selectedFeature !== null}
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        </View>

        {/* Time Tracker Card */}
        {signedIn && (
          <View style={[styles.trackerCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.trackerContent}>
              <View style={styles.timerContainer}>
                <Feather name="clock" size={20} color={theme.text} />
                <Text style={[styles.timerText, { color: theme.text }]}>
                  {isUpdating ? 'Updating...' : `Time spent today: ${timeSpent}`}
                </Text>
              </View>
              {isUpdating && <ActivityIndicator size="small" color={theme.primary} style={styles.trackerLoader} />}
            </View>
          </View>
        )}

        {/* Cultural News Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Cultural Spotlight</Text>
        <View style={[styles.newsCard, { 
          backgroundColor: theme.cardBackground, 
          borderColor: theme.border 
        }]}>
          <Image
            source={{ uri: CULTURAL_NEWS.imageUrl }}
            style={styles.newsImage}
            resizeMode="cover"
          />
          <View style={styles.newsTextContainer}>
            <Text style={[styles.newsTitle, { color: theme.text }]}>
              {CULTURAL_NEWS.title}
            </Text>
            <Text style={[styles.newsSnippet, { color: theme.subtitle }]}>
              {CULTURAL_NEWS.snippet}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
         <Pressable 
           style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]} 
           onPress={() => setModalVisible(false)}
         >
           <Pressable 
             style={[styles.modalContent, { 
               backgroundColor: theme.cardBackground,
               borderColor: theme.border,
             }]} 
             onPress={() => {}}
           >
             <TouchableOpacity 
               style={styles.profileRow} 
               onPress={() => handleModalNavigation('/profile')}
             >
               <Feather name="user" size={20} color={theme.text}/>
               <Text style={[styles.optionText, { color: theme.text }]}>View Profile</Text>
             </TouchableOpacity>
             <TouchableOpacity 
               style={styles.profileRow} 
               onPress={() => handleModalNavigation('/settings')}
             >
               <Feather name="settings" size={20} color={theme.text}/>
               <Text style={[styles.optionText, { color: theme.text }]}>Settings</Text>
             </TouchableOpacity>
             <View style={[styles.menuDivider, { backgroundColor: theme.border }]} />
             <TouchableOpacity 
               style={styles.profileRow} 
               onPress={handleSignOut}
             >
               <Feather name="log-out" size={20} color={theme.danger}/>
               <Text style={[styles.optionText, { color: theme.danger }]}>Sign Out</Text>
             </TouchableOpacity>
           </Pressable>
         </Pressable>
      </Modal>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  profileIcon: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Add extra padding at bottom for tab bar
  },
  featuresHorizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginHorizontal: -5,
  },
  featureHorizontalItem: {
    flex: 1,
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
  },
  featureHorizontalText: {
    marginTop: 10,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    marginTop: 20,
  },
  trackerCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  trackerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  trackerLoader: {
    marginLeft: 8,
  },
  newsCard: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 200,
  },
  newsTextContainer: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  newsSnippet: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    gap: 15,
  },
  optionText: {
    fontSize: 16,
  },
  menuDivider: {
    height: 1,
    marginVertical: 10,
  },
});


