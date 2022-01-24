import {StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image} from "react-native";
import * as React from 'react';
import MembersRow from '@components/MembersRow';
import * as Linking from 'expo-linking';

export default function AboutView() {

    const data = [
        {id: 1, firstname: "Henri", lastname: "GOURGUE", email: "gourgueh@gmail.com", img: 'https://lh3.googleusercontent.com/ogw/ADea4I5alMdlxwIPoX9zZVOeKYB8PXWjFFAV9scsE9QG=s192-c-mo'},
        {id: 2, firstname: "Alexandre", lastname: "CASTAIGN", email: "acasta@gmail.com", img: 'https://lh3.googleusercontent.com/ogw/ADea4I5ogHPdexjtqD9iGCuOLKwYIJWad4di10UeoiOF=s192-c-mo'},
        {id: 3, firstname: "Michaela", lastname: "ALFOLDIOVA", email: "alfom@gmail.com", img: 'https://peuniverse.com/wp-content/plugins/buddypress-initial-letter-avatar/images/lato/512/latin_m.png'}
    ]

    const _renderItem = ({ item }) => {
        return (
            <MembersRow style={{padding: 5}}
                item={item}
            />
        );
    }

    const MY_GITHUB_URL = 'https://github.com/AlexandreCastaing/AstroReact_Test';
    const MY_GITHUB_TEXT = 'Follow us on Github';

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: "#ffffff"}}>
            <View style={styles.container}>
                <View style={styles.membersView}>
                    <Text style={styles.title}>Project Members :</Text>

                    <FlatList style={{top: 20}}
                        data={data}
                        renderItem={_renderItem}
                        keyExtractor={item => item.id.toString()}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />

                    <TouchableOpacity style={{top: 40, width: 170}} onPress={() => Linking.openURL(MY_GITHUB_URL)}>
                        <View style={{flexDirection: "row"}}>
                            <View style={{alignItems: "flex-start", height: 30, width: 40}}>
                                <Image style={{left: 0}} source={require('@assets/githubLogo.png')} style={{ flex: 1, height: 30, width: 40, resizeMode: 'contain' }} />
                            </View>
                            <View style={{justifyContent: "center", height: 30, width: 130}}>
                                <Text style={styles.linkText}>{MY_GITHUB_TEXT}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
        paddingBottom: 10
    },
    membersView: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        top: 20
    },
    githubView: {
        top: 30,
        width: "100%",
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});