import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
    },

    // content: {
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     flex: 1,
    // },

    text: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    info: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    title: {
        fontSize: 64,
        fontWeight: '800',
        color: "#037bfc",
        textAlign: 'center',
    },

    slogan: {
        fontSize: 28,
        fontWeight: '800',
        color: "#037bfc",
        textAlign: 'center',
    },

    imageContainer: {
        alignItems: 'center',
    },

    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        margin: 20,
    },

    button: {
        width: "90%",
        height: 50,
        margin: 20,
    },

    disclaimer: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 12,
        margin: 20,
    },
});