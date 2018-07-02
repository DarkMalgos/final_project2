import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
        token: '',
        address: '',
        cToken: '',
        quantity: 0
    },
    mutations = {
        setAddress(state, payload) {
            console.log(payload)
            state.address = payload
        },
        setToken(state, payload) {
            state.token = payload
        },
        setCustomerToken(state, payload) {
            state.cToken = payload
        },
        setQuantity(state, payload) {
            let quantity = 0
            for (let item of payload) {
                quantity += parseInt(item.quantity)
            }
            state.quantity = quantity
            console.log('total quantity', state.quantity)
        }
    },
    getters = {
        getAddress(state) {
            return state.address
        },
        getToken(state) {
            return state.token
        },
        getCustomerToken(state) {
            return state.cToken
        },
        getQuantity(state) {
            return state.quantity
        }
    },
    actions = {
        newAddress({commit}, payload) {
            commit('setAddress', payload)
        },
        newToken({commit}, payload) {
            commit('setToken', payload)
        },
        newCustomerToken({commit}, payload) {
            commit('setCustomerToken', payload)
        },
        newQuantity({commit}, payload) {
            commit('setQuantity', payload)
        }
    }

export const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
});