import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
//import RegistrationScreen from './Screens/RegistrationScreen';
//import LoginScreen from './Screens/LoginScreen';

export default function App() {
  const [fontsLoaded] = useFonts({ 'Roboto': require('./assets/fonts/Roboto-Regular.ttf') });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
