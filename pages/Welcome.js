import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, Button, Alert, ActivityIndicator } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { styles } from '../styling/Welcome';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GoogleAuthProvider, FacebookAuthProvider, OAuthProvider, signInWithCredential, signInAnonymously } from 'firebase/auth';
import * as firebase from 'firebase/app';
import { auth } from '../scripting/firebase';

export default function Welcome(props) {

    const [fontsLoaded, fontError] = useFonts({
        'Open-Sans': require('../assets/fonts/Open_Sans/static/OpenSans-Bold.ttf'),
        'Madimi-One': require('../assets/fonts/Madimi_One/MadimiOne-Regular.ttf'),
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    async function getAppleCreds() {
        const idToken = await AppleAuthentication.signInAsync({
          requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
        });
      
        // const appleCredential = auth
        const provider = new OAuthProvider('apple.com');
        // Create sign in credentials with our token
        const credential = provider.credential({
          idToken: idToken.identityToken,
        });
      
        return credential;
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.text}>
                    <Text style={[styles.title, {fontFamily: "Madimi-One"}]}>JEWNITED</Text>
                    <Text style={[styles.slogan, {fontFamily: "Open-Sans"}]}>Against Antisemitism</Text>
            </View>

            <View style={styles.info}>

                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={styles.button}
                    onPress={async () => {
                        try {
                            let appleCreds = await getAppleCreds();

                            signInWithCredential(auth, appleCreds)
                                .then(async (result) => {
                                    await AsyncStorage.setItem('user', result.user.uid);
                                    props.onContinue();
                                })
                                .catch((error) => {
                                console.log('* Apple login error: ', error.message);
                                });
                        } catch (e) {
                        }
                    }}
                />

                <Button title="Continue as Guest" onPress={() => {
                    try {
                        props.onContinue();
                    } catch (e) {
                        Alert.alert('Error', e.message, [{ text: 'OK' }]);
                    }
                }
                } />

            </View>

            <Text style={styles.disclaimer}>By continuing, I agree to the Jewnited Terms of Service and Privacy Policy</Text>



        </SafeAreaView>
    );
}

