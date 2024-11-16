import React from 'react';
import { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


type Service = {
    name: string;
    price: number;
};
type RenderItemProps = {
    navigation: any;
  };
  export default function RenderItem({ navigation }: RenderItemProps) {
    const [data, setData] = useState<Service[]>([]);
    const filePath = 'https://kami-backend-5rs0.onrender.com/services';
    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Networ......');
                }
                return response.json();
            })
            .then((d) => { setData(d); console.log(data); }
            )
            .catch((error) => { console.log(error); });
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.cardTitle}>
                <View style={styles.row}>
                    <Text style={styles.title}>Danh sách dịch vụ</Text>
                    <Icon
                        name={'user-circle-o'}
                        size={10}
                        color="#FFF"
                        style={styles.icon}
                    />
                </View>
            </View>
            <FlatList data={data}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.serviceItem}
                            onPress={() => navigation.navigate('ServiceDetailScreen', { service: item })}
                        >
                            <View style={styles.card}>
                                <View style={styles.row}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.price}>${item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    );
                }}
            />
             <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddServiceScreen')}
            >
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        backgroundColor: '#ffffff',
    },

    card: {
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        borderRadius: 10,
        padding: 16,
        width: '100%',
        marginBottom: 16,
    },
    cardTitle: {
        padding: 16,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        // marginBottom: 16,
    },
    icon: {
        marginRight: 0,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    serviceItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E91E63',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#E91E63',
        borderRadius: 50,
        padding: 15,
    },
});