import {StyleSheet, Text, Image, TouchableOpacity, View, Button} from "react-native";
import TimeSlider from "@components/timeSlider";

import React, { useState, useEffect, useCallback } from 'react';

import MyWebComponent from "@components/result";

export default function SearchView({route, navigation}) {

    const delayRequest = 500; //ms
    const onPress = () => navigation.navigate('Map');
    const [dateTimeValue, setDateTimeValue] = useState(Date.now());
    const [dateTimeOffset, setDateTimeOffset] = useState(0);
    const [timerState, setTimerState] = useState(null);

    const [cityName, setCityName] = useState("Unknown");
    
    const { lat, lon, name } = route.params; // = {lat: 0, lon: 0, name: ""}

    const addTime = (_value) => {
        const newTime = dateTimeValue + _value;
        setDateTimeValue(newTime); 
        return newTime;
    }
    const setDate = (_value) => {
        setDateTimeOffset(_value);

        const timeTick = _value;
        const date = new Date(2022,1,1).setMinutes(timeTick);

        setDateTimeValue(date);
    }
    
    const getDateText = () => {
        const currentDate = new Date(dateTimeValue);

        const date = currentDate.getDate();
        const month = currentDate.getMonth(); 
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const dateString = date + "-" +(month + 1) + "-" + year+ "  " 
        + hour.toString().padStart(2, '0')+ ":"
        + minute.toString().padStart(2, '0');

        return dateString;
    }

    const getDateLink = () => {
        const currentDate = new Date(dateTimeValue);

        const date = currentDate.getDate();
        const month = currentDate.getMonth(); 
        const year = currentDate.getFullYear();
        const hour = currentDate.getHours();
        const minute = currentDate.getMinutes();
        const dateString = year + "-" +(month + 1).toString().padStart(2, '0') + "-" + date+ " " 
        + hour.toString().padStart(2, '0')+ ":"
        + minute.toString().padStart(2, '0')+ ":";
        + "00";

        return dateString;
    }

    const callback = useCallback((count) => {

        setDate(count);
 
    }, []);

    let timer = null;
    useEffect(() => {
            timer = setInterval(() => {
                  
            if(name == undefined || name == "")
             setCityName("Unknown") 
            else 
             setCityName(name);      

            }, delayRequest);
            setTimerState(timer);
        
            return () => {
                clearTimeout(timer);
            }
        }, []);

    const MapLogoImage = require('@assets/map.png')
    return(
        <View style={styles.container}>


            <View style={styles.resultView}>
                {/* <Image style={styles.resultImage} source={require('@assets/loading.png')}></Image> */}
                <MyWebComponent datetime={getDateLink()} lat={lat} lon={lon} tz={"1"}></MyWebComponent>
            </View>
            
            
            <Text  style={styles.timeDisplayButton}> {getDateText()} </Text>
            
            <TimeSlider style={styles.timeSlider } parentCallback={callback}/>

            <View style={styles.borderLine}></View>
            <TouchableOpacity
                style={styles.buttonMap}
                onPress={onPress}
            >
               <View style={styles.borderBtn}></View>

               <Text style={styles.cityName}> {cityName} </Text>

               <Image
                    style={styles.logoMap}
                    source={MapLogoImage}
                />

                <View style={styles.borderBtn}></View>

            </TouchableOpacity>


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#223366',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMap: {
        alignItems: "center",
        backgroundColor: "#334488",
        padding: 10,
        flexDirection:'row',
    },
    timeDisplayButton: {
        alignItems: "center",
        backgroundColor: "#223366",
        color: "#fff",
        fontSize: 27,
        padding: 15,
        margin: 25
    },
    timeSlider: {
        padding: 10,
        margin: 15
    },
    logoMap: { 
        width: 65,
        height: 65,
        padding: 0,
        margin: 0
    },
    cityName: {
        alignItems: "center",
        color: "#fff",
        fontSize: 27,
        padding: 0,
    },
    borderBtn: {
        padding: 12,
        margin: 12      
    },
    borderLine: {
        padding: 4,
        margin: 4
    },
    resultView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "55%"
    },
});
