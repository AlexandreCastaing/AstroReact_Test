import {StyleSheet, Text, Image, TouchableOpacity, View, Button} from "react-native";
import TimeSlider from "@components/timeSlider";

import React, { useState, useEffect, useCallback } from 'react';


//let tickInterval = true;
//setInterval(() => tickInterval = true, 100);


export default function SearchView({navigation}) {

    const onPress = () => navigation.navigate('Map');
    const [dateTimeValue, setDateTimeValue] = useState(Date.now());
    const [dateTimeOffset, setDateTimeOffset] = useState(0);
    const [timerState, setTimerState] = useState(null);

    const [cityName, setCityName] = useState("Unknown");
    
    
    const addTime = (_value) => {
        const newTime = dateTimeValue + _value;
        setDateTimeValue(newTime); 
        return newTime;
    }
    const setDate = (_value) => {
        setDateTimeOffset(_value);

        const timeTick = _value / 35;
        const date = new Date(2022,1,1).setMinutes(timeTick);
        setDateTimeValue(date);
    }
    const getDateText = () => {


        let currentDate = new Date(dateTimeValue);

        let date = currentDate.getDate();
        let month = currentDate.getMonth(); 
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minute = currentDate.getMinutes();
        let dateString = date + "-" +(month + 1) + "-" + year+ "  " 
        + hour.toString().padStart(2, '0')+ ":"
        + minute.toString().padStart(2, '0');

        return dateString;
    }

    const callback = useCallback((count) => {
        //const newTimeValue = Math.pow(count, 3) 
        /// 5000  / 5000  / 5000

        //addTime(newTimeValue);

        setDate(count);

        //setDateTimeOffset(newTimeValue);
        //console.log(">+  " +newTimeValue +"  "+ dateTimeOffset);
        //setDateTimeValue(dateTimeValue + dateTimeOffset);
        
    }, []);

    let timer = null;
    useEffect(() => {
            timer = setInterval(() => {
                console.log(">>  " +getDateText() + "  " + dateTimeOffset);
                //setDateTimeValue(dateTimeValue + dateTimeOffset);
            }, 500 * 1);
            setTimerState(timer);
        
            return () => {
                clearTimeout(timer);
            }
        }, []);

    const MapLogoImage = require('@assets/map.png')

    return(
        <View style={styles.container}>
            <Text> Search view </Text>
            
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
    }
});
