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
            id: user.id,
            courses: []
          };
          commit("setUser", signedInUser);
          commit("setUserProfile", signedInUser);

          db.collection("users")
            .doc(user.id)
            .get()
            .then(querySnapshot => {
              console.log(querySnapshot);
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
    },
    userProfile(state) {
      return state.userProfile;
    }
  }
};
