<template>
  <div id="darkModeToolTip">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on"><h2>?</h2> </v-btn>
      </template>
      <span>Why a dark mode?</span>
      <v-divider></v-divider>
      <span
        >Studies show that dark mode uses less power. Of course the type of
        screen you have does factor in to how much energy you save, But still,
        saved energy is saved energy.</span
      >
    </v-tooltip>
  </div>
</template>
