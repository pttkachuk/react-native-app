import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Avatar from "../images/defaultAvatar.jpg";
import PublicationsPost from "../components/PublicationsPost";
import { auth } from "../firebase/config";
import { useSelector } from "react-redux";
import { selectPosts } from "../redux/post/postsSelecotrs";

const PostScreen = () => {
  const [user, setUser] = useState(null);
  // const posts = useSelector(selectPosts);
  // console.log(posts);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  });
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image source={Avatar} alt="User photo" style={styles.avatar} />
        <View style={styles.userData}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>
      <PublicationsPost />
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
