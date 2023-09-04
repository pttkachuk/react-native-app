import { View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GoBackButton = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginLeft: 16 }}>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="#212121" />
      </TouchableOpacity>
    </View>
  );
};

export default GoBackButton;
