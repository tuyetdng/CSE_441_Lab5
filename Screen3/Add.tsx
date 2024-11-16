import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddServiceScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddService = async () => {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
            Alert.alert('Token not found');
            return;
        }

        await fetch('https://kami-backend5rs0.onrender.com/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                name,
                price,
            }),
        }).then((res) => res.json())
            .then(console.log);
        Alert.alert('Add sucessfull');

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
            <TouchableOpacity style={styles.button} onPress={handleAddService}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
}
export default AddServiceScreen;

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
