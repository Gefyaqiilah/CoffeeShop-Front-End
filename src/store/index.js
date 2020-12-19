/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import Vuex from 'vuex'
import jwt from 'jsonwebtoken'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router/index'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    password: '',
    user: {},
    userRegister: [],
    accessToken: null || localStorage.getItem('accessToken'),
    refreshToken: null || localStorage.getItem('refreshToken'),
    userData: ''
  },
  plugins: [createPersistedState()],
  mutations: {
    togglePassword (state) {
      state.password = document.getElementById('password')
      if (state.password.type === 'password') {
        state.password.type = 'text'
      } else {
        state.password.type = 'password'
      }
    },
    SET_USER (state, payload) {
      state.user = payload
      state.accessToken = payload.accessToken
      state.refreshToken = payload.refreshToken
    },
    SET_REGISTER (state, payload) {
      state.userRegister = payload
    },
    REMOVE_TOKEN (state) {
      state.accessToken = null
      state.refreshToken = null
    },
    SET_USER_DATA (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_API}/users/login`, payload)
          .then(res => {
            const result = res.data.result
            localStorage.setItem('accessToken', result.accessToken)
            localStorage.setItem('refreshToken', result.refreshToken)
            jwt.verify(result.accessToken, process.env.VUE_APP_ACCESS_TOKEN_KEY, (error, data) => {
              if (!error) {
                delete data.iat
                delete data.exp
                context.commit('SET_USER_DATA', data)
              }
            })
            context.commit('SET_USER', result)
            context.dispatch('interceptorRequest')
            resolve(res)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${process.env.VUE_APP_URL_API}/users/register`, payload)
          .then(res => {
            resolve(res)
          })
      })
    },
    updateUserProfile (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`${process.env.VUE_APP_URL_API}/users/profile/${payload.userId}`, payload.formData)
          .then(result => {
            Swal.fire({
              icon: 'success',
              title: 'Succeed',
              text: 'Your personal information has been updated',
              showConfirmButton: false,
              timer: 1500
            })
            resolve(result)
          })
      })
    },
    getProductCoffee (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_API}/products/typeProduct?typeProduct=coffee&limit=12`)
          .then(results => {
            resolve(results.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getProductFoods (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_API}/products/typeProduct?typeProduct=food&limit=12`)
          .then(results => {
            resolve(results.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getProductNonCoffee () {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_API}/products/typeProduct?typeProduct=non-coffee &limit=12`)
          .then(results => {
            resolve(results.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getProductAddOn () {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_API}/products/typeProduct?typeProduct=add-on&limit=12`)
          .then(results => {
            resolve(results.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    getProductDetailsById (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`${process.env.VUE_APP_URL_API}/products/${payload.id}`)
          .then(results => {
            console.log(results.data.result.dineIn)
            resolve(results.data.result)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        if (response.data.statusCode === 200) {
          if (response.data.result.message === 'User Has been created') {
            Swal.fire({
              icon: 'success',
              title: 'Success register',
              showConfirmButton: false,
              timer: 5000
            })
            router.push('/auth/login')
          }
        }
        return response
      }, function (error) {
        if (error.response.data.status === 401) {
          if (error.response.data.err.message === 'Invalid Token') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            context.commit('REMOVE_TOKEN')
            Swal.fire({
              icon: 'error',
              title: 'Invalid Token',
              showConfirmButton: false,
              timer: 1500
            })
            router.push('/auth/login')
          } else if (error.response.data.err.message === 'Access Token expired') {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            context.commit('REMOVE_TOKEN')
            Swal.fire({
              icon: 'error',
              title: 'Access Token expired',
              showConfirmButton: false,
              timer: 1500
            })
            router.push('/auth/login')
          } else if (error.response.data.err.message === 'Password Wrong ') {
            Swal.fire({
              icon: 'error',
              title: 'ooopss... password wrong!',
              showConfirmButton: false,
              timer: 1500
            })
          } else if (error.response.data.err.message === 'Email has not been verified') {
            Swal.fire({
              icon: 'error',
              title: 'Email has not been verified',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else if (error.response.data.status === 409) {
          if (error.response.data.err.message === 'Forbidden: Email already exists. ') {
            Swal.fire({
              icon: 'error',
              title: 'Email already exists',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else if (error.response.data.status === 500) {
          Swal.fire({
            icon: 'error',
            title: 'Looks like server having trouble',
            showConfirmButton: false,
            timer: 1500
          })
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    isLogin (state) {
      return state.accessToken !== null
    },
    getUserData (state) {
      return state.userData
    }
  },
  modules: {
  }
})
