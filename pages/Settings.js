import React, { useEffect, useState, createContext, useContext } from 'react';
import { SafeAreaView, View, Text, ScrollView, useColorScheme, Appearance, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styles } from '../styling/Settings';
import { ColorTheme } from '../styling/ColorTheme';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, signInWithCredential } from 'firebase/auth';

import { auth } from '../scripting/firebase';
import { set } from 'firebase/database';

const Stack = createNativeStackNavigator();

export default function SettingsScreens() {
    return (
        <Stack.Navigator name="SettingsScreens" screenOptions={
            {
                headerStyle: {
                    backgroundColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
                },
                headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black',
            }
        
        }>
            <Stack.Screen name="Settings" component={Settings} options={{headerShown: false}} />
            <Stack.Screen name="Account" component={AccountSettings} />
            <Stack.Screen name="Notifications" component={NotificationSettings} />
            <Stack.Screen name="Appearance" component={AppearanceSettings} />
        </Stack.Navigator>
    );
}

function Settings({ route, navigation }) {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const arrowColor = useColorScheme() == 'dark' ? "white" : "black";

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={[styles.greet, textTheme]}>Settings</Text>
                </View>
                <Pressable style={styles.option} onPress={() => navigation.navigate("Account")}>
                    <Text style={[styles.optionText, textTheme]}>Account Settings</Text>
                    <Text>
                        <AntDesign name="arrowright" size={24} color={arrowColor} />
                    </Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => navigation.navigate('Notifications')}>
                    <Text style={[styles.optionText, textTheme]}>Notification Settings</Text>
                    <Text>
                        <AntDesign name="arrowright" size={24} color={arrowColor} />
                    </Text>
                </Pressable>
                <Pressable style={styles.option} onPress={() => navigation.navigate('Appearance')}>
                    <Text style={[styles.optionText, textTheme]}>Appearance Settings</Text>
                    <Text>
                        <AntDesign name="arrowright" size={24} color={arrowColor} />
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

function AccountSettings() {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const arrowColor = useColorScheme() == 'dark' ? "white" : "black";

    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setLoggedIn(true);
            } else {
                setUser(null);
                setLoggedIn(false);
            }
        });
        setLoading(false);
    });

    async function getAppleCreds() {
        const idToken = await AppleAuthentication.signInAsync({
            requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
            });

        const provider = new OAuthProvider('apple.com');
        const credential = provider.credential({
            idToken: idToken.identityToken,
        });

        return credential;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {user ? (
                    <View style={{alignSelf: 'center'}}>
                        <Text style={[styles.label, textTheme, {textAlign: "center", fontSize: 26}]}>Account Information</Text>
                        <View style={{height: 20}} />
                        <Text style={[styles.value, textTheme, {textAlign: "center", fontSize: 20}]}>Name: {user.displayName}</Text>
                        <Text style={[styles.value, textTheme, {textAlign: "center", fontSize: 20}]}>Email: {user.email}</Text>
                        <View style={{height: 20}} />
                        <Pressable style={styles.signOutButton} onPress={() => {
                            AsyncStorage.clear();
                            auth.signOut();
                        }}>
                            <Text style={[styles.optionText, textTheme, {marginRight: 12}]}>Sign Out</Text>
                            <Text>
                                <AntDesign name="arrowright" size={24} color={arrowColor} />
                            </Text>
                        </Pressable>
                    </View>
                ) : (
                    <View>
                        <Text style={[styles.signInLabel, textTheme]}>Please sign in to view account settings.</Text>

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
                                            console.log('* Apple login result: ', result);
                                            setUser(result.user);
                                            setLoggedIn(true);
                                        })
                                        .catch((error) => {
                                            console.log('* Apple login error: ', error.message);
                                        });
                                } catch (e) {
                                }
                            }}
                        />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

function NotificationSettings() {
    const textTheme = useColorScheme() == 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const arrowColor = useColorScheme() == 'dark' ? "white" : "black";

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
            </ScrollView>
        </SafeAreaView>
    );
}

function AppearanceSettings() {
    const systemAppearance = useColorScheme(); // Get system appearance
    const [selectedIndex, setSelectedIndex] = useState(
        systemAppearance === 'dark' ? 2 : (systemAppearance === 'light' ? 1 : 0)
    );

    const textTheme = systemAppearance === 'dark' ? ColorTheme.textDark : ColorTheme.textLight;
    const arrowColor = systemAppearance === 'dark' ? 'white' : 'black';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>

                <Text style={[styles.label, textTheme]}>Theme</Text>
                <View style={styles.checkContainer}>
                    <SegmentedControl
                        values={['System', 'Light', 'Dark']}
                        selectedIndex={selectedIndex}
                        onChange={(event) => {
                            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
                            if (event.nativeEvent.selectedSegmentIndex === 0) {
                                Appearance.setColorScheme(null);
                            } else {
                                Appearance.setColorScheme(event.nativeEvent.selectedSegmentIndex === 1 ? 'light' : 'dark');
                            }

                            Appearance.setColorScheme(event.nativeEvent.selectedSegmentIndex === 0 ? null : (event.nativeEvent.selectedSegmentIndex === 1 ? 'light' : 'dark'))
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

