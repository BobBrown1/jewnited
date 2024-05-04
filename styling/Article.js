import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-evenly',
    },

    content: {
        marginHorizontal: 10,
        marginTop: 20,
        overflow: 'hidden',
    },

    header: {
       marginLeft: 10,
    },

    greet: {
        fontSize: 34,
        fontWeight: 'bold',
    },

    subheader: {
        fontSize: 24,
    },

    // article
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    },

    heading: {
        fontWeight: 'bold',
        marginTop: 10,
    }, 

    image: {
        width: '95%',
        height: 200,
        margin: 10,
        alignSelf: 'center',
    },

    content: {
        margin: 10,
        fontSize: 18,   
        lineHeight: 26,
    },

    listItem: {
        marginTop: 10,
    }
});