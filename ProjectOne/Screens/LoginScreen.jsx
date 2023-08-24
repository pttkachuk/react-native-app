import React from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <ImageBackground>
        <View>
          <Text>Увійти</Text>
          <TextInput placeholder="Адреса електронної пошти" />
          <TextInput placeholder="Пароль" />
          <TouchableOpacity>
            <Text>Показати</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Увійти</Text>
          </TouchableOpacity>
          <Text>Немає акаунту? Зареєструватися</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
