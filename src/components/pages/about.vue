<template>
  <div>
    <v-card class="about-content" tile>
      <v-card-title>
        <h1>Choose A Student</h1>
      </v-card-title>

      <v-card-text class="faq">
        <h2 class="question">What is it?</h2>
        <p
          class="answer"
        >Choose A Student is a tool that allows instructors to make class participation for fair.</p>

        <h2 class="question">How does it work?</h2>
        <p
          class="answer"
        >An instructor creates an account and creates a list of the courses they teach. For each course they teach, they enter the roster for that course.</p>
        <p
          class="answer"
        >With the roster now entered, the instructor can now simply press a button, and Choose A Student will choose a student for them.</p>

        <h2 class="question">What if it chooses the same student twice in a row?</h2>
        <p
          class="answer"
        >It shouldn't. The app was built with an algorithm to make sure each student is only called once, until all the students have been called.</p>
        <p
          class="answer"
        >However, once each student has been called, it is possible that the last student called on the first go round may be the first student called on the second go round.</p>

        <h2
          class="question"
        >What if I feel confident in my ability to choose students from my class to speak?</h2>
        <p
          class="answer"
        >By all means, keep doing that. You do you. Choose A Student is merely here as an option. It's not meant to change your way of life in any way.</p>
        <p class="answer">We are not trying to force you to use this in any way.</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "About"
};
</script>

<style scoped>
.about-content {
  text-align: center;
  width: 75%;
  margin: 5% auto;
}
.faq {
  margin-top: 5%;
}

.question {
  margin-top: 5%;
  margin-bottom: 5%;
}
.answer {
  text-align: left;
}
</style>