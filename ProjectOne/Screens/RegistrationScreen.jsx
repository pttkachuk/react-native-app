import React, { useState } from "react";
import {
  Alert,
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
import { Octicons } from "@expo/vector-icons";
import background from "../images/registration-bg.jpg";
import { useNavigation } from "@react-navigation/native";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(initialState);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const onChangeLogin = (text) => {
    setState((prevState) => ({ ...prevState, nickname: text.trim() }));
  };

  const onChangeEmail = (text) => {
    setState((prevState) => ({ ...prevState, email: text.trim() }));
  };

  const onChangePassword = (text) => {
    setState((prevState) => ({ ...prevState, password: text.trim() }));
  };

  const togglePassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleFocus = (key) => {
    setIsFocused(key);
  };

  const handleBlur = () => {
    setIsFocused("");
  };

  const onRegisterClick = () => {
    if (!state.nickname || !state.email || !state.password) {
      Alert.alert("Заповніть всі поля!");
      return;
    }
    console.log(
      `Nickname:${state.nickname}, Email:${state.email}, Password:${state.password}`
    );
    navigation.navigate("Home", { screen: "PostsScreen" });
    setState(initialState);
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
                <TouchableOpacity
                  style={styles.addAvatar}
                  onPress={() => Alert.alert("Simple Button pressed")}
                >
                  <Octicons name="plus-circle" size={23} color="#FF6C00" />
                </TouchableOpacity>
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
                value={state.nickname}
                textContentType="nickname"
                onChangeText={onChangeLogin}
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
                value={state.email}
                onChangeText={onChangeEmail}
                textContentType="emailAddress"
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
                value={state.password}
                onChangeText={onChangePassword}
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
                onPress={onRegisterClick}
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
    marginTop: 32,
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
