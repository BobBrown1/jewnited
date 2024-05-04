import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator, Appearance, useColorScheme } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import * as SplashScreen from 'expo-splash-screen';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { RootSiblingParent } from 'react-native-root-siblings';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import Home from "./pages/Home";
import Tracker, { Post } from './pages/Tracker';
import Report from './pages/Report';
import Resources from './pages/Resources';
import SettingsScreens from './pages/Settings';
import Welcome from './pages/Welcome';
import Article from './pages/Article';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
      },
      headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black',
    }}>
      <Stack.Screen name="HomeScreen" component={Home} options={{
        headerShown: false,
        headerTitle: 'Home'
      }} />
      <Stack.Screen name="HomeArticle" component={Article} options={{
        headerTitle: 'Article',
        headerShown: true,
      }} />
      <Stack.Screen name="HomePost" component={Post} options={{
        headerTitle: 'Report',
        headerShown: true,
      }} />
    </Stack.Navigator>
  );
}

function ResourceScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
      },
      headerTintColor: useColorScheme() === 'dark' ? 'white' : 'black',
    }}>
      <Stack.Screen name="ResourceScreen" component={Resources} options={{
        headerShown: false,
        headerTitle: 'Resources'
      }} />
      <Stack.Screen name="ResourceArticle" component={Article} options={{
          headerTitle: 'Article'
        }} />
    </Stack.Navigator>
  );
}

function BottomNav({ theme }) {
  return (
    <Tab.Navigator screenOptions={{
        headerShown: false,
        initialRouteName: 'Home',
        tabBarActiveTintColor: '#037bfc',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {backgroundColor: 
          useColorScheme() === 'dark' ? '#121212' : '#ffffff',
          borderTopColor: useColorScheme() === 'dark' ? '#121212' : '#ffffff',
        },
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          )}}
      />
      <Tab.Screen
        name="Tracker"
        component={Tracker}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="Report"
        component={Report}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="exclamation-triangle" color={color} size={size} />
          )}}
      />
      <Tab.Screen
        name="Resources"
        component={ResourceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="book" color={color} size={size} />
          )}}
      />
      <Tab.Screen 
        name="SettingsHome" 
        component={SettingsScreens}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" color={color} size={size} />
          ),
          tabBarLabel: 'Settings'
        }}
      />
    </Tab.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();

setTimeout(() => {
  SplashScreen.hideAsync();
}, 2000);

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff"
  },
};

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#121212"
  },
};

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showHome: false,
    }
  }

  componentDidMount() {
    AsyncStorage.setItem('firstLoad', 'true');
    AsyncStorage.getItem('firstLoad').then((value) => {
      if (value == null || value == 'true') {
        AsyncStorage.setItem('firstLoad', 'true');
        this.setState({ showHome: false, isLoading: false });
      } else {
        AsyncStorage.setItem('firstLoad', 'false');
        this.setState({ showHome: true, isLoading: false});
      }
    });
  }

  _onContinue = () => {
    AsyncStorage.setItem('firstLoad', 'false').then(() => {
      this.setState({ showHome: true, isLoading: false});
    });
  }

  render() {

    Appearance.addChangeListener(({ colorScheme }) => {
      this.forceUpdate();
    });

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#037bfc" />
        </View>
      );
    } else if (!this.state.showHome) {
      return (
        <Welcome onContinue={this._onContinue} />
      );
    } else {
      return (
        <RootSiblingParent>
          <ActionSheetProvider>
            <NavigationContainer theme={
              Appearance.getColorScheme() === 'dark' ? DarkTheme : LightTheme
            }>
              <BottomNav />
            </NavigationContainer>
          </ActionSheetProvider>
        </RootSiblingParent>
      );
    }

  }
}
