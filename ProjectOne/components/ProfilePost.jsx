import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Test from "../images/forest.jpg";

const ProfilePost = ({
  posdId,
  id,
  way,
  name,
  //commentsNumber,
  country,
  coords,
}) => {
  const navigation = useNavigation();
  const [likes, setLikes] = useState(0);
  const incrementLikes = () => {
    setLikes(likes + 1);
  };
  const handleCommentsRedirect = () => {
    navigation.navigate("CommentsScreen");
  };

  const handleMapRedirect = () => {
    navigation.navigate("MapScreen", { coords: coords });
  };
  return (
    <View style={{ marginBottom: 32 }} key={posdId}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={typeof way === "number" ? way : { uri: way }}
          resizeMode={"cover"}
          style={styles.image}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={handleCommentsRedirect}>
              <Ionicons name="chatbubble-outline" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.text}>0</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={incrementLikes}>
              <Feather name="thumbs-up" size={24} color="#FF6C00" />
            </TouchableOpacity>
            <Text style={styles.text}>{likes}</Text>
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
            {country}
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
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
});
