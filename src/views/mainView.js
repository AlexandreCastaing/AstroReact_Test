import {View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function MainView({navigation}) {
    const onPress = () => navigation.navigate('Search');
    return(
        <View style={styles.container}>
            <Text> Main view </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text>Search</Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#223366',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});

