import * as firebase from "firebase/app";
import db from "../../components/firebase/firebaseInit";

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
    registerUser({ commit, getters }, payload) {
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

    createNewUserProfile({ commit, getters }, payload) {
      const newUser = { username: payload.username, userId: payload.uid };

      db.collection("users")
        .add({ username: payload.username, userId: getters.user.id })
        .then(() => {
          commit("setUser", ...newUser);
        })
        .catch(err => {
          commit("setError", err);
          commit("setLoading", false);
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

    getUserProfile({ commit, getters }, payload) {
      db.collection("users")
        .get()
        .then()
        .catch(err => {
          console.log(err);
        });
    },

    autoSignIn({ commit, getters }, payload) {
      commit("setUser", { id: payload.uid, courses: getters.courses });
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
