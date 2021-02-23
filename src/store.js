import { getBikes, saveBike, deleteBike } from './utils/bike.storage';

export default {
  debug: true,
  state: {
    userBikes: getBikes(),
    avaliableBikes: {},
  },
  methods: {
    getUserBikes() {
      return this.state.userBikes;
    },
    getUserBike(hourId) {
      return this.state.userBikes[hourId];
    },
    getAvaliableBikes() {
      return this.state.avaliableBikes;
    },
    saveUserBike(hourId, bike) {
      saveBike(hourId, bike);
      this.state.userBikes[hourId] = bike;
    },
    removeUserBike(hourId) {
      deleteBike(hourId);
      delete this.state.userBikes[hourId];
    },
    async requestAvaliableBikes() {
      return fetch('http://localhost:3000/hour', {
        mode: 'cors',
        method: 'GET',
      })
        .then(res => res.json())
        .then(json => {
          this.state.avaliableBikes = json;
        });
    },
    async addUserBike(hourId) {
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
            this.saveUserBike(hourId, json);
            this.requestAvaliableBikes();
            return json;
          });
      })
    },
    async freeUserBike(hourId) {
      const bike = this.getUserBike(hourId);
      if(!bike) return Promise.reject(new Error('User bike not found'));
      return fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hourId,
          itemId: bike.id,
          action: 'ADD',
        }),
      }).then(res => { 
        if(!res.ok) return res.json().then(json => {
            throw new Error(`${json.code}: ${json.message}`)
          });
        this.removeUserBike(hourId);
        this.requestAvaliableBikes();
      })
    },
  },
};