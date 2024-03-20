import { Home, Assets, Order, Details } from '../views/screens';
import React from "react"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar, View } from "react-native";
 
export type RootTabParamList = {
    Home: undefined;
    Assets: undefined;
    Order: undefined;
    Details: undefined;
}
 
const Tab = createBottomTabNavigator<RootTabParamList>();
 
const Theme = {
    ...DefaultTheme,
     dark: true,
     colors: {
        ...DefaultTheme.colors,
         card:'#131a20',
         primary: '#dde4eb',
         background: '#131a20',
         text: '#dde4eb',
         border: '#1c2329',
         notification: '#dde4eb',
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
                                <MaterialCommunityIcons name= "home-outline" color={color} size={23}/>
                            ),
                            title: 'Início',
                            headerTitleAlign: 'center',
                        
                        }
                    }
                />
                <Tab.Screen
                    name="Assets"
                    component={Assets}
                    options={
                        {
                            tabBarIcon: ({color}) =>(
                                <MaterialCommunityIcons name= "folder-outline" color={color} size={23}/>
                            ),
                        title: 'Meus Ativos',
                        headerTitleAlign: 'center',
                        }
                    }
                />
                <Tab.Screen
                    name="Order"
                    component={Order}
                    options={
                        {
                            tabBarIcon: ({color}) =>(
                                <MaterialCommunityIcons name= "text-box-outline" color={color} size={23}/>
                            ),
                        title: 'Ordens',
                        headerTitleAlign: 'center',
                        }
                    }
                />
                <Tab.Screen
                    name="Details"
                    component={Details}
                    options={
                        {
                        title: 'Detalhes',
                        headerTitleAlign: 'center',
                        tabBarButton: () => null
                        }
                    }
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}