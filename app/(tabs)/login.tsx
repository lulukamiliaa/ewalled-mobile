import React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation(); 

    return (
        <View style={styles.container}>
            <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            />
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#333"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#333"
                    secureTextEntry
                />
            </View>
            <View style={styles.buttoncard}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ alignSelf: 'flex-start', marginTop: 15, marginLeft: 15 }}
                    onPress={() => navigation.navigate('register')}
                >
                    <Text style={styles.registerText}>
                        Don’t have an account?
                        <Text style={styles.registerLink}> Register here</Text>
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 233,
        height: 57,
        marginBottom: 30,
        position: 'absolute',
        top: '15%',
    },
    card: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'OpenSans-Regular',
    },
    input: {
        width: 339,
        height: 50,
        padding: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttoncard: {
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        bottom: 80,
        borderRadius: 10,
        fontFamily: 'OpenSans-Regular',
    },
    button: {
        backgroundColor: '#007BFF',
        width: 339,
        height: 50,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'OpenSans-Regular',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
    },
    registerText: {
        fontSize: 16,
        color: '#333',
    },
    registerLink: {
        color: '#007BFF',
    },
});
