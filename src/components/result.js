import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MyWebComponent(props) {

    const url = '192.168.1.66:80/test3/index.html?'
    +'datetime='+props.datetime
    +'&lat='+props.lat
    +'&lon='+props.lon
    +'&timezone='+props.tz+'';
    
    console.log("calling url: "+ url)
    return <WebView source={{ uri: url}} incognito={true} />;

    //exemple: http://localhost/test3/index.html?datetime=2020-02-04 22:22:02&lat=5&lon=6&timezone=1
}
