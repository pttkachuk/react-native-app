import React, { useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import CommentComponent from "../components/CommentComponent";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const CommentsScreen = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [comments, setComments] = useState([]);

  const route = useRoute();
  const way = route.params?.way;
  const id = route.params?.id;
  const currentDate = new Date().getTime();

  useEffect(() => {
    async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        const comments = postsData.find((post) => {
          post.id === id;
        }).data.comments;
        setComments(comments);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
  }, [inputValue]);

  const updateDataInFirestore = async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);
      await updateDoc(ref, {
        comments: [
          ...comments,
          { comment: inputValue, currentDate, id: uuid.v4() },
        ],
      });
      console.log("document updated");
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      Keyboard.dismiss();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View
          style={[
            styles.container,
            {
              paddingBottom: isKeyboardVisible ? 90 : 16,
            },
          ]}
        >
          <Image
            source={typeof way === `number` ? way : { uri: way }}
            resizeMode={"cover"}
            style={styles.image}
          />
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              <CommentComponent
                img={require("../images/commentsPhoto.png")}
                text={item.comment}
                date={item.currentDate}
              />;
            }}
          />
          <View>
            <TextInput
              value={inputValue}
              onChangeText={setInputValue}
              onFocus={() => setIsKeyboardVisible(true)}
              onBlur={() => setIsKeyboardVisible(false)}
              style={styles.input}
              placeholder="Коментувати..."
            />
            <TouchableOpacity
              style={styles.sendMessageButton}
              onPress={() => updateDataInFirestore("posts", id)}
            >
              <Feather name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "flex-end",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    paddingLeft: 16,
    paddingRight: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19.36,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 25,
  },
  sendMessageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 17,
  },
});
