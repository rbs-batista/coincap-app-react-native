import React from "react"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Home, Order } from '../views/screens';
 
export type RootTabParamList = {
    Home: undefined;
    Order: undefined;
}
 
const Tab = createBottomTabNavigator<RootTabParamList>();
 
const Theme = {
    ...DefaultTheme,
     colors: {
        ...DefaultTheme.colors,
         primary: '#63b7ff',
         background: '#131a20'
     },
}
 
 
export const Routes = () => {
    return(
        <NavigationContainer theme={Theme}>
            <Tab.Navigator>
                <Tab.Screen
                name="Home"
                component={Home}
                options={
                    {
                        tabBarIcon: ({color}) =>(
                            <MaterialCommunityIcons name= "home" color={color} size={26}/>
                        ),
                       title: 'Lista Ativos'
                    }
                }/>
                <Tab.Screen
                name="Order"
                component={Order}
                options={
                    {
                        tabBarIcon: ({color}) =>(
                            <MaterialCommunityIcons name= "order-bool-ascending" color={color} size={26}/>
                        ),
                       title: 'Pedidos de compra'
                    }
                }/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}