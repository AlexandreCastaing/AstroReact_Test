import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default class MyWebComponent extends Component {
  render() {
    return <WebView source={{ uri: 'http://192.168.1.95:8888/test3/index2.html' }} incognito={true} />;     
  }
}