import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

type ColorSign = {
  color: string;
  name: string;
  backgroundColor: string;
  textColor: string;
  signImage: any;
};

export default function ColorsScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;
  const [selectedColor, setSelectedColor] = useState<ColorSign | null>(null);

  const colors: ColorSign[] = [
    {
      color: "#FF0000",
      name: "Red",
      backgroundColor: "#FFE5E5",
      textColor: "#CC0000",
      signImage: require('../../../../../../../assets/images/asl/colors/Red.png')
    },
    {
      color: "#0000FF",
      name: "Blue",
      backgroundColor: "#E5E5FF",
      textColor: "#0000CC",
      signImage: require('../../../../../../../assets/images/asl/colors/Blue.png')
    },
    {
      color: "#008000",
      name: "Green",
      backgroundColor: "#E5FFE5",
      textColor: "#006600",
      signImage: require('../../../../../../../assets/images/asl/colors/Green.png')
    },
    {
      color: "#FFD700",
      name: "Yellow",
      backgroundColor: "#FFFDE5",
      textColor: "#CC7700",
      signImage: require('../../../../../../../assets/images/asl/colors/Yellow.png')
    },
    {
      color: "#000000",
      name: "Black",
      backgroundColor: "#E5E5E5",
      textColor: "#000000",
      signImage: require('../../../../../../../assets/images/asl/colors/Black.png')
    },
    {
      color: "#FFFFFF",
      name: "White",
      backgroundColor: "#FFFFFF",
      textColor: "#666666",
      signImage: require('../../../../../../../assets/images/asl/colors/white.png')
    }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Text style={[styles.subtitle, { color: theme.subtitle }]}>
          Learn how to sign common colors
        </Text>

        <View style={styles.grid}>
          {colors.map((item, index) => (
            <Animated.View
              key={item.name}
              entering={FadeInDown.delay(index * 100)}
            >
              <TouchableOpacity
                style={[
                  styles.card,
                  { 
                    backgroundColor: theme.cardBackground,
                    width: cardWidth
                  }
                ]}
                activeOpacity={0.7}
                onPress={() => setSelectedColor(item)}
              >
                <View style={[styles.colorPreview, { backgroundColor: item.backgroundColor }]}>
                  <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                </View>
                <View style={styles.cardContent}>
                  <Text style={[styles.colorName, { color: item.textColor }]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.tapHint, { color: theme.subtitle }]}>
                    Tap to learn sign
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      <Modal
        visible={selectedColor !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedColor(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedColor(null)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedColor(null)}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            
            {selectedColor && (
              <View style={styles.modalInner}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  Sign for {selectedColor.name}
                </Text>
                <Image
                  source={selectedColor.signImage}
                  style={styles.signImage}
                  resizeMode="contain"
                />
                <View style={[styles.colorPreview, { backgroundColor: selectedColor.backgroundColor }]}>
                  <View style={[styles.colorCircle, { backgroundColor: selectedColor.color }]} />
                </View>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  bottomPadding: {
    height: 40,
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorPreview: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: 12,
    alignItems: 'center',
  },
  colorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tapHint: {
    fontSize: 12,
    opacity: 0.7,
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
    minHeight: '60%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  modalInner: {
    alignItems: 'center',
    paddingTop: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  signImage: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
}); 