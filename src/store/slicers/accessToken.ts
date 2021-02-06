import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = ''

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state: any, action: PayloadAction<any>) => {
      return action.payload
    },
  },
})

export const { setToken } = tokenSlice.actions
export const selectToken = (state: any) => state.token

export default tokenSlice.reducer
