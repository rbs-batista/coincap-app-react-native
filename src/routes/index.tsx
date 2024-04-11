
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Checkout } from "../views/screens/checkout";
import { Index as Assets} from "../views/screens/assets/index";
import { Detail as AssetDetail} from "../views/screens/assets/detail";
import { Index as Stores} from "../views/screens/store/index";
import { Detail as StoreDetail} from "../views/screens/store/detail";
import { Index as Orders} from "../views/screens/order/index";
import { MaterialCommunityIcons } from "@expo/vector-icons";


export type RootTabParamList = {
    Assets: undefined;
    AssetDetail: {id: string}
    Checkout: {id: string, type: string}
    Store: undefined
    StoreDetail: {id: String, amount: string}
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
                name="AssetDetails"
                component={AssetDetail}
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
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={{                    
                    headerTitle: 'Ordens',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Stores"
                component={Stores}
                options={{                    
                    headerTitle: 'Meus Ativos',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="StoreDetail"
                component={StoreDetail}
                options={{                    
                    headerTitle: 'Detalhes',
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
                name="Home"
                component={Assets}
                options={{
                    tabBarIcon: ({color}) =><MaterialCommunityIcons name= "home-outline" color={color} size={23}/>,
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    title: 'Início',
                    headerTitle: 'Saldo',
                    headerTitleAlign: 'center',
                    headerLeft:() => <MaterialCommunityIcons name="menu" color={'#dde4eb'} size={25} style={{ marginLeft: 15 }} />,
                    headerRight: () => <MaterialCommunityIcons name="bell" color={'#dde4eb'} size={25} style={{ marginRight: 15 }} />,
                }}
            />
            <Tab.Screen
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setParams({ id: undefined });
                    },
                })}
                name="AssetDetails"
                component={AssetDetail}
                options={{
                    headerTitle: 'Detalhes',
                    headerTitleAlign: 'center',
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    tabBarButton: () => null,
                    headerLeft: () => 
                    <MaterialCommunityIcons 
                        name="chevron-left" 
                        color={'#dde4eb'} 
                        size={25} 
                        style={{ marginLeft: 15 }} 
                    />,
                }}
            />
            <Tab.Screen
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setParams({ id: undefined, type: undefined });
                    },
                })}
                name="Checkout"
                component={Checkout}
                options={{
                    headerTitle: 'Checkout',
                    headerTitleAlign: 'center',
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    tabBarButton: () => null,
                    headerLeft: () => 
                    <MaterialCommunityIcons 
                        name="chevron-left" 
                        color={'#dde4eb'} 
                        size={25} 
                        style={{ marginLeft: 15 }} 
                    />,
                }}
            />
            <Tab.Screen
                name="Stores"
                component={Stores}
                options={{
                    headerTitle: 'Meus Ativos',
                    headerTitleAlign: 'center',
                    title: 'Meus Ativos',
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    tabBarIcon: ({color}) =><MaterialCommunityIcons name= "folder-outline" color={color} size={23}/>,
                }}
            />            
            <Tab.Screen
                name="Orders"
                component={Orders}
                options={{
                    headerTitle: 'Ordens',
                    headerTitleAlign: 'center',
                    title: 'Ordens',
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    tabBarIcon: ({color}) => <MaterialCommunityIcons name= "text-box-outline" color={color} size={23}/>,
                }}
            />
            <Tab.Screen
                listeners={({ navigation }) => ({
                    focus: () => {
                        navigation.setParams({ id: undefined });
                    },
                })}
                name="StoreDetails"
                component={StoreDetail}
                options={{
                    headerTitle: 'Detalhes',
                    headerTitleAlign: 'center',
                    tabBarStyle: {paddingBottom: 5, backgroundColor: "#1d262f"},
                    tabBarButton: () => null,
                    headerLeft: () => 
                    <MaterialCommunityIcons 
                        name="chevron-left" 
                        color={'#dde4eb'} 
                        size={25} 
                        style={{ marginLeft: 15 }} 
                    />,
                }}
            />
        </Tab.Navigator>
    );
}

export const Routes = () => {

    return (
        <NavigationContainer theme={Theme}>
            {/* <MainStackNavigator /> */}
            <BottomTabNavigator />
        </NavigationContainer>
    )
}