import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, { useState, useEffect, useCallback } from 'react';

export default function TimeSlider({parentCallback}) {

  const returnToCenter = false;
  const minValue =  -20000; // -100000
  const maxValue = 20000; // 100000

  const [value] = useState(0);
  const [multiSliderValue, setMultiSliderValue] = useState([0]);

  const [timeValue] = useState(0);

  const multiSliderValuesChange = (values) => {
    parentCallback(values);
    return setMultiSliderValue(values);
  };
  
  const sliderGradiantImage = require('@assets/slider/sliderGradiant.png')

  return (
    <View style={styles.container}>

      <Image
        style={styles.datetimeGraduation}
        source={sliderGradiantImage}
      />
     <View>
               
      <MultiSlider
          markerStyle={{
            ...Platform.select({
              ios: {
                height: 30,
                width: 30,
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 3
                },
                shadowRadius: 1,
                shadowOpacity: 0.1
              },
              android: {
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#FFFFFF'
              }
            })
          }}
          pressedMarkerStyle={{
            ...Platform.select({
              android: {
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#BBBBBB'
              }
            })
          }}
          selectedStyle={{
            backgroundColor: '#AAAAAA'
          }}
          trackStyle={{
            backgroundColor: '#AAAAAA'
          }}
          touchDimensions={{
            height: 80,
            width: 40,
            borderRadius: 20,
            slipDisplacement: 40
          }}
          values={[multiSliderValue[0]]}
          sliderLength={280}
          onValuesChange={multiSliderValuesChange}
          onValuesChangeFinish={()=>{if(returnToCenter == true) multiSliderValuesChange([0])}} //withTiming(0, config),
          min={minValue}
          max={maxValue}
          allowOverlap={false}
          minMarkerOverlapDistance={10}
        />
            </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    color: '#f03',
    alignItems: 'center',
    width: 300,
  },
  text1: {
    color: '#FFF',
    fontSize: 16,
  },
  datetimeGraduation:{
    width: 300,
    resizeMode: 'stretch',
  }
});
