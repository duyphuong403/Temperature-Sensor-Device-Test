import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Device = {
  deviceId: number,
  name: String,
  model: number,
  serial: String,
  mac: String,
  region: String,
  longitude: number,
  latitude: number,
  floor: number,
  distance: number,
  active: boolean,
  date: Date,
}

export const initialState = {
  device: {},
}

export const deviceSlice = createSlice({
  name: 'device',
  initialState: initialState.device,
  reducers: {
    setDevice: (state: any, action: PayloadAction<Device>) => {
      return action.payload
    },
  },
})

export const { setDevice } = deviceSlice.actions
export const selectDevice = (state: any) => state.device

export default deviceSlice.reducer
