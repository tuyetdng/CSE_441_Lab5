import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import RenderItem from './Product';

const logoURI =
    // eslint-disable-next-line max-len
    'https://dongphuckhanhlinh.com/pic/news/images/Logo-Spa-viet-nai-beauty.jpg';



const Home: React.FC<any> = ({ navigation }) => {
    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>HUYỀN TRINH</Text>
            <Icon
                name={'user-circle'}
                size={28}
                color="#FFF"
                style={styles.icon}
            />
        </View>
    );
    const renderLogo = () => (
        <View>
            <Image
                resizeMode="cover"
                source={{ uri: logoURI }}
                style={styles.logoImg}
            />
        </View>
    );


    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderLogo()}
            <RenderItem navigation={navigation} />
        </SafeAreaView>
    );
};

export default Home;
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',

    },

    headerContainer: {
        width: '100%',
        padding: 16,
        backgroundColor: '#EF506B',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    icon: {
        marginRight: 8,
    },
    logoImg: {
        width: 430,
        height: 200,
    }
})