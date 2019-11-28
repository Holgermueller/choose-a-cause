import * as firebase from "firebase";

export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    }
  },

  actions: {
    registerUser({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            courses: []
          };
          commit("setUser", newUser);
        })
        .catch(err => {
          console.log(err);
        });
    },

    userLogin({ commit }, payload) {
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const signedInUser = {
            id: user.id
          };
          commit("setUser", signedInUser);
          console.log(signedInUser);
        })
        .catch(err => {
          console.log(err);
        });
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },

  getters: {
    instructor(state) {
      return state.user;
    }
  }
};
