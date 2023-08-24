import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import RegistrationScreen from './Screens/RegistrationScreen';
import background from "./images/registration-bg.jpg";

export default function App() {
  const [fontsLoaded] = useFonts({ 'Roboto': require('./assets/fonts/Roboto-Regular.ttf') });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.image}
      >    <RegistrationScreen /></ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  }
});
