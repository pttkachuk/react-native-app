import { useFonts } from "expo-font";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

//////////////////////////////////////////////
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import MapScreen from "./Screens/MapScreen";
import PostScreen from "./Screens/PostScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { StatusBar } from "react-native";
//////////////////////////////////////////////

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegisterScreen">
        <MainStack.Screen
          name="Registration"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <MainStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <MainStack.Screen
          name="CreatePostsScreen"
          component={CreatePostsScreen}
        />
        <MainStack.Screen name="PostScreen" component={PostScreen} />
        <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
        <MainStack.Screen name="MapScreen" component={MapScreen} />
        <MainStack.Screen name="CommentsScreen" component={CommentsScreen} />
      </MainStack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}
