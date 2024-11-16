import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteService = ({ route, navigation }) => {
    const { service } = route.params;
    const handleDeleteService = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await fetch(
                `https://kami-backend-5rs0.onrender.com/services/${service.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Failed to delete service');
            }

            navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to delete service');
        }
    };


    const confirmDelete = () => {
        Alert.alert(
            'Confirm Delete',
            `Are you sure you want to delete ${service.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', onPress: handleDeleteService, style: 'destructive' }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Delete Service</Text>
            <Text style={styles.message}>
                Are you sure you want to delete this service?
            </Text>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                <Text style={styles.deleteButtonText}>Delete Service</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DeleteService;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E91E63',
        marginBottom: 16,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
        color: '#888',
    },
    deleteButton: {
        backgroundColor: '#F44336',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#9E9E9E',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});