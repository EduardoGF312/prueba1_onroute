import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Situaciones from "../screens/Situaciones";
import EditSituacion from "../screens/EditSituacion"

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Situaciones">
        <Stack.Screen name="Situacioness" component={Situaciones} options={{headerShown:false}}/>
        <Stack.Screen name="EditSituacion" component={EditSituacion} options={{headerShown:false}}/>
    </Stack.Navigator>
);

export default AppNavigator;
