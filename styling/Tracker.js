import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    
        container: {
            flex: 1,
            flexDirection: 'column', 
            justifyContent: 'space-evenly',
        },
    
        content: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: 20,
        },

        header: {
        },
 
        greet: {
             fontSize: 34,
             fontWeight: 'bold',
             alignSelf: 'flex-start',
        },

        filters: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 10,
            zIndex: 1,
        },
        
        posts: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        },

        postContent: {  
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            padding: 20,
        },

        card: {
            width: '100%',
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
        },

        cardTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 4,
        },

        cardBody: {
            fontSize: 16,
            marginBottom: 4,
        },

        cardImages: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 5,
        },

        cardCarouselContainer: {
            width: '100%',
            overflow: 'hidden',
            borderRadius: 10,
            marginVertical: 5,
        },

        cardImage: {
            width: '100%',
            height: 200,
            marginVertical: 5,
        },

        cardFooter: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },

        cardDate: {
            fontSize: 14,
            color: 'gray',
        },

        cardMore: { 
            marginTop: 2,
            color: 'gray',
            textAlign: 'right',
        },

        postUser: {
            fontSize: 18,
            marginBottom: 10,
            color: 'gray',
        },

        postTitle: {
            fontSize: 22,
            fontWeight: 'bold',
            textAlign: 'left',
            marginBottom: 10
        },

        postBody: {
            fontSize: 18,
            textAlign: 'left'
        },

        postImages: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 10,
        },

        postImage: {
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginVertical: 10,
        },

        videoPressable: {
            width: '100%',
            height: 200,
            borderRadius: 10,
            marginVertical: 10,
        },


        addReportContainer: {
            backgroundColor: 'rgb(3, 123, 252)',
            borderColor: 'white',
            borderWidth: 2,

            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,

            height: 60,
            width: 60,
            borderRadius: '50%',

            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

            position: 'absolute',
            bottom: 30,
            right: 30,
            zIndex: 1,
            
        },

    
    
    });