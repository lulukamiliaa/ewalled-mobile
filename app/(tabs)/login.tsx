import React, { useState } from 'react';
import { 
    Image, 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    KeyboardAvoidingView, 
    ScrollView, 
    Platform, 
    Alert, 
    ActivityIndicator 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading state

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        setIsLoading(true); // Start loading

        try {
            // Retrieve stored user data from AsyncStorage
            const storedEmail = await AsyncStorage.getItem('userEmail');
            const storedPassword = await AsyncStorage.getItem('userPassword');

            // Handle missing credentials
            if (!storedEmail || !storedPassword) {
                Alert.alert("Error", "No stored credentials found.");
                setIsLoading(false); // Stop loading
                return;
            }

            // Validate email and password
            if (email === storedEmail && password === storedPassword) {
                // Successful login
                Alert.alert("Success", "Login successful!", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('index'), // Navigate to the main app screen
                    }
                ]);
            } else {
                // Invalid credentials
                Alert.alert("Error", "Invalid email or password.");
            }
        } catch (error) {
            console.error("Error fetching data from AsyncStorage", error);
            Alert.alert("Error", "There was an issue during login.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
            style={styles.container}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer} 
                keyboardShouldPersistTaps="handled"
            >
                {/* Logo */}
                <Image 
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                />

                {/* Input Fields */}
                <View style={styles.card}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#333"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#333"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.registerContainer}
                        onPress={() => navigation.navigate('register')}
                    >
                        <Text style={styles.registerText}>
                            Don’t have an account? 
                            <Text style={styles.registerLink}> Register here</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 22,
    },
    logo: {
        width: 233,
        height: 57,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 60,
    },
    card: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 50,
    },
    input: {
        width: 339,
        height: 60,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
        lineHeight: 60, 
        letterSpacing: 0,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#0066FF',
        width: 339,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        alignSelf: 'flex-start',
    },
    registerText: {
        fontSize: 16,
        color: '#333',
    },
    registerLink: {
        color: '#0066FF',
    },
});
