import { Appearance, useColorScheme } from "react-native";
import React, { createContext, useState, useContext } from 'react';

export const ColorTheme = {
    cardLight: {
        backgroundColor: 'rgb(229, 229, 234)',
    },

    cardDark: {
        backgroundColor: 'rgb(40, 40, 40)',
    },

    textLight: {
        color: 'black',
    },

    textDark: {
        color: 'white',
    },

    inputLight: {
        backgroundColor: 'rgb(229, 229, 234)',
    },

    inputDark: {
        backgroundColor: 'rgb(40, 40, 40)',
    },

    buttonLight: {
        backgroundColor: 'rgb(0, 122, 255)',
    },

    buttonDark: {
        backgroundColor: 'rgb(10, 132, 255)',
    },
};