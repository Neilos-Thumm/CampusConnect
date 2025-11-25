// src/navigation/index.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import PersonalisationScreen from "../screens/PersonalisationScreen";
import HomeScreen from "../screens/HomeScreen";
import FriendsScreen from "../screens/FriendsScreen";
import EventsScreen from "../screens/EventsScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import TimetableScreen from "../screens/TimetableScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#F4EEFF" },
          headerTintColor: "#7C3AED",
          headerBackTitleVisible: false,
        }}
      >
        {!user ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: "Sign up" }}
            />
            {/* 未登录阶段也可进入个性化 */}
            <Stack.Screen
              name="Personalisation"
              component={PersonalisationScreen}
              options={{ title: "Personalisation" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Friends" component={FriendsScreen} options={{ title: "Friends" }} />
            <Stack.Screen name="Events" component={EventsScreen} options={{ title: "Events" }} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} options={{ title: "My Account" }} />
            <Stack.Screen name="Timetable" component={TimetableScreen} options={{ title: "Demo" }} />
            {/* ✅ 已登录栈里也注册，用于 MyAccount -> Edit profile */}
            <Stack.Screen
              name="Personalisation"
              component={PersonalisationScreen}
              options={{ title: "Edit profile" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
