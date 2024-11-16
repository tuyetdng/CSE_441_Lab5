import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
};

type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
    navigation: LoginNavigationProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const handleLogin = async () => {
        if (!phone || !password) {
            Alert.alert('Error', 'Phone and password are required!');
            return;
        }

        try {
            const response = await fetch('https://kami-backend-5rs0.onrender.com/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: phone.trim(),
                    password: password.trim(),
                }),
            });

            const data = await response.json();

            if (data.token) {
                // Save the token in AsyncStorage
                await AsyncStorage.setItem('authToken', data.token);
                Alert.alert('Login successful', 'Token saved successfully!');
                console.log('Token:', data.token);
                navigation.navigate('Home');
            } else {
                Alert.alert('Login failed', 'Invalid credentials or no token received.');
            }
        } catch (error) {
            console.error('Error in login:', error);
            Alert.alert('Error', 'Something went wrong.');
        }
    };

    return (
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={phone}
                    onChangeText={setPhone} // use onChangeText
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword} // use onChangeText
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                        <Icon
                            name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                            size={24}
                            color="grey"
                        />
                    </TouchableOpacity>
                </View>
                <Button style={{
                    marginTop: 10, width: '100%', backgroundColor: '#EF506B'}} mode="contained" onPress={handleLogin}>
                    Login
                </Button>
            </View>
        </ScrollView>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 48,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#EF506B',
        marginBottom: 24,
        marginTop: 72,
    },

    input: {
        borderColor: '#8ea9d4',
        borderWidth: 1,
        width: '100%',
        marginTop: 12,
        borderRadius: 10,
        paddingLeft: 12,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#8ea9d4',
        borderWidth: 1,
        width: '100%',
        marginTop: 12,
        borderRadius: 10,
    },

    inputPassword: {
        flex: 1,
        paddingLeft: 12,
        paddingRight: 40,
    },

    eyeIcon: {
        position: 'absolute',
        right: 12,
    },

    button: {
        backgroundColor: '#EF506B',
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        marginTop: 16,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
});
