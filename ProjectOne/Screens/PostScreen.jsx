import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Avatar from "../images/profile-img.jpg";
import ProfilePost from "../components/ProfilePost";

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={Avatar} alt="User photo" style={styles.avatar} />
        <View style={styles.userData}>
          <Text style={styles.userName}>Name Surname</Text>
          <Text style={styles.userEmail}>example@mail.com</Text>
        </View>
      </View>
      <ProfilePost />
    </View>
  );
};

export default PostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 45,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0.5,
    borderBottomWidth: -0.5,
    borderTopColor: "rgba(0, 0, 0, 0.30)",
    borderBottomColor: "rgba(0, 0, 0, 0.30)",
    minHeight: Dimensions.get("window").height - 150,
  },
  userInfo: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  userData: {
    flexDirection: "column",
    justifyContent: "center",
  },
  userName: {
    fontFamily: "Roboto-Bold",
    color: "#212121",
    fontSize: 13,
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    color: "#212121",
    fontSize: 11,
  },
  contentContainer: {
    paddingTop: 8,
  },
});
