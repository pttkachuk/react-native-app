import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Test from "../images/forest.jpg";

const ProfilePost = () => {
  const navigation = useNavigation();
  const handleCommentsRedirect = (way) => {
    navigation.navigate("CommentsScreen");
  };

  const handleMapRedirect = () => {
    navigation.navigate("MapScreen");
  };
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={Test}
          resizeMode={"cover"}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      </View>
      <Text style={styles.name}>forest</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={handleCommentsRedirect}>
              <Ionicons name="chatbubble-sharp" size={24} color="#FF6C00" />
            </TouchableOpacity>

            <Text style={styles.text}>4</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Feather name="thumbs-up" size={24} color="#FF6C00" />
            <Text style={styles.text}>34</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <TouchableOpacity onPress={handleMapRedirect}>
            <Feather name="map-pin" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                textDecorationLine: "underline",
              },
            ]}
          >
            Chernivtsi
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProfilePost;
const styles = StyleSheet.create({
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  name: {
    marginBottom: 8,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
});
