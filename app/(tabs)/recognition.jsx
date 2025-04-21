import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

export default function RecognitionScreen() {
  const { theme } = useAppTheme();
  const [showCamera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraPress = () => {
    setShowCamera(!showCamera);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {showCamera ? (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera}>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleCameraPress}
            >
              <Ionicons name="camera-outline" size={32} color="white" />
              <Text style={styles.buttonText}>Close Camera</Text>
            </TouchableOpacity>
          </Camera>
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.text }]}>
            Sign Recognition
          </Text>
          <Text style={[styles.description, { color: theme.subtitle }]}>
            Use your camera to recognize and interpret sign language gestures in real-time.
          </Text>
          
          <TouchableOpacity 
            style={[styles.cameraButton, { backgroundColor: '#007AFF' }]}
            onPress={handleCameraPress}
          >
            <Ionicons name="camera" size={32} color="white" />
            <Text style={styles.buttonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    paddingHorizontal: 25,
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
}); 