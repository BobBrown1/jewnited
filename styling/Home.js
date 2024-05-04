import {StyleSheet} from 'react-native';
import { Appearance, useColorScheme } from "react-native";

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
    
    greet: {
        fontSize: 34,
        fontWeight: 'bold',
    },

    topStory: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'top',

        borderRadius: 10,
        paddingBottom: 10, 
        
        minHeight: 350,
        margin: 10,
    },

    topStoryImageContainer: {
        width: '100%',
        overflow: 'hidden',
    }, 

    topStoryImage: {
        width: '100%',
        height: 250, 
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    topStoryTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
    },

    topStoryDate: {
        fontSize: 16,
        paddingHorizontal: 10,
    },

    topPost: {
        backgroundColor: 'rgb(229, 229, 234)',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },

    topPostHeader: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 4,
    },

    topPostTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    topPostText: {
        fontSize: 16,
    },

    counter: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
        textAlign: 'center',
    }, 

    dashboard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    card: {
        display: 'flex',
        flexBasis: 'calc(50% - 20px)', // Adjusted to account for margin
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#f2f2f2',
        
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderRadius: 10,

        width: '40%',
        padding: 20,
        margin: 10,
    },

    cardNumber: {
        fontSize: 48,
        fontWeight: 'bold',
    },

    cardText: {
        fontSize: 16,
    },

    reportCard: {
        display: 'flex',
        flexBasis: 'calc(100% - 20px)',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 50, 50, 0.08)',

        padding: 20,
        margin: 10,
    },

    reportCardText: {
        fontSize: 16,
        color: 'red',
    },

    recommendedReading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    recommendedReadingCard: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        justifyContent: 'top',
        overflow: 'hidden',

        backgroundColor: 'rgb(229, 229, 234)',
        borderRadius: 10,

        height: 200,
        width: '40%',
        margin: 10,
    },

    recommendedReadingImageContainer: {
        height: 140,
        width: '100%',
        overflow: 'hidden',
    },

    recommendedReadingImage: {
        minWidth: '100%',
        minHeight: '100%',
        objectFit: 'cover',
        width: 'auto',
        height: 'auto',
    },

    recommendedReadingText: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        height: 60,
        width: '100%',

        alignItems: 'center',
    },

    recommendedReadingTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    break: {
        height: 30,
    },
    
});