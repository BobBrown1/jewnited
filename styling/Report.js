import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            flexDirection: 'column', 
            justifyContent: 'space-evenly',
        },
    
        content: {
            marginHorizontal: 10,
            marginTop: 20,
        },
    
        header: {
            marginLeft: 10,
        },

        headerText: {
            fontSize: 34,
            fontWeight: 'bold',
        },

        subHeader: {
            fontSize: 18,
            marginTop: 5,
        },

        form: {
            marginTop: 20,
            marginHorizontal: 10,

            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'stretch',
        },

        date: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },

        label: {
            fontSize: 18,
            marginTop: 10,
        },

        picker: {
            marginTop: 10,
            marginBottom: 20,
            zIndex: 1,
        },

        input: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 5,
            marginBottom: 10,
            padding: 10,
            borderRadius: 6,
        },

        image: {
            width: 100,
            height: 100,
            borderRadius: 6,
            margin: 5,
        },

        chosenImages: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',

            marginLeft: -5
        },

        submit: {
            backgroundColor: '#037bfc',
            padding: 10,
            borderRadius: 6,
            marginTop: 10,
            
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            color: 'white',
        },

        break: {
            height: 40,
        }
});