'use strict';
import React, { Component } from 'react';

import {
    AppRegistry,
} from 'react-native';

import HelloWorld from './communication1.js';
import Communication from './communication2.js';
import Communication3 from './communication3.js';
import LoginScreen from "./Setting/LoginScreen.js";
import SettingScreen from "./Setting/SettingScreen.js";
import FragmentScreen from "./Setting/FragmentScreen.js";
import RecognizeScreen from "./Setting/RecoginzeScreen.js";

AppRegistry.registerComponent('RecognizeScreen', () => RecognizeScreen);
AppRegistry.registerComponent('Communication', () => Communication);
AppRegistry.registerComponent('MyReactNativeApp', () => HelloWorld);
AppRegistry.registerComponent('Communication3', () => Communication3);
AppRegistry.registerComponent('LoginScreen', () => LoginScreen);
AppRegistry.registerComponent('SettingScreen', () => SettingScreen);
AppRegistry.registerComponent('FragmentScreen', () => FragmentScreen);
// react-native bundle --platform android --dev false --entry-file index.js --bundle-output app/src/main/assets/index.android.bundle --assets-dest app/src
///main/res
