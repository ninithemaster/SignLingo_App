import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useTheme } from '@/constants/ThemeContext';
import Colors from '@/constants/Colors';

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

export default function Settings() {
  const [notifications, setNotifications] = React.useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = isDarkMode ? Colors.dark : Colors.light;
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState({ title: '', content: '' });

  const handleBack = () => {
    router.back();
  };

  const handleDeleteProfile = () => {
    Alert.alert(
      "Delete Profile",
      "Are you sure you want to delete your profile? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync('userToken');
              await SecureStore.deleteItemAsync('userName');
              router.replace('/sign-in');
            } catch (error) {
              Alert.alert("Error", "Failed to delete profile. Please try again.");
            }
          }
        }
      ]
    );
  };

  const showModal = (type) => {
    switch (type) {
      case 'privacy':
        setModalContent({
          title: 'Privacy Policy',
          content: `At SignLingo, your privacy matters. Here's a brief overview of how we handle your data:

1. Data Collection
- We collect only the information necessary for core app functionality.
- This includes your learning progress, preferences, and device details to optimize performance.
2. Data Usage
- Enhance and personalize your learning experience.
- Tailor content and recommendations.
- Improve app stability and performance.
3. Data Protection
- Your data is protected using industry-standard encryption.
- Stored securely with regular security updates to maintain safety.
4. Your Rights
- You have full control over your data — access, delete, or opt-out of analytics anytime.
- Your data is securely stored with encryption and regular security updates.
5. Contact Us
📧 Email: signlingo@gmail.com

We never share your personal information with third parties without your consent.`
        });
        break;
      case 'terms':
        setModalContent({
          title: 'Terms of Service',
          content: `Welcome to SignLingo! By using our app, you agree to these terms:

1. User Agreement
- Users must be 13 or older, provide accurate details, and keep their accounts secure.
2. Acceptable Use
- SignLingo is for personal, non-commercial use only. Unauthorized access and infringement of intellectual property are prohibited.
3. Content
- All content is for educational use and protected by copyright. Reproduction without permission is not allowed.
4. Account Terms
- Each user may hold one account and is responsible for its activity. Violations may result in termination.
5. Modifications
- Terms may change, and continued use indicates acceptance of any updates.
We reserve the right to update these terms at any time without prior notice.`
        });
        break;
      case 'version':
        setModalContent({
          title: 'Version Information',
          content: `SignLingo v1.0.0

Current Features:
- Interactive language and sign language learning modules with cultural context
- Object detection powered by YOLO
- Gesture recognition for sign interpretation
- User progress tracking
- Light and Dark theme support
- Push notifications for learning reminders and updates

Recent Updates:
- Initial release with core language and sign language learning modules
- Integrated cultural insights into language learning
- Enhanced UI/UX for better user experience

© 2025 SignLingo. All rights reserved.`
        });
        break;
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Notifications</Text>
          <View style={[styles.card, { 
            backgroundColor: theme.cardBackground,
            borderColor: theme.border
          }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.text }]}>Push Notifications</Text>
                <Text style={[styles.settingSubtitle, { color: theme.subtitle }]}>
                  Receive learning reminders and updates
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#D1D1D6', true: theme.feature }}
                ios_backgroundColor="#D1D1D6"
              />
            </View>
          </View>
        </View>

        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Appearance</Text>
          <View style={[styles.card, { 
            backgroundColor: theme.cardBackground,
            borderColor: theme.border
          }]}>
            <View style={styles.settingItem}>
              <View style={styles.settingTextContainer}>
                <Text style={[styles.settingTitle, { color: theme.text }]}>Dark Mode</Text>
                <Text style={[styles.settingSubtitle, { color: theme.subtitle }]}>
                  Switch to dark theme
                </Text>
              </View>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#D1D1D6', true: theme.feature }}
                ios_backgroundColor="#D1D1D6"
              />
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>About</Text>
          <View style={[styles.card, { 
            backgroundColor: theme.cardBackground,
            borderColor: theme.border
          }]}>
            <TouchableOpacity 
              style={[styles.linkItem, { borderColor: theme.border }]}
              onPress={() => showModal('privacy')}
            >
              <Text style={[styles.linkText, { color: theme.text }]}>Privacy Policy</Text>
              <Feather name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity 
              style={[styles.linkItem, { borderColor: theme.border }]}
              onPress={() => showModal('terms')}
            >
              <Text style={[styles.linkText, { color: theme.text }]}>Terms of Service</Text>
              <Feather name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity 
              style={[styles.linkItem, { borderColor: theme.border }]}
              onPress={() => showModal('version')}
            >
              <Text style={[styles.linkText, { color: theme.text }]}>Version 1.0.0</Text>
              <Feather name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delete Profile Section */}
        <View style={styles.deleteSection}>
          <TouchableOpacity 
            style={[styles.deleteButton, { borderColor: theme.danger }]}
            onPress={handleDeleteProfile}
          >
            <View style={[styles.deleteCard, { backgroundColor: theme.cardBackground }]}>
              <View style={[styles.deleteButtonContent, { borderColor: theme.danger }]}>
                <Feather name="trash-2" size={20} color={theme.danger} />
                <Text style={[styles.deleteButtonText, { color: theme.danger }]}>Delete Profile</Text>
              </View>
              <Text style={[styles.deleteButtonSubtext, { color: theme.subtitle }]}>
                This action cannot be undone
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Information Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
            <View 
              style={[styles.modalContent, { 
                backgroundColor: theme.cardBackground,
                borderColor: theme.border,
              }]}
            >
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  {modalContent.title}
                </Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Feather name="x" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <ScrollView 
                style={styles.modalScrollView}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator={true}
                bounces={true}
              >
                <Text style={[styles.modalText, { color: theme.text }]}>
                  {modalContent.content}
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginLeft: 5,
    fontFamily: FONT_MEDIUM,
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  card: {
    borderRadius: 15,
    borderWidth: 2,
    padding: 15,
    transform: [{ scale: 1 }],
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: FONT_MEDIUM,
    letterSpacing: 0.2,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  linkItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  divider: {
    height: 1,
  },
  linkText: {
    fontSize: 16,
    fontFamily: FONT_MEDIUM,
    letterSpacing: 0.2,
  },
  deleteSection: {
    marginTop: 30,
    marginBottom: 20,
  },
  deleteButton: {
    borderWidth: 2.5,
    borderRadius: 15,
    padding: 15,
  },
  deleteCard: {
    borderRadius: 15,
    padding: 15,
  },
  deleteButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deleteButtonText: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: FONT_BOLD,
    letterSpacing: 0.3,
  },
  deleteButtonSubtext: {
    fontSize: 14,
    marginLeft: 30,
    fontFamily: FONT_REGULAR,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    borderRadius: 15,
    borderWidth: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FONT_BOLD,
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  modalScrollView: {
    maxHeight: '100%',
  },
  modalScrollContent: {
    padding: 20,
    paddingTop: 15,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_REGULAR,
  },
}); 
