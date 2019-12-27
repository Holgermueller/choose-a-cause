import * as firebase from "firebase/app";

export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    updateUsername(state, payload) {
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
        .then(userCredential => {
          commit("setLoading", false);

          const userToUpdate = firebase.auth().currentUser;
          userToUpdate
            .updateProfile({
              displayName: payload.username
            })
            .then(() => {
              console.log("update success!");
            })
            .catch(err => {
              commit("setError", err);
            });

          const user = userCredential.user;
          const newUser = {
            username: payload.username,
            email: user.email,
            id: user.uid
          };

          console.log(newUser);
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
            email: user.user.email,
            id: user.user.uid,
            username: user.user.displayName
          };

          console.log(signedInUser);
          commit("setUser", signedInUser);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        email: payload.email,
        username: payload.username
      });
    },

    updateUsename({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: payload.getUserName
        })
        .then(() => {
          commit("setLoading", false);
          commit("setUser", {
            username: payload.username
          });
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    resetPassword({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(() => {
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    logout({ commit }) {
      commit("setLoading", true);

      firebase
        .auth()
        .signOut()
        .then(() => {
          commit("setLoading", false);
          commit("setUser", null);
        })
        .catch(err => {
          console.log("err");
          commit("setLoading", false);
          commit("setError", err);
        });
    }
  },

  getters: {
    user(state) {
      return state.user;
    }
  }
};
