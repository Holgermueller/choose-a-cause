import * as firebase from "firebase/app";
import db from "../../components/firebase/firebaseInit";

export default {
  state: {
    user: null,
    userProfile: []
  },

  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setUserProfile(state, payload) {
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
          commit("setUserProfile", newUser);

          db.collection("users")
            .add({
              username: payload.username,
              email: payload.email,
              userId: user.uid
            })
            .then(doc => {
              console.log(doc.data());
            })
            .catch(err => {
              commit("setError", err);
            });
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
          commit("setUserProfile", signedInUser);

          let userId;
          db.collection("users")
            .where(signedInUser.id === userId)
            .get()
            .then(doc => {
              console.log(doc);
            })
            .catch(err => {
              console.log(err);
            });
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

    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    }
  },

  getters: {
    user(state) {
      return state.user;
    },
    userProfile(state) {
      return state.userProfile;
    }
  }
};
