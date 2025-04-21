import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, Modal, Image } from 'react-native';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useState } from 'react';

type FamilyMember = {
  name: string;
  emoji: string;
  backgroundColor: string;
  textColor: string;
  signImage: any;
};

export default function FamilyScreen() {
  const { theme } = useAppTheme();
  const { width } = useWindowDimensions();
  const cardWidth = width - 32; // Full width cards with padding
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const familyMembers: FamilyMember[] = [
    {
      name: "Mother",
      emoji: "💗",
      backgroundColor: "#FFE5F4",
      textColor: "#D4367A",
      signImage: require('@/assets/images/asl/family/Mother.png')
    },
    {
      name: "Father",
      emoji: "💙",
      backgroundColor: "#E5F4FF",
      textColor: "#2E86DE",
      signImage: require('@/assets/images/asl/family/Father.png')
    },
    {
      name: "Brother",
      emoji: "🤝",
      backgroundColor: "#E5FFE8",
      textColor: "#20BF6B",
      signImage: require('@/assets/images/asl/family/Brother.png')
    },
    {
      name: "Sister",
      emoji: "💖",
      backgroundColor: "#FFE5F4",
      textColor: "#D4367A",
      signImage: require('@/assets/images/asl/family/Sister.png')
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
          Talk about your loved ones
        </Text>

        <View style={styles.cardsContainer}>
          {familyMembers.map((member, index) => (
            <Animated.View
              key={member.name}
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
                onPress={() => setSelectedMember(member)}
              >
                <View style={[styles.memberPreview, { backgroundColor: member.backgroundColor }]}>
                  <Text style={styles.emoji}>{member.emoji}</Text>
                  <Text style={[styles.memberName, { color: member.textColor }]}>
                    {member.name}
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
        visible={selectedMember !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSelectedMember(null)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setSelectedMember(null)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedMember(null)}
            >
              <Ionicons name="close" size={24} color={theme.text} />
            </TouchableOpacity>
            
            {selectedMember && (
              <View style={styles.modalInner}>
                <Text style={[styles.modalTitle, { color: theme.text }]}>
                  Sign for {selectedMember.name}
                </Text>
                <Image
                  source={selectedMember.signImage}
                  style={styles.signImage}
                  resizeMode="contain"
                />
                <View style={[styles.memberPreview, { 
                  backgroundColor: selectedMember.backgroundColor,
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 10
                }]}>
                  <Text style={styles.emoji}>{selectedMember.emoji}</Text>
                  <Text style={[styles.memberName, { color: selectedMember.textColor }]}>
                    {selectedMember.name}
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
  cardsContainer: {
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
  memberPreview: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  memberName: {
    fontSize: 24,
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