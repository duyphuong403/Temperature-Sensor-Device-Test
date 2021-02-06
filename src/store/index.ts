import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import rootReducer, { options } from './rootReducer'

const configureAppStore = (preloadedState = {}): any => {
  const middlewares = [
    thunkMiddleware,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const persistedReducer = persistReducer(options, rootReducer)
  
  if (!preloadedState) {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: middlewares,
      enhancers,
      devTools: {
        ...composedEnhancers,
      },
    })
    return { store }
  }

  const store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    enhancers,
    preloadedState,
    devTools: {
      ...composedEnhancers,
    },
  })

  const persistor = persistStore(store, null, () => store.getState)

  return { store, persistor }
}

export default configureAppStore
