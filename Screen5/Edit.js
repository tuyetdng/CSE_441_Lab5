import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditServiceScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(service.price.toString());

    const handleUpdateService = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            const response = await fetch(
                `https://kami-backend-5rs0.onrender.com/services/${service.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ name, price }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update service');
            }

            const data = await response.json();
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update service');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Service name</Text>
            <TextInput
                style={styles.input}
                placeholder="Input a service name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.title}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="0"
                value={price}
                onChangeText={setPrice}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateService}>
                <Text style={styles.buttonText}>Update Service</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditServiceScreen;
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
        fontSize: 16,
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
