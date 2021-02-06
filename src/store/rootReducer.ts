import { persistCombineReducers } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import AsyncStorage from '@react-native-async-storage/async-storage'

import deviceReducer from './slicers/device'
import tokenReducer from './slicers/accessToken'

const storeOptions = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  stateReconciler: autoMergeLevel2,
  whitelist: ['token'],
  blacklist: [''],
}

export const options = storeOptions

const appReducers = persistCombineReducers(options, {
  device: deviceReducer,
  token: tokenReducer,
})

const rootReducer = (state: any, action: any): any => appReducers(state, action)

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
