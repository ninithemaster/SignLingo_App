import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

type FoodItem = {
  name: string;
  emoji: string;
  backgroundColor: string;
  textColor: string;
  signImage: any;
};

export default function FoodScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2; // 48 = padding (16 * 2) + gap (16)
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);

  const foodItems: FoodItem[] = [
    {
      name: "Water",
      emoji: "🥤",
      backgroundColor: "#E5F7FF",
      textColor: "#0099CC",
      signImage: require('@/assets/images/asl/food/water.png')
    },
    {
      name: "Eat",
      emoji: "🍽️",
      backgroundColor: "#FFE5E5",
      textColor: "#CC0000",
      signImage: require('@/assets/images/asl/food/Eat.png')
    },
    {
      name: "Apple",
      emoji: "🍎",
      backgroundColor: "#FFE5E5",
      textColor: "#CC0000",
      signImage: require('@/assets/images/asl/food/apple.png')
    },
    {
      name: "Milk",
      emoji: "🥛",
      backgroundColor: "#F0F0F0",
      textColor: "#666666",
      signImage: require('@/assets/images/asl/food/Milk.png')
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
          Learn signs for common foods and beverages
        </Text>

        <View style={styles.grid}>
          {foodItems.map((item, index) => (
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
                onPress={() => setSelectedItem(item)}
              >
                <View style={[styles.itemPreview, { backgroundColor: item.backgroundColor }]}>
                  <Text style={styles.emoji}>{item.emoji}</Text>
                  <Text style={[styles.itemName, { color: item.textColor }]}>
                    {item.name}
                  </Text>
                </View>
                <View style={styles.cardContent}>
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
        visible={selectedItem !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedItem(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedItem(null)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedItem(null)}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            
            {selectedItem && (
              <View style={styles.modalInner}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  Sign for {selectedItem.name}
                </Text>
                <Image
                  source={selectedItem.signImage}
                  style={styles.signImage}
                  resizeMode="contain"
                />
                <View style={[styles.itemPreview, { 
                  backgroundColor: selectedItem.backgroundColor,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10
                }]}>
                  <Text style={styles.emoji}>{selectedItem.emoji}</Text>
                  <Text style={[styles.itemName, { color: selectedItem.textColor }]}>
                    {selectedItem.name}
                  </Text>
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
  itemPreview: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContent: {
    padding: 12,
    alignItems: 'center',
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