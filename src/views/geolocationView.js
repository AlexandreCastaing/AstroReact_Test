import {StyleSheet, Text, View} from "react-native";

export default function GeolocationView() {
    return(
        <View style={styles.container}>
            <Text> Map view </Text>
        </View>
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
});
