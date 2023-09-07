import React, { useEffect, useState } from "react";
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
import background from "../images/registration-bg.jpg";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSelectors";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { logIn } from "../redux/auth/authSlice";
const initialState = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [state, setState] = useState(initialState);
  const [isShowKeybord, setIsShowKeybord] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

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

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate("Home");
    }
  }, [isLoggedIn, navigation]);

  const handleLogIn = async () => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        state.email,
        state.password
      );
      dispatch(logIn(state.email, state.password));
      navigation.navigate("Home");
      setState(initialState);
      console.log(credentials.user);
      return credentials.user;
    } catch (error) {
      alert(error.message);
    }
  };

  // const onLoginClick = () => {
  //   if (!state.email || !state.password) {
  //     Alert.alert("Заповніть всі поля!");
  //     return;
  //   }
  //   console.log(`Email:${state.email}, Password:${state.password}`);
  //   navigation.navigate("Home", { screen: "PostsScreen" });
  //   setState(initialState);
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss(), setIsShowKeybord(false);
      }}
    >
      <View style={styles.container}>
        <ImageBackground source={background} style={styles.backgroundImage}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.containerKeyBoard}
            keyboardVerticalOffset={-240}
          >
            <View
              style={{
                ...styles.innerContainer,
                height: isShowKeybord ? 500 : 490,
              }}
            >
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor:
                      isFocused === "emailAddress" ? "#FF6C00" : "#E8E8E8",
                  },
                ]}
                onChangeText={onChangeEmail}
                value={state.email}
                placeholder="Адреса електронної пошти"
                autoComplete="email"
                textContentType="emailAddress"
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
                onChangeText={onChangePassword}
                value={state.password}
                placeholder="Пароль"
                autoComplete="password"
                textContentType="password"
                secureTextEntry={hidePassword}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
              />
              <TouchableOpacity style={styles.showPassword} activeOpacity={0.5}>
                <Text style={styles.showPasswordText} onPress={togglePassword}>
                  {hidePassword ? "Показати" : "Приховати"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.5}
                onPress={handleLogIn}
              >
                <Text style={styles.titlebutton}>Увійти</Text>
              </TouchableOpacity>
              <Text style={styles.titletext}>
                Немає акаунту?
                <Text
                  onPress={() => navigation.navigate("Registration")}
                  style={{ textDecorationLine: "underline" }}
                >
                  Зареєструватися
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  showPassword: {
    top: -40,
    left: 130,
  },
  showPasswordText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
  },
  titletext: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});
