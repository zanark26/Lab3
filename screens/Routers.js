import React from "react";
import { View,Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Contacts from './Contacts';
import Profile from './Profile';
import Favorites from "./Favorites";
import User from "./User";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utility/colors";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const getDrawerItemIcon = icon => ({tintColor})=> (
    <MaterialIcons name={icon} size={22} style={{color:tintColor}}/>
);
const getTabBarIcon = icon => ({tintColor}) => (
    <MaterialIcons name={icon} size={26} style={{color: tintColor}}/>
);
const Stack = createNativeStackNavigator();
const ContactsScreens = ()=>
{
    return (
            <Stack.Navigator
                initialRouteName="Contacts"
                screenOption={{
                    headerShown:false,
                    headerTintColor: 'white',
                    headerStyle: {backgroudColor: 'tomato'},
                    headerTitleAlign: 'center',

                }}
                >
                    <Stack.Screen name='Contacts' component = {Contacts} options={{title:"Contacts"}}/>
                    <Stack.Screen name='Profile' component={Profile} options={({route})=>
                    {
                        const {contact} = route.params;
                        const {name} = contact;
                        return {
                            title: name.split(' ')[0],
                            headerTintColor: 'white',
                            headerStyle: {
                                backgroudColor: colors.blue,
                            }
                        };
                    }
                }
                />
                </Stack.Navigator>
        
    );
}
const FavoritesScreens = ()=>
{
    return (
        <Stack.Navigator
            initialRouteName="Favorites"
            screenOptions={{
                headerShown:false
            }
            }
            >
                <Stack.Screen name='Favorites' component={Favorites} options={{title:"Favorites"}}/>
                <Stack.Screen name='Profile' component={Profile} options={{title:"Profile"}}/>
            </Stack.Navigator>
    );
}
const Drawer = createDrawerNavigator();
const DrawerNavigator =()=>
{
    return (
        <NavigationContainer>
            <Drawer.Navigator
            initialRouteName='ContactsScreens'>
                <Drawer.Screen name="ContactsScreens" component={ContactsScreens}
                options={{
                    drawerIcon: getDrawerItemIcon('list'),
                }}
                />
                <Drawer.Screen name="FavoritesScreens" component={FavoritesScreens}
                options={{
                    drawerIcon: getDrawerItemIcon('star'),
                }}
                />
                <Drawer.Screen name="UsersScreens" component={UserSreens}
                options={{
                    drawerIcon: getDrawerItemIcon('person'),
                }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const UserSreens = ({navigation})=>
{
    return (
        <Stack.Navigator
        initialRouteName="User">
            <Stack.Screen name='User' component={User}
            options={{
                headerTitle:"Me",
                headerTintColor:'white',
                headerStyle: {
                    backgroundColor:colors.blue,
                },
                headerRight: ()=>(
                    <MaterialIcons
                    name="settings"
                    size={24}
                    style={{color: 'white', marginRight: 10}}
                    onPress={()=>navigation.navigate('Options')}
                    />
                ),
            }}
            />
            <Stack.Screen name='Options' component={Options}
            options={{title:"Options"}}/>
        </Stack.Navigator>
    );
}
const Tab = createMaterialBottomTabNavigator();
const TabNavigator=()=>
{
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName='ContactsScreens'
            barStyle={{backgroundColor:colors.blue}}
            labeled={false}
            activeTintColor={colors.greyLight}
            inactiveColor={colors.geryDark}
            >
                <Tab.Screen name="ContactsScreens" component={ContactsScreens} options={{
                    tabBarIcon: getTabBarIcon('list'),
                }}
                />
                <Tab.Screen name="FavoritesScreens" component={FavoritesScreens}
                options={{
                    tabBarIcon: getTabBarIcon('star'),
                }}
                />
                <Tab.Screen name="UsersScreens" component={UserSreens}
                options={{
                    tabBarIcon: getTabBarIcon('person'),
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default DrawerNavigator;