import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import DeviceOverviewScreen from '../screens/DeviceOverviewScreen'
import Colors from '../contants/Colors'
import GetAccessToken from '../screens/GetAccessToken'
import EditDeviceScreen from '../screens/EditDeviceScreen'

const Stack = createStackNavigator()

const DeviceNavigation: React.FC = () => {
  const getHeaderTitle = (route: any) => {
    return route.params.name
      ? route.params.name
      : 'Device Name'
  }

  return (
    <Stack.Navigator initialRouteName="Device">
      <Stack.Screen
        name="Device"
        component={DeviceOverviewScreen}
        options={{
          title: 'All Devices',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="GetAccessToken"
        component={GetAccessToken}
        options={{
          title: 'Get Access Token',
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="EditDevice"
        component={EditDeviceScreen}
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: 'white',
        })}
      />
    </Stack.Navigator>
  )
}

export default DeviceNavigation
