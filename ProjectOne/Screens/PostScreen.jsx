import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
//import Avatar from "../images/defaultAvatar.jpg";
import PublicationsPost from "../components/PublicationsPost";
import { auth, db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../redux/post/postsSelecotrs";
import { useIsFocused } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { addPost } from "../redux/post/postsSlice";
import { selectAvatar } from "../redux/auth/authSelectors";

const PostScreen = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const posts = useSelector(selectPosts);
  const avatar = useSelector(selectAvatar);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));
          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch(addPost(postsData));
        } catch (error) {
          console.log(error);
          throw error;
        }
      })();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgWrapper}>
          <Image
            source={{ uri: avatar }}
            alt="User photo"
            style={styles.userImg}
          />
        </View>

        <View style={styles.userData}>
          <Text style={styles.userName}>{user?.displayName}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => {
          item.id;
        }}
        renderItem={({ item }) => (
          <PublicationsPost
            id={item.id}
            way={item.data.photo}
            name={item.data.title}
            //commentsNumber={item.data.comments.length}
            country={item.data.photoLocation}
            coords={item.data.geoLocation}
          />
        )}
      />
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
  imgWrapper: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: "#BDBDBD",
  },
  userImg: {
    width: "100%",
    height: "100%",
  },
  // avatar: {
  //   width: "100%",
  //   height: "100%",
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  // },
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
