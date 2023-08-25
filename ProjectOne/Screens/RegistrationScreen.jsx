import React, { useState } from "react";
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import background from "../images/registration-bg.jpg";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const onChangeLogin = (text) => {
    setState((prevState) => ({ ...prevState, nickname: text.trim() }));
  };

  const onChangeEmail = (text) => {
    setState((prevState) => ({ ...prevState, email: text.trim() }));
  };

  const onChangePassword = (text) => {
    setState((prevState) => ({ ...prevState, password: text.trim() }));
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.innerContainer}>
          <View style={styles.avatar}>
            <TouchableOpacity
              style={styles.addAvatar}
              onPress={() => Alert.alert("Simple Button pressed")}
            >
              <Octicons name="plus-circle" size={25} color="#FF6C00" />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <TextInput
            style={[styles.input, isLoginFocused && styles.inputFocus]}
            onFocus={() => {
              setIsShowKeybord(true), setIsLoginFocused(true);
              setIsEmailFocused(false);
              setIsPasswordFocused(false);
            }}
            onBlur={() => setIsLoginFocused(false)}
            placeholder="Логін"
            value={state.nickname}
            onChangeText={onChangeLogin}
          />
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocus]}
            onFocus={() => {
              setIsShowKeybord(true), setIsEmailFocused(true);
              setIsLoginFocused(false);
              setIsPasswordFocused(false);
            }}
            onBlur={() => setIsEmailFocused(false)}
            placeholder="Адреса електронної пошти"
            value={state.email}
            onChangeText={onChangeEmail}
          />
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocus]}
            onFocus={() => {
              setIsShowKeybord(true), setIsPasswordFocused(true);
              setIsLoginFocused(false);
              setIsEmailFocused(false);
            }}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="Пароль"
            value={state.password}
            onChangeText={onChangePassword}
          />
          <TouchableOpacity style={styles.showPassword}>
            <Text
              style={styles.showPasswordText}
              onPress={() => Alert.alert("View details test")}
            >
              Показати
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => Alert.alert("Register test")}
          >
            <Text style={styles.titlebutton}>Зареєструватися</Text>
          </TouchableOpacity>
          <Text style={styles.titletext}>Вже є акаунт? Увійти</Text>
        </View>
      </ImageBackground>
    </View>
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
  innerContainer: {
    width: "100%",
    height: 550,
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
  },
  title: {
    color: "#212121",
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: 500,
    lineHeight: 35,
    letterSpacing: 0.3,
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    margin: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#F6F6F6",
  },
  inputFocus: {
    borderColor: "#FF6C00",
    borderWidth: 1,
  },
  showPassword: {
    top: -40,
    left: 130,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontWeight: 400,
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
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
  },
  titletext: {
    color: "#1B4371",
    fontFamily: "Roboto",
    fontSize: 16,
    fontWeight: 400,
    textAlign: "center",
    marginTop: 16,
  },
  avatar: {
    marginTop: -60,
    height: 120,
    width: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    alignSelf: "center",
  },
  addAvatar: {
    marginTop: "65%",
    left: "90%",
    height: 25,
    width: 25,
    pointerEvents: "auto",
    backgroundColor: "#fff",
    borderRadius: 100,
  },
});
