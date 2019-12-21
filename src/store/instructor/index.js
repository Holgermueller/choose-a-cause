import * as firebase from "firebase/app";

export default {
  state: {
    user: null
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },

    updateUsename(state, payload) {
      state.user = payload;
      state.userProfile = payload;
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
              console.log(err);
            });

          const user = userCredential.user;
          const newUser = {
            username: payload.username,
            email: user.email,
            id: user.uid
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
            email: payload.email,
            id: user.user.uid,
            username: user.user.displayName,
            courses: []
          };
          commit("setUser", signedInUser);
        })
        .catch(err => {
          commit("setLoading", false);
          commit("setError", err);
        });
    },

    autoSignIn({ commit, getters }, payload) {
      commit("setUser", {
        id: payload.uid,
        email: payload.email,
        username: payload.username,
        courses: getters.courses
      });
    },

    updateUsename({ commit }, payload) {
      firebase
        .auth()
        .currentUser.updateProfile({
          displayName: payload.getUserName
        })
        .then(() => {
          commit("setUser", {
            username: payload.username
          });
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
    user(state) {
      return state.user;
    }
  }
};
