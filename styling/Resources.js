import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({

    /* Basic styling for the Resources page */
    
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

        greet: {
            fontSize: 34,
            fontWeight: 'bold',
        },

        subheader: {
            fontSize: 24,
        },

    /* Styling for Cards */

    topRec: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'top',
        overflow: 'hidden',

        borderRadius: 10,
        
        minHeight: 350,
        paddingBottom: 10,
        margin: 10,
    },
    
    topRecImageContainer: {
        height: 250,
        width: '100%',
        overflow: 'hidden',
    },

    topRecImage: {
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
        width: 'auto',
        height: 'auto',
    },

    topRecTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 6
    },

    topRecDescription: {
        fontSize: 16,
        paddingHorizontal: 10,
    },

    /* Styling for Other Cards */

    cards: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        overflow: 'hidden',
    },

    card: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'top',
        overflow: 'hidden',
    
        borderRadius: 10,

        width: '40%',
        margin: 10,
        paddingBottom: 10,
    },

    cardImageContainer: {
        height: 150,
        width: '100%',
        overflow: 'hidden',
    },

    cardImage: {
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
        width: 'auto',
        height: 'auto',
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
        paddingBottom: 6,
    },

    cardDate: {
        // stick to the bottom
        marginTop: 'auto',
        padding: 10,
        paddingTop: 6,
    },

    /* Styling for Links */

    linksHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        marginTop: 20,
    },

    links: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',

        margin: 5,
    },

    link: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'rgba(3, 123, 252, 0.1)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgb(3, 123, 252)',

        flex: 1,
        flexGrow: 1,
        minWidth: '40%',
        height: 60,

        margin: 5,

    },

    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    break: {
        height: 40,
    }


});