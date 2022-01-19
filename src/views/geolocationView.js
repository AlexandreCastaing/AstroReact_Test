import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, Text, View, Keyboard, Dimensions} from "react-native";
import * as Location from 'expo-location';
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
// import { NativeBaseProvider, Icon } from "native-base";
import {NativeBaseProvider, Box, Input, Icon, Button, Label, Picker, Center} from 'native-base';
import axios from "axios";
import MapSearchBar from "@components/mapSearchBar";
import IconButton from "native-base/src/components/composites/IconButton/index";

export default function GeolocationView() {
    const [region, setRegion] = useState({lat: 44.837987, lon: -0.57922, latD: 0.2, lonD: 0.2, name: ""});
    const [errorMsg, setErrorMsg] = useState(null);
    const [isCalculating, setIsCalculating] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const search = (text) => {
        // const newData = copyMarkers.filter(item => {
        //     let itemName = `${item.name.toUpperCase()}`,
        //         itemType = CATEGORIES[item.type].label.toUpperCase(),
        //         textData = text.toUpperCase();
        //     return itemName.indexOf(textData) > -1 || itemType.indexOf(textData) > -1;
        // });
        //
        // http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=Pezin&hateoasMode=false&limit=5&offset=0&sort=-population
        setSearchValue(text);
        axios.get("http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix="+text+"&hateoasMode=false&limit=5&offset=0&sort=-population").then(res => {
            console.log("result for '"+text+"' : ",res.data);
        })
        // setCopyMarkers(newData);
        console.log("search",text);
    };

    const saveGeolocation = (coords) => {
        console.log("save geoloc",coords);
    }

    const changeMarkerPosition = (coords) => {
        setRegion({lat: coords.latitude,lon: coords.longitude,latD: 0.2,lonD: 0.2, name: coords.name})
    }
    const getCurrentPosition = () => {
        return Location.getCurrentPositionAsync({});
    }

    const centerMapCurrentPosition = async () => {
        const location = await getCurrentPosition();
        setRegion({lat: location.coords.latitude, lon: location.coords.longitude, latD: 0.2, lonD: 0.2, name: ""})
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await getCurrentPosition();
            console.log('iciiiiii',location);
            if (location) {
                axios.post("https://json.astrologyapi.com/v1/timezone_with_dst",{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    date: "01-13-2022"
                }, { headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Basic NjE4NTY3OjU0MTc3ZTJmOTE0N2UxMTdjMjVjNWYwODY4OThhM2E5"
                    }}).then(res => {
                    console.log('axios get timezone',res.data);
                })
            }

            setRegion({lat: location.coords.latitude, lon: location.coords.longitude, latD: 0.2, lonD: 0.2, name: ""});
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
                                <Icon as={FontAwesome} name="map-marker" style={{fontSize: 30, color: 'red'}} />
                            </View>
                        </MapView.Marker>
                    </MapView>
                }
                <View style={styles.searchView}>
                    <MapSearchBar onLocationChange={changeMarkerPosition}/>
                </View>
                <View style={styles.validateButtonView}>
                    <Button block
                            colorScheme="green"
                            size="lg"
                            style={styles.validateButton}
                            onPress={() => saveGeolocation()}
                            leftIcon={<Icon name="check" as={FontAwesome} color="white" style={{ fontSize: 23}}/>}
                    >
                        Valider la localisation
                    </Button>
                    <IconButton variant="solid"
                                borderRadius="full"
                                style={styles.positionButton}
                                icon={<Icon as={MaterialCommunityIcons} name="target" style={{fontSize: 25, color: 'white', paddingLeft: 3}} />}
                                onPress={() => {centerMapCurrentPosition()}}
                    />
                </View>
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
    searchbar: {
        // marginBottom: 20,
        // paddingLeft: 10,
        backgroundColor: '#ffffff',
        height: 45,
    },
    searchView: {
        backgroundColor: '#ffffff',
        borderRadius: 25,
        position: 'absolute',
        top: 10,
        width: '90%'
    },
    searchInput: {
        minWidth: '95%',
        backgroundColor: '#ffffff',
    },
    searchBarIcon: {
        // minWidth: '100%',
        minHeight: '100%',
      backgroundColor: '#ffffff'
    },
    validateButtonView: {
        display: 'flex',
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    validateButton: {
        marginHorizontal: 10
    },
    positionButton: {
        marginLeft: 30
    }
});
