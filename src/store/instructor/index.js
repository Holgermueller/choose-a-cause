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
    registerUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            email: user.email,
            id: user.uid,
            courses: []
          };
          commit("setUser", newUser);

          db.collection("users")
            .add({
              username: payload.username,
              email: user.email,
              userId: user.uid
            })
            .then(() => {
              console.log("New user added!");
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

    // createNewUserProfile({ commit, getters }, payload) {
    //   const newUserName = payload.username;
    //   const userEmail = payload.email;
    //   //const userId = user.uid;
    //   db.collection("users")
    //     .doc(getters.newUser.uid)
    //     .set({
    //       username: newUserName,
    //       email: userEmail,
    //       userId: getters.newUser.uid
    //     })
    //     .then(() => {
    //       console.log("New user added...");
    //     })
    //     .catch(err => {
    //       commit("setError", err);
    //     });
    // },

    userLogin({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");

      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          console.log(user);
          commit("setLoading", false);
          const signedInUser = {
            email: user.email,
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
