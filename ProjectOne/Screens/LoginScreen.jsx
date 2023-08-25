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
import background from "../images/registration-bg.jpg";
const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
          <Text style={styles.title}>Увійти</Text>
          <TextInput
            style={[styles.input, isEmailFocused && styles.inputFocus]}
            onFocus={() => {
              setIsShowKeybord(true);
              setIsEmailFocused(true);
              setIsPasswordFocused(false);
            }}
            onBlur={() => setIsEmailFocused(false)}
            onChangeText={onChangeEmail}
            value={state.email}
            placeholder="Адреса електронної пошти"
          />
          <TextInput
            style={[styles.input, isPasswordFocused && styles.inputFocus]}
            onFocus={() => {
              setIsShowKeybord(true);
              setIsPasswordFocused(true);
              setIsEmailFocused(false);
            }}
            onBlur={() => setIsPasswordFocused(false)}
            onChangeText={onChangePassword}
            value={state.password}
            placeholder="Пароль"
          />
          <TouchableOpacity style={styles.showPassword} activeOpacity={0.5}>
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
            onPress={() => Alert.alert("Login test")}
          >
            <Text style={styles.titlebutton}>Увійти</Text>
          </TouchableOpacity>
          <Text style={styles.titletext}>Немає акаунту? Зареєструватися</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
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
    height: 490,
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
  showPassword: {
    top: -40,
    left: 130,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto",
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
});
