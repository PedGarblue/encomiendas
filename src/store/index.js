import Vue from 'vue'
import Vuex from 'vuex'
import { getBikes, saveBike, deleteBike } from '../utils/bike.storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userBikes: getBikes(), 
    avaliableBikes: [],
  },
  getters: {
    getUserBikes: state => state.userBikes,
    getUserBike: state => hourId => state.userBikes.find(bike => bike.id === hourId),
    getAvaliableHours: state => {
      return state.avaliableBikes
        .filter(bike => !state.userBikes
          .find(userBike => userBike.id === bike.id)
         );
    },
  },
  mutations: {
    setAvaliableHours: (state, bikes) => {
      state.avaliableBikes = bikes;
    },
    saveUserBike: (state, bike) => {
      saveBike(bike);     
      state.userBikes = getBikes();
    },
    removeUserBike: (state, id) => {
      deleteBike(id);
      state.userBikes = getBikes();
    },
  },
  actions: {
    async requestAvaliableHours({ commit }) {
      return fetch('http://localhost:3000/hour', {
        mode: 'cors',
        method: 'GET',
      })
        .then(res => res.json())
        .then(json => {
          commit('setAvaliableHours', json);
        });
    },
    async requestUserBike({ commit, dispatch }, hourId) {
      return fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hourId,
          action: 'APPEND',
        }),
      })
      .then(res => { 
        return res.json()
          .then(json => {
            if(!res.ok) throw new Error(`${json.code}: ${json.message}`);
            commit('saveUserBike', json);
            dispatch('requestAvaliableHours');
            return json;
          });
      })
    },
    async freeUserBike({ commit, dispatch, getters }, hourId) {
      const bike = getters.getUserBike(hourId);
      if(!bike) return Promise.reject(new Error('User bike not found'));
      return fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hourId,
          itemId: bike.itemId,
          action: 'ADD',
        }),
      }).then(res => { 
        if(!res.ok) return res.json().then(json => {
            throw new Error(`${json.code}: ${json.message}`)
          });
        console.log(bike);
        commit('removeUserBike', bike.id);
        dispatch('requestAvaliableHours');
      })
    },
  },
  modules: {
  }
})
