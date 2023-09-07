import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebase/config";

//////////////////////////////////////////////
import PostScreen from "./PostScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GoBackButton from "../components/GoBackButton";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
//////////////////////////////////////////////

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut());
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const PostBottomIcon = () => {
    return <Ionicons name="grid-outline" size={24} color="#808080" />;
  };

  const ProfileBottomIcon = () => {
    return <Feather name="user" size={24} color={"#808080"} />;
  };

  const LogoutButton = () => (
    <TouchableOpacity
      style={{ paddingRight: 20 }}
      activeOpacity={0.5}
      onPress={handleLogOut}
    >
      <Feather name="log-out" size={24} color="#BDBDBD" />
    </TouchableOpacity>
  );

  // const goBack = () => {
  //   return (
  //     <View style={{ marginLeft: 16 }}>
  //       <TouchableOpacity
  //         activeOpacity={0.5}
  //         onPress={() => navigation.navigate("Публікації")}
  //       >
  //         <Ionicons name="arrow-back-sharp" size={24} color="#212121" />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingHorizontal: 70,
          borderTopColor: "#808080",
          backgroundColor: "#fff",
        },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostScreen}
        options={{
          tabBarIcon: PostBottomIcon,
          headerTitleAlign: "center",
          headerRight: LogoutButton,
        }}
      />
      <Tabs.Screen
        name="Створити публікацію"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: () => {
            return (
              <View style={styles.addButton}>
                <Feather name="plus" size={24} color="white" />
              </View>
            );
          },
          headerLeft: () => <GoBackButton />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="Профіль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ProfileBottomIcon,
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#FF6C00",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
