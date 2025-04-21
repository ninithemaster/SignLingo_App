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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.headerWrapper, { backgroundColor: theme.background }]}>
        <View style={[styles.headerInnerContainer, { 
          backgroundColor: theme.headerBackground,
          borderColor: theme.border
        }]}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>Settings</Text>
          <View style={styles.rightPlaceholder} />
        </View>
      </View>

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
            <TouchableOpacity style={[styles.linkItem, { borderColor: theme.border }]}>
              <Text style={[styles.linkText, { color: theme.text }]}>Privacy Policy</Text>
              <Feather name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity style={[styles.linkItem, { borderColor: theme.border }]}>
              <Text style={[styles.linkText, { color: theme.text }]}>Terms of Service</Text>
              <Feather name="chevron-right" size={20} color={theme.text} />
            </TouchableOpacity>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <TouchableOpacity style={[styles.linkItem, { borderColor: theme.border }]}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    fontFamily: FONT_BOLD,
    letterSpacing: 0.5,
  },
  rightPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  section: {
    marginTop: 20,
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
}); 