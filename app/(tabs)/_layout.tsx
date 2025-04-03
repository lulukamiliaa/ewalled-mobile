import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TabLayout() {
  const [avatarUrl, setAvatarUrl] = useState(null); // State to store avatar URL
  const [fullName, setFullName] = useState(''); // State to store the full name

  useEffect(() => {
    const getUserData = async () => {
      try {
        // Fetch avatar URL and full name from AsyncStorage
        const avatar = await AsyncStorage.getItem('avatarUrl');
        const name = await AsyncStorage.getItem('fullName');

        // Set the avatar URL and full name to state
        setAvatarUrl(avatar);
        setFullName(name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUserData();
  }, []);

  // Extract the first two names from the full name (if available)
  const firstTwoNames = fullName ? fullName.split(' ').slice(0, 2).join(' ') : '';

  return (
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

      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23, 
                  backgroundColor: '#178F8D',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Image
                  source={avatarUrl ? { uri: avatarUrl } : require('@/assets/images/picture.png')} 
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19, 
                  }}
                />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                  {firstTwoNames || 'Guest'}
                </Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>
                  Personal Account
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <Image
              source={require('@/assets/images/light.png')}
              style={{
                width: 30,
                height: 30,
                marginRight: 20,
              }}
            />
          ),
        }}
      /> 

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
      />

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
      />
    </Tabs>
  );
}
