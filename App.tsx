import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import DeviceNavigation from './src/navigation/DeviceNavigation'
import configureAppStore from './src/store'

const { store, persistor } = configureAppStore()

const App = () => {  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <DeviceNavigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
