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

    updateStudentInfo() {},

    removeStudentFromRoster(state, payload) {
      state.courseRoster.findIndex(student => student.id === payload);
    }
  },

  actions: {
    getCourseRoster({ commit, getters }) {
      commit("setLoading", true);

      firebase
        .collection("roster")
        //.where("courseId", "==", getters.$route)
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
        .collection("roster")
        .add({
          firstname: payload.firstName,
          lastname: payload.lastName,
          preferredname: payload.preferredName,
          courseId: payload.courseId
        })
        .then(() => {
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", true);
          commit("setError", err);
        });
    },

    updateStudentInfo() {},

    removeStudentFromRoster({ commit }, payload) {
      let targetId = payload.studentId;

      firebase
        .collection("roster")
        .doc(targetId)
        .delete()
        .then(() => {})
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
