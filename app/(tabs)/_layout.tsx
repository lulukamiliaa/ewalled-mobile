import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Text, View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider, NavigationContainer, useNavigation } from '@react-navigation/native';
import LoginScreen from './login';
import RegisterScreen from './register';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    // <Tabs screenOptions={{ tabBarStyle: { display: 'none' } }}>
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="tnc"
        options={({ navigation }) => ({
          title: "",
          headerShown: true,
          headerLeft: () => (
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("register")}
                style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>

              <Text style={{ fontSize: 16, marginLeft: 10, fontWeight: "bold" }}>
                Terms and Conditions
              </Text>
            </View>
          ),
        })}
      />


      {/* <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
        }}  
      /> */}

      <Tabs.Screen
        name="topup"
        options={{
          title: "",
          headerShown: true,
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Top Up</Text>
            </View>
          ),
        }}
      />;

      <Tabs.Screen
        name="transfer"
        options={{
          title: "",
          headerShown: true,
          headerLeft: () => (
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Transfer</Text>
            </View>
          ),
        }}
      />;

    </Tabs>
  );
}
