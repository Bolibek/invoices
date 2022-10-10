import {configureStore, createSlice} from '@reduxjs/toolkit'
import stringMiddleware from '../middleWare/stringMiddleWare'
import {invoiceApi} from '../services/invoiceApi'

const initialState = {
  isLoggedIn: false,
  status: 'home',
  datas: [],
}
const appSlice = createSlice({
  name: 'reducer',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload // eslint-disable-line no-param-reassign
    },
    setDatas: (state, action) => {
      state.datas = action.payload // eslint-disable-line no-param-reassign
    },
  },
})
export const {setIsLoggedIn, setDatas} = appSlice.actions
const {reducer} = appSlice
export const store = configureStore({
  reducer: {
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    invoice: reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(invoiceApi.middleware, stringMiddleware),
})
