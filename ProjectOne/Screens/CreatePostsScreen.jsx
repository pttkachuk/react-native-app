import React from "react";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CreatePostsScreen = () => {
  const navigation = useNavigation();

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [location, setLocation] = useState(null);

  //const name = useSelector(getUserName);
  //const userId = useSelector(getUserId);

  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState("");

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isFocused, setIsFocused] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const makePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPhoto(uri);
    }
  };

  const deletePost = () => {
    setPhoto("");
    setTitle("");
    setPhotoLocation("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            styles.container,
            {
              paddingBottom: isKeyboardVisible ? 50 : 34,
            },
          ]}
        >
          <View>
            {photo ? (
              <View style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            ) : (
              <Camera
                style={styles.photoContainer}
                type={type}
                ref={setCameraRef}
              >
                <TouchableOpacity onPress={makePhoto}>
                  <View style={styles.photoIcon}>
                    <Ionicons name="ios-camera" size={24} color={"#BDBDBD"} />
                  </View>
                </TouchableOpacity>
              </Camera>
            )}

            <Text style={styles.text}>Завантажте фото</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Назва..."
                value={title}
                onChangeText={(value) => setTitle(value)}
                onFocus={() => setIsKeyboardVisible(true)}
                onBlur={() => setIsKeyboardVisible(false)}
              />
              <View style={[styles.input, styles.locationInputContainer]}>
                <Feather
                  name="map-pin"
                  size={24}
                  color={"#BDBDBD"}
                  //style={styles.locationIcon}
                />
                <TextInput
                  style={[styles.input, styles.locationInput]}
                  placeholder="Місцевість..."
                  value={photoLocation}
                  onChangeText={(value) => setPhotoLocation(value)}
                  onFocus={() => setIsKeyboardVisible(true)}
                  onBlur={() => setIsKeyboardVisible(false)}
                />
              </View>
            </View>
            {title !== "" && photoLocation !== "" && photo !== null ? (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Опубліковати</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.disabledButton}>
                <Text style={styles.disabledButtonText}>Опубліковати</Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={deletePost}>
            <View style={styles.bottomContainer}>
              <Feather name="trash-2" size={24} color={"#BDBDBD"} />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    //justifyContent: "flex-end",
    backgroundColor: "#fff",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
  },

  photoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: 240,

    backgroundColor: "#F6F6F6",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
  },

  photoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    width: 60,
    height: 60,

    backgroundColor: "white",

    borderRadius: 30,
  },

  photo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#BDBDBD",
    marginBottom: 32,
  },

  input: {
    height: 50,

    marginBottom: 16,

    fontFamily: "Roboto-Regular",
    fontSize: 16,

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },

  locationInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,

    marginBottom: 32,
  },

  locationInput: {
    flex: 1,

    marginBottom: 0,

    borderBottomWidth: 0,

    fontFamily: "Roboto-Regular",
  },

  bottomContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",

    width: 70,
    height: 40,

    backgroundColor: "#F6F6F6",

    borderRadius: 20,
  },
  disabledButton: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#F6F6F6",

    borderRadius: 100,
  },
  disabledButtonText: {
    textAlign: "center",

    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,

    color: "#BDBDBD",
  },
  button: {
    paddingTop: 16,
    paddingBottom: 16,

    backgroundColor: "#FF6C00",

    borderRadius: 100,
  },
  buttonText: {
    textAlign: "center",

    fontFamily: "Roboto-Regular",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 18.75,

    color: "white",
  },
});
