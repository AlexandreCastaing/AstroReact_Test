import {View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function MainView({navigation}) {

    const onSearchPress = () => navigation.navigate('Search');
    const onHistoPress = () => console.log('Not coded');
    const onAboutPress = () => navigation.navigate('About');

    return(
        <View style={styles.container}>

            <View style={styles.resultView}>
                <Image style={styles.resultImage} source={require('@assets/loading.png')}></Image>
            </View>

            <View style={styles.navigationView}>
                <TouchableOpacity style={styles.primaryButton} onPress={onSearchPress}>
                    <Text style={styles.searchText}>Reacherche Astro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryButton} onPress={onHistoPress}>
                    <Text style={styles.searchText}>Historique des recherches</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton} onPress={onAboutPress}>
                    <Text style={styles.linkText}>A propos</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: "column"
    },
    primaryButton: {
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#00BCD4',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: "80%",
    },
    searchText: {
        color:'#fff',
        textAlign:'center',
        fontSize: 20
    },
    resultView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "30%"
    },
    resultImage: {
        flex: 1, height: 90, width: 90, resizeMode: 'contain'
    },
    navigationView: {
        flexDirection: "column",
        height: "70%",
        width: "100%",
        alignItems: "center"
    },
    linkButton: {
        top: 10,
        textDecorationLine: 'underline',
        borderColor: '#fff',
    },
    linkText: {
        textDecorationLine: 'underline'
    }
});

