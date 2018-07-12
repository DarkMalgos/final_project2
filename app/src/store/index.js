import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
        token: '',
        address: '',
        quantity: 0,
        step: '',
        delivery: 4
    },
    mutations = {
        setAddress(state, payload) {
            state.address = payload
        },
        setToken(state, payload) {
            state.token = payload
        },
        setQuantity(state, payload) {
            let quantity = 0
            for (let item of payload) {
                quantity += parseInt(item.quantity)
            }
            state.quantity = quantity
        },
        setStep(state, payload) {
            state.step = payload
        },
        setDelivery(state, payload) {
            state.delivery = payload
            console.log(state.delivery)
        }
    },
    getters = {
        getAddress(state) {
            return state.address
        },
        getToken(state) {
            return state.token
        },
        getQuantity(state) {
            return state.quantity
        },
        getStep(state) {
            return state.step
        },
        getDelivery(state) {
            return state.delivery
        }
    },
    actions = {
        newAddress({commit}, payload) {
            commit('setAddress', payload)
        },
        newToken({commit}, payload) {
            commit('setToken', payload)
        },
        newStep({commit}, payload) {
            commit('setStep', payload)
        },
        newQuantity({commit}, payload) {
            commit('setQuantity', payload)
        },
        newDelivery({commit}, payload) {
            commit('setDelivery', payload)
        }
    }

export const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions
});