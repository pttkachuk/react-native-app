import React from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//import background from "../images/registration-bg.jpg";

const RegistrationScreen = () => {
  return (
    <View>
      <ImageBackground>
        <View>
          <Text>Реєстрація</Text>
          <TextInput placeholder="Логін" />
          <TextInput placeholder="Адреса електронної пошти" />
          <TextInput placeholder="Пароль" />
          <TouchableOpacity>
            <Text>Показати</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Зареєструватися</Text>
          </TouchableOpacity>
          <Text>Вже є акаунт? Увійти</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;
