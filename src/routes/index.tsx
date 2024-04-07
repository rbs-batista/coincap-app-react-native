import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Checkout } from "../views/screens/assets/checkout";
import { Detail } from "../views/screens/assets/detail";
import { Index as Assets} from "../views/screens/assets/index";
import { Index as Orders} from "../views/screens/order/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export type RootTabParamList = {
    // List: undefined;
    // Detail: undefined;
    // MyAssets: undefined;
    Orders: undefined;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Theme = {
    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme.colors,
        card: '#131a20',
        primary: '#518ef1',
        background: '#131a20',
        text: '#dde4eb',
        border: '#1c2329',
        notification: '#dde4eb',
    },
}

function MainStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Assets}
                options={{
                    headerTitle: 'Saldo',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Details"
                component={Detail}
                options={{
                    headerTitle: 'Detalhes',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Checkout"
                component={Checkout}
                options={{
                    headerTitle: 'Checkout',
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
  }
  
function BottomTabNavigator() {
return (

    <Tab.Navigator>
    <Tab.Screen
        name="Orders"
        component={Orders}
        options={
            {
                tabBarIcon: ({color}) => <MaterialCommunityIcons name= "text-box-outline" color={color} size={23}/>,
                title: 'Ordens',
                tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                headerTitleAlign: 'center',
            }
        }
    />
</Tab.Navigator>
);
}
export const Routes = () => {

    return (
        <NavigationContainer theme={Theme}>
            <MainStackNavigator />
            {/* <BottomTabNavigator /> */}

            {/* <Tab.Navigator>
                <Tab.Screen
                    name="List"
                    component={List}
                    options={
                        {
                            tabBarIcon: ({color}) =><MaterialCommunityIcons name= "home-outline" color={color} size={23}/>,
                            tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                            title: 'Início',
                            headerTitle: 'Saldo',
                            headerTitleAlign: 'center',
                            headerLeft:() => <MaterialCommunityIcons name="menu" color={'#dde4eb'} size={25} style={{ marginLeft: 15 }} />,
                            headerRight: () => <MaterialCommunityIcons name="bell" color={'#dde4eb'} size={25} style={{ marginRight: 15 }} />,
                        
                        }
                    }
                />
                <Tab.Screen
                    name="MyAssets"
                    component={MyAssets}
                    options={
                        {
                            tabBarIcon: ({color}) =><MaterialCommunityIcons name= "folder-outline" color={color} size={23}/>,
                            title: 'Meus Ativos',
                            tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                            headerTitleAlign: 'center',
                        }
                    }
                />
                <Tab.Screen
                    name="Order"
                    component={Order}
                    options={
                        {
                            tabBarIcon: ({color}) => <MaterialCommunityIcons name= "text-box-outline" color={color} size={23}/>,
                            title: 'Ordens',
                            tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                            headerTitleAlign: 'center',
                        }
                    }
                />
                <Tab.Screen
                    name="Detail"
                    component={Detail}
                    options={
                        {
                            title: 'Detalhes',
                            headerTitleAlign: 'center',
                            tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                            headerLeft: () => 
                                <MaterialCommunityIcons 
                                    name="chevron-left" 
                                    color={'#dde4eb'} 
                                    size={25} 
                                    style={{ marginLeft: 15 }} 
                                />,
                            tabBarButton: () => null
                        }
                    }
                />
            </Tab.Navigator> */}
        </NavigationContainer>
    )
}