import React from "react";
import background from "../images/registration-bg.jpg";
import Avatar from "../images/profile-img.jpg";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={background}
      style={styles.bgImage}
    >
      <View style={styles.wrapper}>
        <TouchableOpacity style={{ position: "absolute", right: 16, top: 22 }}>
          <Feather name="log-out" size={24} color="#BDBDBD" />
        </TouchableOpacity>
        <View style={styles.photoContainer}>
          <Image style={styles.avatar} source={Avatar} />
          <TouchableOpacity style={styles.deletePhotoButton}>
            <Octicons name="plus-circle" size={23} color="#FF6C00" />
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Name Surname</Text>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  wrapper: {
    alignContent: "flex-end",
    height: "80%",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  photoContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -45 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 15,
  },
  deletePhotoButton: {
    position: "absolute",
    top: 81,
    right: -12.5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    borderRadius: 12.5,
    borderWidth: 1,
  },
  text: {
    marginTop: 92,
    marginBottom: 32,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
  },
  bgImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
