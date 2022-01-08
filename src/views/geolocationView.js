import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Text, View, Platform, Dimensions} from "react-native";
import * as Location from 'expo-location';
import { NativeBaseProvider, Icon } from "native-base";

export default function GeolocationView() {
    const [region, setRegion] = useState({lat: 44.837987, lon: -0.57922, latD: 0.1, lonD: 0.1,});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isCalculating, setIsCalculating] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log('iciiiiii',location);
            setRegion({lat: location.coords.latitude, lon: location.coords.longitude, latD: 0.1, lonD: 0.1,})
            setIsCalculating(false)
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (region) {
        text = JSON.stringify(region);
    }
    return(
        <NativeBaseProvider>
            <View style={styles.container}>
                <Text>{text}</Text>
                { isCalculating ?
                    <Text> Loading ... </Text>
                    : <MapView style={styles.map}
                               region={{
                                   latitude:region.lat,
                                   longitude:region.lon,
                                   latitudeDelta:region.latD,
                                   longitudeDelta:region.lonD
                               }}
                    >
                        <MapView.Marker coordinate={{ latitude: region.lat, longitude: region.lon}}
                        >
                            <View>
                                <Icon type="FontAwesome" name="home" style={{fontSize: 35, color: 'red'}} />
                            </View>
                        </MapView.Marker>
                    </MapView>
                }
            </View>
        </NativeBaseProvider>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
