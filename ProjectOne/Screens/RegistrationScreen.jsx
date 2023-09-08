import React, { useState } from "react";
import background from "../images/registration-bg.jpg";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { auth, storage } from "../firebase/config";
import { createUser } from "../redux/auth/authSlice";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// const initialState = {
//   nickname: "",
//   email: "",
//   password: "",
//   avatar: null,
// };

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const dispach = useDispatch();
  //const [state, setState] = useState(initialState);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  // const onChangeLogin = (text) => {
  //   setState((prevState) => ({ ...prevState, nickname: text.trim() }));
  // };

  // const onChangeEmail = (text) => {
  //   setState((prevState) => ({ ...prevState, email: text.trim() }));
  // };

  // const onChangePassword = (text) => {
  //   setState((prevState) => ({ ...prevState, password: text.trim() }));
  // };

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleFocus = (key) => {
    setIsFocused(key);
  };

  const handleBlur = () => {
    setIsFocused("");
  };

  const updateUserProfile = async (user) => {
    if (user) {
      try {
        await updateProfile(user, { displayName: login });
      } catch (error) {
        throw error;
      }
    }
  };

  const resetForm = () => {
    setLogin("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const saveAvatar = async () => {
    try {
      const responce = await fetch(avatar);
      const file = await responce.blob();
      await uploadBytes(ref(storage, `avatars/${file._data.blobId}`), file);
      const imgUrl = await getDownloadURL(
        ref(storage, `avatars/${file._data.blobId}`)
      );
      return imgUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const onRegistrationClick = async () => {
    console.log(`Nickname:${login}, Email:${email}, Password:${password}`);
    const avatar = await saveAvatar();
    fetchSignInMethodsForEmail(auth, email)
      .then((signInMetods) => {
        if (signInMetods.length > 0) {
          alert("Something went wrong, maybe such a user already exists");
        } else {
          createUserWithEmailAndPassword(auth, email, password)
            .then((userInfo) => {
              const user = userInfo.user;
              console.log(user);
              updateUserProfile(user);
              dispach(createUser(email, password, avatar, login));
              navigation.navigate("Home");
              resetForm();
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(), setIsShowKeybord(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.backgroundImage}>
          <KeyboardAvoidingView
            style={styles.containerKeyBoard}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-240}
          >
            <View
              style={{
                ...styles.innerContainer,
                height: isShowKeybord ? 620 : 550,
              }}
            >
              <View style={styles.avatar}>
                <Image source={{ uri: avatar }} style={styles.avatarImg} />
                {avatar ? (
                  <TouchableOpacity
                    style={styles.addAvatar}
                    onPress={() => {
                      setAvatar(null);
                    }}
                  >
                    <AntDesign name="closecircleo" size={23} color="#BDBDBD" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.addAvatar}
                    onPress={pickImage}
                  >
                    <Octicons name="plus-circle" size={23} color="#FF6C00" />
                  </TouchableOpacity>
                )}
              </View>
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      isFocused === "nickname" ? "#FF6C00" : "#E8E8E8",
                  },
                ]}
                placeholder="Логін"
                value={login}
                textContentType="nickname"
                onChangeText={(text) => setLogin(text)}
                onFocus={() => handleFocus("nickname")}
                onBlur={handleBlur}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      isFocused === "emailAddress" ? "#FF6C00" : "#E8E8E8",
                  },
                ]}
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={(text) => setEmail(text)}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                onFocus={() => handleFocus("emailAddress")}
                onBlur={handleBlur}
              />
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      isFocused === "password" ? "#FF6C00" : "#E8E8E8",
                  },
                ]}
                placeholder="Пароль"
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoComplete="password"
                textContentType="password"
                secureTextEntry={hidePassword}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
              />
              <TouchableOpacity style={styles.showPassword}>
                <Text style={styles.showPasswordText} onPress={togglePassword}>
                  {hidePassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={onRegistrationClick}
              >
                <Text style={styles.titlebutton}>Зареєструватися</Text>
              </TouchableOpacity>
              <Text style={styles.titletext}>
                Вже є акаунт?
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={{ textDecorationLine: "underline" }}
                >
                  Увійти
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  containerKeyBoard: {
    justifyContent: "flex-end",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    lineHeight: 35,
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F6F6F6",
  },
  showPassword: {
    top: -40,
    left: 130,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    height: 50,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 20,
  },
  titlebutton: {
    color: "#FFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  titletext: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  avatar: {
    position: "absolute",
    top: -60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    // marginTop: -60,
    // height: 120,
    // width: 120,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 16,
    // alignSelf: "center",
  },
  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    bottom: 14,
    right: -13,
    borderRadius: 50,
    backgroundColor: "#fff",
    // marginTop: "65%",
    // left: "90%",
    // height: 25,
    // width: 25,
    // pointerEvents: "auto",
    // backgroundColor: "#fff",
    // borderRadius: 100,
  },
});
