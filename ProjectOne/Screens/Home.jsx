import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//////////////////////////////////////////////
import PostScreen from "./PostScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
//////////////////////////////////////////////

const Tabs = createBottomTabNavigator();

const Home = () => {
  const navigation = useNavigation();
  const PostBottomIcon = () => {
    //<Feather name="grid" size={24} color={"#808080"} />;
    <Ionicons name="grid-outline" size={24} color="black" />;
  };
  const ProfileBottomIcon = () => {
    <Feather name="user" size={24} color={"black"} />;
  };
  const CreatePostButton = () => (
    <TouchableOpacity
      style={styles.addButton}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("CreatePostsScreen")}
    >
      <Feather name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
  const LogoutButton = () => (
    <TouchableOpacity
      style={{ paddingRight: 20 }}
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Login")}
    >
      <Feather name="log-out" size={24} color="#808080" />
    </TouchableOpacity>
  );
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 80 },
      }}
    >
      <Tabs.Screen
        name="Публікації"
        component={PostScreen}
        options={{
          tabBarIcon: PostBottomIcon,
          headerTitleAlign: "center",
          //headerRightContainerStyle: { paddingRight: 20 },
          headerRight: LogoutButton,
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerTitle: () => <Text>Створити публікацію</Text>,
          headerLeft: () => (
            <View style={{ marginLeft: 16 }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: CreatePostButton,
          headerShown: true,
          tabBarStyle: { display: "none" },
          headerTitleAlign: "center",
        }}
      />
      <Tabs.Screen
        name="Profilescreen"
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
