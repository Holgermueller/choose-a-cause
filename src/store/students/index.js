import firebase from "../../components/firebase/firebaseInit";

export default {
  state: {
    courseRoster: []
  },

  mutations: {
    setCourseRoster(state, payload) {
      if (payload) {
        state.courseRoster = payload;
      } else {
        state.courseRoster = [];
      }
    },

    updateStudentInfo(state, payload) {},

    removeStudentFromRoster(state, payload) {
      state.courseRoster.findIndex(student => student.id === payload);
    }
  },

  actions: {
    getCourseRoster({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .collection("courses")
        .doc(payload.courseId)
        .collection("roster")
        .orderBy("preferredname")
        .onSnapshot(
          querySnapshot => {
            let studentsFromDb = [];
            querySnapshot.forEach(doc => {
              let studentData = {
                studentId: doc.id,
                firstName: doc.data().firstname,
                lastName: doc.data().lastname,
                preferredName: doc.data().preferredname,
                courseId: doc.data().courseId
              };
              studentsFromDb.push(studentData);
            });
            commit("setCourseRoster", studentsFromDb);
            commit("setLoading", false);
          },
          err => {
            commit("setLoading", true);
            commit("setError", err);
          }
        );
    },

    addStudentToRoster({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .collection("courses")
        .doc(payload.courseId)
        .collection("roster")
        .add({
          firstname: payload.firstName,
          lastname: payload.lastName,
          preferredname: payload.preferredName
        })
        .then(() => {
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", true);
          commit("setError", err);
        });
    },

    updateStudentInfo({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .dcollection("courses")
        .doc(payload.courseId)
        .collection("roster")
        .doc(payload.studentId)
        .update({
          firstname: payload.newFirstName,
          lastname: payload.newLastName,
          preferredname: payload.newPreferredName
        })
        .then(() => {
          commit("updateStudentInfo");
        })
        .catch(err => {
          commit("setError", err);
        });
    },

    removeStudentFromRoster({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .collection("courses")
        .doc(payload.courseId)
        .collection("roster")
        .doc(payload.studentId)
        .delete()
        .then(() => {
          commit("removeStudentFromRoster");
        })
        .catch(err => {
          commit("setError", err);
        });
    }
  },

  getters: {
    courseRoster(state) {
      return state.courseRoster;
    }
  }
};
