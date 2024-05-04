import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'space-evenly',
    },

    content: {
        marginTop: 20,
    },

    header: {
        marginLeft: 10,
        marginBottom: 20,
    },
    
    greet: {
        fontSize: 34,
        fontWeight: 'bold',
        marginLeft: 10,
    },

    option: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },

    optionText: {
        fontSize: 22,
        fontWeight: '400',
    },

    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20
    },

    signInLabel: {
        fontSize: 20,
        marginTop: 20,
        alignSelf: 'center',
        width: '60%',
        textAlign: 'center',
    },

    signOutButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        height: 50,
        marginHorizontal: 20,
        marginVertical: 30,
        alignSelf: 'center',
    },

    button: {
        width: "80%",
        height: 50,
        marginHorizontal: 20,
        marginVertical: 30,
        alignSelf: 'center',   
    },

    checkContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 20,
    }

});