
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const MembersRow = (props) => {

    const { item } = props;

    return (
        <View style={{ flexDirection: 'row', width: "75%", left: 5}}>
            <View style="30%">
                <Image style={styles.image} source={{uri: item.img}} style={{ flex: 1, height: 90, width: 90, resizeMode: 'contain' }} />
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: "100%",
                left: 5}}>

                <Text>{item.firstname} {item.lastname} - {item.email}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1, height: 90, width: 90, resizeMode: 'contain',
        borderRadius: 40,
    }
});

export default MembersRow;
