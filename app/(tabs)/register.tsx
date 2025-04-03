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
    Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage

export default function RegisterScreen() {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleRegister = async () => {
        if (!fullname || !email || !password) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        if (!isChecked) {
            Alert.alert("Error", "You must agree to the Terms and Conditions.");
            return;
        }

        // Save user data to AsyncStorage
        try {
            await AsyncStorage.setItem('userFullname', fullname);
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPassword', password);
            await AsyncStorage.setItem('userAvatar', avatar);

            // Simulate API request (you can replace this with an actual API call)
            setTimeout(() => {
                Alert.alert("Success", "Registration successful!", [
                    {
                        text: "OK",
                        onPress: () => navigation.navigate('login'),
                    }
                ]);
            }, 1000);
        } catch (error) {
            console.error("Error saving data to AsyncStorage", error);
            Alert.alert("Error", "There was an issue saving your information.");
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
                        placeholder="Fullname"
                        placeholderTextColor="#333"
                        value={fullname}
                        onChangeText={setFullname}
                    />
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
                    <TextInput
                        style={styles.input}
                        placeholder="Avatar URL"
                        placeholderTextColor="#333"
                        value={avatar}
                        onChangeText={setAvatar}
                    />
                </View>

                {/* Checkbox for Terms & Conditions */}
                <View style={styles.checkboxContainer}>
                    <Checkbox 
                        status={isChecked ? 'checked' : 'unchecked'}
                        onPress={() => setIsChecked(!isChecked)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('tnc')}>
                        <Text style={styles.termsText}>
                            I have read and agree to the <Text style={styles.linkText}>Terms and Conditions</Text><Text style={styles.asterisk}> *</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Register Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.registerContainer}
                        onPress={() => navigation.navigate('login')}
                    >
                        <Text style={styles.registerText}>
                            Have an account?
                            <Text style={styles.registerLink}> Login here</Text>
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    termsText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 6,
    },
    linkText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    asterisk: {
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
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
