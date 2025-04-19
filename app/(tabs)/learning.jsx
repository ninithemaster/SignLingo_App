import React from 'react'; // No need for useState yet
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LearningScreen() {

  // Basic handlers for button presses (you'll replace these later)
  const handleSignsPress = () => {
    console.log("Signs button pressed");
    // Add navigation or state update logic here
  };

  const handleLanguagePress = () => {
    console.log("Language button pressed");
    // Add navigation or state update logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Existing Title and Description */}
        <Text style={styles.title}>Learn Sign Language</Text>
        <Text style={styles.description}>
          Explore interactive lessons and practice your sign language skills at your own pace.
        </Text>

        {/* Container for the new buttons */}
        <View style={styles.buttonContainer}>
          {/* Signs Button */}
          <TouchableOpacity style={styles.button} onPress={handleSignsPress}>
            <Text style={styles.buttonText}>Express in Signs</Text>
          </TouchableOpacity>

          {/* Language Button */}
          <TouchableOpacity style={styles.button} onPress={handleLanguagePress}>
            <Text style={styles.buttonText}>Speak the Language</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Slightly off-white background
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center', // Center items horizontally
    // justifyContent: 'center', // Remove this to align content top-down
    paddingTop: 50, // Add some padding at the top
  },
  title: {
    fontSize: 26, // Slightly larger title
    fontWeight: 'bold',
    marginBottom: 15, // Increased margin
    color: '#343A40', // Darker color
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#6C757D', // Slightly darker gray
    marginBottom: 40, // Add significant space before buttons
  },
  buttonContainer: {
    width: '80%', // Container takes up 80% of width
    alignItems: 'center', // Center buttons within this container
  },
  button: {
    backgroundColor: '#007AFF', // Blue background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // More rounded corners
    width: '100%', // Button takes full width of its container
    alignItems: 'center', // Center text inside button
    marginBottom: 20, // Space between buttons
    shadowColor: "#000", // Optional shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF', // White text
    fontWeight: '600',
  },
});