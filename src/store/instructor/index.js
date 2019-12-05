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
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            courses: []
          };
          commit("setUser", newUser);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    userLogin({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const signedInUser = {
            id: user.id,
            courses: []
          };
          commit("setUser", signedInUser);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },

  getters: {
    user(state) {
      return state.user;
    }
  }
};
