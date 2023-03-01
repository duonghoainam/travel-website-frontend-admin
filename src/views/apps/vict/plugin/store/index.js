// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import JwtService from '@src/auth/jwt/jwtService'
// ** Axios Imports
import axios from 'axios'
// import qs from 'qs'

// const onSubmit = data => {
//   if (Object.values(data).every(field => field.length > 0)) {
//     useJwt
//       .login({ username: data.loginEmail, password: data.password })
//       .then(res => {
//         const adminAbility = [{action: 'manage', subject: 'all'}]
//         const data = { ...res.data.userData, accessToken: res.data.token, refreshToken: res.data.refreshToken, ability: adminAbility }
//         dispatch(handleLogin(data))
//         ability.update(adminAbility)
//         navigate(getHomeRouteForLoggedInUser('admin'))
        
//         toast(t => (
//           <ToastContent t={t} role={data.role || 'admin'} name={data.fullName || data.username || 'John Doe'} />
//         ))
//       })
//       .catch(err => console.log(err))
//   } else {
//     for (const key in data) {
//       if (data[key].length === 0) {
//         setError(key, {
//           type: 'manual'
//         })
//       }
//     }
//   }
// }
export const getListUser = createAsyncThunk('appUsers/getApiData', async params => {
  const response = await axios.get('https://travel-website-backend.up.railway.app/api/tour-packages', { params })

  console.log('api list user', response)

  return {data: response.data.tourPackages}
})

export const getUserMe = createAsyncThunk('appUsers/getApiData', async params => {
  const response = await axios.get('/api/v1/users/me', { params })

  console.log('api meeeee', response)

  return response.data
})

export const deleteUser = createAsyncThunk('appUsers/getApiData', async params => {
  const response = await axios.delete(`$/api/v1/users/${params}`)

  console.log('api delete user', response)

  return response.data
})

export const addUser = createAsyncThunk('appUsers/getApiData', async params => {
  console.log('param add', params)
  const response = await axios.post('/api/v1/users', { params })

  console.log('api add user', response)

  return response.data
})

export const getAllData = createAsyncThunk('appUsers/getAllData', async () => {
  const response = await axios.get('/api/users/list/all-data')
  // console.log('all data', response)
  return response.data
})

export const getData = createAsyncThunk('appUsers/getData', async params => {
  const response = await axios.get('/api/users/list/data', params)
  // console.log('data', response)
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total
  }
})

export const getUser = createAsyncThunk('appUsers/getUser', async id => {
  const response = await axios.get('/api/users/user', { id })
  return response.data.user
})

// export const addUser = createAsyncThunk('appUsers/addUser', async (user, { dispatch, getState }) => {
//   await axios.post('/apps/users/add-user', user)
//   await dispatch(getData(getState().users.params))
//   await dispatch(getAllData())
//   return user
// })

// export const deleteUser = createAsyncThunk('appUsers/deleteUser', async (id, { dispatch, getState }) => {
//   await axios.delete('/apps/users/delete', { id })
//   await dispatch(getData(getState().users.params))
//   await dispatch(getAllData())
//   return id
// })

export const appUsersSlice = createSlice({
  name: 'appUsers',
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.totalPages
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload
      })
      .addCase(getListUser.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.data
        }
      })
  }
})

export default appUsersSlice.reducer
