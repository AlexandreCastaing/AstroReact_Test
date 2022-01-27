import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MyWebComponent() {
    return <WebView source={{ uri: '192.168.1.66:80/test3/index.html' }} incognito={true} />;
}
