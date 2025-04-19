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
} from "react-native";
import { MaterialIcons, FontAwesome5} from '@expo/vector-icons';
import axios from 'axios';

const API_ENDPOINT = "http://192.168.1.7:5000/obj-detection";
const GEMINI_API_ENDPOINT = "http://192.168.1.7:5000/gemini-detection";

const Camera = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false); 
  const cameraRef = useRef<CameraView>(null);

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
      const response = await axios.post(API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("API Response:", response.data.detections);
      const objects =  response.data.detections && response.data.detections.length > 0
            ? `Identified Objects: ${response.data.detections.join(", ")}`
            : "No objects found.";
      Alert.alert("Success", objects);
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

      const response = await axios.post(GEMINI_API_ENDPOINT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Gemini API Response:", response.data.prediction);
      // const objects =  response.data.prediction && response.data.prediction.length > 0
      //       ? `Gemini Identified Objects: ${response.data.prediction.join(", ")}`
      //       : "No objects identifed by Gemini.";
      // Alert.alert("Gemini Detection", objects); 
    } 
    catch (error) {
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
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
      >
        <View style={styles.flipButtonContainer}>
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
            <MaterialIcons
              name="flip-camera-ios"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.apiButtonContainer}>
          <TouchableOpacity 
            onPress={handleObjectDetection} 
            style={styles.apiButton} 
            disabled={isApiLoading}
          >
            <MaterialIcons
              name="api"
              size={40}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.geminiButtonContainer}>
          <TouchableOpacity 
            onPress={handleGeminiDetection}
            style={styles.geminiButton}
            disabled={isGeminiLoading}
          >
            <FontAwesome5 name="robot" size={35} color="white" />
          </TouchableOpacity>
        </View>


        {isApiLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    textAlign: 'center',
    paddingBottom: 12,
  },
  camera: {
    flex: 1,
  },
  flipButtonContainer: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 9999,
    padding: 8,
  },
  button: {
  },
  apiButtonContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 9999,
  },
  apiButton: {
    padding: 15,
  },
  geminiButtonContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 9999,
  },
  geminiButton: {
    padding: 15,
  },

  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

export default Camera;