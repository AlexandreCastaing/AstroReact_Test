import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default function SearchView({navigation}) {
    const onPress = () => navigation.navigate('Map');
    return(
        <View style={styles.container}>
            <Text> Search view </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onPress}
            >
                <Text>Map</Text>
            </TouchableOpacity>
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
