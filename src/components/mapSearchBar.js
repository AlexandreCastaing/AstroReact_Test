import React, {useState,useEffect,useMemo,useCallback} from "react";
import {StyleSheet, View} from "react-native";
import {Icon, Input, List} from "native-base";
import {FontAwesome} from "@expo/vector-icons";
import axios from "axios";
import debounce from 'lodash.debounce';
import _ from 'lodash';

export default function MapSearchBar({onLocationChange}) {
    const [searchValue,setSearchValue] = useState("");
    const [results,setResults] = useState([]);
    const [showResults,setShowResults] = useState(false);

    useEffect(() => {

        const delayDebounceFn = setTimeout(() => {
            console.log("search debounce ",searchValue)
            // Send Axios request here
            if (!searchValue.length) {
                setShowResults(false);
            } else {
                axios.get("http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix="+searchValue+"&hateoasMode=false&limit=5&offset=0&sort=-population").then(res => {
                    console.log("result for '"+searchValue+"' : ",res.data.data.length);
                    if (res.data.data) {
                        setShowResults(true);
                        setResults(res.data.data);
                    }
                })
            }
        }, 300)

        return () => clearTimeout(delayDebounceFn)

    },[searchValue]);

    return (
        <View>
            <Input
                style={styles.searchInput}
                placeholder="Chercher une ville"
                value={searchValue}
                autocorrect={false}
                size="lg"
                variant="rounded"
                onChangeText={text => setSearchValue(text)}
                InputLeftElement={
                    <Icon
                        as={FontAwesome}
                        name="search"
                        size={5}
                        ml="2"
                        color="muted.400"
                        style={styles.searchBarIcon}
                    />
                }
            />
            {
                showResults && <List spacing={2} my={2} style={styles.resultList}>
                    { results.map(location => (<List.Item key={location.id} >{location.city}, {location.region} ({location.country})</List.Item>))}
                </List>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    searchInput: {
        minWidth: '95%',
        backgroundColor: '#ffffff',
    },
    searchBarIcon: {
        // minWidth: '100%',
        minHeight: '100%',
        backgroundColor: '#ffffff'
    },
    resultList: {
        borderWidth: 0,
        overflow: "hidden"
    }
})
