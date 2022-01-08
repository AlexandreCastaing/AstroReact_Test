import { createStackNavigator } from '@react-navigation/stack';
import MainView from "@views/mainView";
import SearchView from "@views/searchView";
import GeolocationView from "@views/geolocationView";

const Stack = createStackNavigator();

export default function MainNavigation() {
    return (
        <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={MainView} />
            <Stack.Screen name="Search" component={SearchView} />
            <Stack.Screen name="Map" component={GeolocationView} />
        </Stack.Navigator>
    );
}

