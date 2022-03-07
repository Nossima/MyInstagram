import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Navigation } from './navigation';
import { EditProfileScreen } from '../screens/editProfileScreen';
import { HomeScreen } from '../screens/homeScreen';
import { ProfileScreen } from '../screens/profileScreen';
import { Login } from '../screens/authentification/login';
import { Register } from '../screens/authentification/register';
import { OnBoardingScreen } from '../screens/onBoarding';
import { DmList } from '../screens/dmList';
import { UserList } from '../screens/userList';
import { DmConversation } from '../screens/dmConversation';
import { CommentSection } from '../screens/commentSection';
import { FriendRequestSection } from '../screens/friendRequestSection';
import { CreatePost } from '../screens/Post/CreatePost';
import { SearchScreen } from '../screens/searchScreen';
import { FollowScreen } from '../screens/followScreen';

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName={Navigation.Login} screenOptions={{ headerShown: false}}>
            <Stack.Screen name={Navigation.OnBoarding} component={OnBoardingScreen} />
            <Stack.Screen name={Navigation.EditProfile} component={EditProfileScreen} />
            <Stack.Screen name={Navigation.Home} component={HomeScreen} />
            <Stack.Screen name={Navigation.Search} component={SearchScreen} />
            <Stack.Screen name={Navigation.Profile} component={ProfileScreen} />
            <Stack.Screen name={Navigation.Login} component={Login}/>
            <Stack.Screen name={Navigation.Register} component={Register}/>
            <Stack.Screen name={Navigation.DmConversation} component={DmConversation}/>
            <Stack.Screen name={Navigation.DmList} component={DmList}/>
            <Stack.Screen name={Navigation.UserList} component={UserList}/>
            <Stack.Screen name={Navigation.CommentSection} component={CommentSection}/>
            <Stack.Screen name={Navigation.FriendRequestSection} component={FriendRequestSection}/>
            <Stack.Screen name={Navigation.CreatePost} component={CreatePost} />
            <Stack.Screen name={Navigation.Follow} component={FollowScreen} />
        </Stack.Navigator>
    );
}