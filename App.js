import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import NoteEditorScreen from './src/screens/NoteEditorScreen';
import TagScreen from './src/screens/TagScreen';
import SearchScreen from './src/screens/SearchScreen';
import StatsScreen from './src/screens/StatsScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: '#2D3436',
          headerTitleStyle: styles.headerTitle,
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ 
            title: 'FlowMo',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="NoteEditor" 
          component={NoteEditorScreen}
          options={{ 
            title: '记录',
            presentation: 'modal',
          }}
        />
        <Stack.Screen 
          name="Tags" 
          component={TagScreen}
          options={{ title: '标签' }}
        />
        <Stack.Screen 
          name="Search" 
          component={SearchScreen}
          options={{ title: '搜索' }}
        />
        <Stack.Screen 
          name="Stats" 
          component={StatsScreen}
          options={{ title: '统计' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: '设置' }}
        />
      </Stack.Navigator>
      <StatusBar style="dark" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
  },
});
