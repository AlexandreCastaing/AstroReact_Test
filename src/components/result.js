import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MyWebComponent() {
    return <WebView source={{ uri: 'http://google.com' }} incognito={true} />;
}
