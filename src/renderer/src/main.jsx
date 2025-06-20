import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//redux imports
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

//reducers import
import itemsReducer from './slices/itemsSlice'
import settingsReducer from './slices/settingsSlice'
import categoriesReducer from './slices/categoriesSlice'
import currentOrderReducer from './slices/currentOrderSlice'
import registerReducer from './slices/registerSlice'

const store = configureStore({
  reducer: {
    items: itemsReducer,
    settings: settingsReducer,
    categories: categoriesReducer,
    currentOrder: currentOrderReducer,
    register: registerReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
