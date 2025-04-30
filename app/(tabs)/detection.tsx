import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
  Dimensions,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useAppTheme } from '@/hooks/useAppTheme';
import * as Speech from 'expo-speech';
const apiUrl  = process.env.EXPO_PUBLIC_API_URL;
const speak = (text: string) => {
  Speech.speak(text);
}

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { theme } = useAppTheme();

  if (!permission) {
    // Permissions are still loading
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Permissions are not granted
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Permissions are granted
  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Function to handle the API call
  const handleObjectDetection = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not available.");
      return;
    }

    setIsApiLoading(true);
    try {
      // Capture the picture - get URI instead of base64
      const options = { quality: 0.7 }; // No base64 needed now
      const picture = await cameraRef.current.takePictureAsync(options);

      if (!picture || !picture.uri) {
        throw new Error("Failed to capture picture or get URI.");
      }

      // Create FormData object
      const formData = new FormData();
      formData.append('image', {
        uri: picture.uri,
        name: 'photo.jpg', // Filename expected by backend
        type: 'image/jpeg', // Mime type
      } as any); // Cast to any to satisfy FormData append type

      // Send FormData to the backend
      const response = await axios.post(apiUrl + "/detect_object", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("API Response:", response.data.detections);
      const objects =  response.data.name && response.data.name.length > 0
            ? `Identified Objects: ${response.data.name.join(", ")}`
            : "No objects found.";
      
      Alert.alert("Success", objects);
      speak(objects);
      // Handle the successful response data here

    } catch (error) {
      console.error("API Error:", error);
      let errorMessage = "Failed to process request.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message || "API request failed.";
      }
      Alert.alert("Error", errorMessage);
      // Handle the error appropriately
    } finally {
      setIsApiLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <CameraView
          style={styles.camera}
          facing={facing}
          ref={cameraRef}
        >
          {/* Camera Controls */}
          <View style={styles.controlsContainer}>
            {/* Flip Button */}
            <TouchableOpacity 
              onPress={toggleCameraFacing} 
              style={[styles.controlButton, styles.flipButton]}
            >
              <MaterialIcons
                name="flip-camera-ios"
                size={30}
                color="white"
              />
            </TouchableOpacity>

            {/* Detection Buttons */}
            <View style={styles.detectionButtons}>
              <TouchableOpacity 
                onPress={handleObjectDetection} 
                style={[styles.controlButton, styles.apiButton]} 
                disabled={isApiLoading}
              >
                <MaterialIcons
                  name="api"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>

        {/* Results Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showResults}
          onRequestClose={() => setShowResults(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  Analysis
                </Text>
                <TouchableOpacity 
                  onPress={() => setShowResults(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll}>
                <Text style={[styles.resultText, { color: theme.text }]}>
                  {/* Removed geminiResult */}
                </Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 65; // Height of your tab bar
const BOTTOM_SPACE = Platform.OS === 'ios' ? 34 : 20; // Safe area bottom space

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controlsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.OS === 'ios' ? 90 : 70, // Adjusted to be above tab bar
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  detectionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  flipButton: {
    alignSelf: 'flex-end',
  },
  apiButton: {
    backgroundColor: 'rgba(0, 150, 136, 0.8)', // Teal color
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%', // Takes up to 70% of screen height
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  closeButton: {
    padding: 5,
  },
  modalScroll: {
    marginBottom: Platform.OS === 'ios' ? 34 : 0, // Account for bottom safe area
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Camera;