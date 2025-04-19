import React, { useState } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@/constants/Icons";

const ProfileModalComponent = ({
  modalVisible,
  setModalVisible,
  userName,
  timeSpent,
  onSignOut,
  onNavigate
}) => {
  return (
    <View className="flex-1 justify-center items-center mt-6">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View className="flex-1 justify-center items-center mt-6">
          <View className="m-5 bg-gray-50 rounded-xl p-16 items-center shadow-md shadow-black">
            <TouchableOpacity
              className="absolute top-3 right-6"
              onPress={() => setModalVisible(false)}
            >
              <Icon
                name="close"
                size={38}
                color="black"
                library="FontAwesome"
              />
            </TouchableOpacity>

            <Text className="text-2xl font-bold mb-2">{userName}</Text>
            <Text className="text-gray-600 mb-6">Time spent today: {timeSpent}</Text>

            <TouchableOpacity
              className="h-12 w-72 border border-gray-300 mb-4 rounded-xl flex-row items-center px-4"
              onPress={() => onNavigate('/profile')}
            >
              <Icon name="user" size={24} color="gray" library="FontAwesome" />
              <Text className="ml-3 text-gray-700">View Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-12 w-72 border border-gray-300 mb-4 rounded-xl flex-row items-center px-4"
              onPress={() => onNavigate('/settings')}
            >
              <Icon name="settings" size={24} color="gray" library="FontAwesome" />
              <Text className="ml-3 text-gray-700">Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-12 w-72 border border-gray-300 mb-4 rounded-xl flex-row items-center px-4"
              onPress={() => onNavigate('/progress')}
            >
              <Icon name="chart-line" size={24} color="gray" library="FontAwesome" />
              <Text className="ml-3 text-gray-700">My Progress</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="h-12 w-72 bg-red-500 rounded-xl items-center justify-center mt-4"
              onPress={onSignOut}
            >
              <Text className="text-white font-bold">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProfileModalComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  }
});
