import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
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
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
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
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiResult, setGeminiResult] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const { theme } = useAppTheme();

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleGeminiDetection = async () => {
    if (!cameraRef.current) {
      Alert.alert("Error", "Camera not available.");
      return;
    }

    setIsGeminiLoading(true);
    try {
      const options = { quality: 0.7 };
      const picture = await cameraRef.current.takePictureAsync(options);

      if (!picture || !picture.uri) {
        throw new Error("Failed to capture picture.");
      }

      const formData = new FormData();
      formData.append('image', {
        uri: picture.uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await axios.post(apiUrl + "/gemini-sign-predict", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Gemini API Response:", response.data.prediction);
      setGeminiResult(response.data.prediction);
      speak(response.data.prediction);
      setShowResults(true);
    } catch (error) {
      console.error("Gemini API Error:", error);
      let errorMessage = "Failed to process Gemini request.";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.error || error.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setIsGeminiLoading(false);
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
          <View style={styles.controlsContainer}>
            <TouchableOpacity
              onPress={toggleCameraFacing}
              style={[styles.controlButton, styles.flipButton]}
            >
              <MaterialIcons name="flip-camera-ios" size={30} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGeminiDetection}
              style={[styles.detectButton, isGeminiLoading && styles.detectButtonDisabled]}
              disabled={isGeminiLoading}
            >
              <View style={styles.detectButtonContent}>
                <Ionicons name="scan" size={24} color="white" />
                <Text style={styles.detectButtonText}>
                  {isGeminiLoading ? 'Analyzing...' : 'Detect Sign'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {isGeminiLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </CameraView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showResults}
          onRequestClose={() => setShowResults(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Analysis</Text>
                <TouchableOpacity onPress={() => setShowResults(false)} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={theme.text} />
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.modalScroll}>
                <Text style={[styles.resultText, { color: theme.text }]}>{geminiResult}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  camera: { flex: 1 },
  controlsContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 120 : 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  flipButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  detectButton: {
    width: '80%',
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  detectButtonDisabled: {
    backgroundColor: 'rgba(33, 150, 243, 0.5)',
  },
  detectButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detectButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginTop: 15,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Camera;
