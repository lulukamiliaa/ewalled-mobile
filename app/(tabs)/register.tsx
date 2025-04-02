import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

export default function LoginScreen() {
    const navigation = useNavigation(); 
    const [isChecked, setIsChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Image 
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
            />
            <View style={styles.card}>
                <TextInput
                    style={styles.input}
                    placeholder="Fullname"
                    placeholderTextColor="#333"
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Avatar Url"
                    placeholderTextColor="#333"
                />
            </View>
        
            <View style={styles.buttoncard}>
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
                

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ alignSelf: 'flex-start', marginTop: 15, marginLeft: 15 }}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={styles.registerText}>
                        Have an account?
                        <Text style={styles.registerLink}> Login here</Text>
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
        margin: 20,
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
        bottom: 80,
        borderRadius: 10,
        fontFamily: 'OpenSans-Regular',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15
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
        paddingLeft: 10
    },
    registerLink: {
        color: '#007BFF',
    },
});
