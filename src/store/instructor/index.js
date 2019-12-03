import * as firebase from "firebase";

export default {
  state: {
    user: null,
    loading: false,
    error: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
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
          console.log(err);
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
          console.log(err);
        });
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },

    clearError({ commit }) {
      commit("clearError");
    }
  },

  getters: {
    user(state) {
      return state.user;
    },

    loading(state) {
      return state.loading;
    },

    error(state) {
      return state.error;
    }
  }
};
