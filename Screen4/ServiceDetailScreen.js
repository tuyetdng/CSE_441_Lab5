import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ServiceDetailScreen = ({ route, navigation }) => {
    const { service } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Service Details</Text>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{service.name}</Text>
            </View>
            <View style={styles.detailContainer}>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>${service.price}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('EditService', { service })}
                >
                    <Icon name="edit" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => navigation.navigate('DeleteService', { service })}
                >
                    <Icon name="delete" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ServiceDetailScreen;
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
    input: {
        height: 50,
        borderColor: '#E91E63',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#E91E63',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    serviceItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E91E63',
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    servicePrice: {
        fontSize: 16,
        color: '#888',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E91E63',
        padding: 16,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#E91E63',
        borderRadius: 50,
        padding: 15,
    },
    detailContainer: {
        marginVertical: 10,
    },
    label: {
        fontWeight: 'bold',
    },
    value: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    cancelButton: {
        backgroundColor: '#9E9E9E',
    },
    deleteButtonText: {
        color: '#fff',
    },
    cancelButtonText: {
        color: '#fff',
    },
});